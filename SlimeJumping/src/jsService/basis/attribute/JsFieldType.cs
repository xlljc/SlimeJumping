using System;


namespace JsService
{
    /// <summary>
    /// 用作字段上, 生成 .d.ts 文件时指定类型
    /// </summary>
    [AttributeUsage(AttributeTargets.Field)]
    public class JsFieldType : Attribute
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
        public JsFieldType(Type type)
        {
            CustomType = false;
            Type = type;
        }

        /// <summary>
        /// 使用自定义字符串来代替类型
        /// </summary>
        public JsFieldType(string typeStr)
        {
            CustomType = true;
            TypeStr = typeStr;
        }
    }
}
