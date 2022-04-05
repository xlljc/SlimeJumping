using System;

namespace JsService
{
    /// <summary>
    /// 生成 .d.ts 文件时排除当前成员
    /// </summary>
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property | AttributeTargets.Constructor | AttributeTargets.Method)]
    public class IgnoreGenerate : Attribute
    {
    }
}
