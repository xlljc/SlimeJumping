using System;


namespace Calljs
{
    [AttributeUsage(AttributeTargets.Field)]
    public class JsFieldType : Attribute
    {
        internal bool CustomType { get; }

        public string TypeStr { get; }
        public Type Type { get; }

        public JsFieldType(Type type)
        {
            CustomType = false;
            Type = type;
        }

        public JsFieldType(string typeStr)
        {
            CustomType = true;
            TypeStr = typeStr;
        }
    }
}
