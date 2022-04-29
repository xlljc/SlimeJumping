using Godot;

/// <summary>
/// 游戏管理器, 负责管理整个项目其它的Manager, 并更新它们
/// </summary>
[JsService.JsType("CShap.GameManager")]
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
        //long time = System.DateTime.Now.Ticks;
        //BuildTs("D:/GameProject/SlimeJumping中文路径/SlimeJumping/extend/mods/runtime");
        //GD.Print("用时: " + (System.DateTime.Now.Ticks - time) / 10000 + "毫秒");

        if (_inited)
        {
            return;
        }
        _inited = true;
        PuertsScriptManager.Init(DebugFlag.Enable, 9223);

        //加载工程
        PuertsScriptManager.LoadDevelopModule("extend/project", "UnitTest");
        PuertsScriptManager.ExecuteModule("UnitTest");
    }

    private static void BuildTs(string path)
    {
        GD.Print("开始编译TypeScript工程: " + path);
        Godot.Collections.Array arr = new Godot.Collections.Array();
        OS.Execute("./tool/tsc/node.exe",
            new string[] { "./tool/tsc/tsc.data", "-b", path + "/tsconfig.json" },
            true, arr);

        bool success = false;
        if (arr.Count == 0 || (arr.Count == 1 && string.IsNullOrEmpty(arr[0].ToString())))
        {
            success = true;
            GD.Print("编译成功!");
        }
        else
        {
            success = false;
            GD.PrintErr("编译有报错!");
            foreach (var item in arr)
            {
                GD.PrintErr("error: " + item);
            }
        }
        //new System.Threading.Thread(() =>
        //{
        //    Godot.Collections.Array arr = new Godot.Collections.Array();
        //    OS.Execute("./tool/tsc/node.exe",
        //        new string[] { "./tool/tsc/tsc.js", "-b", path },
        //        true, arr);
        //    foreach (var item in arr)
        //    {
        //        GD.Print("tsc: " + item);
        //    }
        //    GD.Print("命令执行完成...");
        //}).Start();
    }

    public override void _EnterTree()
    {
        Instance = this;
        Init();
    }

    public override void _Input(InputEvent @event)
    {
        if (@event is InputEventKey iek)
        {
            GD.Print(iek.Pressed + ", " + iek.Echo + ", " + iek.Scancode);
        }
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
