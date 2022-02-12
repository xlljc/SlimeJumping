using System;

namespace Calljs
{
    /// <summary>
    /// 用在参数上, 生成 .d.ts 文件使用指定的参数类型
    /// </summary>
    [AttributeUsage(AttributeTargets.Parameter)]
    public class JsParamType : Attribute
    {
        internal bool CustomType { get; }

        /// <summary>
        /// 类型的字符串描述
        /// </summary>
        public string TypeStr { get; }

        /// <summary>
        /// 使用指定类型
        /// </summary>
        public Type Type { get; }

        /// <summary>
        /// 使用指定类型
        /// </summary>
        public JsParamType(Type type)
        {
            CustomType = false;
            Type = type;
        }

        /// <summary>
        /// 使用自定义字符串来代替类型
        /// </summary>
        public JsParamType(string typeStr)
        {
            CustomType = true;
            TypeStr = typeStr;
        }

    }
}
