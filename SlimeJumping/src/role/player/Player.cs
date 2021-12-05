using Godot;
using System.Collections.Generic;

public class Player : Slime
{
    [Export]
    public float MoveSpeed = 300;
    [Export]
    public float JumpSpeed = 1000;

    /// <summary>
    /// 角色状态机控制器
    /// </summary>
    public new StateCtr<Player> StateCtr { get; }

    /// <summary>
    /// 运动控制器, 玩家的移动, 惯性计算交给该控制器
    /// </summary>
    public PlayerMoveCtr MoveCtr { get; }

    public Player()
    {
        MoveCtr = new PlayerMoveCtr(this);
        StateCtr = new StateCtr<Player>(this);
    }

    public override void _Ready()
    {
        //注册状态对象
        StateCtr.Register(new PlayerIdleState());
        StateCtr.Register(new PlayerRunState());
        StateCtr.Register(new PlayerJumpState());
        StateCtr.Register(new PlayerFallState());
        StateCtr.Register(new PlayerFallGroundState());
        StateCtr.Register(new PlayerImpactState());
        StateCtr.Register(new PlayerShrinkState());
        //默认为idle状态
        StateCtr.ChangeState(StateEnum.Idle);
    }

    public override void _PhysicsProcess(float delta)
    {
        //更新状态
        StateCtr.PhysicsUpdate(delta);
        //更新移动
        MoveCtr.PhysicsUpdate(delta);
    }
}