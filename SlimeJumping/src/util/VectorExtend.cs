using Godot;

public static class VectorExtend
{
    public static bool IsZero(this Vector2 v)
    {
        return v.x == 0 && v.y == 0;
    }
    public static Vector2 AddX(this Vector2 v, float x)
    {
        v.x += x;
        return v;
    }
    public static Vector2 AddY(this Vector2 v, float y)
    {
        v.y += y;
        return v;
    }
    public static Vector2 AddXY(this Vector2 v, float x, float y)
    {
        v.x += x;
        v.y += y;
        return v;
    }
    public static Vector2 SetX(this Vector2 v, float x)
    {
        v.x = x;
        return v;
    }
    public static Vector2 SetY(this Vector2 v, float y)
    {
        v.y = y;
        return v;
    }
    public static Vector2 SetXY(this Vector2 v, float x, float y)
    {
        v.x = x;
        v.y = y;
        return v;
    }
    public static Vector2 ScaleX(this Vector2 v, float x)
    {
        v.x *= x;
        return v;
    }
    public static Vector2 ScaleY(this Vector2 v, float y)
    {
        v.y *= y;
        return v;
    }
    public static Vector2 ScaleXY(this Vector2 v, float x, float y)
    {
        v.x *= x;
        v.y *= y;
        return v;
    }
}
