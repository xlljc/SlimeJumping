using Microsoft.ClearScript;
using System;
using System.Linq;
using System.Reflection;

namespace Calljs
{

    public class ClearScriptObject : IScriptObject
    {
        //调用js函数: (thisArg, method, args[]) => any;
        internal static ScriptObject invokeMethod;
        //调用js构造: (method, args[]) => any;
        internal static ScriptObject invokeConstructor;
        //
        internal static readonly Type typeVoid = typeof(void);
        //HostTarget类型
        internal static Type HostTarget;
        //HostItem类型
        internal static Type HostItem;
        //HostMethod类型
        internal static Type HostMethod;
        //HostType类型
        internal static Type HostType;
        //HostObject类型
        internal static Type HostObject;
        //Unwrap方法
        internal static MethodInfo HostItem_Unwrap;

        internal static MethodInfo V8ProxyHelpers_GetHostObjectProperty;

        internal static MethodInfo V8ProxyHelpers_SetHostObjectProperty;

        internal static MethodInfo V8ProxyHelpers_InvokeHostObject;

        private static MethodInfo _warpFunc;
        //object engine
        internal static MethodInfo WarpFunc 
        { 
            get
            {
                if (_warpFunc == null)
                {
                    _warpFunc = typeof(Extensions).GetMethods(BindingFlags.Static | BindingFlags.Public)
                        .Where((item) => item.Name == "ToRestrictedHostObject" && item.GetParameters().Length == 2)
                        .First();
                }
                return _warpFunc;
            }
        }

        private object _object;
        public object Object
        {
            get
            {
                if (_object == null)
                {
                    _object = ToObject();
                }
                return _object; 
            }
        }

        public object JsObject => obj;

        private ClearScriptService service;
        //包装对象
        private object obj;
        //this对象
        private object thisObj;
        //值类型
        private ValueType valueType;
        
        private Type _type;
        private Type Type
        {
            get
            {
                if (_type == null)
                {
                    _type = obj.GetType();
                }
                return _type;
            }
        }

        internal ClearScriptObject(ClearScriptService service, object o, ClearScriptObject parent)
        {
            this.service = service;
            if (o is IScriptObject iso)
            {
                ClearScriptObject cso = (ClearScriptObject)iso;
                obj = cso.obj;
                thisObj = cso.thisObj;
                valueType = cso.valueType;
            }
            else
            {
                obj = WrapAndInit(o, service.engine);
            }

            if (parent != null)
            {
                thisObj = parent.JsObject;
            }
        }

        public IScriptObject GetValue(string property)
        {
            object o = null;
            switch (valueType)
            {
                case ValueType.Null:
                    throw new NullReferenceException("Object reference not set to an instance of an object.");
                case ValueType.JsObject:
                    o = ((ScriptObject)obj).GetProperty(property);
                    break;
                case ValueType.HostItem:
                    o = V8ProxyHelpers_GetHostObjectProperty.Invoke(null, new object[] { obj, property });
                    break;
            }
            return new ClearScriptObject(service, o, this);
        }

        public IScriptObject Invoke(params object[] args)
        {
            return InvokeBind(thisObj, args);
        }

        public IScriptObject InvokeBind(object thisArg, params object[] args)
        {
            try
            {
                object data = null;
                switch (valueType)
                {
                    case ValueType.Null:
                        throw new NullReferenceException("Object reference not set to an instance of an object.");
                    case ValueType.JsObject:
                        if (thisArg is null)
                        {
                            ((ScriptObject)obj).Invoke(false, args: args);
                        }
                        else
                        {
                            data = invokeMethod.Invoke(false, thisArg, obj, args);
                        }
                        break;
                    case ValueType.HostItem:
                        data = V8ProxyHelpers_InvokeHostObject.Invoke(null, new object[] { obj, false, args });
                        break;
                }
                return new ClearScriptObject(service, data, null);
            }
            catch (ScriptEngineException e)
            {
                service.Out.LogError(e.ErrorDetails);
                throw e;
            }
        }

        public bool IsNull()
        {
            return obj == null;
        }

        public bool IsUndefined()
        {
            return Undefined.Value.Equals(Object);
        }

        public IScriptObject New(params object[] args)
        {
            try
            {
                object data = null;
                switch (valueType)
                {
                    case ValueType.Null:
                        throw new NullReferenceException("Object reference not set to an instance of an object.");
                    case ValueType.JsObject:
                        data = ((ScriptObject)obj).Invoke(true, args);
                        break;
                    case ValueType.HostItem:
                        data = V8ProxyHelpers_InvokeHostObject.Invoke(null, new object[] { obj, true, args });
                        break;
                }
                return new ClearScriptObject(service, data, null);
            }
            catch (ScriptEngineException e)
            {
                service.Out.LogError(e.ErrorDetails);
                throw e;
            }
        }

        public void SetValue(string property, object v)
        {
            try
            {
                object o;
                if (v is IScriptObject so)
                {
                    o = so.JsObject;
                }
                else
                {
                    o = v;
                }
                switch (valueType)
                {
                    case ValueType.Null:
                        throw new NullReferenceException("Object reference not set to an instance of an object.");
                    case ValueType.JsObject:
                        ((ScriptObject)obj).SetProperty(property, o);
                        break;
                    case ValueType.HostItem:
                        V8ProxyHelpers_SetHostObjectProperty.Invoke(null, new object[] { obj, property, o });
                        break;
                }
            }
            catch (ScriptEngineException e)
            {
                service.Out.LogError(e.ErrorDetails);
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

        private object WrapAndInit(object o, ScriptEngine engine)
        {
            if (o == null)
            {
                //
                valueType = ValueType.Null;
                return o;
            }
            //判断是否是js对象
            if (o is ScriptObject)
            {
                //
                valueType = ValueType.JsObject;
                return o;
            }
            Type type = o.GetType();
            //
            valueType = ValueType.HostItem;

            //判断是否是HostItem
            if (HostItem.IsAssignableFrom(type))
            {
                return o;
            }
            var methodInfo = WarpFunc.MakeGenericMethod(type);
            return methodInfo.Invoke(null, new object[] { o, engine });
        }

        private object ToObject()
        {
            if (HostItem.IsAssignableFrom(Type))
            {
                return HostItem_Unwrap.Invoke(obj, null);
            }
            return obj;
        }
    }
}
