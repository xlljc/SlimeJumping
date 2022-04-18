using System;
using System.Reflection;
using Namotion.Reflection;

namespace JsService.generate
{
    // 字段列表
    internal class FieldDeclare : DeclareBase
    {
        public override string DeclareType => "field";

        // 是否是静态
        public bool IsStatic { get; set; } = false;

        // 是否只读
        public bool IsReadonly { get; set; } = false;

        // 值类型
        public TypeDeclare Type { get; set; } = TypeDeclare.Any;

        public ClassDeclare ClassDeclare { get; }

        //注释
        public string DocSummary { get; private set; }

        public FieldDeclare(ClassDeclare classDeclare, FieldInfo field)
        {
            ClassDeclare = classDeclare;
            Name = field.Name;
            IsStatic = field.IsStatic;
            IsReadonly = field.IsInitOnly | field.IsLiteral;
            //如果是指定类型
            Attribute attribute;
            if ((attribute = Attribute.GetCustomAttribute(field, typeof(JsFieldType), false)) != null)
            {
                JsFieldType attr = (JsFieldType) attribute;
                if (attr.CustomType)
                {
                    Type = TypeDeclare.CreateFreeType(null, attr.TypeStr, false);
                }
                else
                {
                    Type = TypeDeclare.Register(attr.Type, null, ClassDeclare, null, true);
                }
            }
            else
            {
                Type = TypeDeclare.Register(field.FieldType, null, ClassDeclare, null, true);
            }
            //读取注释
            DocSummary = field.GetXmlDocsSummary();
        }

        public string GetDocument(string nspTab)
        {
            return TypeDeclare.GetFormatDocument(nspTab, DocSummary);
        }
    }
}
