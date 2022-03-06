using Esprima.Ast;
using Jint.Native;

namespace Jint.Runtime.Interpreter.Expressions
{
    internal sealed class JintSequenceExpression : JintExpression
    {
        private JintExpression[] _expressions;

        public JintSequenceExpression(SequenceExpression expression) : base(expression)
        {
            _initialized = false;
        }

        protected override void Initialize(EvaluationContext context)
        {
            var engine = context.Engine;
            var expression = (SequenceExpression) _expression;
            ref readonly var expressions = ref expression.Expressions;
            var temp = new JintExpression[expressions.Count];
            for (var i = 0; i < (uint) temp.Length; i++)
            {
                temp[i] = Build(engine, expressions[i]);
            }

            _expressions = temp;
        }

        protected override ExpressionResult EvaluateInternal(EvaluationContext context)
        {
            var result = Undefined.Instance;
            foreach (var expression in _expressions)
            {
                result = expression.GetValue(context).Value;
            }

            return NormalCompletion(result);
        }
    }
}