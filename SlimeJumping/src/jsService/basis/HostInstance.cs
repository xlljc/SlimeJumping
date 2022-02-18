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
        /// 是否生成对应的 d.ts 代码
        /// </summary>
        public bool IsWriteTs { get; set; }

        /// <summary>
        /// 指定生成的的类型
        /// </summary>
        public Type Type { get; set; }

        /// <summary>
        /// 是否是动态委托
        /// </summary>
        public bool IsDynamicFunc { get; set; } = false;

        /// <summary>
        /// 注入到 js 引擎的实例对象
        /// </summary>
        /// <param name="name">全路径名</param>
        /// <param name="obj">注入的实例对象</param>
        /// <param name="isWriteTs">是否生成对应的ts代码</param>
        public HostInstance(string name, object obj, bool isWriteTs = true)
        {
            Name = name;
            Obj = obj;
            IsWriteTs = isWriteTs;
        }

        /// <summary>
        /// 注入到 js 引擎的实例对象
        /// </summary>
        /// <param name="name">全路径名</param>
        /// <param name="obj">注入的实例对象</param>
        /// <param name="type">使用指定的类型替换掉生成的ts代码</param>
        public HostInstance(string name, object obj, Type type)
        {
            Name = name;
            Obj = obj;
            Type = type;
            IsWriteTs = true;
        }

        /// <summary>
        /// 初始化时调用
        /// </summary>
        public virtual void Init()
        {

        }
    }
}
