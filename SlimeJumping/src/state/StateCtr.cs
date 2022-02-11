using Godot;
using System.Collections.Generic;

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
    private readonly Dictionary<StateEnum, IState<R>> _states = new Dictionary<StateEnum, IState<R>>();

    /// <summary>
    /// 记录下当前帧是否有改变的状态
    /// </summary>
    private bool _isChangeState = false;

    public StateCtr(R r)
    {
        Role = r;
    }


    /// <summary>
    /// 物理帧调用, 每帧更新
    /// </summary>
    public void PhysicsUpdate(float delta)
    {
        _isChangeState = false;
        if (CurrState != null)
        {
            CurrState.PhysicsUpdate(delta);
            //判断当前帧是否有改变的状态, 如果有, 则重新调用 Update() 方法
            if (_isChangeState)
            {
                PhysicsUpdate(delta);
            }
        }
    }

    /// <summary>
    /// 往状态机力注册一个新的状态
    /// </summary>
    public void Register(IState<R> state)
    {
        if (GetStateInstance(state.StateType) != null)
        {
            this.Error("当前状态已经在状态机中注册:", state);
            return;
        }
        state.Role = Role;
        state.StateController = this;
        _states.Add(state.StateType, state);
    }

    /// <summary>
    /// 立即切换到下一个指定状态, 并且这一帧会被调用update
    /// </summary>
    public void ChangeState(StateEnum next, params object[] arg)
    {
        _changeState(false, next, arg);
    }

    /// <summary>
    /// 切换到下一个指定状态, 下一帧才会调用update
    /// </summary>
    public void ChangeStateLate(StateEnum next, params object[] arg)
    {
        _changeState(true, next, arg);
    }

    /// <summary>
    /// 根据状态类型获取相应的状态对象
    /// </summary>
    private IState<R> GetStateInstance(StateEnum stateType)
    {
        _states.TryGetValue(stateType, out IState<R> v);
        return v;
    }

    /// <summary>
    /// 切换状态
    /// </summary>
    private void _changeState(bool late, StateEnum next, params object[] arg)
    {
        if (_currState != null && _currState.StateType == next)
        {
            return;
        }
        var newState = GetStateInstance(next);
        if (newState == null)
        {
            this.Error("当前状态机未找到相应状态:" + next);
            return;
        }
        if (_currState == null)
        {
            _currState = newState;
            newState.Enter(StateEnum.None, arg);
        }
        else if (_currState.CanChangeState(next))
        {
            _isChangeState = !late;
            var prev = _currState.StateType;
            _currState.Exit(next);
            this.Log("nextState => " + next);
            _currState = newState;
            _currState.Enter(prev, arg);
        }
    }
}