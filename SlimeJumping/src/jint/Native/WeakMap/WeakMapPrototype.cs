﻿using Jint.Collections;
using Jint.Native.Object;
using Jint.Native.Symbol;
using Jint.Runtime;
using Jint.Runtime.Descriptors;
using Jint.Runtime.Interop;

namespace Jint.Native.WeakMap
{
    /// <summary>
    /// https://tc39.es/ecma262/#sec-weakmap-objects
    /// </summary>
    public sealed class WeakMapPrototype : Prototype
    {
        private readonly WeakMapConstructor _constructor;

        internal WeakMapPrototype(
            Engine engine,
            Realm realm,
            WeakMapConstructor constructor,
            ObjectPrototype prototype) : base(engine, realm)
        {
            _prototype = prototype;
            _constructor = constructor;
        }

        protected override void Initialize()
        {
            const PropertyFlag propertyFlags = PropertyFlag.Configurable | PropertyFlag.Writable;
            var properties = new PropertyDictionary(6, checkExistingKeys: false)
            {
                ["length"] = new PropertyDescriptor(0, PropertyFlag.Configurable),
                ["constructor"] = new PropertyDescriptor(_constructor, PropertyFlag.NonEnumerable),
                ["delete"] = new PropertyDescriptor(new ClrFunctionInstance(Engine, "delete", Delete, 1, PropertyFlag.Configurable), propertyFlags),
                ["get"] = new PropertyDescriptor(new ClrFunctionInstance(Engine, "get", Get, 1, PropertyFlag.Configurable), propertyFlags),
                ["has"] = new PropertyDescriptor(new ClrFunctionInstance(Engine, "has", Has, 1, PropertyFlag.Configurable), propertyFlags),
                ["set"] = new PropertyDescriptor(new ClrFunctionInstance(Engine, "set", Set, 2, PropertyFlag.Configurable), propertyFlags),
            };
            SetProperties(properties);

            var symbols = new SymbolDictionary(1)
            {
                [GlobalSymbolRegistry.ToStringTag] = new PropertyDescriptor("WeakMap", false, false, true)
            };
            SetSymbols(symbols);
        }

        private JsValue Get(JsValue thisObj, JsValue[] arguments)
        {
            var map = AssertWeakMapInstance(thisObj);
            return map.WeakMapGet(arguments.At(0));
        }

        private JsValue Delete(JsValue thisObj, JsValue[] arguments)
        {
            var map = AssertWeakMapInstance(thisObj);
            return (arguments.Length > 0 && map.WeakMapDelete(arguments.At(0))) ? JsBoolean.True : JsBoolean.False;
        }

        private JsValue Set(JsValue thisObj, JsValue[] arguments)
        {
            var map = AssertWeakMapInstance(thisObj);
            map.WeakMapSet(arguments.At(0), arguments.At(1));
            return thisObj;
        }

        private JsValue Has(JsValue thisObj, JsValue[] arguments)
        {
            var map = AssertWeakMapInstance(thisObj);
            return map.WeakMapHas(arguments.At(0)) ? JsBoolean.True : JsBoolean.False;
        }

        private WeakMapInstance AssertWeakMapInstance(JsValue thisObj)
        {
            var map = thisObj as WeakMapInstance;
            if (map is null)
            {
                ExceptionHelper.ThrowTypeError(_realm, "object must be a WeakMap");
            }

            return map;
        }
    }
}