using System;
using System.Reflection;

namespace Calljs.declare
{
    internal class PropertyDeclare : DeclareBase
    {
        public override string DeclareType => "property";

        public PropertyType PropertyType { get; set; } = PropertyType.Read;

        // 是否是静态
        public bool IsStatic { get; set; } = false;

        // 数据类型
        public TypeDeclare Type { get; set; } = TypeDeclare.Any;

        public ClassDeclare ClassDeclare { get; }

        public PropertyDeclare(ClassDeclare classDeclare, PropertyInfo property, PropertyType propertyType)
        {
            ClassDeclare = classDeclare;
            PropertyType = propertyType;
            Name = property.Name;
            //如果是指定类型
            Attribute attribute;
            if ((attribute = Attribute.GetCustomAttribute(property, typeof(JsPropertyType), false)) != null)
            {
                JsPropertyType attr = (JsPropertyType)attribute;
                if (attr.CustomType)
                {
                    Type = TypeDeclare.CreateFreeType(attr.TypeStr, false);
                }
                else
                {
                    Type = TypeDeclare.Register(attr.Type, null, ClassDeclare, null, true);
                }
            }
            else
            {
                Type = TypeDeclare.Register(property.PropertyType, null, ClassDeclare, null, true);
            }
            MethodInfo m;
            if (propertyType == PropertyType.Read)
            {
                m = property.GetMethod;
            }
            else
            {
                m = property.SetMethod;
            }
            IsStatic = m.IsStatic;
        }
    }

    public enum PropertyType
    {
        Read = 0,
        Write = 1,
    }
}
