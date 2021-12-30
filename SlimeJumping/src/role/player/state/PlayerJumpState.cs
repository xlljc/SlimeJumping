using Godot;

/// <summary>
/// 跳跃状态
/// </summary>
public class PlayerJumpState : IState<Player>
{
    public StateEnum StateType => StateEnum.Jump;

    public Player Role { get; set; }

    public StateCtr<Player> StateController { get; set; }

    //跳跃时的力对象
    private ExternalForce _jumpForce;
    private float _jumpClickTimer = 0;

    public bool CanChangeState(StateEnum next)
    {
        return true;
    }

    public void Enter(StateEnum prev, params object[] args)
    {
        _jumpForce = Role.MoveCtr.AddForce("jump");
        _jumpForce.Velocity = new Vector2(0, -Role.JumpSpeed);
        _jumpClickTimer = 0;
    }

    public void Exit(StateEnum next)
    {

    }

    public void PhysicsUpdate(float delta)
    {
        if (InputManager.PhysicsImpactPressed)
        {
            StateController.ChangeState(StateEnum.Impact);
        }
        else if (Role.IsOnFloor())
        {
            StateController.ChangeState(StateEnum.Idle);
        }
        else if (Role.MoveCtr.Velocity.y > 0)
        {
            StateController.ChangeState(StateEnum.Fall);
        }
        else
        {
            //如果还是按着跳跃, 让玩家跳的更高
            if (InputManager.Jump && _jumpClickTimer <= 0.2f)
            {
                _jumpForce.Velocity = _jumpForce.Velocity.AddY(-Role.JumpUpSpeed * delta);
            }

            //移动计算
            var x = InputManager.PhysicsMoveAxis.x * Role.MoveSpeed;
            Role.SetFace(x);
            Role.MoveCtr.BasisVelocity = new Vector2(x, 0);
        }
        _jumpClickTimer += delta;
    }
}
