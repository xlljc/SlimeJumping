using Godot;

/// <summary>
/// 跳跃状态
/// </summary>
public class PlayerJumpState : IState<Player>
{
    public StateEnum StateType => StateEnum.Jump;

    public Player Role { get; set; }

    public StateCtr<Player> StateController { get; set; }

    private ExternalForce _jumpForce;

    public bool CanChangeState(StateEnum next)
    {
        return true;
    }

    public void Enter(StateEnum prev, params object[] args)
    {
        _jumpForce = Role.MoveCtr.AddForce("jump");
        _jumpForce.Velocity = new Vector2(0, -Role.JumpSpeed);
    }

    public void Exit(StateEnum next)
    {

    }

    public void PhysicsUpdate(float delta)
    {
        //this.Log("velocity: " + Role.MoveCtr.Velocity + " , " + _jumpForce.Velocity);
    }
}
