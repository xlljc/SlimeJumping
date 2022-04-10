using System.Reflection;
using System;

namespace JsService
{
    /// <summary>
    /// 主机函数
    /// </summary>
    public class HostFunction
    {
        /// <summary>
        /// 脚本中的对象名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 脚本中的函数对象
        /// </summary>
        public MethodInfo MethodInfo { get; set; }

        /// <summary>
        /// 注册操作类型
        /// </summary>
        public RegisterFlag RegisterFlag { get; set; }

        /// <summary>
        /// 指定生成的的类型
        /// </summary>
        public Type Type { get; set; }

        /// <summary>
        /// 注入到 js 引擎的函数对象
        /// </summary>
        /// <param name="name">全路径名</param>
        /// <param name="methodInfo">注入的函数对象</param>
        /// <param name="registerFlag">注册操作类型</param>
        public HostFunction(string name, MethodInfo methodInfo, RegisterFlag registerFlag = RegisterFlag.InjectAndInterface)
        {
            Name = name;
            MethodInfo = methodInfo;
            RegisterFlag = registerFlag;
        }

        /// <summary>
        /// 注入到 js 引擎的函数对象
        /// </summary>
        /// <param name="name">全路径名</param>
        /// <param name="methodInfo">注入的函数对象</param>
        /// <param name="type">使用指定的类型替换掉生成的ts代码</param>
        public HostFunction(string name, MethodInfo methodInfo, Type type, RegisterFlag registerFlag = RegisterFlag.InjectAndInterface)
        {
            Name = name;
            MethodInfo = methodInfo;
            Type = type;
            RegisterFlag = registerFlag;
        }
    }
}
