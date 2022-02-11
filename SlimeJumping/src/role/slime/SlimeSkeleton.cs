using Godot;
using Godot.Collections;

/// <summary>
/// slime身体上的骨骼架子
/// </summary>
public class SlimeSkeleton : StaticBody2D
{
    /// <summary>
    /// 当前骨架绑定的骨骼列表
    /// </summary>
    public readonly Array<SlimeBone> BoneList = new Array<SlimeBone>();

    public override void _EnterTree()
    {
        //初始化所有骨骼
        var children = GetChildren();
        foreach (var item in children)
        {
            if (item is SlimeBone bone)
            {
                BoneList.Add(bone);
            }
        }
    }
}