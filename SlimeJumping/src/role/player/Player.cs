﻿using Godot;  public class Player : Slime {     [Export]     public float MoveSpeed = 300;     [Export]     public float Gravity = 400;     [Export]     public float JumpSpeed = 1000;

    /// <summary>
    /// 角色状态机控制器
    /// </summary>     public new StateCtr<Player> StateCtr { get; }      /// <summary>
    /// 运动控制器, 玩家的移动, 惯性计算交给该控制器
    /// </summary>     public PlayerMoveCtr MoveCtr { get; }      public Player()
    {
        MoveCtr = new PlayerMoveCtr(this);
        StateCtr = new StateCtr<Player>(this);
    }      public override void _Ready()     {         //StateCtr.Register();     }      public override void _PhysicsProcess(float delta)     {         var h = Input.GetActionStrength("ui_right") - Input.GetActionRawStrength("ui_left");         var jump = Input.IsActionJustPressed("ui_up");         var velocity = MoveCtr.Velocity;         velocity.x = h * MoveSpeed;         velocity.y += Gravity * delta;         if (jump)         {             velocity.y = -JumpSpeed;         }         MoveCtr.Velocity = velocity;         //更新状态         StateCtr.PhysicsUpdate(delta);         //更新移动         MoveCtr.PhysicsUpdate(delta);     } }