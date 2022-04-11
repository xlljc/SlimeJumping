using System.Collections.Generic;
using System.Reflection;
using Namotion.Reflection;

namespace JsService.generate
{
    internal class ConstructorDeclare : DeclareBase
    {
        public override string DeclareType => "constructor";

        // 参数列表
        public List<ParamDecType> Params { get; set; } = new List<ParamDecType>();

        public ClassDeclare ClassDeclare { get; }

        //注释
        public string DocSummary { get; private set; }

        public ConstructorDeclare(ClassDeclare classDeclare, ConstructorInfo constructorInfo)
        {
            ClassDeclare = classDeclare;
            ParameterInfo[] parameterInfos = constructorInfo.GetParameters();
            foreach (var parameterInfo in parameterInfos)
            {
                Params.Add(new ParamDecType(this, parameterInfo));
            }
            //读取注释
            DocSummary = constructorInfo.GetXmlDocsSummary();
        }

        public string GetDocument(string nspTab)
        {
            return TypeDeclare.GetFormatDocument(nspTab, DocSummary);
        }
    }
}
