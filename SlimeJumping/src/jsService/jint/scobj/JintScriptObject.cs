using Esprima;
using Jint;
using Jint.Native;
using Jint.Runtime;
using Jint.Runtime.Interop;
using Jint.Native.Object;
using System;
using System.Reflection;

namespace JsService
{
    public class JintScriptObject : IScriptObject
    {
        private object _object;
        public object Object
        {
            get
            {
                if (_object is null)
                {
                    _object = jsValue.ToObject();
                }
                return _object;
            }
        }

        public ObjectInstance _jsObject;

        public object JsObject
        {
            get
            {
                if (_jsObject is null)
                {
                    _jsObject = jsValue.AsObject();
                }
                return _jsObject;
            }
        }

        internal JsValue jsValue;
        private IScriptSerivce _serivce;
        private Engine _engine;
        private object thisObj;
        private Type[] constructTypes = new Type[] { typeof(JsValue[]), typeof(JsValue) };
        private MethodInfo constructMethod;

        internal JintScriptObject(IScriptSerivce serivce, object o, JintScriptObject parent)
        {
            _serivce = serivce;
            _engine = (Engine)serivce.Engine;
            if (o is JintScriptObject jso)
            {
                jsValue = jso.jsValue;
                thisObj = jso.thisObj;
            }
            else if (o is JsValue jsValue)
            {
                this.jsValue = jsValue;
            }
            else
            {
                this.jsValue = JsValue.FromObject(_engine, o);
            }
            if (parent != null && jsValue.IsCallable())
            {
                thisObj = parent.jsValue.AsObject();
            }
        }

        public IScriptObject GetValue(string property)
        {
            try
            {
                var o = jsValue.Get(property);
                return new JintScriptObject(_serivce, o, this);
            }
            catch (JavaScriptException e)
            {
                _serivce.Out.error($"Line {e.LineNumber}, Column {e.Column}: ", e.ToString());
                throw e;
            }
            catch (ParserException e)
            {
                _serivce.Out.error(e.ToString());
                throw e;
            }
        }

        public void SetValue(string property, object v)
        {
            try
            {
                jsValue.Set(property, ToJsValue(_engine, v), jsValue);
            }
            catch (JavaScriptException e)
            {
                _serivce.Out.error($"Line {e.LineNumber}, Column {e.Column}: ", e.ToString());
                throw e;
            }
            catch (ParserException e)
            {
                _serivce.Out.error(e.ToString());
                throw e;
            }
        }

        public void Delete(string property)
        {
            try
            {
                ((ObjectInstance) JsObject).Delete(property);
            }
            catch (JavaScriptException e)
            {
                _serivce.Out.error($"Line {e.LineNumber}, Column {e.Column}: ", e.ToString());
                throw e;
            }
            catch (ParserException e)
            {
                _serivce.Out.error(e.ToString());
                throw e;
            }
        }

        public IScriptObject Invoke(params object[] args)
        {
            return InvokeBind(thisObj, args: args);
        }

        public IScriptObject InvokeBind(object thisArg, params object[] args)
        {
            try
            {
                for (int i = 0; i < args.Length; i++)
                {
                    args[i] = ToJsValue(_engine, args[i]);
                }
                var v = _engine.Invoke(jsValue, thisArg, args);
                return new JintScriptObject(_serivce, v, null);
            }
            catch (JavaScriptException e)
            {
                _serivce.Out.error($"Line {e.LineNumber}, Column {e.Column}: ", e.ToString());
                throw e;
            }
            catch (ParserException e)
            {
                _serivce.Out.error(e.ToString());
                throw e;
            }
        }

        public override string ToString()
        {
            var obj = Object;
            if (obj == null)
            {
                return "null";
            }
            return obj.ToString();
        }

        public bool IsNull()
        {
            return jsValue.IsNull();
        }

        public bool IsUndefined()
        {
            return jsValue.IsUndefined();
        }

        public IScriptObject New(params object[] args)
        {
            try
            {
                if (constructMethod is null)
                {
                    var jv = jsValue.GetType();
                    constructMethod = jv.GetMethod("Construct", constructTypes);
                    if (constructMethod is null)
                    {
                        throw new TypeAccessException("当前类型不包含构造函数!");
                    }
                }
                var items = new JsValue[args.Length];
                for (var i = 0; i < args.Length; i++)
                {
                    items[i] = JsValue.FromObject(_engine, args[i]);
                }
                object o = constructMethod.Invoke(jsValue, new object[] { items, jsValue });
                return new JintScriptObject(_serivce, o, null);
            }
            catch (JavaScriptException e)
            {
                _serivce.Out.error($"Line {e.LineNumber}, Column {e.Column}: ", e.ToString());
                throw e;
            }
            catch (ParserException e)
            {
                _serivce.Out.error(e.ToString());
                throw e;
            }
        }

        internal static JsValue ToJsValue(Engine engine, object v)
        {
            if (v is IScriptObject so)
            {
                return ((JintScriptObject)so).jsValue;
            }
            else if (v is Type t)
            {
                return TypeReference.CreateTypeReference(engine, t);
            }
            else if (v is Delegate de)
            {
                return new DelegateWrapper(engine, de);
            }
            else
            {
                return JsValue.FromObject(engine, v);
            }
        }
    }
}
