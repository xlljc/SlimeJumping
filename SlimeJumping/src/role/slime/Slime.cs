using Godot;

/// <summary>
/// 史莱姆类
/// </summary>
public class Slime : Role
{
    /// <summary>
    /// 上骨架
    /// </summary>
    public SlimeSkeleton UpSkeleton;
    /// <summary>
    /// 下骨架
    /// </summary>
    public SlimeSkeleton DownSkeleton;
    /// <summary>
    /// 左骨架
    /// </summary>
    public SlimeSkeleton LeftSkeleton;
    /// <summary>
    /// 右骨架
    /// </summary>
    public SlimeSkeleton RightSkeleton;

    public override void _EnterTree()
    {
        //初始化骨架
        UpSkeleton = GetNode<SlimeSkeleton>("Skeleton/Up");
        DownSkeleton = GetNode<SlimeSkeleton>("Skeleton/Down");
        LeftSkeleton = GetNode<SlimeSkeleton>("Skeleton/Left");
        RightSkeleton = GetNode<SlimeSkeleton>("Skeleton/Right");
    }
}