using System;

namespace JsService
{
    /// <summary>
    /// 主机实例
    /// </summary>
    public class HostInstance
    {
        /// <summary>
        /// 脚本中的对象名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 脚本中的对象
        /// </summary>
        public object Obj { get; set; }

        /// <summary>
        /// 注册操作类型
        /// </summary>
        public RegisterFlag RegisterFlag { get; set; }

        /// <summary>
        /// 指定生成的的类型
        /// </summary>
        public Type Type { get; set; }

        /// <summary>
        /// 注入到 js 引擎的实例对象
        /// </summary>
        /// <param name="name">全路径名</param>
        /// <param name="obj">注入的实例对象</param>
        /// <param name="registerFlag">注册操作类型</param>
        public HostInstance(string name, object obj, RegisterFlag registerFlag = RegisterFlag.InjectAndInterface)
        {
            Name = name;
            Obj = obj;
            RegisterFlag = registerFlag;
        }

        /// <summary>
        /// 注入到 js 引擎的实例对象
        /// </summary>
        /// <param name="name">全路径名</param>
        /// <param name="obj">注入的实例对象</param>
        /// <param name="type">注册操作类型</param>
        public HostInstance(string name, object obj, Type type, RegisterFlag registerFlag = RegisterFlag.InjectAndInterface)
        {
            Name = name;
            Obj = obj;
            Type = type;
            RegisterFlag = registerFlag;
        }
    }
}
