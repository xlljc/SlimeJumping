using Godot;
using JsService;

[JsType("host.Test1")]
public class Test1
{
    public object a = "aaa";
    public static void Say()
    {
        GD.Print("host.Test1.Say");
    }

    public object test(object cb, params object[] args)
    {
        var cbFunc = ScriptManager.GetService("ClearScript").ToScriptObject(cb);
        return cbFunc.Invoke(args).Object;
    }
}

/// <summary>
/// 游戏管理器, 负责管理整个项目其它的Manager, 并更新它们
/// </summary>
public class GameManager : Node
{
    [JsFunction("host.Say")]
    public static int Say(int a)
    {
        GD.Print("host.SayFunc: " + a);
        return a;
    }

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

        ScriptManager.Out = new GodotLog();
        ClearScriptService service = new ClearScriptService();
        ScriptManager.Register(service);

        service.AddHostInstance(new HostInstance("console.log", new LogMethod(ScriptManager.Out.Log)));
        service.AddHostInstance(new HostInstance("console.error", new LogMethod(ScriptManager.Out.LogError)));
        service.ScanJsClass(typeof(GameManager).Assembly);

        //service.Evaluate("console.log('666')");
        //System.Text.Encoding.ASCII.GetString
        var cb = service.GetObject("host.Say");
        service.AddHostInstance(new HostInstance("console.Say", cb));
        GD.Print("自己调用: " + cb.Invoke(123));
        var test = service.GetObject("host.Test1").New().GetValue("test");
        GD.Print("委托调用: " + test.Invoke(cb, new object[] { 654 }));
        service.Invoke("console.Say", 999);
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
