using System;
using System.Collections.Generic;
using Jint.Collections;
using Jint.Native.Array;
using Jint.Native.ArrayBuffer;
using Jint.Native.Function;
using Jint.Native.Object;
using Jint.Native.Symbol;
using Jint.Runtime;
using Jint.Runtime.Descriptors;

namespace Jint.Native.TypedArray
{
    /// <summary>
    /// https://tc39.es/ecma262/#sec-typedarray-constructors
    /// </summary>
    public abstract class TypedArrayConstructor : FunctionInstance, IConstructor
    {
        private readonly TypedArrayElementType _arrayElementType;

        internal TypedArrayConstructor(
            Engine engine,
            Realm realm,
            IntrinsicTypedArrayConstructor functionPrototype,
            IntrinsicTypedArrayPrototype objectPrototype,
            TypedArrayElementType type) : base(engine, realm, new JsString(type.GetTypedArrayName()))
        {
            _arrayElementType = type;

            _prototype = functionPrototype;
            PrototypeObject = new TypedArrayPrototype(engine, objectPrototype, this, type);
            _length = new PropertyDescriptor(JsNumber.PositiveThree, PropertyFlag.Configurable);
            _prototypeDescriptor = new PropertyDescriptor(PrototypeObject, PropertyFlag.AllForbidden);
        }

        public TypedArrayPrototype PrototypeObject { get; }

        protected override void Initialize()
        {
            var properties = new PropertyDictionary(1, false)
            {
                ["BYTES_PER_ELEMENT"] = new(new PropertyDescriptor(JsNumber.Create(_arrayElementType.GetElementSize()), PropertyFlag.AllForbidden))
            };
            SetProperties(properties);
        }

        public override JsValue Call(JsValue thisObject, JsValue[] arguments)
        {
            ExceptionHelper.ThrowTypeError(_realm, "Abstract class TypedArray not directly constructable");
            return Undefined;
        }

        public ObjectInstance Construct(JsValue[] args, JsValue newTarget)
        {
            if (newTarget.IsUndefined())
            {
                ExceptionHelper.ThrowTypeError(_realm);
            }

            Func<Intrinsics, ObjectInstance> proto = _arrayElementType switch
            {
                TypedArrayElementType.Float32 => static intrinsics => intrinsics.Float32Array.PrototypeObject,
                TypedArrayElementType.Int8 => static intrinsics => intrinsics.Int8Array.PrototypeObject,
                TypedArrayElementType.Int16 => static intrinsics => intrinsics.Int16Array.PrototypeObject,
                TypedArrayElementType.Int32 => static intrinsics => intrinsics.Int32Array.PrototypeObject,
                TypedArrayElementType.BigInt64 => static intrinsics => intrinsics.BigInt64Array.PrototypeObject,
                TypedArrayElementType.Float64 => static intrinsics => intrinsics.Float64Array.PrototypeObject,
                TypedArrayElementType.Uint8 => static intrinsics => intrinsics.Uint8Array.PrototypeObject,
                TypedArrayElementType.Uint8C => static intrinsics => intrinsics.Uint8ClampedArray.PrototypeObject,
                TypedArrayElementType.Uint16 => static intrinsics => intrinsics.Uint16Array.PrototypeObject,
                TypedArrayElementType.Uint32 => static intrinsics => intrinsics.Uint32Array.PrototypeObject,
                TypedArrayElementType.BigUint64 => static intrinsics => intrinsics.BigUint64Array.PrototypeObject,
                _ => null
            };

            var numberOfArgs = args.Length;
            if (numberOfArgs == 0)
            {
                return AllocateTypedArray(newTarget, proto, 0);
            }

            var firstArgument = args[0];
            if (firstArgument.IsObject())
            {
                var o = AllocateTypedArray(newTarget, proto);
                if (firstArgument is TypedArrayInstance typedArrayInstance)
                {
                    InitializeTypedArrayFromTypedArray(o, typedArrayInstance);
                }
                else if (firstArgument is ArrayBufferInstance arrayBuffer)
                {
                    var byteOffset = numberOfArgs > 1 ? args[1] : Undefined;
                    var length = numberOfArgs > 2 ? args[2] : Undefined;
                    InitializeTypedArrayFromArrayBuffer(o, arrayBuffer, byteOffset, length);
                }
                else
                {
                    var usingIterator = GetMethod(_realm, firstArgument, GlobalSymbolRegistry.Iterator);
                    if (usingIterator is not null)
                    {
                        var values = IterableToList(_realm, firstArgument, usingIterator);
                        InitializeTypedArrayFromList(o, values);
                    }
                    else
                    {
                        InitializeTypedArrayFromArrayLike(o, (ObjectInstance) firstArgument);
                    }
                }

                return o;
            }

            var elementLength = TypeConverter.ToIndex(_realm, firstArgument);
            return AllocateTypedArray(newTarget, proto, elementLength);
        }

        /// <summary>
        /// https://tc39.es/ecma262/#sec-iterabletolist
        /// </summary>
        internal static List<JsValue> IterableToList(Realm realm, JsValue items, ICallable usingIterator)
        {
            var iteratorRecord = items.GetIterator(realm);
            var values = new List<JsValue>();
            while (iteratorRecord.TryIteratorStep(out var nextItem))
            {
                values.Add(nextItem.Get(CommonProperties.Value));
            }

            return values;
        }

        /// <summary>
        /// https://tc39.es/ecma262/#sec-initializetypedarrayfromtypedarray
        /// </summary>
        private void InitializeTypedArrayFromTypedArray(TypedArrayInstance o, TypedArrayInstance srcArray)
        {
            var srcData = srcArray._viewedArrayBuffer;
            srcData.AssertNotDetached();

            var elementType = o._arrayElementType;
            var elementLength = srcArray._arrayLength;
            var srcType = srcArray._arrayElementType;
            var srcElementSize = srcType.GetElementSize();
            var srcByteOffset = srcArray._byteOffset;
            var elementSize = elementType.GetElementSize();
            var byteLength = elementSize * elementLength;

            var bufferConstructor = (JsValue) (!srcData.IsSharedArrayBuffer
                ? SpeciesConstructor(srcData, _realm.Intrinsics.ArrayBuffer)
                : _realm.Intrinsics.ArrayBuffer);

            ArrayBufferInstance data;
            if (elementType == srcType)
            {
                data = srcData.CloneArrayBuffer(_realm.Intrinsics.ArrayBuffer, srcByteOffset, byteLength, bufferConstructor);
            }
            else
            {
                data = _realm.Intrinsics.ArrayBuffer.AllocateArrayBuffer(bufferConstructor, byteLength);
                srcData.AssertNotDetached();
                if (srcArray._contentType != o._contentType)
                {
                    ExceptionHelper.ThrowTypeError(_realm, "Content types differ");
                }

                var srcByteIndex = srcByteOffset;
                var targetByteIndex = 0;
                var count = elementLength;
                while (count > 0)
                {
                    var value = srcData.GetValueFromBuffer(srcByteIndex, srcType, true, ArrayBufferOrder.Unordered);
                    data.SetValueInBuffer(targetByteIndex, elementType, value, true, ArrayBufferOrder.Unordered);
                    srcByteIndex += srcElementSize;
                    targetByteIndex += elementSize;
                    count--;
                }
            }

            o._viewedArrayBuffer = data;
            o._arrayLength = elementLength;
            o._byteLength = byteLength;
            o._byteOffset = 0;
        }

        /// <summary>
        /// https://tc39.es/ecma262/#sec-initializetypedarrayfromarraybuffer
        /// </summary>
        private void InitializeTypedArrayFromArrayBuffer(
            TypedArrayInstance o,
            ArrayBufferInstance buffer,
            JsValue byteOffset,
            JsValue length)
        {
            var elementSize = o._arrayElementType.GetElementSize();
            var offset = (int) TypeConverter.ToIndex(_realm, byteOffset);
            if (offset % elementSize != 0)
            {
                ExceptionHelper.ThrowRangeError(_realm, "Invalid offset");
            }

            int newByteLength;
            var newLength = 0;
            if (!length.IsUndefined())
            {
                newLength = (int) TypeConverter.ToIndex(_realm, length);
            }

            buffer.AssertNotDetached();

            var bufferByteLength = buffer.ArrayBufferByteLength;
            if (length.IsUndefined())
            {
                if (bufferByteLength % elementSize != 0)
                {
                    ExceptionHelper.ThrowRangeError(_realm, "Invalid buffer byte length");
                }

                newByteLength = bufferByteLength - offset;
                if (newByteLength < 0)
                {
                    ExceptionHelper.ThrowRangeError(_realm, "Invalid buffer byte length");
                }
            }
            else
            {
                newByteLength = newLength * elementSize;
                if (offset + newByteLength > bufferByteLength)
                {
                    ExceptionHelper.ThrowRangeError(_realm, "Invalid buffer byte length");
                }
            }

            o._viewedArrayBuffer = buffer;
            o._arrayLength = (uint) (newByteLength / elementSize);
            o._byteLength = (uint) newByteLength;
            o._byteOffset = offset;
        }

        private static void InitializeTypedArrayFromList(TypedArrayInstance o, List<JsValue> values)
        {
            var len = values.Count;
            o.AllocateTypedArrayBuffer((uint) len);
            for (var k = 0; k < len; ++k)
            {
                o[k] = values[k];
            }
        }

        /// <summary>
        /// https://tc39.es/ecma262/#sec-initializetypedarrayfromarraylike
        /// </summary>
        private static void InitializeTypedArrayFromArrayLike(TypedArrayInstance o, ObjectInstance arrayLike)
        {
            var operations = ArrayOperations.For(arrayLike);
            var len = operations.GetLongLength();
            o.AllocateTypedArrayBuffer(len);
            for (uint k = 0; k < len; ++k)
            {
                o[(int) k] = operations.Get(k);
            }
        }

        /// <summary>
        /// https://tc39.es/ecma262/#sec-allocatetypedarray
        /// </summary>
        private TypedArrayInstance AllocateTypedArray(JsValue newTarget, Func<Intrinsics, ObjectInstance> defaultProto, uint length = 0)
        {
            var proto = GetPrototypeFromConstructor(newTarget, defaultProto);
            var realm = GetFunctionRealm(newTarget);
            var obj = new TypedArrayInstance(_engine, realm.Intrinsics, _arrayElementType, length)
            {
                _prototype = proto
            };
            if (length > 0)
            {
                obj.AllocateTypedArrayBuffer(length);
            }

            return obj;
        }

        internal static void FillTypedArrayInstance(TypedArrayInstance target, System.Array values)
        {
            for (var i = 0; i < values.Length; ++i)
            {
                target.DoIntegerIndexedElementSet(i, Convert.ToDouble(values.GetValue(i)));
            }
        }
    }
}