using System;

namespace Calljs
{
    [AttributeUsage(AttributeTargets.Property)]
    public class JsPropertyType : Attribute
    {
        internal bool CustomType { get; }

        public string TypeStr { get; }
        public Type Type { get; }

        public JsPropertyType(Type type)
        {
            CustomType = false;
            Type = type;
        }

        public JsPropertyType(string typeStr)
        {
            CustomType = true;
            TypeStr = typeStr;
        }
    }
}
