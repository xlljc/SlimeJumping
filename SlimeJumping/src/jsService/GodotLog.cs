using JsService;
using static Godot.GD;

/// <summary>
/// Godot 引擎下的log对象
/// </summary>
public class GodotLog : ILog
{
    public void log(params object[] args)
    {
        Print(what: args);
    }
    public void error(params object[] args)
    {
        PrintErr(what: args);
    }
    public void warn(params object[] args)
    {
        Print(what: args);
    }
}