﻿using Godot;
using Godot.Collections;

/// <summary>
/// 角色状态机控制器
/// </summary>
public class StateCtr<R> where R : Role
{
    /// <summary>
    /// 绑定的角色
    /// </summary>
    public R Role { get; }

    /// <summary>
    /// 当前活跃的状态
    /// </summary>
    public IState<R> CurrState => _currState;
    private IState<R> _currState;
    
    /// <summary>
    /// 负责存放状态实例对象
    /// </summary>
    private Dictionary<StateEnum, IState<R>> _states = new Dictionary<StateEnum, IState<R>>();

    public StateCtr(R r)
    {
        Role = r;
    }


    /// <summary>
    /// 物理帧调用, 每帧更新
    /// </summary>
    public void PhysicsUpdate(float delta)
    {
        if (CurrState != null)
        {
            CurrState.PhysicsUpdate(delta);
        }
    }

    /// <summary>
    /// 往状态机力注册一个新的状态
    /// </summary>
    public void Register(IState<R> state)
    {
        if (GetStateInstance(state.StateType) != null)
        {
            GD.PrintErr("当前状态已经在状态机中注册:", state);
            return;
        }
        _states.Add(state.StateType, state);
    }

    /// <summary>
    /// 切换到下一个指定状态
    /// </summary>
    public void ChangeState(StateEnum next, params object[] arg)
    {
        if (_currState == null || !_currState.CanChangeState(next))
        {
            return;
        }
        var newState = GetStateInstance(next);
        if (newState == null)
        {
            GD.PrintErr("当前状态机未找到相应状态:" + next);
            return;
        }
        var currStateType = _currState.StateType;
        _currState.Exit(next);
        _currState = newState;
        newState.Enter(currStateType, arg);
    }

    /// <summary>
    /// 根据状态类型获取相应的状态对象
    /// </summary>
    private IState<R> GetStateInstance(StateEnum stateType)
    {
        return _states[stateType];
    }
}