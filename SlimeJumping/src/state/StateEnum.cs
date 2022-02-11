
/// <summary>
/// 角色状态
/// </summary>
public enum StateEnum
{
    /// <summary>
    /// 无状态
    /// </summary>
    None = 0,
    /// <summary>
    /// 静止状态
    /// </summary>
    Idle = 1,
    /// <summary>
    /// 平地奔跑状态
    /// </summary>
    Run = 2,
    /// <summary>
    /// 跳跃向上阶段状态
    /// </summary>
    Jump = 3,
    /// <summary>
    /// 下落阶段状态
    /// </summary>
    Fall = 4,
    /// <summary>
    /// 落地状态
    /// </summary>
    FallGround = 5,
    /// <summary>
    /// 冲刺状态
    /// </summary>
    Impact = 6,
    /// <summary>
    /// 收缩状态
    /// </summary>
    Shrink = 7,
}
