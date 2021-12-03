using Godot;

/// <summary>
/// 玩家的移动控制器, 该类负责移动计算, 惯性计算等
/// </summary>
public class PlayerMoveCtr
{
    /// <summary>
    /// 绑定的玩家对象
    /// </summary>
    public Player Player;

    /// <summary>
    /// 这个速度就是玩家当前物理帧移动的真实速率
    /// 该速度就是 BasisVelocity + ForceVelocity
    /// </summary>
    public Vector2 Velocity => _velocity;
    private Vector2 _velocity = Vector2.Zero;

    /// <summary>
    /// 玩家的基础移动速率, 包括左右移动, 下坠, 上升等
    /// </summary>
    public Vector2 BasisVelocity => _basisVelocity;
    private Vector2 _basisVelocity = Vector2.Zero;

    /// <summary>
    /// 玩家受到的外力速率, 比如惯性力, 突然受到的冲击力等
    /// </summary>
    public Vector2 ForceVelocity => _forceVelocity;
    private Vector2 _forceVelocity = Vector2.Zero;

    /// <summary>
    /// 基础速率削减值, 就是基础速率每秒减少的量, 到 0 为止
    /// </summary>
    //public Vector2 BasisCurtail { get; set; } = Vector2.Zero;

    /// <summary>
    /// 外力速率削减值, 就是外力速率每秒减少的量, 到 0 为止
    /// </summary>
    public Vector2 ForceCurtail { get; set; } = new Vector2(300, 300);

    /// <summary>
    /// 玩家向上的方向
    /// </summary>
    private readonly Vector2 _upDir = Vector2.Up;

    /// <summary>
    /// 增加基础力的速率
    /// </summary>
    public void AddBasisVelocity(Vector2 basis)
    {
        _basisVelocity += basis;
        _UpdateVelocity();
    }

    /// <summary>
    /// 强制设置基础速率的大小
    /// </summary>
    public void SetBasisVelocity(Vector2 basis)
    {
        _basisVelocity = basis;
        _UpdateVelocity();
    }

    /// <summary>
    /// 添加一个瞬间冲击速率
    /// </summary>
    public void AddForceVelocity(Vector2 force)
    {
        _forceVelocity += force;
        _UpdateVelocity();
    }

    /// <summary>
    /// 强制设置外力速率的大小
    /// </summary>
    public void SetForceVelocity(Vector2 force)
    {
        _forceVelocity = force;
        _UpdateVelocity();
    }

    public PlayerMoveCtr(Player p)
    {
        Player = p;
    }

    /// <summary>
    /// 更新速率
    /// </summary>
    private void _UpdateVelocity()
    {
        _velocity = ForceVelocity + BasisVelocity;
    }

    /// <summary>
    /// 更新移动
    /// </summary>
    public void UpdateMove()
    {
        var vlen1 = Velocity.Length();
        var v = Player.MoveAndSlide(Velocity, _upDir);
        var vlen2 = v.Length();
        if (vlen1 <= vlen2)
        {
            _basisVelocity = v;
            _forceVelocity = Vector2.Zero;
        }
        else
        {
            _basisVelocity = v.Clamped(vlen1);
        }
        _UpdateVelocity();
    }

    /// <summary>
    /// 更新控制器, 每帧调用
    /// </summary>
    public void PhysicsUpdate(float delta)
    {
        UpdateMove();
    }
}
