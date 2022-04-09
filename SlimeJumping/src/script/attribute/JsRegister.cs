using System;

namespace JsService
{
    /// <summary>
    /// 用在静态空参函数上, 生成 .d.ts 文件前时调用该函数, 用于添加自定义生成接口
    /// </summary>
    [AttributeUsage(AttributeTargets.Method)]
    public class JsRegister : Attribute
    {
    }
}
