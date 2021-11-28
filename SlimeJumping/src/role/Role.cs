using Godot;

/// <summary>
/// 游戏角色基类，所有角色必须继承此类
/// </summary>
public abstract class Role : KinematicBody2D
{
    /// <summary>
    /// 角色控制器, 子类创建时赋值
    /// </summary>
    protected StateController _stateController;

    /// <summary>
    /// 获取角色控制器
    /// </summary>
    public StateController StateController { get { return _stateController; } }
}