using System;

namespace Calljs
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
        /// 是否生成对应的 d.ts 代码
        /// </summary>
        public bool IsWriteTs { get; set; }

        /// <summary>
        /// 自定义类型文本
        /// </summary>
        public string TypeStr { get; set; } = null;

        /// <summary>
        /// 注入到 js 引擎的类型对象
        /// </summary>
        /// <param name="name">全路径名</param>
        /// <param name="type">类型对象</param>
        /// <param name="isWriteTs">是否生成对应的ts代码</param>
        public HostType(string name, Type type, bool isWriteTs = true)
        {
            Name = name;
            Type = type;
            IsWriteTs = isWriteTs;
        }

        /// <summary>
        /// 注入到 js 引擎的类型对象
        /// </summary>
        /// <param name="name">全路径名</param>
        /// <param name="type">类型对象</param>
        /// <param name="typeStr">用指定的字符串替换生成的ts类型</param>
        public HostType(string name, Type type, string typeStr)
        {
            Name = name;
            Type = type;
            IsWriteTs = true;
            TypeStr = typeStr;
        }

        /// <summary>
        /// 初始化时调用
        /// </summary>
        public virtual void Init()
        {

        }
    }
}
