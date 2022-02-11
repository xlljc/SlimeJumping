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

    }

    public void Exit(StateEnum next)
    {
        
    }

    public void PhysicsUpdate(float delta)
    {
        if (InputManager.PhysicsJumpPressed)
        {
            StateController.ChangeStateLate(StateEnum.Jump);
        }
        else if (InputManager.PhysicsImpactPressed)
        {
            StateController.ChangeState(StateEnum.Impact);
        }
        else if (!Role.IsOnFloor())
        {
            StateController.ChangeState(StateEnum.Fall);
        }
        else if (InputManager.PhysicsMoveAxis.x != 0)
        {
            StateController.ChangeState(StateEnum.Run);
        }
        else
        {
            Role.MoveCtr.BasisVelocity = Vector2.Zero;
        }
    }
}