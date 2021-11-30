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
    /// 归一化后的移动轴向
    /// </summary>
    public static Vector2 MoveAxisNorm => _moveAxisNorm;
    private static Vector2 _moveAxisNorm = Vector2.Zero;


    public static void Update(float delta)
    {
        _moveAxis = new Vector2(
            Input.GetActionStrength("move_right") - Input.GetActionStrength("move_left"),
            Input.GetActionStrength("move_down") - Input.GetActionStrength("move_up")
        );
        _moveAxisNorm = _moveAxis.Normalized();
    }
}

