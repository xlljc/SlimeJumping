
/// <summary>
/// 
/// </summary>
public static class Game
{
    /// <summary>
    /// 重力加速度
    /// </summary>
    public static readonly float G = 9.8f;

    /// <summary>
    /// 下落加速系数
    /// </summary>
    public static readonly float FallCoefficient = 5f * 60;

    /// <summary>
    /// 下落每秒增加速度
    /// </summary>
    public static float FallSpeed => G * FallCoefficient;
}
