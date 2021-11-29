
/// <summary>
/// 状态机接口
/// </summary>
public interface IState<R> where R : Role
{
    StateEnum StateType { get; }

    R Role { get; }

    StateCtr<R> StateController { get; }

    void Enter(StateEnum prev, params object[] args);

    void PhysicsUpdate(float delta);

    bool CanChangeState(StateEnum next);

    void Exit(StateEnum next);
}
