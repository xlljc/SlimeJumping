using Godot;

/// <summary>
/// 输入事件管理器
/// </summary>
public static class InputManager
{
    /// <summary>
    /// 移动的轴向
    /// </summary>
    public static Vector2 MoveAxis { get; private set; } = Vector2.Zero;

    /// <summary>
    /// 归一化后的移动轴向
    /// </summary>
    public static Vector2 MoveAxisNorm { get; private set; } = Vector2.Zero;

    /// <summary>
    /// 是否按下跳跃
    /// </summary>
    public static bool Jump { get; private set; } = false;

    /// <summary>
    /// 这一帧是否按下跳跃
    /// </summary>
    public static bool JumpPressed { get; private set; } = false;

    /// <summary>
    /// 这一帧是否按下冲刺按钮
    /// </summary>
    public static bool Impact { get; private set; } = false;

    /// <summary>
    /// 是否按下冲刺按钮
    /// </summary>
    public static bool ImpactPressed { get; private set; } = false;

    /// <summary>
    /// 移动的轴向 (物理帧更新)
    /// </summary>
    public static Vector2 PhysicsMoveAxis { get; private set; } = Vector2.Zero;

    /// <summary>
    /// 归一化后的移动轴向 (物理帧更新)
    /// </summary>
    public static Vector2 PhysicsMoveAxisNorm { get; private set; } = Vector2.Zero;

    /// <summary>
    /// 是否按下跳跃 (物理帧更新)
    /// </summary>
    public static bool PhysicsJump { get; private set; } = false;

    /// <summary>
    /// 这一帧是否按下跳跃 (物理帧更新)
    /// </summary>
    public static bool PhysicsJumpPressed { get; private set; } = false;

    /// <summary>
    /// 是否按下冲刺按钮 (物理帧更新)
    /// </summary>
    public static bool PhysicsImpact { get; private set; } = false;

    /// <summary>
    /// 这一帧是否按下冲刺按钮 (物理帧更新)
    /// </summary>
    public static bool PhysicsImpactPressed { get; private set; } = false;

    public static void Update(float delta)
    {
        MoveAxis = new Vector2(
            Input.GetActionStrength("move_right") - Input.GetActionStrength("move_left"),
            Input.GetActionStrength("move_down") - Input.GetActionStrength("move_up")
        );
        MoveAxisNorm = MoveAxis.Normalized();
        Jump = Input.IsActionPressed("move_jump");
        JumpPressed = Input.IsActionJustPressed("move_jump");
        Impact = Input.IsActionPressed("move_impact");
        ImpactPressed = Input.IsActionJustPressed("move_impact");
    }

    public static void PhysicsUpdate(float delta)
    {
        PhysicsMoveAxis = new Vector2(
            Input.GetActionStrength("move_right") - Input.GetActionStrength("move_left"),
            Input.GetActionStrength("move_down") - Input.GetActionStrength("move_up")
        );
        PhysicsMoveAxisNorm = PhysicsMoveAxis.Normalized();
        PhysicsJump = Input.IsActionPressed("move_jump");
        PhysicsJumpPressed = Input.IsActionJustPressed("move_jump");
        PhysicsImpact = Input.IsActionPressed("move_impact");
        PhysicsImpactPressed = Input.IsActionJustPressed("move_impact");
    }
}

