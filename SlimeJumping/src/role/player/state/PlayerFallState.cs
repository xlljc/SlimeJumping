using Godot;

/// <summary>
/// 下落状态
/// </summary>
public class PlayerFallState : IState<Player>
{
    public StateEnum StateType => StateEnum.Fall;

    public Player Role { get; set; }

    public StateCtr<Player> StateController { get; set; }

    public bool CanChangeState(StateEnum next)
    {
        return true;
    }

    public void Enter(StateEnum prev, params object[] args)
    {
        GD.Print(StateType);
    }

    public void Exit(StateEnum next)
    {

    }

    public void PhysicsUpdate(float delta)
    {
        if (Role.IsOnFloor())
        {
            StateController.ChangeState(StateEnum.FallGround);
        }
        else
        {
            var v = Role.MoveCtr.Velocity;
            v.y += Game.FallSpeed * delta;
            Role.MoveCtr.Velocity = v;
        }
    }
}