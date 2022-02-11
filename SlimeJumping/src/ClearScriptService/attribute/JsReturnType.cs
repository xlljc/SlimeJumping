using System;

namespace Calljs
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Delegate)]
    public class JsReturnType : Attribute
    {
        internal bool CustomType { get; }

        public string TypeStr { get; }
        public Type Type { get; }

        public JsReturnType(Type type)
        {
            CustomType = false;
            Type = type;
        }

        public JsReturnType(string typeStr)
        {
            CustomType = true;
            TypeStr = typeStr;
        }

    }
}
