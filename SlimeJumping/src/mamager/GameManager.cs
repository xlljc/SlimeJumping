using Godot;
using Calljs;
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

		
		

		try
        {
			GD.Print("000000000");
			GD.Print("哈哈哈哈1313++98+123#@!#$");
			//ScriptManager.Out = new JsLog();
			IScriptSerivce service = new ClearScriptService();
			GD.Print("00000001");
			ScriptManager.Register(service);
			Console.WriteLine("12345");
			GD.Print("00000002");
			service.ScanJsClass(typeof(GameManager).Assembly);
            //service.AddHostInstance(new HostInstance("console.log", new LogMethod(ScriptManager.Out.Log)));
			//service.AddHostInstance(new HostInstance("console.error", new LogMethod(ScriptManager.Out.LogError)));
			//service.Evaluate("console.log('666')");
			GD.Print("111111");
			var data = service.Evaluate("1 + 1").Object;
			GD.Print("222222");
			GD.Print(data);
			GD.Print("333333");
            //service.Execute("var a = 1; a += 2;");
        }
		catch (Exception e)
        {
			GD.Print(e.Message);
			GD.Print("有可能有中文路径...");
			GD.Print("555555");
        }
		GD.Print("6666666");
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
