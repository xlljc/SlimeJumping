using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace JsService.generate
{
    internal class TypeDeclare : DeclareBase
    {
        public override string DeclareType => "type";

        /// <summary>
        /// 是否是数组
        /// </summary>
        public bool IsArray { get; set; } = false;

        /// <summary>
        /// 数组维数
        /// </summary>
        public int ArrayRank { get; set; } = -1;

        /// <summary>
        /// 类型对象
        /// </summary>
        public TsType RefType { get; set; }

        /// <summary>
        /// 是否为引用参数
        /// </summary>
        public bool IsRef { get; set; }

        /// <summary>
        /// 包含的泛型类
        /// </summary>
        public List<TypeDeclare> GenericTypes { get; set; }

        private TypeDeclare()
        {
        }

        private TypeDeclare(Type type, string name)
        {
            Name = name;
            IsArray = type.IsArray;
            if (IsArray)
            {
                //ArrayRank = type.GetArrayRank();
                Type temp = type;
                do
                {
                    ++ArrayRank;
                    temp = temp.GetElementType();
                } while (temp != null);
            }
        }

        public override string GetFormatString()
        {
            return GetFormatString(false);
        }

        public string GetFormatString(bool isParams)
        {
            var len = RefType.GenericCount;
            if (len > 0) //有泛型
            {
                string str = null;
                for (int i = 0; i < len; i++)
                {
                    if (str != null)
                    {
                        str += ", ";
                    }
                    if (GenericTypes == null || i >= GenericTypes.Count)
                    {
                        str += "any";
                    }
                    else
                    {
                        TypeDeclare temp = GenericTypes[i];
                        if (temp.IsArray)
                        {
                            str += FormatArrRank(temp.GetFormatString(), ArrayRank);
                        }
                        else
                        {
                            str += temp.RefType.GetParamStr();
                        }
                    }
                }
                if (isParams)
                {
                    return FormatArrRank($"{RefType.GetImportStr()}<{str}>", ArrayRank - 1) + "[]";
                }
                else if (IsArray)
                {
                    str += FormatArrRank($"{RefType.GetImportStr()}<{str}>", ArrayRank);
                }
                return $"{RefType.GetImportStr()}<{str}>";
            }
            else //无泛型
            {
                if (isParams)
                {
                    return FormatArrRank(RefType.GetImportStr(), ArrayRank - 1) + "[]";
                }
                else if (IsArray)
                {
                    return FormatArrRank(RefType.GetImportStr(), ArrayRank);
                }
                return RefType.GetImportStr();
            }
        }

        private string FormatArrRank(string type, int rank)
        {
            string str = type;
            for (int i = 0; i < rank; i++)
            {
                str = "CsArray<" + str + ">";
            }
            return str;
        }

        /// <summary>
        /// 注册Ts类型 key: C#类全名  value: TypeData对象
        /// </summary>
        public static Dictionary<string, TsType> RegisterType { get; } = new Dictionary<string, TsType>();

        /// <summary>
        /// 获取注册类型
        /// </summary>
        /// <param name="fullName">C#类全名</param>
        /// <returns></returns>
        public static TsType GetType(string fullName)
        {
            RegisterType.TryGetValue(fullName, out TsType tsType);
            return tsType;
        }

        /// <summary>
        /// 给类型起一个别名
        /// </summary>
        /// <param name="fullName">cs类全名</param>
        /// <param name="tsFullName">ts类全名</param>
        public static void Alias(string fullName, string tsFullName)
        {
            var typeData = GetType(fullName);
            if (typeData != null)
            {
                typeData.TsFullName = tsFullName;
            }
            else
            {
                typeData = new TsType(null, fullName, tsFullName);
                RegisterType.Add(fullName, typeData);
            }
        }

        /// <summary>
        /// 注册占位对象
        /// </summary>
        public static void RegisterPlaceholder(string module, string tsFullName)
        {
            new TsType(module, tsFullName).IsDetails = true;
        }

        /// <summary>
        /// 注册并返回类型, 如果已经存在, 就返回存在的对象
        /// </summary>
        public static TypeDeclare Register(Type type, string tsFullName = null)
        {
            return Register(type, tsFullName, null, null, null, false);
        }

        /// <summary>
        /// 注册并返回类型, 如果已经存在, 就返回存在的对象
        /// </summary>
        public static TypeDeclare Register(Type type, string tsFullName, ClassDeclare classDeclare, MethodDeclare methodDeclare, bool filtrGeneric)
        {
            return Register(type, tsFullName, classDeclare, methodDeclare, null, filtrGeneric);
        }

        /// <summary>
        /// 注册并返回类型, 如果已经存在, 就返回存在的对象
        /// </summary>
        public static TypeDeclare Register(Type type, string tsFullName, FunctionDeclare functionDeclare, bool filtrGeneric)
        {
            return Register(type, tsFullName, null, null, functionDeclare, filtrGeneric);
        }

        private static TypeDeclare Register(Type type, string tsFullName, ClassDeclare classDeclare, MethodDeclare methodDeclare, FunctionDeclare functionDeclare, bool filtrGeneric)
        {
            // 获取Cs对象真实名称
            string fullName = GetCsFullName(type);
            //真实类名
            string name = GetName(fullName);

            // 是否是泛型
            if (filtrGeneric && IsGeneric(name, classDeclare, methodDeclare, functionDeclare))
            {
                return CreateFreeType(fullName, true);
            }

            TsType typeData;
            if (RegisterType.ContainsKey(fullName)) //如果已经注册
            {
                typeData = GetType(fullName);
                if (tsFullName != null)
                {
                    // 改名
                    typeData.TsFullName = tsFullName;
                }
            }
            else //如果当前类型没有被注册
            {
                typeData = new TsType(null, fullName, tsFullName);
                typeData.GenericCount = type.GetGenericArguments().Length;
                RegisterType.Add(fullName, typeData);
            }
            TypeDeclare typeDeclare = new TypeDeclare(type, name);
            typeDeclare.RefType = typeData;
            //子泛型
            Type[] gTypes = type.GetGenericArguments();
            if (gTypes.Length > 0)
            {
                typeDeclare.GenericTypes = new List<TypeDeclare>();
                foreach (var gType in gTypes)
                {
                    typeDeclare.GenericTypes.Add(Register(gType, null, classDeclare, methodDeclare, functionDeclare, true));
                }
            }
            return typeDeclare;
        }

        /// <summary>
        /// 创建一个游离类型, 该类型不会注册到 TsType 中
        /// </summary>
        public static TypeDeclare CreateFreeType(string tName, bool isGeneric)
        {
            var g = new TypeDeclare();
            g.Name = tName;
            g.RefType = new TsType(tName, isGeneric);
            return g;
        }

        /// <summary>
        /// 获取Cs代码中真实的全名称
        /// </summary>
        public static string GetCsFullName(Type type)
        {
            if (type.FullName != null)
            {
                return GetRealName(type.FullName);
            }
            return GetRealName(type.Name);
        }

        /// <summary>
        /// 获取真实的全名称 (不带泛型和数组)
        /// </summary>
        public static string GetRealName(string name)
        {
            var data = Regex.Match(name, @"[\w\.+]+");
            return data.Value.Replace("+", ".");
        }

        /// <summary>
        /// 获取带泛型的全称
        /// </summary>
        public static string GetTypeGenericName(string name)
        {
            return GetAssemblyName(name).Replace("+", ".");
        }

        /// <summary>
        /// 获取程序集全称
        /// </summary>
        public static string GetAssemblyName(string name)
        {
            var data = Regex.Match(name, @"[\w\.`+]+");
            return data.Value;
        }

        /// <summary>
        /// 获取名称
        /// </summary>
        public static string GetName(string fullName)
        {
            int i = fullName.LastIndexOf('.');
            if (i >= 0)
            {
                return fullName.Substring(i + 1);
            }
            return fullName;
        }

        /// <summary>
        /// 获取命名空间的名称
        /// </summary>
        public static string GetNamespace(string fullName)
        {
            int i = fullName.LastIndexOf('.');
            if (i >= 0)
            {
                return fullName.Substring(0, i);
            }
            return "globalThis";
        }

        internal static string GetFormatDocument(string nspTab, string summary, List<ParamDecType> pds = null, string rt = null)
        {
            string doc = "";
            if (!string.IsNullOrEmpty(summary))
            {
                doc += nspTab + " * " + summary.Replace("\n", "\n" + nspTab + " * ") + "\n";
            }
            if (pds != null)
            {
                foreach (var item in pds)
                {
                    if (!string.IsNullOrEmpty(item.DocSummary))
                    {
                        doc += nspTab + " * @params " + item.Name + " " + item.DocSummary.Replace("\n", "\n" + nspTab + " * ") + "\n";
                    }
                }
            }
            if (!string.IsNullOrEmpty(rt))
            {
                doc += nspTab + " * @returns " + rt.Replace("\n", "\n" + nspTab + " * ") + "\n";
            }
            if (!string.IsNullOrEmpty(doc))
            {
                doc = nspTab + "/**\n" + doc + nspTab + "*/\n";
            }
            return doc;
        }

        // 检测是否是泛型
        private static bool IsGeneric(string name, ClassDeclare classDeclare, MethodDeclare methodDeclare, FunctionDeclare functionDeclare)
        {
            if (classDeclare != null && classDeclare.ClsType != null)
            {
                var gs = classDeclare.ClsType.GetGenericArguments();
                if (gs != null)
                {
                    foreach (var g in gs)
                        if (g.Name == name)
                            return true;
                }
            }
            if (methodDeclare != null && methodDeclare.MethodInfo != null)
            {
                var gs = methodDeclare.MethodInfo.GetGenericArguments();
                if (gs != null)
                {
                    foreach (var g in gs)
                        if (g.Name == name)
                            return true;
                }
            }
            if (functionDeclare != null && functionDeclare.MethodInfo != null)
            {
                var fs = functionDeclare.MethodInfo.GetGenericArguments();
                if (fs != null)
                {
                    foreach (var g in fs)
                        if (g.Name == name)
                            return true;
                }
            }
            return false;
        }

        private static TypeDeclare _anyType;
        public static TypeDeclare Any
        {
            get
            {
                if (_anyType == null)
                {
                    _anyType = Register(typeof(object));
                }
                return _anyType;
            }
        }

        private static TypeDeclare _voidType;
        public static TypeDeclare Void
        {
            get
            {
                if (_voidType == null)
                {
                    _voidType = Register(typeof(void));
                }
                return _voidType;
            }
        }
    }
}
