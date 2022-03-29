using Godot;

public class TestPlayer : RigidBody2D
{
    public override void _PhysicsProcess(float delta)
    {
        base._PhysicsProcess(delta);
        for (var i = 1; i < 4; i++)
        {
            // GetNode<Bone2D>("Skeleton2D/" + i.ToString()).GlobalPosition = GetNode<RigidBody2D>(i.ToString()).GlobalPosition;
            // if (i > 0)
            // {
            //     GetNode<Bone2D>("Skeleton2D/" + i.ToString()).LookAt(GetNode<Node2D>("0").GlobalPosition);
            // }
        }
    }
}