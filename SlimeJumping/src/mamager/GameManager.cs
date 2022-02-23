using Godot;
using JsService;
using Microsoft.ClearScript.V8;

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

        JsService = new ClearScriptService(ClearScriptDebugFlag.Disable);
        //D:\GameProject\SlimeJumping中文路径\SlimeJumping\extend\template\tsDefined\tsDefined.vm
        ScriptManager.RegisterAndWriteTs(JsService, currDir + @"\extend\template\tsDefined\tsDefined.d.ts.vm", currDir + @"\extend\native.d.ts", (s) => 
        {
            s.ScanJsClass(typeof(GameManager).Assembly);
        });
        var engine = (V8ScriptEngine)JsService.Engine;

        //测试
        //JsModuleManager.LoadModule("TestMod1/bin");
        CommonJS.LoadDevelopModule((System.Environment.CurrentDirectory + @"\extend\project"), "TestMod1/bin");
        CommonJS.ExecuteModule("TestMod1/bin/index");
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
