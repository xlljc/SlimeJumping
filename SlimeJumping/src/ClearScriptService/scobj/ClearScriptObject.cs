using Microsoft.ClearScript;
using Microsoft.ClearScript.V8;
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
        //ScriptItem类型
        internal static Type ScriptItem;
        //Unwrap方法
        internal static MethodInfo HostItem_Unwrap;
        //TryInvoke方法
        internal static MethodInfo HostItem_TryInvoke;

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
        private dynamic obj;
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
            return new ClearScriptObject(service, obj[property], this);
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
                        throw new NullReferenceException();
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
                        object[] argsData = new object[] { null, args, null };
                        HostItem_TryInvoke.Invoke(obj, argsData);
                        data = argsData[2];
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
                        throw new NullReferenceException();
                    case ValueType.JsObject:
                    case ValueType.HostItem:
                        data = invokeConstructor.Invoke(false, JsObject, args);
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
                if (v is IScriptObject so)
                {
                    obj[property] = so.JsObject;
                }
                else
                {
                    obj[property] = v;
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

        private dynamic WrapAndInit(object o, ScriptEngine engine)
        {
            if (o == null)
            {
                //
                valueType = ValueType.Null;
                return o;
            }

            Type type = o.GetType();
            //判断是否是js对象
            if (ScriptItem.IsAssignableFrom(type))
            {
                //
                valueType = ValueType.JsObject;
                return o;
            }
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

        internal static object ToScriptObject(ClearScriptService service, object v)
        {
            if (v is IScriptObject so)
            {
                return (ClearScriptObject)so.Object;
            }
            else if (v is Type t)
            {
                return t.ToHostType((V8ScriptEngine)service.Engine);
            }
            else
            {
                return v;
            }
        }
    }
}
