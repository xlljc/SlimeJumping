/// <summary>
/// 游戏角色接口，所有角色必须实现此接口
/// </summary>
public interface IRole<T>
{
    /// <summary>
    /// 获取角色状态机控制器
    /// </summary>
    StateCtr<T> StateCtr { get; }
}