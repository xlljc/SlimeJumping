using Godot;  /// <summary> /// 游戏管理器, 负责管理整个项目其它的Manager, 并更新它们 /// </summary> public class GameManager : Node {     /// <summary>     /// 是否已经初始化过     /// </summary>     private static bool _inited = false;      /// <summary>     /// 初始化调用     /// </summary>     public static void Init()     {         if (_inited)         {             return;         }         _inited = true;     }      public override void _Process(float delta)     {         //更新输入事件         InputManager.Update(delta);     }      public override void _PhysicsProcess(float delta)
    {
        //更新物理帧输入事件
        InputManager.PhysicsUpdate(delta);
    }      public GameManager()     {         Init();     } }