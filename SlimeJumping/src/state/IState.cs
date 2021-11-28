
/// <summary>
/// 状态机接口
/// </summary>
interface IState<T> where T : Role
{
    void SetRole(T role);

    T GetRole();

    void Enter(StateEnum prevState);

    void Update(float delta);

    void Out(StateEnum nextState);
}
