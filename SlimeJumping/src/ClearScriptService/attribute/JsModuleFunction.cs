using System;

namespace Calljs
{
    /// <summary>
    /// 用作静态方法上面, 表示当前静态方法需要被注入到 js 的 System 模块中, 如果 js 环境中未初始化 System 模块, 则报错
    /// </summary>
    [AttributeUsage(AttributeTargets.Method)]
    public class JsModuleFunction : Attribute
    {
        /// <summary>
        /// 路径
        /// </summary>
        public string Path { get; }

        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; }

        /// <summary>
        /// 设置特性
        /// </summary>
        /// <param name="path">所在的路径</param>
        /// <param name="name">名称</param>
        public JsModuleFunction(string path, string name)
        {
            Path = path;
            Name = name;
        }
    }
}
