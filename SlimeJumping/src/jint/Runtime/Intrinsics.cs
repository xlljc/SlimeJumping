using Jint.Native;
using Jint.Native.Array;
using Jint.Native.ArrayBuffer;
using Jint.Native.Boolean;
using Jint.Native.DataView;
using Jint.Native.Date;
using Jint.Native.Error;
using Jint.Native.Function;
using Jint.Native.Iterator;
using Jint.Native.Json;
using Jint.Native.Map;
using Jint.Native.Math;
using Jint.Native.Number;
using Jint.Native.Object;
using Jint.Native.Promise;
using Jint.Native.Proxy;
using Jint.Native.Reflect;
using Jint.Native.RegExp;
using Jint.Native.Set;
using Jint.Native.String;
using Jint.Native.Symbol;
using Jint.Native.TypedArray;
using Jint.Native.WeakMap;
using Jint.Native.WeakSet;

namespace Jint.Runtime
{
    public sealed class Intrinsics
    {
        private static readonly JsString _errorFunctionName = new("Error");
        private static readonly JsString _evalErrorFunctionName = new("EvalError");
        private static readonly JsString _rangeErrorFunctionName = new("RangeError");
        private static readonly JsString _referenceErrorFunctionName = new("ReferenceError");
        private static readonly JsString _syntaxErrorFunctionName = new("SyntaxError");
        private static readonly JsString _typeErrorFunctionName = new("TypeError");
        private static readonly JsString _uriErrorFunctionName = new("URIError");

        private readonly Engine _engine;
        private readonly Realm _realm;

        // lazy properties
        private ErrorConstructor _error;
        private ErrorConstructor _evalError;
        private ErrorConstructor _rangeError;
        private ErrorConstructor _referenceError;
        private ErrorConstructor _syntaxError;
        private ErrorConstructor _typeError;
        private ErrorConstructor _uriError;
        private WeakMapConstructor _weakMap;
        private WeakSetConstructor _weakSet;
        private PromiseConstructor _promise;
        private ProxyConstructor _proxy;
        private ReflectInstance _reflect;
        private EvalFunctionInstance _eval;
        private DateConstructor _date;
        private IteratorPrototype _iteratorPrototype;
        private MathInstance _math;
        private JsonInstance _json;
        private SymbolConstructor _symbol;
        private RegExpConstructor _regExp;
        private RegExpStringIteratorPrototype _regExpStringIteratorPrototype;
        private NumberConstructor _number;
        private StringConstructor _string;
        private StringIteratorPrototype _stringIteratorPrototype;
        private MapConstructor _map;
        private MapIteratorPrototype _mapIteratorPrototype;
        private SetConstructor _set;
        private SetIteratorPrototype _setIteratorPrototype;
        private ArrayConstructor _array;
        private ArrayIteratorPrototype _arrayIteratorPrototype;
        private BooleanConstructor _boolean;
        private ArrayBufferConstructor _arrayBufferConstructor;
        private DataViewConstructor _dataView;

        private IntrinsicTypedArrayConstructor _typedArray;
        private Int8ArrayConstructor _int8Array;
        private Uint8ArrayConstructor _uint8Array;
        private Uint8ClampedArrayConstructor _uint8ClampedArray;
        private Int16ArrayConstructor _int16Array;
        private Uint16ArrayConstructor _uint16Array;
        private Int32ArrayConstructor _int32Array;
        private Uint32ArrayConstructor _uint32Array;
        private BigInt64ArrayConstructor _bigInt64Array;
        private BigUint64ArrayConstructor _bigUint64Array;
        private Float32ArrayConstructor _float32Array;
        private Float64ArrayConstructor _float64Array;

        internal Intrinsics(Engine engine, Realm realm)
        {
            _engine = engine;
            _realm = realm;

            // we need to transfer state currently to some initialization, would otherwise require quite the
            // ClrFunctionInstance constructor refactoring
            _engine._originalIntrinsics = this;

            Object = new ObjectConstructor(engine, realm);
            Function = new FunctionConstructor(engine, realm, Object.PrototypeObject);

            // this is implementation dependent, and only to pass some unit tests
            Object._prototype = Function.PrototypeObject;
        }

        public ObjectConstructor Object { get; }
        public FunctionConstructor Function { get; }

        public ArrayConstructor Array =>
            _array ??= new ArrayConstructor(_engine, _realm, Function.PrototypeObject, Object.PrototypeObject);

        internal ArrayIteratorPrototype ArrayIteratorPrototype =>
            _arrayIteratorPrototype ??= new ArrayIteratorPrototype(_engine, _realm, Object.PrototypeObject);

        public DataViewConstructor DataView =>
            _dataView ??= new DataViewConstructor(_engine, _realm, Function.PrototypeObject, Object.PrototypeObject);

        public ArrayBufferConstructor ArrayBuffer =>
            _arrayBufferConstructor ??= new ArrayBufferConstructor(_engine, _realm, Function.PrototypeObject, Object.PrototypeObject);

        internal IntrinsicTypedArrayConstructor TypedArray =>
            _typedArray ??= new IntrinsicTypedArrayConstructor(_engine, _realm, Function.PrototypeObject, Object.PrototypeObject, "TypedArray");

        public Int8ArrayConstructor Int8Array =>
            _int8Array ??= new Int8ArrayConstructor(_engine, _realm, TypedArray, TypedArray.PrototypeObject);

        public Uint8ArrayConstructor Uint8Array =>
            _uint8Array ??= new Uint8ArrayConstructor(_engine, _realm, TypedArray, TypedArray.PrototypeObject);

        public Uint8ClampedArrayConstructor Uint8ClampedArray =>
            _uint8ClampedArray ??= new Uint8ClampedArrayConstructor(_engine, _realm, TypedArray, TypedArray.PrototypeObject);

        public Int16ArrayConstructor Int16Array =>
            _int16Array ??= new Int16ArrayConstructor(_engine, _realm, TypedArray, TypedArray.PrototypeObject);

        public Uint16ArrayConstructor Uint16Array =>
            _uint16Array ??= new Uint16ArrayConstructor(_engine, _realm, TypedArray, TypedArray.PrototypeObject);

        public Int32ArrayConstructor Int32Array =>
            _int32Array ??= new Int32ArrayConstructor(_engine, _realm, TypedArray, TypedArray.PrototypeObject);

        public Uint32ArrayConstructor Uint32Array =>
            _uint32Array ??= new Uint32ArrayConstructor(_engine, _realm, TypedArray, TypedArray.PrototypeObject);

        public BigInt64ArrayConstructor BigInt64Array =>
            _bigInt64Array ??= new BigInt64ArrayConstructor(_engine, _realm, TypedArray, TypedArray.PrototypeObject);

        public BigUint64ArrayConstructor BigUint64Array =>
            _bigUint64Array ??= new BigUint64ArrayConstructor(_engine, _realm, TypedArray, TypedArray.PrototypeObject);

        public Float32ArrayConstructor Float32Array =>
            _float32Array ??= new Float32ArrayConstructor(_engine, _realm, TypedArray, TypedArray.PrototypeObject);

        public Float64ArrayConstructor Float64Array =>
            _float64Array ??= new Float64ArrayConstructor(_engine, _realm, TypedArray, TypedArray.PrototypeObject);

        public MapConstructor Map =>
            _map ??= new MapConstructor(_engine, _realm, Function.PrototypeObject, Object.PrototypeObject);

        internal MapIteratorPrototype MapIteratorPrototype =>
            _mapIteratorPrototype ??= new MapIteratorPrototype(_engine, _realm, Object.PrototypeObject);

        public SetConstructor Set =>
            _set ??= new SetConstructor(_engine, _realm, Function.PrototypeObject, Object.PrototypeObject);

        internal SetIteratorPrototype SetIteratorPrototype =>
            _setIteratorPrototype ??= new SetIteratorPrototype(_engine, _realm, Object.PrototypeObject);

        public WeakMapConstructor WeakMap =>
            _weakMap ??= new WeakMapConstructor(_engine, _realm, Function.PrototypeObject, Object.PrototypeObject);

        public WeakSetConstructor WeakSet =>
            _weakSet ??= new WeakSetConstructor(_engine, _realm, Function.PrototypeObject, Object.PrototypeObject);

        public PromiseConstructor Promise =>
            _promise ??= new PromiseConstructor(_engine, _realm, Function.PrototypeObject, Object.PrototypeObject);

        internal IteratorPrototype IteratorPrototype =>
            _iteratorPrototype ??= new IteratorPrototype(_engine, _realm, null, Object.PrototypeObject);

        public StringConstructor String =>
            _string ??= new StringConstructor(_engine, _realm, Function.PrototypeObject, Object.PrototypeObject);

        internal StringIteratorPrototype StringIteratorPrototype =>
            _stringIteratorPrototype ??= new StringIteratorPrototype(_engine, _realm, Object.PrototypeObject);

        public RegExpConstructor RegExp =>
            _regExp ??= new RegExpConstructor(_engine, _realm, Function.PrototypeObject, Object.PrototypeObject);

        internal RegExpStringIteratorPrototype RegExpStringIteratorPrototype =>
            _regExpStringIteratorPrototype ??= new RegExpStringIteratorPrototype(_engine, _realm, Object.PrototypeObject);

        public BooleanConstructor Boolean =>
            _boolean ??= new BooleanConstructor(_engine, _realm, Function.PrototypeObject, Object.PrototypeObject);

        public NumberConstructor Number =>
            _number ??= new NumberConstructor(_engine, _realm, Function.PrototypeObject, Object.PrototypeObject);

        public DateConstructor Date =>
            _date ??= new DateConstructor(_engine, _realm, Function.PrototypeObject, Object.PrototypeObject);

        public MathInstance Math =>
            _math ??= new MathInstance(_engine, Object.PrototypeObject);

        public JsonInstance Json =>
            _json ??= new JsonInstance(_engine, _realm, Object.PrototypeObject);

        public ProxyConstructor Proxy =>
            _proxy ??= new ProxyConstructor(_engine, _realm);

        public ReflectInstance Reflect =>
            _reflect ??= new ReflectInstance(_engine, _realm, Object.PrototypeObject);

        public SymbolConstructor Symbol =>
            _symbol ??= new SymbolConstructor(_engine, _realm, Function.PrototypeObject, Object.PrototypeObject);

        public EvalFunctionInstance Eval =>
            _eval ??= new EvalFunctionInstance(_engine, _realm, Function.PrototypeObject);

        public ErrorConstructor Error =>
            _error ??= new ErrorConstructor(_engine, _realm, Function.PrototypeObject, Object.PrototypeObject, _errorFunctionName);

        public ErrorConstructor EvalError =>
            _evalError ??= new ErrorConstructor(_engine, _realm, Error, Error.PrototypeObject, _evalErrorFunctionName);

        public ErrorConstructor SyntaxError =>
            _syntaxError ??= new ErrorConstructor(_engine, _realm, Error, Error.PrototypeObject, _syntaxErrorFunctionName);

        public ErrorConstructor TypeError =>
            _typeError ??= new ErrorConstructor(_engine, _realm, Error, Error.PrototypeObject, _typeErrorFunctionName);

        public ErrorConstructor RangeError =>
            _rangeError ??=
                new ErrorConstructor(_engine, _realm, Error, Error.PrototypeObject, _rangeErrorFunctionName);

        public ErrorConstructor ReferenceError
            => _referenceError ??= new ErrorConstructor(_engine, _realm, Error, Error.PrototypeObject, _referenceErrorFunctionName);

        public ErrorConstructor UriError =>
            _uriError ??= new ErrorConstructor(_engine, _realm, Error, Error.PrototypeObject, _uriErrorFunctionName);
    }
}