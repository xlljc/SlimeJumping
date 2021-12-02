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
    /// 这个速度就是玩家当前物理帧移动的真实速度
    /// </summary>
    public Vector2 Velocity { get; set; } = Vector2.Zero;

    /// <summary>
    /// 玩家向上的方向
    /// </summary>
    private Vector2 _upDir = Vector2.Up;

    /// <summary>
    /// 添加一个冲击力
    /// </summary>
    public Vector2 AddForce(Vector2 force)
    {
        return Velocity;
    }


    public PlayerMoveCtr(Player p)
    {
        Player = p;
    }

    /// <summary>
    /// 更新速度
    /// </summary>
    public void UpdateVelocity()
    {
        Velocity = Player.MoveAndSlide(Velocity, _upDir);
    }

    /// <summary>
    /// 更新控制器, 每帧调用
    /// </summary>
    public void PhysicsUpdate(float delta)
    {
        UpdateVelocity();
    }
}
