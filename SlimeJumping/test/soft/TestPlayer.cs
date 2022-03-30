using Godot;

public class TestPlayer : RigidBody2D
{
    public override void _PhysicsProcess(float delta)
    {
        base._PhysicsProcess(delta);
        for (var i = 0; i <= 4; i++)
        {
            Bone2D bone = GetNode<Bone2D>("Skeleton2D/" + i.ToString());
            if (i > 0)
            {
                bone.LookAt(GlobalPosition);
                bone.GlobalPosition = GetNode<RigidBody2D>(i.ToString()).GlobalPosition;
            }
            else
            {
                bone.GlobalPosition = GlobalPosition;
            }
        }
    }
}