using Godot;

public class Player : Slime
{
    /// <summary>
    /// 移动速度
    /// </summary>
    [Export]
    public float MoveSpeed = 300;
    /// <summary>
    /// 跳跃瞬间速度
    /// </summary>
    [Export]
    public float JumpSpeed = 550;
    /// <summary>
    /// 跳跃上升速度
    /// </summary>
    [Export]
    public float JumpUpSpeed = 1500;
    /// <summary>
    /// 冲刺初始速度
    /// </summary>
    [Export]
    public float ImpactSpeed = 800;
    /// <summary>
    /// 冲刺作用力有效时间
    /// </summary>
    [Export]
    public float ImpactTime = 0.15f;
    /// <summary>
    /// 冲刺速率曲线
    /// </summary>
    [Export]
    public Curve ImpactCurve;

    /// <summary>
    /// 角色状态机控制器
    /// </summary>
    public new StateCtr<Player> StateCtr { get; }

    /// <summary>
    /// 运动控制器, 玩家的移动, 惯性计算交给该控制器
    /// </summary>
    public PlayerMoveCtr MoveCtr { get; }

    /// <summary>
    /// 玩家脸的朝向, -1 和 1
    /// </summary>
    public int Face { get; private set; } = 1;

    /// <summary>
    /// 玩家的重力对象
    /// </summary>
    public GravityForce GravityForce { get; private set; }

    /// <summary>
    /// 玩家当前状态
    /// </summary>
    public StateEnum StateType => StateCtr.CurrState.StateType;

    public Player()
    {
        MoveCtr = new PlayerMoveCtr(this);
        StateCtr = new StateCtr<Player>(this);
    }

    public override void _Ready()
    {
        //注册状态对象
        StateCtr.Register(new PlayerIdleState());
        StateCtr.Register(new PlayerRunState());
        StateCtr.Register(new PlayerJumpState());
        StateCtr.Register(new PlayerFallState());
        StateCtr.Register(new PlayerFallGroundState());
        StateCtr.Register(new PlayerImpactState());
        StateCtr.Register(new PlayerShrinkState());
        //默认为idle状态
        StateCtr.ChangeState(StateEnum.Idle);

        GravityForce = new GravityForce(this);
        MoveCtr.AddForce(GravityForce);
    }

    public override void _PhysicsProcess(float delta)
    {
        //更新状态
        StateCtr.PhysicsUpdate(delta);
        //更新移动
        MoveCtr.PhysicsUpdate(delta);
    }

    /// <summary>
    /// 设置脸的朝向
    /// </summary>
    public void SetFace(float x)
    {
        if (x != 0)
        {
            Face = x > 0 ? 1 : -1;
        }
    }
}