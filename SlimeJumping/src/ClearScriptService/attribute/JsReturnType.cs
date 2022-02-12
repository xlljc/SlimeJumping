using System;

namespace Calljs
{
    /// <summary>
    /// 用在函数上, 指定函数返回值类型, 生成 .d.ts 文件时指定类型
    /// </summary>
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Delegate)]
    public class JsReturnType : Attribute
    {
        internal bool CustomType { get; }

        /// <summary>
        /// 类型的字符串描述
        /// </summary>
        public string TypeStr { get; }

        /// <summary>
        /// 指定的类型
        /// </summary>
        public Type Type { get; }

        /// <summary>
        /// 使用指定类型
        /// </summary>
        public JsReturnType(Type type)
        {
            CustomType = false;
            Type = type;
        }

        /// <summary>
        /// 使用自定义字符串来代替类型
        /// </summary>
        public JsReturnType(string typeStr)
        {
            CustomType = true;
            TypeStr = typeStr;
        }
    }
}
