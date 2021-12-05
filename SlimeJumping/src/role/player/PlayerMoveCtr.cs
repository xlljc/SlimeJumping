using Godot;
using System.Collections.Generic;

/// <summary>
/// 玩家的移动控制器, 该类负责移动计算, 惯性计算等
/// </summary>
public class PlayerMoveCtr
{
    /// <summary>
    /// 绑定的玩家对象
    /// </summary>
    public Player Player;

    /// <summary>
    /// 玩家受到的外力的集合
    /// </summary>
    private readonly Dictionary<string, ExternalForce> _forceData = new Dictionary<string, ExternalForce>();

    /// <summary>
    /// 这个速度就是玩家当前物理帧移动的真实速率
    /// 该速度就是 BasisVelocity + ForceVelocity
    /// </summary>
    public Vector2 Velocity => _velocity;
    private Vector2 _velocity = Vector2.Zero;

    /// <summary>
    /// 玩家的基础移动速率, 包括左右移动, 下坠, 上升等
    /// </summary>
    public Vector2 BasisVelocity { get { return _basisVelocity; } set { _basisVelocity = value; } }
    private Vector2 _basisVelocity = Vector2.Zero;

    /// <summary>
    /// 玩家向上的方向
    /// </summary>
    private readonly Vector2 _upDir = Vector2.Up;

    /// <summary>
    /// 根据名称添加一个外力, 并返回创建的外力的对象
    /// </summary>
    public ExternalForce AddForce(string name)
    {
        var f = new ExternalForce(name);
        AddForce(f);
        return f;
    }

    /// <summary>
    /// 根据对象添加一个外力力
    /// </summary>
    public void AddForce(ExternalForce force)
    {
        _forceData.Add(force.Name, force);
    }

    /// <summary>
    /// 根据名称移除一个外力
    /// </summary>
    public void RemoveForce(string name)
    {
        if (!_forceData.Remove(name))
        {
            this.Error($"力:{name}不存在!!!");
        }
    }

    /// <summary>
    /// 根据对象移除一个外力
    /// </summary>
    public void RemoveForce(ExternalForce force)
    {
        RemoveForce(force.Name);
    }

    public PlayerMoveCtr(Player p)
    {
        Player = p;
    }

    /// <summary>
    /// 更新移动
    /// </summary>
    public void UpdateMove(float delta)
    {
        //先调用更新
        var ks = _forceData.Keys;
        foreach (var k in ks)
            _forceData[k].PhysicsUpdate(delta);

        var finallyEf = Vector2.Zero;
        foreach (var item in _forceData)
            finallyEf += item.Value.Velocity;
        //最终速率
        var finallyVelocity = _basisVelocity + finallyEf;

        //计算移动
        _velocity = Player.MoveAndSlide(finallyVelocity, _upDir);

        //调整其他速率
        var scale = new Vector2(1, 1);
        var flag = false;
        if ((_basisVelocity.x >= 0 && _velocity.x > _basisVelocity.x) || (_basisVelocity.x < 0 && _velocity.x < _basisVelocity.x))
        {
            //x轴外力
            float efx = _velocity.x - _basisVelocity.x;
            scale.x = Mathf.Abs(efx / finallyEf.x);
            flag = true;
        }
        if ((_basisVelocity.y >= 0 && _velocity.y > _basisVelocity.y) || (_basisVelocity.y < 0 && _velocity.y < _basisVelocity.y))
        {
            //y轴外力
            float efy = _velocity.y - _basisVelocity.y;
            scale.y = Mathf.Abs(efy / finallyEf.y);
            flag = true;
        }
        if (flag)
        {
            foreach (var item in _forceData)
            {
                var velocity = item.Value.Velocity;
                item.Value.Velocity = new Vector2(velocity.y * scale.x, velocity.y * scale.y);
            }
        }
    }

    /// <summary>
    /// 更新控制器, 每帧调用
    /// </summary>
    public void PhysicsUpdate(float delta)
    {
        UpdateMove(delta);
    }
}
