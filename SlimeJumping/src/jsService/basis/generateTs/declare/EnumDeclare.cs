using System;
using System.Collections.Generic;

namespace JsService.generate
{
    internal class EnumDeclare : DeclareBase
    {
        public override string DeclareType => "enum";
        // 枚举项
        public List<string> Item { get; set; } = new List<string>();

        // 实例集合
        public List<InstanceDeclare> InstanceList { get; } = new List<InstanceDeclare>();

        // 类型定义对象
        public TypeDeclare TypeDeclare { get; }

        // 是否可实例化
        public bool CanInstance { get; set; }

        public EnumDeclare(Type type, string tsFullName)
        {
            Name = tsFullName;
            string[] vs = type.GetEnumNames();
            foreach (var s in vs)
            {
                Item.Add(s);
            }
            TypeDeclare = TypeDeclare.Register(type, tsFullName);
        }
    }
}
