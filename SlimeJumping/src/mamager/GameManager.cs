using Godot;
using Calljs;
using Microsoft.ClearScript.V8;
using System;

/// <summary>
/// 游戏管理器, 负责管理整个项目其它的Manager, 并更新它们
/// </summary>
public class GameManager : Node
{
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

		// var a = new V8ScriptEngine();
		// a.Global.SetProperty("console", new JsLog());
		// a.Execute("console.Log('123456789')");

        ScriptManager.Out = new JsLog();
        ClearScriptService service = new ClearScriptService();
        ScriptManager.Register(service);

        service.ScanJsClass(typeof(GameManager).Assembly);
        service.AddHostInstance(new HostInstance("console.log", new LogMethod(ScriptManager.Out.Log)));
        service.AddHostInstance(new HostInstance("console.error", new LogMethod(ScriptManager.Out.LogError)));
        service.Evaluate("console.log('666')");

        GD.Print("--------1");
        var console = service.GetObject("console");
        GD.Print("--------2");
        var log = console.GetValue("log");
        GD.Print("--------2.5");
        log.Invoke("2333");
        GD.Print("--------3");
        GD.Print(console.GetValue("log").Invoke("2333").IsNull());
        GD.Print("--------4");
        GD.Print(console.GetValue("log").Invoke("2333").IsUndefined());
        GD.Print("--------5");
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
