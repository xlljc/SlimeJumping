using Godot;

public class Soft : KinematicBody2D
{
    [Export]
    public PackedScene Skeleton;
   [Export]
    public int Point = 20;

    [Export]
    public float Radius = 80;

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
    }

    public override void _Ready()
    {
        for (int i = 0; i < Point; i++)
        {
            var now = Skeleton.Instance<RigidBody2D>();
            now.Position = now.Position + new Vector2(0, Radius).Rotated(Mathf.Deg2Rad(360 / Point * i));
            now.Name = i.ToString();
            Joint2D joint = now.GetNode<Joint2D>("0");
            AddChild(now);
            joint.NodeB = joint.GetPathTo(this);
        }
    }

    public override void _Process(float delta)
    {
        
    }

    // public override void _Draw()
    // {
    //     DrawCircle(Vector2.Zero, 10, Colors.Green);
    // }
}