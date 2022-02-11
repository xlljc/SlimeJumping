using System;

namespace Calljs
{
    [AttributeUsage(AttributeTargets.Parameter)]
    public class JsParamType : Attribute
    {
        internal bool CustomType { get; }

        public string TypeStr { get; }
        public Type Type { get; }

        public JsParamType(Type type)
        {
            CustomType = false;
            Type = type;
        }

        public JsParamType(string typeStr)
        {
            CustomType = true;
            TypeStr = typeStr;
        }

    }
}
