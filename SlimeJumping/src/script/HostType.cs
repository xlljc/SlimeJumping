using System;

namespace JsService
{
    /// <summary>
    /// 主机类型
    /// </summary>
    public class HostType
    {
        /// <summary>
        /// 脚本中的对象名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 脚本中的类型
        /// </summary>
        public Type Type { get; set; }

        /// <summary>
        /// 注册操作类型
        /// </summary>
        public RegisterFlag RegisterFlag { get; set; }

        /// <summary>
        /// 自定义类型文本
        /// </summary>
        public string TypeStr { get; set; } = null;

        /// <summary>
        /// 注入到 js 引擎的类型对象
        /// </summary>
        /// <param name="name">全路径名</param>
        /// <param name="type">类型对象</param>
        /// <param name="registerFlag">注册操作类型</param>
        public HostType(string name, Type type, RegisterFlag registerFlag = RegisterFlag.InjectAndInterface)
        {
            Name = name;
            Type = type;
            RegisterFlag = registerFlag;
        }

        /// <summary>
        /// 注入到 js 引擎的类型对象
        /// </summary>
        /// <param name="name">全路径名</param>
        /// <param name="type">类型对象</param>
        /// <param name="typeStr">用指定的字符串替换生成的ts类型</param>
        /// <param name="registerFlag">注册操作类型</param>
        public HostType(string name, Type type, string typeStr, RegisterFlag registerFlag = RegisterFlag.InjectAndInterface)
        {
            Name = name;
            Type = type;
            TypeStr = typeStr;
            RegisterFlag = registerFlag;
        }
    }
}
