using Esprima;
using Jint;
using Jint.Native;
using Jint.Native.Object;
using Jint.Runtime;
using JsService.generate;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace JsService
{
    public class JintScriptService : IScriptSerivce
    {
        public string Name => "Jint";

        public string ExtensionName => ".js";
        //是否初始化过
        private bool isInited = false;

        public object Engine => engine;
        private Engine engine;

        public ILog Out { get; set; }

        private IScriptObject systemAddObjectFunc;
        private IScriptObject systemModels;

        public string SearchPath { get; set; }
        public FileLoadHandler FileLoadHandler { get; set; }
        public FileWriteHandler FileWriteHandler { get; set; }

        private GeneratesTs gt;

        public void Init(GeneratesTs gt = null)
        {
            if (isInited) return;
            isInited = true;

            this.gt = gt;
            engine = new Engine();

            //console 对象
            AddHostInstance(new HostInstance("console", Out));

            //基础类型
            AddHostType(new HostType("any", typeof(object), "any"));
            AddHostType(new HostType("byte", typeof(byte), "number"));
            AddHostType(new HostType("short", typeof(short), "number"));
            AddHostType(new HostType("int", typeof(int), "number"));
            AddHostType(new HostType("long", typeof(long), "number"));
            AddHostType(new HostType("string", typeof(string), "string"));
            AddHostType(new HostType("float", typeof(float), "number"));
            AddHostType(new HostType("double", typeof(double), "number"));
            AddHostType(new HostType("boolean", typeof(bool), "boolean"));
            AddHostType(new HostType("void", typeof(void), "void"));
        }

        public void AddHostInstance(params HostInstance[] objs)
        {
            foreach (var obj in objs)
            {
                var o = obj;
                o.Init();
                if (o.Obj is IScriptObject)
                {
                    o = new HostInstance(o.Name, ((JintScriptObject)o.Obj).jsValue.AsObject(), typeof(object));
                }
                //添加到生成环境中
                if (o.IsWriteTs && gt != null && !gt.wrote)
                {
                    gt.AddInstance(null, o);
                }
                AddByFullName(o.Name, o.Obj);
            }
        }

        public void AddHostInstanceToModule(string path, params HostInstance[] objs)
        {
            //先不生成ts代码, 后面补上
            foreach (var obj in objs)
            {
                var o = obj;
                o.Init();
                if (o.Name.Contains("."))
                {
                    throw new ArgumentException("不能将带有命名空间的对象注入到System模块中: " + o.Name);
                }
                if (o.Obj is IScriptObject)
                {
                    o = new HostInstance(o.Name, ((JintScriptObject)o.Obj).jsValue.AsObject(), typeof(object));
                }
                //添加到生成环境中
                if (o.IsWriteTs && gt != null && !gt.wrote)
                {
                    gt.AddInstance(path, o);
                }
                CallSystemAddObjectFunc(path, o.Name, o.Obj);
            }
        }

        public void AddHostType(params HostType[] types)
        {
            foreach (var type in types)
            {
                if (type.Type.GetGenericArguments().Length > 0 && type.Type.GenericTypeArguments.Length <= 0)
                {
                    throw new ArgumentException($"未给类型'{type.Name}'赋予对应的泛型参数");
                }
                type.Init();
                //添加到生成环境中
                if (type.IsWriteTs && gt != null && !gt.wrote)
                {
                    gt.AddType(null, type);
                }
                AddByFullName(type.Name, type.Type);
            }
        }

        public void AddHostTypeToModule(string path, params HostType[] types)
        {
            //先不生成ts代码, 后面补上
            foreach (var type in types)
            {
                if (type.Type.GetGenericArguments().Length > 0 && type.Type.GenericTypeArguments.Length <= 0)
                {
                    throw new ArgumentException($"未给类型'{type.Name}'赋予泛型参数");
                }
                type.Init();
                if (type.Name.Contains("."))
                {
                    throw new ArgumentException("不能将带有命名空间的对象注入到System模块中: " + type.Name);
                }
                //添加到生成环境中
                if (type.IsWriteTs && gt != null && !gt.wrote)
                {
                    gt.AddType(path, type);
                }
                CallSystemAddObjectFunc(path, type.Name, type.Type);
            }
        }

        public void Alias(Type type, string name)
        {
            if (gt != null)
            {
                gt.Alias(type, name);
            }
        }

        public IScriptObject Evaluate(string code)
        {
            try
            {
                return new JintScriptObject(this, engine.Evaluate(code), null);
            }
            catch (JavaScriptException e)
            {
                Out.error($"Line {e.LineNumber}, Column {e.Column}: ", e.ToString());
                throw e;
            }
            catch (ParserException e)
            {
                Out.error(e.ToString());
                throw e;
            }
        }

        public void Execute(string code)
        {
            try
            {
                engine.Execute(code);
            }
            catch (JavaScriptException e)
            {
                Out.error($"Line {e.LineNumber}, Column {e.Column}: ", e.ToString());
                throw e;
            }
            catch (ParserException e)
            {
                Out.error(e.ToString());
                throw e;
            }
        }

        public IScriptObject GetObject(string fullPath)
        {
            return GetObject(engine.Realm.GlobalObject, fullPath);
        }

        public IScriptObject GetModuleObject(string path, string fullName)
        {
            if (systemModels == null)
            {
                if (systemModels == null)
                {
                    systemModels = GetObject("System.models");
                    if (systemModels.Object == null)
                    {
                        systemModels = null;
                        throw new NullReferenceException("未找到 System.models 方法!");
                    }
                }
            }
            var obj = systemModels.GetValue(path) as JintScriptObject;
            return GetObject(obj.jsValue, fullName);
        }

        public IScriptObject Invoke(string fullName, params object[] args)
        {
            var o = GetObject(fullName);
            return new JintScriptObject(this, o.Invoke(args), (JintScriptObject)o);
        }

        public void RegisterScript(string path)
        {
            string file = path + ExtensionName;
            try
            {
                string code = FileLoadHandler(this, path);
                engine.Execute(code, new ParserOptions(file));
            }
            catch (JavaScriptException e)
            {
                Out.error($"File '{file}' Line {e.LineNumber}, Column {e.Column}: ", e.ToString());
                throw e;
            }
            catch (ParserException e)
            {
                Out.error($"File '{file}' " + e.ToString());
                throw e;
            }
        }

        public void ScanJsClass(Assembly assembly)
        {
            var types = assembly.GetTypes();
            var jsType = typeof(JsType);
            var jsModuleType = typeof(JsModuleType);
            var jsFunction = typeof(JsFunction);
            var jsModuleFunction = typeof(JsModuleFunction);
            foreach (var type in types)
            {
                //注入类
                Attribute attribute;
                if ((attribute = Attribute.GetCustomAttribute(type, jsType, false)) != null)
                {
                    var att = (JsType)attribute;
                    if (att.Generics.Length > 0)
                    {
                        Type newType = type.MakeGenericType(att.Generics);
                        AddHostType(new HostType(att.FullPath, newType));
                    }
                    else
                    {
                        AddHostType(new HostType(att.FullPath, type));
                    }
                }
                else if ((attribute = Attribute.GetCustomAttribute(type, jsModuleType, false)) != null)
                {
                    var att = (JsModuleType)attribute;
                    if (att.Generics.Length > 0)
                    {
                        Type newType = type.MakeGenericType(att.Generics);
                        AddHostTypeToModule(att.Path, new HostType(att.Name, newType));
                    }
                    else
                    {
                        AddHostTypeToModule(att.Path, new HostType(att.Name, type));
                    }
                }
                //注入方法
                MethodInfo[] methods = type.GetMethods(BindingFlags.Public | BindingFlags.Static);
                foreach (var method in methods)
                {
                    Attribute mAttribute;
                    if ((mAttribute = Attribute.GetCustomAttribute(method, jsFunction, false)) != null)
                    {
                        var att = (JsFunction)mAttribute;
                        Delegate func = CreateDelegate(method);
                        var hostInst = new HostInstance(att.FullPath, func);
                        hostInst.IsDynamicFunc = true;
                        AddHostInstance(hostInst);
                    }
                    else if ((mAttribute = Attribute.GetCustomAttribute(method, jsModuleFunction, false)) != null)
                    {
                        var att = (JsModuleFunction)mAttribute;
                        Delegate func = CreateDelegate(method);
                        var hostInst = new HostInstance(att.Name, func);
                        hostInst.IsDynamicFunc = true;
                        AddHostInstanceToModule(att.Path, hostInst);
                    }
                }
            }
        }

        public IScriptObject NewScriptObject()
        {
            return new JintScriptObject(this, new ObjectInstance(engine), null);
        }

        public IScriptObject ToScriptObject(object o)
        {
            return new JintScriptObject(this, o, null);
        }

        private void CallSystemAddObjectFunc(string path, string name, object obj)
        {
            if (systemAddObjectFunc == null)
            {
                systemAddObjectFunc = GetObject("System.addObject");
                if (systemAddObjectFunc.Object == null)
                {
                    systemAddObjectFunc = null;
                    throw new NullReferenceException("未找到 System.addObject 方法!");
                }
            }
            systemAddObjectFunc.Invoke(path, name, obj);
        }

        // 向脚本中添加对象, 包含命名空间
        private void AddByFullName(string fullName, object o)
        {
            string name;
            JsValue jsValue;
            int index = fullName.LastIndexOf(".");
            if (index >= 0) //有命名空间
            {
                name = fullName.Substring(index + 1);
                jsValue = GetOrCreateNamespace(fullName.Substring(0, index));
            }
            else //没有命名空间
            {
                name = fullName;
                jsValue = engine.Realm.GlobalObject;
            }

            jsValue.Set(name, JintScriptObject.ToJsValue(engine, o), jsValue);
        }

        // 创建并获取命名空间
        private JsValue GetOrCreateNamespace(string name)
        {
            var script = engine.Realm.GlobalObject;
            string[] names = name.Split('.');
            JsValue jsValue = script;
            foreach (var n in names)
            {
                JsValue temp;
                temp = jsValue.Get(n);

                if (temp.ToObject() == null)
                {
                    temp = new ObjectInstance(engine);
                    jsValue.Set(n, temp, jsValue);
                }
                jsValue = temp;
            }
            return jsValue;
        }

        private IScriptObject GetObject(JsValue script, string fullName)
        {
            string[] names = fullName.Split('.');
            JsValue jsValue = script;
            JsValue prevJsValue = null;
            foreach (var n in names)
            {
                JsValue temp;
                temp = jsValue.Get(n);

                if (temp.ToObject() == null)
                {
                    return new JintScriptObject(this, null, null);
                }
                prevJsValue = jsValue;
                jsValue = temp;
            }
            if (prevJsValue == script)
            {
                return new JintScriptObject(this, jsValue, null);
            }
            return new JintScriptObject(this, jsValue, new JintScriptObject(this, prevJsValue, null));
        }

        private Delegate CreateDelegate(MethodInfo method)
        {
            Type delegateType;
            var typeArgs = method.GetParameters()
                    .Select(p => p.ParameterType)
                    .ToList();

            typeArgs.Add(method.ReturnType);
            delegateType = Expression.GetDelegateType(typeArgs.ToArray());

            var result = Delegate.CreateDelegate(delegateType, method);
            return result;
        }
    }
}
