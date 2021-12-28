
/// <summary>
/// 玩家冲刺产生的力
/// </summary>
public class ImpactForce : ExternalForce
{
    private Player Player { get; }

    public ImpactForce(Player player) : base("impact")
    {
        Player = player;
    }

    public override void PhysicsUpdate(float delta)
    {
        
    }
}
