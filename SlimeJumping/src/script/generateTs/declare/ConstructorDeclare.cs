using System.Collections.Generic;
using System.Reflection;

namespace JsService.generate
{
    internal class ConstructorDeclare : DeclareBase
    {
        public override string DeclareType => "constructor";

        // 参数列表
        public List<ParamDecType> Params { get; set; } = new List<ParamDecType>();

        public ClassDeclare ClassDeclare { get; }

        public ConstructorDeclare(ClassDeclare classDeclare, ConstructorInfo constructorInfo)
        {
            ClassDeclare = classDeclare;
            ParameterInfo[] parameterInfos = constructorInfo.GetParameters();
            foreach (var parameterInfo in parameterInfos)
            {
                Params.Add(new ParamDecType(this, parameterInfo));
            }
        }
    }
}
