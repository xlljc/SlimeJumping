using System;
using System.Collections.Generic;
using System.Reflection;

namespace JsService.generate
{
    internal class FunctionDeclare : DeclareBase
    {
        public override string DeclareType => "function";

        // 参数列表
        public List<ParamDecType> Params { get; set; } = new List<ParamDecType>();

        // 返回值类型
        public TypeDeclare ReturnType { get; set; } = TypeDeclare.Void;

        public Type FuncType { get; }

        // 方法类型对象
        public MethodInfo MethodInfo { get; }

        // 定义类型
        public TypeDeclare TypeDeclare { get; }

        //
        public bool CanInstance { get; set; }

        // 实例集合
        public List<InstanceDeclare> InstanceList { get; } = new List<InstanceDeclare>();

        public FunctionDeclare(Type type, string name)
        {
            MethodInfo = type.GetMethod("Invoke");
            Name = name;
            ReturnType = TypeDeclare.Register(MethodInfo.ReturnType, null, this, true);
            ParameterInfo[] parameterInfos = MethodInfo.GetParameters();
            foreach (var parameterInfo in parameterInfos)
            {
                Params.Add(new ParamDecType(this, parameterInfo));
            }
            //注册类型
            TypeDeclare = TypeDeclare.Register(type, name);
        }

        public FunctionDeclare(MethodInfo methodInfo, string name)
        {
            MethodInfo = methodInfo;
            Name = name;
            //ReturnType = TypeDeclare.Register(MethodInfo.ReturnType, null, this, true);
            //如果是指定类型
            Attribute attribute;
            if ((attribute = Attribute.GetCustomAttribute(methodInfo, typeof(JsReturnType), false)) != null)
            {
                JsReturnType attr = (JsReturnType)attribute;
                if (attr.CustomType)
                {
                    ReturnType = TypeDeclare.CreateFreeType(attr.TypeStr, false);
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
        }
    }
}
