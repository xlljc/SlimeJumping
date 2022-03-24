using Godot;

public class TestPlayer : Player
{
    public override void _PhysicsProcess(float delta)
    {
        base._PhysicsProcess(delta);

        // GetNode<KinematicBody2D>("Up").MoveAndSlide(Vector2.Zero);
        // GetNode<KinematicBody2D>("Left").MoveAndSlide(Vector2.Zero);
        // GetNode<KinematicBody2D>("Right").MoveAndSlide(Vector2.Zero);
    }
}