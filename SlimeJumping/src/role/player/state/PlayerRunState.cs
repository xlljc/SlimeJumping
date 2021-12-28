using Godot;

/// <summary>
/// 玩家奔跑状态
/// </summary>
public class PlayerRunState : IState<Player>
{
    public StateEnum StateType => StateEnum.Run;

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
        else if (!Role.IsOnFloor())
        {
            StateController.ChangeState(StateEnum.Fall);
        }
        else if (InputManager.PhysicsMoveAxis.x == 0)
        {
            StateController.ChangeState(StateEnum.Idle);
        }
        else
        {
            var x = InputManager.PhysicsMoveAxis.x * Role.MoveSpeed;
            Role.SetFace(x);
            Role.MoveCtr.BasisVelocity = new Vector2(x, 0);
        }
    }
}
