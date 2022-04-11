using System;

namespace JsService
{
    /// <summary>
    /// 用作类型上面, 表示当前类型需要被注入到 js 环境中, 如要注入到 System 模块中, 请使用 [JsModuleType]
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct | AttributeTargets.Interface | AttributeTargets.Enum | AttributeTargets.Delegate)]
    public class JsType : Attribute
    {
        /// <summary>
        /// 全路径
        /// </summary>
        public string FullPath { get; }

        /// <summary>
        /// 包含的泛型
        /// </summary>
        public Type[] Generics { get; set; }
        
        /// <summary>
        /// 注册操作类型
        /// </summary>
        public RegisterFlag RegisterFlag { get; set; } = RegisterFlag.InjectAndInterface;

        /// <summary>
        /// 设置特性
        /// </summary>
        /// <param name="fullPath">全路径</param>
        public JsType(string fullPath)
        {
            FullPath = fullPath;
        }
    }
}
