using System;

namespace JsService
{
    /// <summary>
    /// 用作类上面, 表示当前类需要实例化并注入到 js 的 System 模块中, 如果 js 环境中未初始化 System 模块, 则报错
    /// 注意: 当前类必须要有空参构造
    /// </summary>
    [AttributeUsage(AttributeTargets.Class)]
    public class JsModuleInstance : Attribute
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
        public JsModuleInstance(string path, string name)
        {
            Path = path;
            Name = name;
        }
    }
}
