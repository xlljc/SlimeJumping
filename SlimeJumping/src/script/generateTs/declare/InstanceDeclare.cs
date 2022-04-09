using System;
using System.Reflection;

namespace JsService.generate
{
    internal class InstanceDeclare : DeclareBase
    {
        public override string DeclareType => "instance";

        // 数据类型
        public TypeDeclare Type { get; set; } = TypeDeclare.Any;

        public TsType TsType { get; }

        public InstanceDeclare(string module, string name, Type type)
        {
            Name = name;
            //注册类型
            TsType = new TsType(module, name);
            TsType.IsDetails = true;
            Type = TypeDeclare.Register(type, null);
        }

        public override string GetFormatString()
        {
            return TypeDeclare.GetName(Name);
        }

        public string GetNamespace()
        {
            return TypeDeclare.GetNamespace(Name);
        }
    }
}
