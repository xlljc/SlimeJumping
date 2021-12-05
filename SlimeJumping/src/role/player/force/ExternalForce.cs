using Godot;

/// <summary>
/// 玩家所受到的外力的描述对象
/// </summary>
public class ExternalForce
{
    /// <summary>
    /// 当前力的名称
    /// </summary>
    public string Name { get; }

    /// <summary>
    /// 当前力的速率
    /// </summary>
    public Vector2 Velocity { get; set; } = Vector2.Zero;

    /// <summary>
    /// 物理帧更新
    /// </summary>
    public void PhysicsUpdate(float delta)
    {

    }

    public ExternalForce(string name)
    {
        Name = name;
    }
}
