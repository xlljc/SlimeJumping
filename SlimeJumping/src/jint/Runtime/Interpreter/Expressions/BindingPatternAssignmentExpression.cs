using System;
using System.Collections.Generic;
using Esprima.Ast;
using Jint.Native;
using Jint.Native.Array;
using Jint.Native.Function;
using Jint.Native.Iterator;
using Jint.Runtime.Environments;
using Jint.Runtime.References;

namespace Jint.Runtime.Interpreter.Expressions
{
    internal sealed class BindingPatternAssignmentExpression : JintExpression
    {
        private readonly BindingPattern _pattern;
        private JintExpression _right;

        public BindingPatternAssignmentExpression(AssignmentExpression expression) : base(expression)
        {
            _pattern = (BindingPattern) expression.Left;
            _initialized = false;
        }

        protected override void Initialize(EvaluationContext context)
        {
            _right = Build(context.Engine, ((AssignmentExpression) _expression).Right);
        }

        protected override ExpressionResult EvaluateInternal(EvaluationContext context)
        {
            var rightValue = _right.GetValue(context);
            if (rightValue.IsAbrupt())
            {
                return rightValue;
            }

            var completion = ProcessPatterns(context, _pattern, rightValue.Value, null);
            if (completion.IsAbrupt())
            {
                return completion;
            }

            return rightValue;
        }

        internal static Completion ProcessPatterns(
            EvaluationContext context,
            BindingPattern pattern,
            JsValue argument,
            EnvironmentRecord environment,
            bool checkObjectPatternPropertyReference = true)
        {
            if (pattern is ArrayPattern ap)
            {
                return HandleArrayPattern(context, ap, argument, environment);
            }

            if (pattern is ObjectPattern op)
            {
                return HandleObjectPattern(context, op, argument, environment, checkObjectPatternPropertyReference);
            }

            ExceptionHelper.ThrowArgumentException("Not a pattern");
            return default;
        }

        private static bool ConsumeFromIterator(IteratorInstance it, out JsValue value, out bool done)
        {
            value = JsValue.Undefined;
            done = false;

            if (!it.TryIteratorStep(out var d))
            {
                done = true;
                return false;
            }

            value = d.Get(CommonProperties.Value);
            return true;
        }

        private static Completion HandleArrayPattern(
            EvaluationContext context,
            ArrayPattern pattern,
            JsValue argument,
            EnvironmentRecord environment)
        {
            var engine = context.Engine;
            var realm = engine.Realm;
            var obj = TypeConverter.ToObject(realm, argument);
            ArrayOperations arrayOperations = null;
            IteratorInstance iterator = null;

            // optimize for array unless someone has touched the iterator
            if (obj.IsArrayLike && obj.HasOriginalIterator)
            {
                arrayOperations = ArrayOperations.For(obj);
            }
            else
            {
                iterator = obj.GetIterator(realm);
            }

            var completionType = CompletionType.Normal;
            var close = false;
            var done = false;
            uint i = 0;
            try
            {
                ref readonly var elements = ref pattern.Elements;
                for (; i < elements.Count; i++)
                {
                    var left = elements[(int) i];

                    if (left is null)
                    {
                        if (arrayOperations != null)
                        {
                            arrayOperations.TryGetValue(i, out _);
                        }
                        else
                        {
                            if (!ConsumeFromIterator(iterator, out _, out done))
                            {
                                break;
                            }
                        }
                        // skip assignment
                        continue;
                    }

                    if (left is Identifier identifier)
                    {
                        JsValue value;
                        if (arrayOperations != null)
                        {
                            arrayOperations.TryGetValue(i, out value);
                        }
                        else
                        {
                            ConsumeFromIterator(iterator, out value, out done);
                        }

                        AssignToIdentifier(engine, identifier.Name, value, environment);
                    }
                    else if (left is MemberExpression me)
                    {
                        close = true;
                        var reference = GetReferenceFromMember(context, me);
                        JsValue value;
                        if (arrayOperations != null)
                        {
                            arrayOperations.TryGetValue(i, out value);
                        }
                        else
                        {
                            ConsumeFromIterator(iterator, out value, out done);
                        }

                        AssignToReference(engine, reference, value, environment);
                    }
                    else if (left is BindingPattern bindingPattern)
                    {
                        JsValue value;
                        if (arrayOperations != null)
                        {
                            arrayOperations.TryGetValue(i, out value);
                        }
                        else
                        {
                            iterator.TryIteratorStep(out var temp);
                            value = temp;
                        }
                        ProcessPatterns(context, bindingPattern, value, environment);
                    }
                    else if (left is RestElement restElement)
                    {
                        close = true;
                        Reference reference = null;
                        if (restElement.Argument is MemberExpression memberExpression)
                        {
                            reference = GetReferenceFromMember(context, memberExpression);
                        }

                        ArrayInstance array;
                        if (arrayOperations != null)
                        {
                            var length = arrayOperations.GetLength();
                            array = engine.Realm.Intrinsics.Array.ConstructFast(length - i);
                            for (uint j = i; j < length; ++j)
                            {
                                arrayOperations.TryGetValue(j, out var indexValue);
                                array.SetIndexValue(j - i, indexValue, updateLength: false);
                            }
                        }
                        else
                        {
                            array = engine.Realm.Intrinsics.Array.ConstructFast(0);
                            uint index = 0;
                            done = true;
                            do
                            {
                                if (!iterator.TryIteratorStep(out var item))
                                {
                                    done = true;
                                    break;
                                }

                                var value = item.Get(CommonProperties.Value);
                                array.SetIndexValue(index++, value, updateLength: false);
                            } while (true);

                            array.SetLength(index);
                        }

                        if (restElement.Argument is Identifier leftIdentifier)
                        {
                            AssignToIdentifier(engine, leftIdentifier.Name, array, environment);
                        }
                        else if (restElement.Argument is BindingPattern bp)
                        {
                            ProcessPatterns(context, bp, array, environment);
                        }
                        else
                        {
                            AssignToReference(engine, reference,  array, environment);
                        }
                    }
                    else if (left is AssignmentPattern assignmentPattern)
                    {
                        JsValue value;
                        if (arrayOperations != null)
                        {
                            arrayOperations.TryGetValue(i, out value);
                        }
                        else
                        {
                            ConsumeFromIterator(iterator, out value, out done);
                        }

                        if (value.IsUndefined())
                        {
                            var jintExpression = Build(engine, assignmentPattern.Right);
                            var completion = jintExpression.GetValue(context);
                            if (completion.IsAbrupt())
                            {
                                return completion;
                            }
                            value = completion.Value;
                        }

                        if (assignmentPattern.Left is Identifier leftIdentifier)
                        {
                            if (assignmentPattern.Right.IsFunctionDefinition())
                            {
                                ((FunctionInstance) value).SetFunctionName(new JsString(leftIdentifier.Name));
                            }

                            AssignToIdentifier(engine, leftIdentifier.Name, value, environment);
                        }
                        else if (assignmentPattern.Left is BindingPattern bp)
                        {
                            ProcessPatterns(context, bp, value, environment);
                        }
                    }
                    else
                    {
                        ExceptionHelper.ThrowArgumentOutOfRangeException("pattern",
                            "Unable to determine how to handle array pattern element " + left);
                        break;
                    }
                }

                close = true;
            }
            catch
            {
                completionType = CompletionType.Throw;
                throw;
            }
            finally
            {
                if (close && !done)
                {
                    iterator?.Close(completionType);
                }
            }

            return new Completion(CompletionType.Normal, JsValue.Undefined, pattern.Location);
        }

        private static Completion HandleObjectPattern(
            EvaluationContext context,
            ObjectPattern pattern,
            JsValue argument,
            EnvironmentRecord environment,
            bool checkReference)
        {
            var processedProperties = pattern.Properties.Count > 0 && pattern.Properties[pattern.Properties.Count - 1] is RestElement
                ? new HashSet<JsValue>()
                : null;

            var source = TypeConverter.ToObject(context.Engine.Realm, argument);
            for (var i = 0; i < pattern.Properties.Count; i++)
            {
                if (pattern.Properties[i] is Property p)
                {
                    JsValue sourceKey;
                    var identifier = p.Key as Identifier;
                    if (identifier == null || p.Computed)
                    {
                        var keyExpression = Build(context.Engine, p.Key);
                        var completion = keyExpression.GetValue(context);
                        if (completion.IsAbrupt())
                        {
                            return completion;
                        }
                        sourceKey = TypeConverter.ToPropertyKey(completion.Value);
                    }
                    else
                    {
                        sourceKey = identifier.Name;
                    }

                    processedProperties?.Add(sourceKey);
                    if (p.Value is AssignmentPattern assignmentPattern)
                    {
                        source.TryGetValue(sourceKey, out var value);
                        if (value.IsUndefined())
                        {
                            var jintExpression = Build(context.Engine, assignmentPattern.Right);
                            var completion = jintExpression.GetValue(context);
                            if (completion.IsAbrupt())
                            {
                                return completion;
                            }
                            value = completion.Value;
                        }

                        if (assignmentPattern.Left is BindingPattern bp)
                        {
                            ProcessPatterns(context, bp, value, environment);
                            continue;
                        }

                        var target = assignmentPattern.Left as Identifier ?? identifier;

                        if (assignmentPattern.Right.IsFunctionDefinition())
                        {
                            ((FunctionInstance) value).SetFunctionName(target.Name);
                        }

                        AssignToIdentifier(context.Engine, target.Name, value, environment);
                    }
                    else if (p.Value is BindingPattern bindingPattern)
                    {
                        source.TryGetValue(sourceKey, out var value);
                        ProcessPatterns(context, bindingPattern, value, environment);
                    }
                    else if (p.Value is MemberExpression memberExpression)
                    {
                        var reference = GetReferenceFromMember(context, memberExpression);
                        source.TryGetValue(sourceKey, out var value);
                        AssignToReference(context.Engine, reference, value, environment);
                    }
                    else
                    {
                        var identifierReference = p.Value as Identifier;
                        var target = identifierReference ?? identifier;
                        source.TryGetValue(sourceKey, out var v);
                        AssignToIdentifier(context.Engine, target.Name, v, environment, checkReference);
                    }
                }
                else
                {
                    var restElement = (RestElement) pattern.Properties[i];
                    if (restElement.Argument is Identifier leftIdentifier)
                    {
                        var count = Math.Max(0, source.Properties?.Count ?? 0) - processedProperties.Count;
                        var rest = context.Engine.Realm.Intrinsics.Object.Construct(count);
                        source.CopyDataProperties(rest, processedProperties);
                        AssignToIdentifier(context.Engine, leftIdentifier.Name, rest, environment);
                    }
                    else if (restElement.Argument is BindingPattern bp)
                    {
                        ProcessPatterns(context, bp, argument, environment);
                    }
                    else if (restElement.Argument is MemberExpression memberExpression)
                    {
                        var left = GetReferenceFromMember(context, memberExpression);
                        var rest = context.Engine.Realm.Intrinsics.Object.Construct(0);
                        source.CopyDataProperties(rest, processedProperties);
                        AssignToReference(context.Engine, left, rest, environment);
                    }
                    else
                    {
                        ExceptionHelper.ThrowArgumentException("cannot handle parameter type " + restElement.Argument);
                    }
                }
            }

            return new Completion(CompletionType.Normal, JsValue.Undefined, pattern.Location);
        }

        private static void AssignToReference(
            Engine engine,
            Reference lhs,
            JsValue v,
            EnvironmentRecord environment)
        {
            if (environment is null)
            {
                engine.PutValue(lhs, v);
            }
            else
            {
                lhs.InitializeReferencedBinding(v);
            }
            engine._referencePool.Return(lhs);
        }

        private static Reference GetReferenceFromMember(EvaluationContext context, MemberExpression memberExpression)
        {
            var expression = new JintMemberExpression(memberExpression);
            var reference = expression.Evaluate(context).Value as Reference;
            if (reference is null)
            {
                ExceptionHelper.ThrowReferenceError(context.Engine.Realm, "invalid reference");
            }
            reference.AssertValid(context.Engine.Realm);
            return reference;
        }

        private static void AssignToIdentifier(
            Engine engine,
            string name,
            JsValue rval,
            EnvironmentRecord environment,
            bool checkReference = true)
        {
            var lhs = engine.ResolveBinding(name, environment);
            if (environment is not null)
            {
                lhs.InitializeReferencedBinding(rval);
            }
            else
            {
                if (checkReference && lhs.IsUnresolvableReference() && StrictModeScope.IsStrictModeCode)
                {
                    ExceptionHelper.ThrowReferenceError(engine.Realm, "invalid reference");
                }
                engine.PutValue(lhs, rval);
            }
        }
    }
}