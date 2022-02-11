using Microsoft.ClearScript;
using Microsoft.ClearScript.V8;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace Calljs
{
    public class ClearScriptService : IScriptSerivce
    {
        public string Name => "ClearScript";

        public string ExtensionName => ".js";

        public string SearchPath { get; set; } = null;

        public ILog Out { get; set; }
        public ScriptLoadHandler ScriptLoadHandler { get; set; }

        public object Engine => engine;
        internal V8ScriptEngine engine;

        //是否初始化过
        private bool isInited = false;

        private IScriptObject systemAddObjectFunc;
        private IScriptObject systemModules;
        private ScriptObject JsObjectType;

        //调试选项
        private ClearScriptDebugFlag DebugFlag;
        private int Port;

        public ClearScriptService()
        {
            DebugFlag = ClearScriptDebugFlag.Disable;
        }

        public ClearScriptService(ClearScriptDebugFlag debugFlag, int prot = 9222)
        {
            DebugFlag = debugFlag;
            Port = prot;
        }

        public void AddHostInstance(params HostInstance[] objs)
        {
            foreach (var obj in objs)
            {
                var o = obj;
                o.Init();
                if (o.Obj is IScriptObject so)
                {
                    o = new HostInstance(o.Name, so.JsObject, typeof(object));
                }
                //添加到生成环境中
                if (o.IsWriteTs && GeneratesTsManager.WriteTs)
                {
                    GeneratesTsManager.AddInstance(null, o);
                }
                var methodInfo = ClearScriptObject.WarpFunc.MakeGenericMethod(o.Obj.GetType());
                AddByFullName(o.Name, methodInfo.Invoke(null, new object[] { o.Obj, engine }));
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
                if (o.Obj is IScriptObject so)
                {
                    o = new HostInstance(o.Name, so.JsObject, typeof(object));
                }
                //添加到生成环境中
                if (o.IsWriteTs && GeneratesTsManager.WriteTs)
                {
                    GeneratesTsManager.AddInstance(path, o);
                }
                var methodInfo = ClearScriptObject.WarpFunc.MakeGenericMethod(o.Obj.GetType());
                CallSystemAddObjectFunc(path, o.Name, methodInfo.Invoke(null, new object[] { o.Obj, engine }));
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
                if (type.IsWriteTs && GeneratesTsManager.WriteTs)
                {
                    GeneratesTsManager.AddType(null, type);
                }
                AddByFullName(type.Name, type.Type.ToHostType(engine));
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
                if (type.IsWriteTs && GeneratesTsManager.WriteTs)
                {
                    GeneratesTsManager.AddType(path, type);
                }
                CallSystemAddObjectFunc(path, type.Name, type.Type.ToHostType(engine));
            }
        }

        public void Alias(Type type, string name)
        {
            GeneratesTsManager.Alias(type, name);
        }

        public IScriptObject ToScriptObject(object o)
        {
            return new ClearScriptObject(this, o,  null);
        }

        public IScriptObject NewScriptObject()
        {
            return new ClearScriptObject(this, JsObjectType.Invoke(true), null);
        }

        public IScriptObject Evaluate(string code)
        {
            try
            {
                object o = engine.Evaluate(code);
                return ToScriptObject(o);
            }
            catch (ScriptEngineException e)
            {
                Out.LogError(e.ErrorDetails);
                throw e;
            }
        }

        public void Execute(string code)
        {
            try
            {
                engine.Execute(code);
            }
            catch (ScriptEngineException e)
            {
                Out.LogError(e.ErrorDetails);
                throw e;
            }
        }

        public IScriptObject GetModuleObject(string path, string fullName)
        {
            if (systemModules == null)
            {
                if (systemModules == null)
                {
                    systemModules = GetObject("System.modules");
                    if (systemModules.Object == null)
                    {
                        systemModules = null;
                        throw new NullReferenceException("未找到 System.models 方法!");
                    }
                }
            }
            var obj = systemModules.GetValue(path) as ClearScriptObject;
            return GetObject(obj.JsObject, fullName);
        }

        public IScriptObject GetObject(string fullPath)
        {
            try
            {
                return GetObject(engine.Script, fullPath);
            }
            catch (ScriptEngineException e)
            {
                Out.LogError(e.ErrorDetails);
                throw e;
            }
        }

        public void Init()
        {
            if (isInited) return;
            isInited = true;

            if (DebugFlag == ClearScriptDebugFlag.Disable)
            {
                engine = new V8ScriptEngine();
            }
            else if (DebugFlag == ClearScriptDebugFlag.Enable)
            {
                engine = new V8ScriptEngine(V8ScriptEngineFlags.EnableDebugging, Port);
            }
            else
            {
                engine = new V8ScriptEngine(V8ScriptEngineFlags.EnableDebugging | V8ScriptEngineFlags.AwaitDebuggerAndPauseOnStart, Port);
            }
            //允许加载脚本文件
            engine.DocumentSettings.AccessFlags = DocumentAccessFlags.EnableFileLoading;
            //脚本加载器
            engine.DocumentSettings.Loader = new ScriptFileLoader(this);
            //启用自动转型
            engine.EnableAutoHostVariables = true;
            //删除默认的console对象
            engine.Global.DeleteProperty("console");

            JsObjectType = (ScriptObject) engine.Global["Object"];
            var assembly = typeof(ScriptEngine).Assembly;
            ClearScriptObject.HostItem = assembly.GetType("Microsoft.ClearScript.HostItem");
            ClearScriptObject.HostTarget = assembly.GetType("Microsoft.ClearScript.HostTarget");
            ClearScriptObject.HostMethod = assembly.GetType("Microsoft.ClearScript.HostMethod");
            ClearScriptObject.HostType = assembly.GetType("Microsoft.ClearScript.HostType");
            ClearScriptObject.HostObject = assembly.GetType("Microsoft.ClearScript.HostObject");
            ClearScriptObject.ScriptItem = assembly.GetType("Microsoft.ClearScript.ScriptItem");
            ClearScriptObject.HostItem_Unwrap = ClearScriptObject.HostItem.GetMethod("Unwrap", BindingFlags.Instance | BindingFlags.Public);
            ClearScriptObject.HostItem_TryInvoke = ClearScriptObject.HostItem.GetMethod("TryInvoke", BindingFlags.Public | BindingFlags.Instance);
            
            ScriptObject temp = engine.Global.GetProperty("EngineInternal") as ScriptObject;
            ClearScriptObject.invokeMethod = temp.GetProperty("invokeMethod") as ScriptObject;
            ClearScriptObject.invokeConstructor = temp.GetProperty("invokeConstructor") as ScriptObject;
        }

        public IScriptObject Invoke(string fullName, params object[] args)
        {
            return GetObject(fullName).Invoke(args);
        }

        public void RegisterScript(string path)
        {
            try
            {
                engine.ExecuteDocument(path);
            }
            catch (ScriptEngineException e)
            {
                Out.LogError(e.ErrorDetails);
                throw e;
            }
        }

        public void RunDebugConsole()
        {
            Out.Log("\n---- js引擎控制台 (ClearScript) ----\n");
            while (true)
            {
                Console.Write("<< ");
                string str = Console.ReadLine();
                if (str == "")
                {
                    continue;
                }
                if (str.ToLower() == "exit")
                {
                    break;
                }
                try
                {
                    if (str.StartsWith("import "))
                    {
                        RegisterScript(str.Substring(6).Replace("\"", "").Replace(" ", ""));
                        engine.Execute("System.init();");
                        Out.Log(">> import success!");
                    }
                    else
                    {
                        string v = engine.ExecuteCommand(str);
                        Out.Log(">> " + v);
                    }
                }
                catch (ScriptEngineException e)
                {
                    Out.LogError(">> " + e.ErrorDetails);
                }
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

        private IScriptObject GetObject(dynamic script, string fullName)
        {
            string[] names = fullName.Split('.');
            IScriptObject scObj = new ClearScriptObject(this, script, null);
            foreach (var n in names)
            {
                scObj = scObj.GetValue(n);
            }
            return scObj;
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
            object nsp;
            int index = fullName.LastIndexOf(".");
            if (index >= 0) //有命名空间
            {
                name = fullName.Substring(index + 1);
                nsp = GetOrCreateNamespace(fullName.Substring(0, index));
            }
            else //没有命名空间
            {
                name = fullName;
                nsp = engine.Global;
            }

            object jsObj = ClearScriptObject.ToScriptObject(this, o);
            
            //赋值
            if (nsp is ScriptObject so)
            {
                so[name] = jsObj;
            }
            else if (nsp is IPropertyBag pb)
            {
                pb[name] = jsObj;
            }
            else
            {
                throw new Exception($"无法扩展属性'{name}', 因为路径下存在C#对象: " + nsp.GetType().FullName);
            }
        }

        // 创建并获取命名空间
        private object GetOrCreateNamespace(string name)
        {
            ScriptObject script = engine.Global;
            string[] names = name.Split('.');
            object nsp = script;
            foreach (var n in names)
            {
                object temp;
                if (nsp is ScriptObject so)
                {
                    temp = so[n];
                    if (temp == null || Undefined.Value.Equals(temp))
                    {
                        temp = JsObjectType.Invoke(true);
                        so[n] = temp;
                    }
                }
                else if (nsp is IPropertyBag pb)
                {
                    pb.TryGetValue(n, out temp);
                    if (temp == null || Undefined.Value.Equals(temp))
                    {
                        temp = JsObjectType.Invoke(true);
                        pb[n] = temp;
                    }
                }
                else
                {
                    throw new Exception($"无法扩展命名空间'{name}', 因为该路径下存在C#对象: " + nsp.GetType().FullName);
                }
                nsp = temp;
            }
            return nsp;
        }

        private Delegate CreateDelegate(MethodInfo method)
        {
            Type delegateType;
            var typeArgs = method.GetParameters()
                    .Select(p => p.ParameterType)
                    .ToList();
            
            typeArgs.Add(method.ReturnType);
            //如果包含泛型
            if (method.ContainsGenericParameters)
            {
                throw new ArgumentException("无法创建带有泛型的动态委托!");
            }
            delegateType = Expression.GetDelegateType(typeArgs.ToArray());
            var result = Delegate.CreateDelegate(delegateType, method);
            return result;
        }
    }
}
