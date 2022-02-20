using Godot;
using JsService;
using System.Collections.Generic;
using Microsoft.ClearScript.JavaScript;
using Microsoft.ClearScript;
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

        ScriptManager.Out = new GodotLog();
        ScriptManager.SearchPath = (System.Environment.CurrentDirectory + @"\extend\mods").Replace("/", "\\");

        JsService = new ClearScriptService(ClearScriptDebugFlag.Disable);
        ScriptManager.RegisterAndWriteTs(JsService, System.Environment.CurrentDirectory + @"\extend\core.d.ts", (s) => 
        {
            s.ScanJsClass(typeof(GameManager).Assembly);
        });
        var engine = (V8ScriptEngine)JsService.Engine;

        //初始化 CommonJS
        JsModuleManager.InitModule();
        //测试
        JsModuleManager.ExecuteModule("TestMod1/index");
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
