using System;

namespace Calljs
{
    /// <summary>
    /// 用作静态方法上面, 表示当前静态方法需要被注入到 js 环境中, 如要注入到 System 模块中, 请使用 [JsModuleFunction]
    /// </summary>
    [AttributeUsage(AttributeTargets.Method)]
    public class JsFunction : Attribute
    {
        /// <summary>
        /// 全路径
        /// </summary>
        public string FullPath { get; }

        /// <summary>
        /// 设置特性
        /// </summary>
        /// <param name="fullPath">全路径名 (命名空间 + 方法名)</param>
        public JsFunction(string fullPath)
        {
            FullPath = fullPath;
        }
    }
}
