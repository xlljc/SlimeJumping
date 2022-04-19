using Godot;

/// <summary>
/// 游戏管理器, 负责管理整个项目其它的Manager, 并更新它们
/// </summary>
public class GameManager : Node
{
    /// <summary>
    /// 是否已经初始化过
    /// </summary>
    private static bool _inited = false;
    
    public static GameManager Instance { get; private set; }

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
        PuertsScriptManager.Init(DebugFlag.Enable, 9223);
        PuertsScriptManager.LoadDevelopModule("extend/project", "UnitTest");
        PuertsScriptManager.ExecuteModule("UnitTest");
    }

    public override void _EnterTree()
    {
        Instance = this;
        Init();
    }

    public override void _Process(float delta)
    {
        //更新输入事件
        InputManager.Update(delta);
        PuertsScriptManager.Process(delta);
    }

    public override void _PhysicsProcess(float delta)
    {
        //更新物理帧输入事件
        InputManager.PhysicsUpdate(delta);
        PuertsScriptManager.PhysicsProcess(delta);
    }
}
