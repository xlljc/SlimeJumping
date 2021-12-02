using Godot;

/// <summary>
/// 玩家收缩状态
/// </summary>
public class PlayerShrinkState : IState<Player>
{
    public StateEnum StateType => StateEnum.Shrink;

    public Player Role { get; set; }

    public StateCtr<Player> StateController { get; set; }

    public bool CanChangeState(StateEnum next)
    {
        return true;
    }

    public void Enter(StateEnum prev, params object[] args)
    {
        GD.Print(StateType);
        StateController.ChangeState(StateEnum.Idle);
    }

    public void Exit(StateEnum next)
    {

    }

    public void PhysicsUpdate(float delta)
    {

    }
}
