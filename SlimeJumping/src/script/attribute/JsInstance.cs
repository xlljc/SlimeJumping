using System;

namespace JsService
{
    /// <summary>
    /// 用作类上面, 表示当前类需要实例化并注入到 js 环境中, 如要注入到 System 模块中, 请使用 [JsModuleInstance]
    /// 注意: 当前类必须要有空参构造
    /// </summary>
    [AttributeUsage(AttributeTargets.Class)]
    public class JsInstance : Attribute
    {
        /// <summary>
        /// 全路径
        /// </summary>
        public string FullPath { get; }

        /// <summary>
        /// 注册操作类型
        /// </summary>
        public RegisterFlag RegisterFlag { get; set; } = RegisterFlag.InjectAndInterface;

        /// <summary>
        /// 设置特性
        /// </summary>
        /// <param name="fullPath">全路径名 (命名空间 + 方法名)</param>
        public JsInstance(string fullPath)
        {
            FullPath = fullPath;
        }
    }
}
