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
    public Vector2 BasisVelocity { get => _basisVelocity; set { _basisVelocity = value; } }
    private Vector2 _basisVelocity = Vector2.Zero;

    /// <summary>
    /// 玩家向上的方向
    /// </summary>
    private readonly Vector2 _upDir = Vector2.Up;

    /// <summary>
    /// 根据名称添加一个外力, 并返回创建的外力的对象, 如果存在这个名称的外力, 移除之前的外力
    /// </summary>
    public ExternalForce AddForce(string name)
    {
        var f = new ExternalForce(name);
        AddForce(f);
        return f;
    }

    /// <summary>
    /// 根据对象添加一个外力力, 如果存在这个名称的外力, 移除之前的外力
    /// </summary>
    public ExternalForce AddForce(ExternalForce force)
    {
        _forceData.Remove(force.Name);
        _forceData.Add(force.Name, force);
        return force;
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
    /// 根据名称获取一个外力
    /// </summary>
    public ExternalForce GetForce(string name)
    {
        _forceData.TryGetValue(name, out ExternalForce f);
        return f;
    }

    /// <summary>
    /// 检车是否有当前名称的外力对象
    /// </summary>
    public bool ContainsForce(string name)
    {
        return _forceData.ContainsKey(name);
    }

    /// <summary>
    /// 根据对象移除一个外力
    /// </summary>
    public void RemoveForce(ExternalForce force)
    {
        RemoveForce(force.Name);
    }

    /// <summary>
    /// 移除所有外力
    /// </summary>
    public void ClearForce()
    {
        List<string> keys = new List<string>(_forceData.Keys);
        foreach (var key in keys)
        {
            if (key != "gravity")
            {
                _forceData.Remove(key);
            }
            else
            {
                _forceData["gravity"].Velocity = Vector2.Zero;
            }
        }
    }

    /// <summary>
    /// 移除所有外力和基础力, 使玩家静止
    /// </summary>
    public void Halt()
    {
        ClearForce();
        _basisVelocity = Vector2.Zero;
    }

    public PlayerMoveCtr(Player p)
    {
        Player = p;
    }

    /// <summary>
    /// 更新移动
    /// </summary>
    private void UpdateMove(float delta)
    {
        //先调用更新
        var ks = new List<string>(_forceData.Keys);
        foreach (var k in ks)
        {
            var fore = _forceData[k];
            if (fore.Enable)
                fore.PhysicsUpdate(delta);
        }

        //外力总和
        var finallyEf = Vector2.Zero;
        foreach (var item in _forceData)
        {
            if (item.Value.Enable)
                finallyEf += item.Value.Velocity;
        }
        //最终速率
        var finallyVelocity = _basisVelocity + finallyEf;

        //计算移动
        _velocity = Player.MoveAndSlide(finallyVelocity, _upDir);

        //调整外力速率
        if (_forceData.Count > 0)
        {
            var scale = new Vector2();
            //x轴外力
            float efx = _velocity.x - _basisVelocity.x;
            scale.x = finallyEf.x == 0f ? 0 : Mathf.Abs(efx / finallyEf.x);
            //y轴外力
            float efy = _velocity.y - _basisVelocity.y;
            scale.y = finallyEf.y == 0f ? 0 : Mathf.Abs(efy / finallyEf.y);
            foreach (var item in _forceData)
            {
                if (item.Value.Enable)
                {
                    var velocity = item.Value.Velocity;
                    item.Value.Velocity = new Vector2(velocity.x * scale.x, velocity.y * scale.y);
                }
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
