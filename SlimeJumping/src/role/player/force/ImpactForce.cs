
using Godot;

/// <summary>
/// 玩家冲刺产生的力
/// </summary>
public class ImpactForce : ExternalForce
{
    private Player Player { get; }

    //最大运动速度
    private Vector2 _maxVelocity;
    //运动速率曲线
    private Curve _curve;
    private float _time = 0;
    private float _maxTime;

    public ImpactForce(Player player) : base("impact")
    {
        Player = player;
        if (InputManager.PhysicsMoveAxis.IsZero())
        {
            //根据按键轴向冲刺
            Velocity = new Vector2(player.Face * Player.ImpactSpeed, 0);
        }
        else
        {
            //如果没有按键轴向,则朝着脸的方向水平冲刺
            Velocity = InputManager.PhysicsMoveAxis.Normalized() * Player.ImpactSpeed;
        }
        _maxVelocity = Velocity;
        _maxTime = player.ImpactTime;
        _curve = player.ImpactCurve;
    }

    public override void PhysicsUpdate(float delta)
    {
        //
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
