using Godot;

/// <summary>
/// 玩家的重力外力
/// </summary>
public class GravityForce : ExternalForce
{
    private Player Player { get; }

    public GravityForce(Player player) : base("gravity")
    {
        Player = player;
    }

    public override void PhysicsUpdate(float delta)
    {
        Velocity = new Vector2(0, Velocity.y + GameConfig.FallSpeed * delta);
    }
}
