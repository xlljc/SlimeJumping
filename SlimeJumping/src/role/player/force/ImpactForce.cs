
using Godot;

/// <summary>
/// 玩家冲刺产生的力
/// </summary>
public class ImpactForce : ExternalForce
{
    private Player Player { get; }

    private Vector2 _maxVelocity;
    private Curve _curve;
    private float _time = 0;
    private float _maxTime = 0.2f;

    public ImpactForce(Player player) : base("impact")
    {
        Player = player;
        float x = Player.Face * Player.ImpactSpeed;
        Velocity = new Vector2(x, 0);
        _maxVelocity = Velocity;
        _curve = ResourceLoader.Load<Curve>("res://ImpactCurve.tres");
    }

    public override void PhysicsUpdate(float delta)
    {
        if (_time < _maxTime)
        {
            Velocity = _maxVelocity * _curve.Interpolate(_time / _maxTime);
            _time += delta;
        }
        else
        {
            Velocity = Velocity.SetXY(0, 0);
        }
    }
}
