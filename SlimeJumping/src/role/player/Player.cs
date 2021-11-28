﻿using Godot;  public class Player : Role {     [Export]     public float MoveSpeed = 300;     [Export]     public float Gravity = 400;     [Export]     public float JumpSpeed = 1000;      public Vector2 Velocity = Vector2.Zero;      public override void _Ready()     {              }      public override void _PhysicsProcess(float delta)     {         var h = Input.GetActionStrength("ui_right") - Input.GetActionRawStrength("ui_left");         var jump = Input.IsActionJustPressed("ui_up");         Velocity.x = h * MoveSpeed;         Velocity.y += Gravity * delta;         if (jump)
        {
            Velocity.y = -JumpSpeed;
        }         Velocity = MoveAndSlide(Velocity);     }
}