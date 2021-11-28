using Godot;

public class Player : KinematicBody2D
{
    public override void _Ready()
    {
        
    }

    public override void _PhysicsProcess(float delta)
    {
        var speed = 300;
        var dir = new Vector2();
        dir.x = Input.GetActionStrength("ui_right") - Input.GetActionStrength("ui_left");
        dir = dir.Normalized();
        MoveAndSlide(dir * speed, Vector2.Up);
    }
}