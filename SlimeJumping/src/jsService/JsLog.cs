using Calljs;
using static Godot.GD;

public class JsLog : ILog
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