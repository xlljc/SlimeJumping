using Godot;

/// <summary>
/// 游戏角色基类，所有角色必须继承此类
/// </summary>
public abstract class Role : KinematicBody2D
{
    /// <summary>
    /// 获取角色状态机控制器
    /// </summary>
    public virtual StateCtr<Role> StateCtr { get; }
}