using Godot;

/// <summary>
/// 玩家的重力外力
/// </summary>
public class GravityForce : ExternalForce
{
    public GravityForce(string name) : base(name)
    {
        
    }

    public override void PhysicsUpdate(float delta)
    {
        Velocity = new Vector2(0, Velocity.y + Game.FallSpeed * delta);
    }
}
