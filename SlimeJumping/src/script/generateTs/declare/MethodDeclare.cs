using System;
using System.Collections.Generic;
using System.Reflection;
using Namotion.Reflection;

namespace JsService.generate
{
    internal class MethodDeclare : DeclareBase
    {
        public override string DeclareType => "method";

        // 是否是静态
        public bool IsStatic { get; set; } = false;

        // 参数列表
        public List<ParamDecType> Params { get; set; } = new List<ParamDecType>();

        // 返回值类型
        public TypeDeclare ReturnType { get; set; } = TypeDeclare.Void;

        // 包含的泛型类
        public List<TypeDeclare> GenericTypes { get; set; }

        public ClassDeclare ClassDeclare { get; }

        public MethodInfo MethodInfo { get; }

        //注释
        public string DocSummary { get; private set; }

        //返回值注释
        public string DocReturns { get; private set; }

        public MethodDeclare(ClassDeclare classDeclare, MethodInfo method)
        {
            MethodInfo = method;
            ClassDeclare = classDeclare;
            Name = method.Name;
            IsStatic = method.IsStatic;
            //如果是指定类型
            Attribute attribute;
            if ((attribute = Attribute.GetCustomAttribute(method, typeof(JsReturnType), false)) != null)
            {
                JsReturnType attr = (JsReturnType)attribute;
                if (attr.CustomType)
                {
                    ReturnType  = TypeDeclare.CreateFreeType(attr.TypeStr, false);
                }
                else
                {
                    ReturnType = TypeDeclare.Register(attr.Type, null, classDeclare, null, true);
                }
            }
            else
            {
                ReturnType = TypeDeclare.Register(method.ReturnType, null, classDeclare, this, true);
            }

            ParameterInfo[] parameterInfos = method.GetParameters();
            foreach (var parameterInfo in parameterInfos)
            {
                Params.Add(new ParamDecType(this, parameterInfo));
            }
            //子泛型
            Type[] gTypes = method.GetGenericArguments();
            if (gTypes.Length > 0)
            {
                GenericTypes = new List<TypeDeclare>();
                foreach (var gType in gTypes)
                {
                    GenericTypes.Add(TypeDeclare.Register(gType, null, ClassDeclare, this, true));
                }
            }
            //读取注释
            DocSummary = method.GetXmlDocsSummary();
            DocReturns = method.GetXmlDocsTag("returns");
        }

        public string GetGenericString()
        {
            if (GenericTypes != null) //有泛型
            {
                string str = null;
                foreach (var type in GenericTypes)
                {
                    if (str != null)
                    {
                        str += ", ";
                    }
                    str += type.RefType.TsFullName;
                }
                return $"<{str}>";
            }
            return "";
        }

        public string GetGenericParamString()
        {
            if (GenericTypes != null) //有泛型
            {
                string str = null;
                foreach (var type in GenericTypes)
                {
                    str += $"type{type.RefType.TsFullName}: any, ";
                }
                return str;
            }
            return "";
        }

        public string GetDocument(string nspTab)
        {
            return TypeDeclare.GetFormatDocument(nspTab, DocSummary, Params, DocReturns);
        }
    }
}
