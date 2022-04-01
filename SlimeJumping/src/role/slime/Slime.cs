using System.Collections.Generic;
using Godot;

public class Slime : RigidBody2D, IRole<Slime>
{

    public StateCtr<Slime> StateCtr { get; }

    public readonly List<KeyValuePair<Bone2D, RigidBody2D>> nodes = new List<KeyValuePair<Bone2D, RigidBody2D>>();

	public Slime()
	{
		StateCtr = new StateCtr<Slime>(this);
	}

    public override void _EnterTree()
    {
        base._EnterTree();
        for (var i = 0; i <= 4; i++)
        {
            string index = i.ToString();
            nodes.Add(new KeyValuePair<Bone2D, RigidBody2D>(
                GetNode<Bone2D>("Skeleton2D/" + index),
                i > 0 ? GetNode<RigidBody2D>(index) : null
            ));
        }
        LinearVelocity = Vector2.Right * 1000;
        foreach (var item in nodes)
        {
            if (item.Value != null) {
                item.Value.LinearVelocity = LinearVelocity;
            }
        }
    }

    public override void _PhysicsProcess(float delta)
    {
        base._PhysicsProcess(delta);
        foreach (var item in nodes)
        {
            if (item.Value == null) {
                item.Key.GlobalPosition = GlobalPosition;
            } else {
                item.Key.GlobalPosition = item.Value.GlobalPosition;
                item.Key.LookAt(GlobalPosition);
            }
        }
    }
}