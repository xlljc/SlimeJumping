using System.Text;
using System;
using System.Net;
using System.IO;
using Puerts;

public enum DebugFlag
{
    Disable,
    Enable,
    AwaitConnection,
}

public static class PuertsScriptManager
{

    public static JsEnv JsService { get; private set; }

    public static readonly string ExtensionName = ".js";

    public static string LoadPath { get; private set; }

    private static bool _init = false;
    private static Action<string> __readyRegisterModule__;
    private static Action __overRegisterModule__;
    private static Action<string> __moduleExecute__;
    private static Action<object> __process__;
    private static Action<object> __physicsProcess__;

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

        //log输出
        string logPath = LoadPath + "/runtime/init/log.js";
        JsService.Eval(File.ReadAllText(logPath));
        //SystenJs模块化准备阶段代码
        string modulePath = LoadPath + "/runtime/init/module.js";
        JsService.Eval(File.ReadAllText(modulePath));

        //注册模块函数
        __readyRegisterModule__ = JsService.Eval<Action<string>>("__readyRegisterModule__");
        __overRegisterModule__ = JsService.Eval<Action>("__overRegisterModule__");
        //执行模块函数
        __moduleExecute__ = JsService.Eval<Action<string>>("__module__.execute");

        //扫描并加载所有runtime下面的js文件
        LoadModule("runtime");
        //执行runtime
        ExecuteModule("runtime");
        __process__ = JsService.Eval<Action<object>>("__module__.getModule('runtime/index').Process");
        __physicsProcess__ = JsService.Eval<Action<object>>("__module__.getModule('runtime/index').PhysicsProcess");
    }

    public static void Process(float delta)
    {
        JsService.Tick();
        __process__(delta);
    }

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
        __moduleExecute__(path);
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
}