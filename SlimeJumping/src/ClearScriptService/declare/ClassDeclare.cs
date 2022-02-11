using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Calljs.declare
{
    internal class ClassDeclare : DeclareBase
    {
        public override string DeclareType => "class";

        // 是否是接口
        public bool IsInterface { get; }

        // 是否是抽象类
        public bool IsAbstract { get; }

        // 是否是结构体
        public bool IsStruct { get; }

        //构造函数列表
        public List<ConstructorDeclare> Constructors { get; } = new List<ConstructorDeclare>();

        //字段列表
        public List<FieldDeclare> Fields { get; } = new List<FieldDeclare>();

        //属性列表
        public List<PropertyDeclare> Propertys { get; } = new List<PropertyDeclare>();

        //函数列表
        public List<MethodDeclare> Methods { get; } = new List<MethodDeclare>();

        // 是否可以创建实例
        public bool CanInstance => _canInstance;
        private bool _canInstance = false;

        // 泛型类型
        public List<TypeDeclare> GenericTypes { get; private set; } = null;

        // 实例集合
        public List<InstanceDeclare> InstanceList { get; } = new List<InstanceDeclare>();

        // 类型定义对象
        public TypeDeclare TypeDeclare { get; }

        // C#类型对象
        public Type ClsType { get; }

        //父类
        public ClassDeclare BaseType { get; set; }

        //实现接口
        public List<ClassDeclare> ImplTypes { get; } = new List<ClassDeclare>();

        //导入的模块
        public List<TsType> ImportTypes { get; } = new List<TsType>();

        public ClassDeclare(Type type, string tsFullName)
        {
            ClsType = type;
            Name = tsFullName;
            IsInterface = type.IsInterface;
            IsAbstract = type.IsAbstract;
            IsStruct = type.IsValueType;

            // 获取字段
            FieldInfo[] fields = type.GetFields(InstanceBindFlags).Where(m => !m.IsSpecialName).ToArray();
            foreach (var field in fields)
            {
                if (!field.Name.EndsWith("k__BackingField"))
                {
                    //不是被排除
                    if (Attribute.GetCustomAttribute(field, typeof(IgnoreGenerate), false) == null)
                    {
                        Fields.Add(new FieldDeclare(this, field));
                    }
                }
            }
            // 获取属性
            PropertyInfo[] propertys = type.GetProperties(InstanceBindFlags).Where(m => !m.IsSpecialName).ToArray();
            foreach (var property in propertys)
            {
                //不是被排除
                if (Attribute.GetCustomAttribute(property, typeof(IgnoreGenerate), false) == null)
                {
                    if (property.CanRead && property.GetMethod.IsPublic)
                    {
                        Propertys.Add(new PropertyDeclare(this, property, PropertyType.Read));
                    }
                    if (property.CanWrite && property.SetMethod.IsPublic)
                    {
                        Propertys.Add(new PropertyDeclare(this, property, PropertyType.Write));
                    }
                }
            }
            // 获取构造函数
            ConstructorInfo[] constructors = type.GetConstructors(InstanceBindFlags);
            foreach (var constructor in constructors)
            {
                //不是被排除
                if (Attribute.GetCustomAttribute(constructor, typeof(IgnoreGenerate), false) == null)
                {
                    ConstructorDeclare data = new ConstructorDeclare(this, constructor);
                    data.Name = tsFullName;
                    Constructors.Add(data);
                }
            }
            //获取方法
            MethodInfo[] methods = type.GetMethods(InstanceBindFlags).Where(m => !m.IsSpecialName).ToArray();
            foreach (var method in methods)
            {
                if (method.Name != "GetType" && method.Name != "ToString" && method.Name != "Equals" && method.Name != "GetHashCode")
                {
                    //不是被排除
                    if (Attribute.GetCustomAttribute(method, typeof(IgnoreGenerate), false) == null)
                    {
                        Methods.Add(new MethodDeclare(this, method));
                    }
                }
            }
            //注册类型
            TypeDeclare = TypeDeclare.Register(type, tsFullName, this, null, false);
        }

        internal void SetCanInstance(bool v, Type type)
        {
            _canInstance = v;
            TypeDeclare.RefType.InRuntimeing = v;
            if (v == true)
            {
                Type[] gTypes = type.GetGenericArguments();
                if (gTypes.Length > 0)
                {
                    GenericTypes = new List<TypeDeclare>();
                    foreach (var gType in gTypes)
                    {
                        GenericTypes.Add(TypeDeclare.Register(gType, null, this, null, true));
                    }
                }
            }
        }

        //初始化导入
        public override void OnWrite()
        {
            if (BaseType != null)
            {
                TsType refType = BaseType.TypeDeclare.RefType;
                if (refType.Module != "" && !ImportTypes.Contains(refType))
                {
                    ImportTypes.Add(refType);
                }
            }
            foreach (var item in ImplTypes)
            {
                TsType refType = item.TypeDeclare.RefType;
                if (refType.Module != "" && !ImportTypes.Contains(refType))
                {
                    ImportTypes.Add(refType);
                }
            }
        }

        public string GetClassGenericString()
        {
            if (TypeDeclare.GenericTypes != null) //有泛型
            {
                string str = null;
                foreach (var type in TypeDeclare.GenericTypes)
                {
                    if (str != null)
                    {
                        str += ", ";
                    }
                    str += type.RefType.TsFullName + " = any";
                }
                return $"<{str}>";
            }
            return "";
        }

        public string GetClassGenericTypeString()
        {
            if (TypeDeclare.GenericTypes != null) //有泛型
            {
                string str = null;
                foreach (var type in TypeDeclare.GenericTypes)
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
                    if (type.RefType.IsGeneric)
                    {
                        str += "any";
                    }
                    else
                    {
                        str += type.RefType.GetParamStr();
                    }
                }
                return $"<{str}>";
            }
            return "";
        }

        public string GetExtendsString(string append)
        {
            if (BaseType == null && ImplTypes.Count == 0)
            {
                return "";
            }
            string str = " extends ";
            List<string> list = new List<string>();

            if (BaseType != null)
            {
                list.Add(__getString(BaseType, append));
            }
            foreach (var item in ImplTypes)
            {
                list.Add(__getString(item, append));
            }

            for (var i = 0; i < list.Count; i++)
            {
                if (i > 0)
                {
                    str += ", ";
                }
                str += list[i];
            }
            return str;
        }

        private string __getString(ClassDeclare cd, string append)
        {
            string str;
            TypeDeclare type = cd.TypeDeclare;
            if (type.RefType.Module == "")
            {
                str = type.RefType.TsFullName;
            }
            else
            {
                str = type.RefType.TsName;
            }
            return str + append;
        }

        public bool CanNew()
        {
            return !IsInterface && !IsAbstract;
        }

        internal static Type[] GetImplInterface(Type type)
        {
            return type.FindInterfaces((item, data) =>
            {
                return type.BaseType == null || !item.IsAssignableFrom(type.BaseType);
            }, null);
        }
    }
}
