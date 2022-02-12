using JsService;
using static Godot.GD;

/// <summary>
/// Godot 引擎下的log对象
/// </summary>
public class GodotLog : ILog
{
    public void Log(params object[] args)
    {
        Print(what: args);
    }
    public void LogError(params object[] args)
    {
        PrintErr(what: args);
    }
    public void LogWarn(params object[] args)
    {
        Print(what: args);
    }
}