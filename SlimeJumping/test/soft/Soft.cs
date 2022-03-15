using Godot;
using System.Collections.Generic;

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

    [Export]
    public Curve2D curve;
    
    public Vector2 Velocity;

    //轮廓点
    private List<RigidBody2D> blob = new List<RigidBody2D>();
    //轮廓点的碰撞器
    private List<CollisionShape2D> blobCollisions = new List<CollisionShape2D>();
    //轮廓线
    private Line2D outline;

    public override void _Ready()
    {
        outline = GetNode<Line2D>("Outline");
        outline.Points = new Vector2[Point + 1];

        RigidBody2D start = null;
        RigidBody2D prev = null;
        for (int i = 0; i < Point; i++)
        {
            var now = Skeleton.Instance<RigidBody2D>();
            blob.Add(now);
            blobCollisions.Add(now.GetNode<CollisionShape2D>("CollisionShape2D"));
            now.Position = now.Position + new Vector2(0, Radius).Rotated(Mathf.Deg2Rad(360 / Point * i));
            now.Name = i.ToString();
            PinJoint2D joint = now.GetNode<PinJoint2D>("1");
            AddChild(now);
            joint.NodeB = "../..";

            if (i == 0) //第一个
            {
                start = now;
            }
            else 
            {
                if (i == Point - 1)//最后一个
                {
                    // now.Next = start;
                    // start.Prev = now;
                    var nowNext = now.GetNode<DampedSpringJoint2D>("2");
                    nowNext.NodeA = "..";
                    nowNext.NodeB = nowNext.GetPathTo(start);
                    nowNext.Rotation = nowNext.GlobalPosition.AngleToPoint(start.GlobalPosition) + Mathf.Pi * 0.5f;
                    nowNext.Length = nowNext.GlobalPosition.DistanceTo(start.GlobalPosition);

                    var startPrev = start.GetNode<DampedSpringJoint2D>("0");
                    startPrev.NodeA = "..";
                    startPrev.NodeB = startPrev.GetPathTo(now);
                    startPrev.Rotation = startPrev.GlobalPosition.AngleToPoint(now.GlobalPosition) + Mathf.Pi * 0.5f;
                    startPrev.Length = startPrev.GlobalPosition.DistanceTo(now.GlobalPosition);
                }
                // now.Prev = prev;
                // prev.Next = now;
                var nowPrev = now.GetNode<DampedSpringJoint2D>("0");
                nowPrev.NodeA = "..";
                nowPrev.NodeB = nowPrev.GetPathTo(prev);
                nowPrev.Rotation = nowPrev.GlobalPosition.AngleToPoint(prev.GlobalPosition) + Mathf.Pi * 0.5f;
                nowPrev.Length = nowPrev.GlobalPosition.DistanceTo(prev.GlobalPosition);

                var prevNext = prev.GetNode<DampedSpringJoint2D>("2");
                prevNext.NodeA = "..";
                prevNext.NodeB = prevNext.GetPathTo(now);
                prevNext.Rotation = prevNext.GlobalPosition.AngleToPoint(now.GlobalPosition) + Mathf.Pi * 0.5f;
                prevNext.Length = prevNext.GlobalPosition.DistanceTo(now.GlobalPosition);
            }
            prev = now;
        }
        UpdateOutline();
    }

    public override void _PhysicsProcess(float delta)
    {
        Velocity.x = Mathf.MoveToward(Velocity.x, 0, 500 * delta);
        Velocity.y += Gravity;
        if (Input.IsMouseButtonPressed((int) ButtonList.Left)) {
            Velocity = GetGlobalMousePosition() - GlobalPosition;
            //var d = dir.Clamped(Speed * delta);
        }
        Velocity = MoveAndSlide(Velocity, Vector2.Up);
        UpdateOutline();
        for (int i = 0; i < Point; i++)
        {
            blobCollisions[i].Disabled = blob[i].Position.Length() > Radius * 2f;
        }
    }

    //更新轮廓点
    public void UpdateOutline()
    {
        for (int i = 0; i < Point; i++)
        {
            outline.SetPointPosition(i, blob[i].Position);
        }
        outline.SetPointPosition(Point, blob[0].Position);
    }
}