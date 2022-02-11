using Godot;

/// <summary>
/// 玩家冲刺状态
/// </summary>
public class PlayerImpactState : IState<Player>
{
    public StateEnum StateType => StateEnum.Impact;

    public Player Role { get; set; }

    public StateCtr<Player> StateController { get; set; }

    //冲刺力
    private ImpactForce force;

    public bool CanChangeState(StateEnum next)
    {
        return true;
    }

    public void Enter(StateEnum prev, params object[] args)
    {
        //清空所有的力
        Role.MoveCtr.Halt();
        Role.GravityForce.Enable = false;
        //添加冲刺的力
        force = new ImpactForce(Role);
        Role.MoveCtr.AddForce(force);
    }

    public void Exit(StateEnum next)
    {
        Role.MoveCtr.RemoveForce(force);
        Role.GravityForce.Enable = true;
    }

    public void PhysicsUpdate(float delta)
    {
        if (force.Velocity.IsZero())
        {
            StateController.ChangeState(StateEnum.Fall);
        }
    }
}