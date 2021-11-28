
/// <summary>
/// 角色管理器类
/// </summary>
public static class RoleManager
{
    /// <summary>
    /// 玩家角色
    /// </summary>
    private static Player _player;

    /// <summary>
    /// 获取玩家角色
    /// </summary>
    public static Player Player
    {
        get
        {
            return _player;
        }
    }
}
