using Godot;

/// <summary>
/// 下落落地状态
/// </summary>
public class PlayerFallGroundState : IState<Player>
{
    public StateEnum StateType => StateEnum.FallGround;

    public Player Role { get; set; }

    public StateCtr<Player> StateController { get; set; }

    public bool CanChangeState(StateEnum next)
    {
        return true;
    }

    public void Enter(StateEnum prev, params object[] args)
    {
        StateController.ChangeState(StateEnum.Idle);
    }

    public void Exit(StateEnum next)
    {

    }

    public void PhysicsUpdate(float delta)
    {

    }
}
