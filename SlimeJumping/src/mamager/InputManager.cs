using Godot;

/// <summary>
/// 输入事件管理器
/// </summary>
public static class InputManager
{
    /// <summary>
    /// 移动的轴向
    /// </summary>
    public static Vector2 MoveAxis => _moveAxis;
    private static Vector2 _moveAxis = Vector2.Zero;

    /// <summary>
    /// 归一化后的移动轴向
    /// </summary>
    public static Vector2 MoveAxisNorm => _moveAxisNorm;
    private static Vector2 _moveAxisNorm = Vector2.Zero;

    /// <summary>
    /// 是否按下跳跃
    /// </summary>
    public static bool Jump => _jump;
    private static bool _jump = false;

    /// <summary>
    /// 这一帧是否按下跳跃
    /// </summary>
    public static bool JumpPressed => _jumpPressed;
    private static bool _jumpPressed = false;

    /// <summary>
    /// 这一帧是否按下冲刺按钮
    /// </summary>
    public static bool Impact => _impact;
    private static bool _impact = false;

    /// <summary>
    /// 是否按下冲刺按钮
    /// </summary>
    public static bool ImpactPressed => _impactPressed;
    private static bool _impactPressed = false;

    /// <summary>
    /// 移动的轴向 (物理帧更新)
    /// </summary>
    public static Vector2 PhysicsMoveAxis => _physicsMoveAxis;
    private static Vector2 _physicsMoveAxis = Vector2.Zero;

    /// <summary>
    /// 归一化后的移动轴向 (物理帧更新)
    /// </summary>
    public static Vector2 PhysicsMoveAxisNorm => _physicsMoveAxisNorm;
    private static Vector2 _physicsMoveAxisNorm = Vector2.Zero;

    /// <summary>
    /// 是否按下跳跃 (物理帧更新)
    /// </summary>
    public static bool PhysicsJump => _physicsJump;
    private static bool _physicsJump = false;

    /// <summary>
    /// 这一帧是否按下跳跃 (物理帧更新)
    /// </summary>
    public static bool PhysicsJumpPressed => _physicsJumpPressed;
    private static bool _physicsJumpPressed = false;

    /// <summary>
    /// 是否按下冲刺按钮 (物理帧更新)
    /// </summary>
    public static bool PhysicsImpact => _physicsImpact;
    private static bool _physicsImpact = false;

    /// <summary>
    /// 这一帧是否按下冲刺按钮 (物理帧更新)
    /// </summary>
    public static bool PhysicsImpactPressed => _physicsImpactPressed;
    private static bool _physicsImpactPressed = false;

    public static void Update(float delta)
    {
        _moveAxis = new Vector2(
            Input.GetActionStrength("move_right") - Input.GetActionStrength("move_left"),
            Input.GetActionStrength("move_down") - Input.GetActionStrength("move_up")
        );
        _moveAxisNorm = _moveAxis.Normalized();
        _jump = Input.IsActionPressed("move_jump");
        _jumpPressed = Input.IsActionJustPressed("move_jump");
        _impact = Input.IsActionPressed("move_impact");
        _impactPressed = Input.IsActionJustPressed("move_impact");
    }

    public static void PhysicsUpdate(float delta)
    {
        _physicsMoveAxis = new Vector2(
            Input.GetActionStrength("move_right") - Input.GetActionStrength("move_left"),
            Input.GetActionStrength("move_down") - Input.GetActionStrength("move_up")
        );
        _physicsMoveAxisNorm = _physicsMoveAxis.Normalized();
        _physicsJump = Input.IsActionPressed("move_jump");
        _physicsJumpPressed = Input.IsActionJustPressed("move_jump");
        _physicsImpact = Input.IsActionPressed("move_impact");
        _physicsImpactPressed = Input.IsActionJustPressed("move_impact");
    }
}

