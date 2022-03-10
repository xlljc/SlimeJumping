using Godot;
using JsService;

/// <summary>
/// 游戏管理器, 负责管理整个项目其它的Manager, 并更新它们
/// </summary>
public class GameManager : Node
{
    public static IScriptSerivce JsService;

    /// <summary>
    /// 是否已经初始化过
    /// </summary>
    private static bool _inited = false;
    
    /// <summary>
    /// 初始化调用
    /// </summary>
    public static void Init()
    {
        if (_inited)
        {
            return;
        }
        _inited = true;

        string currDir = System.Environment.CurrentDirectory;
        ScriptManager.Out = new GodotLog();
        ScriptManager.SearchPath = (currDir + @"\extend\mods").Replace("/", "\\");

        JsService = new JintScriptService();
        ScriptManager.RegisterAndWriteTs(JsService, currDir + @"\extend\template\tsDefined\tsDefined.d.ts.vm", currDir + @"\extend\mods\native\native.d.ts", (s) => 
        {
            //模块化 初始化
            SystemJS.InitModule();
            //注入C#类
            s.ScanJsClass(typeof(GameManager).Assembly);
        });

        //加载开发模块
        SystemJS.LoadDevelopModule((System.Environment.CurrentDirectory + @"\..\"), "mod-test/bin");
        //运行模块
        SystemJS.ExecuteModule("mod-test/bin/index");
    }

    public override void _Process(float delta)
    {
        //更新输入事件
        InputManager.Update(delta);
    }

    public override void _PhysicsProcess(float delta)
    {
        //更新物理帧输入事件
        InputManager.PhysicsUpdate(delta);
    }

    public GameManager()
    {
        Init();
    }
}
