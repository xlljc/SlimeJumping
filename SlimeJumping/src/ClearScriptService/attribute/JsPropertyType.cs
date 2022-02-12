using System;

namespace Calljs
{
    /// <summary>
    /// 用在属性上, 生成 .d.ts 文件时指定类型
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class JsPropertyType : Attribute
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
        public JsPropertyType(Type type)
        {
            CustomType = false;
            Type = type;
        }

        /// <summary>
        /// 使用自定义字符串来代替类型
        /// </summary>
        public JsPropertyType(string typeStr)
        {
            CustomType = true;
            TypeStr = typeStr;
        }
    }
}
