﻿using Jint.Collections;
using Jint.Native.Object;
using Jint.Runtime;
using Jint.Runtime.Descriptors;
using Jint.Runtime.Interop;

namespace Jint.Native.Boolean
{
    /// <summary>
    ///     http://www.ecma-international.org/ecma-262/5.1/#sec-15.6.4
    /// </summary>
    public sealed class BooleanPrototype : BooleanInstance
    {
        private readonly Realm _realm;
        private readonly BooleanConstructor _constructor;

        internal BooleanPrototype(
            Engine engine,
            Realm realm,
            BooleanConstructor constructor,
            ObjectPrototype objectPrototype) : base(engine)
        {
            _prototype = objectPrototype;
            PrimitiveValue = JsBoolean.False;
            _realm = realm;
            _constructor = constructor;
        }

        protected override void Initialize()
        {
            var properties = new PropertyDictionary(3, checkExistingKeys: false)
            {
                ["constructor"] = new PropertyDescriptor(_constructor, PropertyFlag.NonEnumerable),
                ["toString"] = new PropertyDescriptor(new ClrFunctionInstance(Engine, "toString", ToBooleanString, 0, PropertyFlag.Configurable), true, false, true),
                ["valueOf"] = new PropertyDescriptor(new ClrFunctionInstance(Engine, "valueOf", ValueOf, 0, PropertyFlag.Configurable), true, false, true)
            };
            SetProperties(properties);
        }

        private JsValue ValueOf(JsValue thisObj, JsValue[] arguments)
        {
            if (thisObj._type == InternalTypes.Boolean)
            {
                return thisObj;
            }

            if (thisObj is BooleanInstance bi)
            {
                return bi.PrimitiveValue;
            }

            ExceptionHelper.ThrowTypeError(_realm);
            return Undefined;
        }

        private JsValue ToBooleanString(JsValue thisObj, JsValue[] arguments)
        {
            var b = ValueOf(thisObj, Arguments.Empty);
            return ((JsBoolean) b)._value ? JsString.TrueString : JsString.FalseString;
        }
    }
}