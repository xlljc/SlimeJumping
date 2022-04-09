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
        /// 是否生成对应的 d.ts 代码
        /// </summary>
        public bool IsWriteTs { get; set; }

        /// <summary>
        /// 指定生成的的类型
        /// </summary>
        public Type Type { get; set; }

        /// <summary>
        /// 注入到 js 引擎的函数对象
        /// </summary>
        /// <param name="name">全路径名</param>
        /// <param name="methodInfo">注入的函数对象</param>
        /// <param name="isWriteTs">是否生成对应的ts代码</param>
        public HostFunction(string name, MethodInfo methodInfo, bool isWriteTs = true)
        {
            Name = name;
            MethodInfo = methodInfo;
            IsWriteTs = isWriteTs;
        }

        /// <summary>
        /// 注入到 js 引擎的函数对象
        /// </summary>
        /// <param name="name">全路径名</param>
        /// <param name="methodInfo">注入的函数对象</param>
        /// <param name="type">使用指定的类型替换掉生成的ts代码</param>
        public HostFunction(string name, MethodInfo methodInfo, Type type)
        {
            Name = name;
            MethodInfo = methodInfo;
            Type = type;
            IsWriteTs = true;
        }
    }
}
