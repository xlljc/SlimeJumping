using Godot;

/// <summary>
/// 玩家空闲状态
/// </summary>
public class PlayerIdleState : IState<Player>
{
    public StateEnum StateType => StateEnum.Idle;

    public Player Role { get; set; }

    public StateCtr<Player> StateController { get; set; }

    public bool CanChangeState(StateEnum next)
    {
        return true;
    }

    public void Enter(StateEnum prev, params object[] args)
    {
        GD.Print("进入idle状态", prev);
    }

    public void Exit(StateEnum next)
    {
        GD.Print("退出idle状态", next);
    }

    public void PhysicsUpdate(float delta)
    {
        
    }
}
