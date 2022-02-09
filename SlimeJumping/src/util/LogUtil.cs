using Godot;
/// <summary>
/// log工具类
/// </summary>
public static class LogUtil
{
    /// <summary>
    /// 输出普通日志
    /// </summary>
    public static void Log(this object instance, params object[] args)
    {
        var str = GetDateStr() + " " + instance.GetType().Name + " log: ";
        GD.Print(Concat(str, args));
    }
    /// <summary>
    /// 输出一个异常消息      
    /// </summary>      
    public static void Error(this object instance, params object[] args)
    {
        var str = GetDateStr() + " " + instance.GetType().Name + " error: ";
        GD.PrintErr(Concat(str, args));
    }
    private static string GetDateStr()
    {
        var date = OS.GetTime();
        return $"{date["hour"]}:{date["minute"]}:{date["second"]}";
    }
    private static object[] Concat(string str, object[] args2)
    {
        var arr = new object[args2.Length + 1];
        arr[0] = str; args2.CopyTo(arr, 1);
        return arr;
    }
}