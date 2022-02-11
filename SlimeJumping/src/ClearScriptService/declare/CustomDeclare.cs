using System;
using System.Collections.Generic;

namespace Calljs.declare
{
    internal class CustomDeclare : DeclareBase
    {
        public override string DeclareType => "custom";

        // 实例集合
        public List<InstanceDeclare> InstanceList { get; } = new List<InstanceDeclare>();

        // 类型定义对象
        public TypeDeclare TypeDeclare { get; }

        // 是否可实例化
        public bool CanInstance { get; set; }

        // 自定义类型
        public string TypeStr { get; set; }

        // 是否排除当前类型生成
        public bool Ignore { get; set; } = false;

        public CustomDeclare(Type type, string tsFullName, string typeStr)
        {
            Name = tsFullName;
            TypeDeclare = TypeDeclare.Register(type, tsFullName);
            TypeStr = typeStr;
        }
    }
}
