﻿using Godot;

/// <summary>
/// 玩家奔跑状态
/// </summary>
public class PlayerRunState : IState<Player>
{
    public StateEnum StateType => StateEnum.Run;

    public Player Role { get; set; }

    public StateCtr<Player> StateController { get; set; }

    public bool CanChangeState(StateEnum next)
    {
        return true;
    }

    public void Enter(StateEnum prev, params object[] args)
    {
        GD.Print(StateType);
    }

    public void Exit(StateEnum next)
    {
        
    }

    public void PhysicsUpdate(float delta)
    {
        if (InputManager.MoveAxis.x == 0)
        {
            StateController.ChangeState(StateEnum.Idle);
        }
        else
        {
            Role.MoveCtr.Velocity = new Vector2(InputManager.MoveAxis.x * Role.MoveSpeed, 0);
        }
    }
}
