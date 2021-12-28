﻿using Godot;

/// <summary>
/// 玩家冲刺状态
/// </summary>
public class PlayerImpactState : IState<Player>
{
    public StateEnum StateType => StateEnum.Impact;

    public Player Role { get; set; }

    public StateCtr<Player> StateController { get; set; }

    //冲刺力
    private ImpactForce force;

    public bool CanChangeState(StateEnum next)
    {
        return true;
    }

    public void Enter(StateEnum prev, params object[] args)
    {
        force = new ImpactForce(Role);
        Role.MoveCtr.AddForce(force);
    }

    public void Exit(StateEnum next)
    {

    }

    public void PhysicsUpdate(float delta)
    {
        
    }
}