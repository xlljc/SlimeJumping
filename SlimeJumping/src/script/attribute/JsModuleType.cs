using System;

namespace JsService
{
    /// <summary>
    /// 用在类上面, 表示当前类型需要被注入到 js 的 System 模块中, 如果 js 环境中未初始化 System 模块, 则报错
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct | AttributeTargets.Interface | AttributeTargets.Enum | AttributeTargets.Delegate)]
    public class JsModuleType : Attribute
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
        /// <param name="path">所在的路径</param>
        /// <param name="name">名称</param>
        public JsModuleType(string path, string name)
        {
            Path = path;
            Name = name;
        }
    }
}
