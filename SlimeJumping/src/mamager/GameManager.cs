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
			ScriptManager.Out = new JsLog();
			IScriptSerivce service = new ClearScriptService();
			ScriptManager.Register(service);

			service.ScanJsClass(typeof(GameManager).Assembly);
			//service.AddHostInstance(new HostInstance("console.log", new LogMethod(ScriptManager.Out.Log)));
			//service.AddHostInstance(new HostInstance("console.error", new LogMethod(ScriptManager.Out.LogError)));
			//service.Evaluate("console.log('666')");
			service.Execute("var a = 1; a += 2;");
		}
		catch (Exception e)
        {
			//GD.PrintErr(e.Message);
			//GD.PrintErr(e.StackTrace);
        }


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
