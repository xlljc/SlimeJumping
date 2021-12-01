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
        GD.Print(StateType);
        var v = Role.MoveCtr.Velocity;
        v.y -= Role.JumpSpeed;
        Role.MoveCtr.Velocity = v;
        Role.MoveCtr.UpdateVelocity();
    }

    public void Exit(StateEnum next)
    {

    }

    public void PhysicsUpdate(float delta)
    {
        if (Role.IsOnFloor())
        {
            StateController.ChangeState(StateEnum.Idle);
        }
        else if (Role.MoveCtr.Velocity.y > 0)
        {
            StateController.ChangeState(StateEnum.Fall);
        }
        else
        {
            var v = Role.MoveCtr.Velocity;
            v.y += Game.FallSpeed * delta;
            Role.MoveCtr.Velocity = v;
        }
    }
}
