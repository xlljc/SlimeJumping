using Godot;

public class FollowMouse : KinematicBody2D
{

    [Export]
    public float Speed = 300f;

    [Export]
    public float Gravity = 0;
    
    public Vector2 Velocity;

    public override void _PhysicsProcess(float delta)
    {
        Velocity.x = Mathf.MoveToward(Velocity.x, 0, 500 * delta);
        Velocity.y += Gravity;
        if (Input.IsMouseButtonPressed((int) ButtonList.Left)) {
            Velocity = GetGlobalMousePosition() - GlobalPosition;
            //var d = dir.Clamped(Speed * delta);
        }
        Velocity = MoveAndSlide(Velocity, Vector2.Up);

        //GetNode<KinematicBody2D>("Right").MoveAndCollide(Vector2.Zero);
    }
}