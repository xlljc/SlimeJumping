﻿using Jint.Collections;
using Jint.Native.Function;
using Jint.Native.Global;
using Jint.Native.Object;
using Jint.Runtime;
using Jint.Runtime.Descriptors;
using Jint.Runtime.Interop;

namespace Jint.Native.Number
{
    public sealed class NumberConstructor : FunctionInstance, IConstructor
    {
        private static readonly JsString _functionName = new JsString("Number");

        private const long MinSafeInteger = -9007199254740991;
        internal const long MaxSafeInteger = 9007199254740991;

        public NumberConstructor(
            Engine engine,
            Realm realm,
            FunctionPrototype functionPrototype,
            ObjectPrototype objectPrototype)
            : base(engine, realm, _functionName)
        {
            _prototype = functionPrototype;
            PrototypeObject = new NumberPrototype(engine, realm, this, objectPrototype);
            _length = new PropertyDescriptor(JsNumber.PositiveOne, PropertyFlag.Configurable);
            _prototypeDescriptor = new PropertyDescriptor(PrototypeObject, PropertyFlag.AllForbidden);
        }

        protected override void Initialize()
        {
            var properties = new PropertyDictionary(15, checkExistingKeys: false)
            {
                ["MAX_VALUE"] = new PropertyDescriptor(new PropertyDescriptor(double.MaxValue, PropertyFlag.AllForbidden)),
                ["MIN_VALUE"] = new PropertyDescriptor(new PropertyDescriptor(double.Epsilon, PropertyFlag.AllForbidden)),
                ["NaN"] = new PropertyDescriptor(new PropertyDescriptor(double.NaN, PropertyFlag.AllForbidden)),
                ["NEGATIVE_INFINITY"] = new PropertyDescriptor(new PropertyDescriptor(double.NegativeInfinity, PropertyFlag.AllForbidden)),
                ["POSITIVE_INFINITY"] = new PropertyDescriptor(new PropertyDescriptor(double.PositiveInfinity, PropertyFlag.AllForbidden)),
                ["EPSILON"] = new PropertyDescriptor(new PropertyDescriptor(JsNumber.JavaScriptEpsilon, PropertyFlag.AllForbidden)),
                ["MIN_SAFE_INTEGER"] = new PropertyDescriptor(new PropertyDescriptor(MinSafeInteger, PropertyFlag.AllForbidden)),
                ["MAX_SAFE_INTEGER"] = new PropertyDescriptor(new PropertyDescriptor(MaxSafeInteger, PropertyFlag.AllForbidden)),
                ["isFinite"] = new PropertyDescriptor(new ClrFunctionInstance(Engine, "isFinite", IsFinite, 1, PropertyFlag.Configurable), true, false, true),
                ["isInteger"] = new PropertyDescriptor(new ClrFunctionInstance(Engine, "isInteger", IsInteger, 1, PropertyFlag.Configurable), true, false, true),
                ["isNaN"] = new PropertyDescriptor(new ClrFunctionInstance(Engine, "isNaN", IsNaN, 1, PropertyFlag.Configurable), true, false, true),
                ["isSafeInteger"] = new PropertyDescriptor(new ClrFunctionInstance(Engine, "isSafeInteger", IsSafeInteger, 1, PropertyFlag.Configurable), true, false, true),
                ["parseFloat"] = new PropertyDescriptor(new ClrFunctionInstance(Engine, "parseFloat", GlobalObject.ParseFloat, 0, PropertyFlag.Configurable), true, false, true),
                ["parseInt"] = new PropertyDescriptor(new ClrFunctionInstance(Engine, "parseInt", GlobalObject.ParseInt, 0, PropertyFlag.Configurable), true, false, true)
            };
            SetProperties(properties);
        }

        private static JsValue IsFinite(JsValue thisObj, JsValue[] arguments)
        {
            if (!(arguments.At(0) is JsNumber num))
            {
                return false;
            }

            return double.IsInfinity(num._value) || double.IsNaN(num._value) ? JsBoolean.False : JsBoolean.True;
        }

        private static JsValue IsInteger(JsValue thisObj, JsValue[] arguments)
        {
            if (!(arguments.At(0) is JsNumber num))
            {
                return false;
            }

            if (double.IsInfinity(num._value) || double.IsNaN(num._value))
            {
                return JsBoolean.False;
            }

            var integer = TypeConverter.ToInteger(num);

            return integer == num._value;
        }

        private static JsValue IsNaN(JsValue thisObj, JsValue[] arguments)
        {
            if (!(arguments.At(0) is JsNumber num))
            {
                return false;
            }

            return double.IsNaN(num._value);
        }

        private static JsValue IsSafeInteger(JsValue thisObj, JsValue[] arguments)
        {
            if (!(arguments.At(0) is JsNumber num))
            {
                return false;
            }

            if (double.IsInfinity(num._value) || double.IsNaN(num._value))
            {
                return JsBoolean.False;
            }

            var integer = TypeConverter.ToInteger(num);

            if (integer != num._value)
            {
                return false;
            }

            return System.Math.Abs(integer) <= MaxSafeInteger;
        }

        public override JsValue Call(JsValue thisObject, JsValue[] arguments)
        {
            if (arguments.Length == 0)
            {
                return 0d;
            }

            return TypeConverter.ToNumber(arguments[0]);
        }

        /// <summary>
        /// https://tc39.es/ecma262/#sec-number-constructor-number-value
        /// </summary>
        public ObjectInstance Construct(JsValue[] arguments, JsValue newTarget)
        {
            var value = arguments.Length > 0
                ? JsNumber.Create(TypeConverter.ToNumber(arguments[0]))
                : JsNumber.PositiveZero;

            if (newTarget.IsUndefined())
            {
                return Construct(value);
            }

            var o = OrdinaryCreateFromConstructor(
                newTarget,
                static intrinsics => intrinsics.Number.PrototypeObject,
                static (engine, realm, state) => new NumberInstance(engine, (JsNumber) state), value);
            return o;
        }

        public NumberPrototype PrototypeObject { get; private set; }

        public NumberInstance Construct(JsNumber value)
        {
            var instance = new NumberInstance(Engine)
            {
                _prototype = PrototypeObject,
                NumberData = value
            };

            return instance;
        }
    }
}
