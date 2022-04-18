using System;
using System.Collections.Generic;
using System.Reflection;
using Namotion.Reflection;

namespace JsService.generate
{
    internal class FunctionDeclare : DeclareBase
    {
        public override string DeclareType => "function";

        // 参数列表
        public List<ParamDecType> Params { get; set; } = new List<ParamDecType>();

        // 返回值类型
        public TypeDeclare ReturnType { get; set; } = TypeDeclare.Void;

        // ts 模块名
        public string Module { get; set; } = "";

        // ts 名称
        public string TsName { get; set; }

        // ts 命名空间
        public string TsNamespace { get; set; }

        // 方法类型对象
        public MethodInfo MethodInfo { get; }

        //注释
        public string DocSummary { get; private set; }

        //返回值注释
        public string DocReturns { get; private set; }

        public FunctionDeclare(MethodInfo methodInfo, string module, string name)
        {
            MethodInfo = methodInfo;
            Name = name;
            if (module != null)
            {
                Module = module;
            }
            TsName = TypeDeclare.GetName(name);
            TsNamespace = TypeDeclare.GetNamespace(name);
            Attribute attribute;
            if ((attribute = Attribute.GetCustomAttribute(methodInfo, typeof(JsReturnType), false)) != null)
            {
                JsReturnType attr = (JsReturnType)attribute;
                if (attr.CustomType)
                {
                    ReturnType = TypeDeclare.CreateFreeType(null, attr.TypeStr, false);
                }
                else
                {
                    ReturnType = TypeDeclare.Register(attr.Type, null, null, null, true);
                }
            }
            else
            {
                ReturnType = TypeDeclare.Register(methodInfo.ReturnType, null, null, null, true);
            }
            ParameterInfo[] parameterInfos = MethodInfo.GetParameters();
            foreach (var parameterInfo in parameterInfos)
            {
                Params.Add(new ParamDecType(this, parameterInfo));
            }
            //注册类型
            TypeDeclare.RegisterPlaceholder(null, module, name);
            //读取注释
            DocSummary = methodInfo.GetXmlDocsSummary();
            DocReturns = methodInfo.GetXmlDocsTag("returns");
        }

        public string GetDocument(string nspTab)
        {
            return TypeDeclare.GetFormatDocument(nspTab, DocSummary, Params, DocReturns);
        }
    }
}
