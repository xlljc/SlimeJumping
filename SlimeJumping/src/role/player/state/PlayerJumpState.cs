using Godot;

/// <summary>
/// 跳跃状态
/// </summary>
public class PlayerJumpState : IState<Player>
{
    public StateEnum StateType => StateEnum.Jump;

    public Player Role { get; set; }

    public StateCtr<Player> StateController { get; set; }

    public bool CanChangeState(StateEnum next)
    {
        return true;
    }

    public void Enter(StateEnum prev, params object[] args)
    {
        var v = Role.MoveCtr.BasisVelocity;
        v.y -= Role.JumpSpeed;
        Role.MoveCtr.BasisVelocity = v;
    }

    public void Exit(StateEnum next)
    {

    }

    public void PhysicsUpdate(float delta)
    {
        
    }
}
