using System.Reflection;
using System.Text;
using System;
using JsService;
using JsService.generate;
using System.IO;
using Puerts;

/// <summary>
/// js引擎启动调试选项
/// </summary>
public enum DebugFlag
{
    /// <summary>
    /// 禁用调试
    /// </summary>
    Disable,
    /// <summary>
    /// 启用调试
    /// </summary>
    Enable,
    /// <summary>
    /// 程序执行时等待调试器连接, 程序会处于堵塞状态
    /// </summary>
    AwaitConnection,
}

public static class PuertsScriptManager
{

    /// <summary>
    /// js脚本交互对象
    /// </summary>
    public static JsEnv JsService { get; private set; }

    /// <summary>
    /// 脚本后缀
    /// </summary>
    public static readonly string ExtensionName = ".js";

    /// <summary>
    /// 脚本加载路径
    /// </summary>
    public static string LoadPath { get; private set; }

    private static bool _init = false;
    //初始化模块加载函数
    private static Action<string> __readyRegisterModule__;
    //加载完成清理函数
    private static Action __overRegisterModule__;
    //执行模块函数
    private static Action<string> __moduleExecute__;
    //帧回调函数
    private static Action<object> __process__;
    //物理帧回调函数
    private static Action<object> __physicsProcess__;
    //注册主机类型
    private static Action<string, string> __registerHostType__;
    //注册主机类型到模块
    private static Action<string, string, string> __registerHostTypeToModule__;
    //注册主机实例
    private static Action<object, string> __registerHostInstance__;
    //注册主机实例到模块
    private static Action<object, string, string> __registerHostInstanceToModule__;
    //注册主机函数
    private static Action<string, string, string> __registerHostFunction__;
    //注册数据函数到模块
    private static Action<string, string, string, string> __registerHostFunctionToModule__;
    //代码生成类
    private static readonly GeneratesTs gt = new GeneratesTs();

    /// <summary>
    /// 运行js引擎, 并加载基本的runtime环境
    /// </summary>
    /// <param name="debugFlag">调试选项</param>
    /// <param name="port">调试器端口</param>
    public static void Init(DebugFlag debugFlag = DebugFlag.Disable, int port = 9222)
    {
        if (_init) return;
        _init = true;

        string currDir = System.Environment.CurrentDirectory;
        LoadPath = (currDir + @"\extend\mods").Replace("/", "\\");

        if (debugFlag == DebugFlag.Enable)
        {
            JsService = new JsEnv(new DefaultLoader(), port);
        }
        else if (debugFlag == DebugFlag.AwaitConnection)
        {
            JsService = new JsEnv(new DefaultLoader(), port);
            JsService.WaitDebugger();
        }
        else
        {
            JsService = new JsEnv(new DefaultLoader());
        }
        //SystenJs模块化准备阶段代码
        ExecuteFile("runtime/init/modular");
        //主机类型操作脚本
        ExecuteFile("runtime/init/host");
        //log输出
        ExecuteFile("runtime/init/log");
        //数组转换
        ExecuteFile("runtime/init/array");

        //注册模块函数
        __readyRegisterModule__ = JsService.Eval<Action<string>>("__module__.readyRegisterModule");
        __overRegisterModule__ = JsService.Eval<Action>("__module__.overRegisterModule");
        //执行模块函数
        __moduleExecute__ = JsService.Eval<Action<string>>("__module__.execute");
        //注册主机类函数
        __registerHostType__ = JsService.Eval<Action<string, string>>("__host__.registerHostType");
        __registerHostTypeToModule__ = JsService.Eval<Action<string, string, string>>("__host__.registerHostTypeToModule");
        __registerHostInstance__ = JsService.Eval<Action<object, string>>("__host__.registerHostInstance");
        __registerHostInstanceToModule__ = JsService.Eval<Action<object, string, string>>("__host__.registerHostInstanceToModule");
        __registerHostFunction__ = JsService.Eval<Action<string, string, string>>("__host__.registerHostFunction");
        __registerHostFunctionToModule__ = JsService.Eval<Action<string, string, string, string>>("__host__.registerHostFunctionToModule");

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
        AddHostType(new HostType("CsArray", typeof(System.Array), "CsArray"));
        //数组转换
        ExecuteFile("runtime/init/array");

        //扫描注册主机对象
        ScanJsClass(typeof(PuertsScriptManager).Assembly);

        //扫描并加载所有runtime下面的js文件
        LoadModule("runtime");
        //执行runtime
        ExecuteModule("runtime");

        //帧循环函数
        __process__ = JsService.Eval<Action<object>>("__module__.getModule('runtime/index').Process");
        __physicsProcess__ = JsService.Eval<Action<object>>("__module__.getModule('runtime/index').PhysicsProcess");
    }

    public static void AddHostInstance(HostInstance obj)
    {
        //添加到生成环境中
        if (obj.IsWriteTs && gt != null && !gt.wrote)
        {
            gt.AddInstance(null, (HostInstance)obj);
        }
        __registerHostInstance__((object)obj.Obj, (string)obj.Name);
    }

    public static void AddHostInstanceToModule(string path, HostInstance obj)
    {
        if (obj.Name.Contains("."))
        {
            throw new ArgumentException("不能将带有命名空间的对象注入到System模块中: " + obj.Name);
        }
        //添加到生成环境中
        if (obj.IsWriteTs && gt != null && !gt.wrote)
        {
            gt.AddInstance(path, (HostInstance)obj);
        }
        __registerHostInstanceToModule__((object)obj.Obj, path, (string)obj.Name);
    }

    public static void AddHostFunction(HostFunction fun)
    {
        string clsName = TypeDeclare.GetRealName(fun.MethodInfo.DeclaringType.FullName);
        string funcName = fun.MethodInfo.Name;
        if (!fun.MethodInfo.IsStatic || !fun.MethodInfo.IsPublic)
        {
            throw new ArgumentException("只能注入静态且共有的方法: " + fun.Name);
        }
        //添加到生成环境中
        if (fun.IsWriteTs && gt != null && !gt.wrote)
        {
            gt.AddFunction(null, clsName + "." + funcName, (HostFunction)fun);
        }
        __registerHostFunction__(clsName, funcName, fun.Name);
    }

    public static void AddHostFunctionToModule(string path, HostFunction fun)
    {
        if (fun.Name.Contains("."))
        {
            throw new ArgumentException("不能将带有命名空间的对象注入到System模块中: " + fun.Name);
        }
        string clsName = TypeDeclare.GetRealName(fun.MethodInfo.DeclaringType.FullName);
        string funcName = fun.MethodInfo.Name;
        if (!fun.MethodInfo.IsStatic || !fun.MethodInfo.IsPublic)
        {
            throw new ArgumentException("只能注入静态且共有的方法: " + fun.Name);
        }
        //添加到生成环境中
        if (fun.IsWriteTs && gt != null && !gt.wrote)
        {
            gt.AddFunction(path, clsName + "." + funcName, (HostFunction)fun);
        }
        __registerHostFunctionToModule__(clsName, funcName, path, fun.Name);
    }

    public static void AddHostType(HostType type)
    {
        //添加到生成环境中
        if (type.IsWriteTs && gt != null && !gt.wrote)
        {
            gt.AddType(null, type);
        }
        __registerHostType__(TypeDeclare.GetCsFullName(type.Type), type.Name);
    }

    public static void AddHostTypeToModule(string path, HostType type)
    {
        if (type.Name.Contains("."))
        {
            throw new ArgumentException("不能将带有命名空间的对象注入到System模块中: " + type.Name);
        }
        //添加到生成环境中
        if (type.IsWriteTs && gt != null && !gt.wrote)
        {
            gt.AddType(path, type);
        }
        __registerHostTypeToModule__(TypeDeclare.GetCsFullName(type.Type), path, type.Name);
    }

    public static void Alias(Type type, string name)
    {
        if (gt != null)
        {
            gt.Alias(type, name);
        }
    }

    public static void GeneratesTsCode()
    {
        gt.WriteByContext(LoadPath + "\\native.d.ts", File.ReadAllText("extend\\template\\tsDefined\\tsDefined.d.ts.vm"));
    }

    /// <summary>
    /// 普通帧更新
    /// </summary>
    public static void Process(float delta)
    {
        JsService.Tick();
        __process__(delta);
    }

    /// <summary>
    /// 物理帧更新
    /// </summary>
    public static void PhysicsProcess(float delta)
    {
        JsService.Tick();
        __physicsProcess__(delta);
    }

    /// <summary>
    /// 加载模块
    /// </summary>
    /// <param name="path">模块路径</param>
    public static void LoadModule(string path)
    {
        LoadAllJs(new DirectoryInfo(LoadPath + "\\" + path + "\\bin"), path);
    }

    /// <summary>
    /// 加载一个开发环境下的模块
    /// </summary>
    /// <param name="directory">项目的绝对路径</param>
    /// <param name="path">模块路径</param>
    public static void LoadDevelopModule(string directory, string path)
    {
        LoadAllJs(new DirectoryInfo(directory + "\\" + path + "\\bin"), path);
    }

    /// <summary>
    /// 执行一个模块
    /// </summary>
    /// <param name="path">模块路径</param>
    public static void ExecuteModule(string path)
    {
        __moduleExecute__(path + "/index");
    }

    /// <summary>
    /// 执行一个js文件
    /// </summary>
    /// <param name="path">路径</param>
    public static void ExecuteFile(string path)
    {
        string modulePath = LoadPath + "/" + path + ExtensionName;
        JsService.Eval(File.ReadAllText(modulePath));
    }

    private static void LoadAllJs(DirectoryInfo root, string parent)
    {
        DirectoryInfo[] dirs = root.GetDirectories();
        FileInfo[] files = root.GetFiles();

        foreach (var file in files)
        {
            if (file.Extension == ExtensionName)
            {
                FileStream fileStream = file.OpenRead();
                StreamReader sr = new StreamReader(fileStream, Encoding.Default);
                string fileName = RemoveExtension(file.Name);
                //文件路径
                string folder = parent;
                //代码内容
                string code = sr.ReadToEnd();
                sr.Close();
                fileStream.Close();
                //注册模块
                RegisterModule(file.FullName, folder, code);
            }
        }

        foreach (var dir in dirs)
        {
            string moduleName = parent is null ? dir.Name : parent + "/" + dir.Name;
            LoadAllJs(dir, moduleName);
        }
    }

    private static void RegisterModule(string fullPath, string folder, string code)
    {
        __readyRegisterModule__(folder);
        JsService.Eval(code, fullPath);
        __overRegisterModule__();
    }

    private static string RemoveExtension(string name)
    {
        int i = name.LastIndexOf('.');
        if (i >= 0)
        {
            name = name.Substring(0, i);
        }
        return name;
    }

    private static void ScanJsClass(Assembly assembly)
    {
        var types = assembly.GetTypes();
        foreach (var type in types)
        {
            //注入类
            Attribute attribute;
            if ((attribute = Attribute.GetCustomAttribute(type, typeof(JsType), false)) != null)
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
            else if ((attribute = Attribute.GetCustomAttribute(type, typeof(JsModuleType), false)) != null)
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
            //注入实例
            if ((attribute = Attribute.GetCustomAttribute(type, typeof(JsInstance), false)) != null)
            {
                var att = (JsInstance)attribute;
                object inst = Activator.CreateInstance(type);
                AddHostInstance(new HostInstance(att.FullPath, inst));
            }
            else if ((attribute = Attribute.GetCustomAttribute(type, typeof(JsModuleInstance), false)) != null)
            {
                var att = (JsModuleInstance)attribute;
                object inst = Activator.CreateInstance(type);
                AddHostInstanceToModule(att.Path, new HostInstance(att.Name, inst));
            }

            MethodInfo[] methods = type.GetMethods(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static);
            foreach (var method in methods)
            {
                Attribute mAttribute;
                //自定义注册函数
                if ((mAttribute = Attribute.GetCustomAttribute(method, typeof(JsRegister), false)) != null)
                {
                    method.Invoke(null, new object[0]);
                }
                if (!method.IsPublic) continue;
                //注入函数 (允许有多个)
                if ((mAttribute = Attribute.GetCustomAttribute(method, typeof(JsFunction), false)) != null)
                {
                    var att = (JsFunction)mAttribute;
                    AddHostFunction(new HostFunction(att.FullPath, method));
                }
                if ((mAttribute = Attribute.GetCustomAttribute(method, typeof(JsModuleFunction), false)) != null)
                {
                    var att = (JsModuleFunction)mAttribute;
                    AddHostFunctionToModule(att.Path, new HostFunction(att.Name, method));
                }
            }
        }
    }
}