using Godot;

/// <summary>
/// slime骨骼块
/// </summary>
public class SlimeBone : Node2D
{
    /// <summary>
    /// 固定点1
    /// </summary>
    public PinJoint2D PinJointStart;

    /// <summary>
    /// 固定点2
    /// </summary>
    public PinJoint2D PinJointEnd;


    public override void _EnterTree()
    {
        PinJointStart = GetNode<PinJoint2D>("PinJointStart");
        PinJointEnd = GetNode<PinJoint2D>("PinJointEnd");

        var parentPath = GetParent().GetPath();
        PinJointStart.NodeA = parentPath;
        PinJointEnd.NodeA = parentPath;

        GetNode("DebugLine").QueueFree();
    }
}