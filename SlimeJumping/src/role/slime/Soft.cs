using Godot;

public class Soft : Node2D
{
    public override void _PhysicsProcess(float delta)
    {
        if (Input.IsMouseButtonPressed((int)ButtonList.Left))
        {
            var body = GetNode<RigidBody2D>("Center");
            body.LinearVelocity = Vector2.Zero;
            body.GlobalPosition = GetGlobalMousePosition();
        }
        if (Input.IsMouseButtonPressed((int)ButtonList.Right))
        {
            var body = GetNode<RigidBody2D>("Center");
            body.LinearVelocity += Vector2.Down * 100;
        }
    }
}