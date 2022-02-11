using System;
using System.Reflection;

namespace Calljs.declare
{
    internal class ParamDecType : DeclareBase
    {
        public override string DeclareType => "param";

        // 参数类型
        public TypeDeclare Type { get; set; }

        // 是否是可变参数
        public bool IsParams { get; set; } = false;

        // 是否有默认值
        public bool HasDefaultValue { get; } = false;

        public MethodDeclare MethodDeclare { get; }

        public ConstructorDeclare ConstructorDeclare { get; }

        public FunctionDeclare FunctionDeclare { get; }

        public ParamDecType(MethodDeclare methodDeclare, ParameterInfo parameterInfo)
        {
            HasDefaultValue = parameterInfo.HasDefaultValue;
            MethodDeclare = methodDeclare;
            Name = parameterInfo.Name;
            IsParams = parameterInfo.GetCustomAttributes(typeof(ParamArrayAttribute), false).Length > 0;

            //如果是指定类型
            Attribute attribute;
            if ((attribute = Attribute.GetCustomAttribute(parameterInfo, typeof(JsParamType), false)) != null)
            {
                JsParamType attr = (JsParamType)attribute;
                if (attr.CustomType)
                {
                    Type = TypeDeclare.CreateFreeType(attr.TypeStr, false);
                }
                else
                {
                    Type = TypeDeclare.Register(attr.Type, null, MethodDeclare.ClassDeclare, MethodDeclare, true);
                }
            }
            else
            {
                Type = TypeDeclare.Register(parameterInfo.ParameterType, null, MethodDeclare.ClassDeclare, MethodDeclare, true);
            }
        }

        public ParamDecType(ConstructorDeclare constructorDeclare, ParameterInfo parameterInfo)
        {
            HasDefaultValue = parameterInfo.HasDefaultValue;
            ConstructorDeclare = constructorDeclare;
            Name = parameterInfo.Name;
            IsParams = parameterInfo.GetCustomAttributes(typeof(ParamArrayAttribute), false).Length > 0;

            //如果是指定类型
            Attribute attribute;
            if ((attribute = Attribute.GetCustomAttribute(parameterInfo, typeof(JsParamType), false)) != null)
            {
                JsParamType attr = (JsParamType)attribute;
                if (attr.CustomType)
                {
                    Type = TypeDeclare.CreateFreeType(attr.TypeStr, false);
                }
                else
                {
                    Type = TypeDeclare.Register(attr.Type, null, ConstructorDeclare.ClassDeclare, null, true);
                }
            }
            else
            {
                Type = TypeDeclare.Register(parameterInfo.ParameterType, null, ConstructorDeclare.ClassDeclare, null, true);
            }
        }

        public ParamDecType(FunctionDeclare functionDeclare, ParameterInfo parameterInfo)
        {
            HasDefaultValue = parameterInfo.HasDefaultValue;
            FunctionDeclare = functionDeclare;
            Name = parameterInfo.Name;
            IsParams = parameterInfo.GetCustomAttributes(typeof(ParamArrayAttribute), false).Length > 0;

            //如果是指定类型
            Attribute attribute;
            if ((attribute = Attribute.GetCustomAttribute(parameterInfo, typeof(JsParamType), false)) != null)
            {
                JsParamType attr = (JsParamType)attribute;
                if (attr.CustomType)
                {
                    Type = TypeDeclare.CreateFreeType(attr.TypeStr, false);
                }
                else
                {
                    Type = TypeDeclare.Register(attr.Type, null, FunctionDeclare, true);
                }
            }
            else
            {
                Type = TypeDeclare.Register(parameterInfo.ParameterType, null, FunctionDeclare, true);
            }
        }
    }
}
