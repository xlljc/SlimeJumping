using System;
using System.Collections.Generic;

namespace Calljs.declare
{
    internal class TsType
    {
        /// <summary>
        /// 所属模块的名称
        /// </summary>
        public string Module 
        {
            get => _module;
            set
            {
                if (value == null)
                {
                    _module = "";
                }
                else
                {
                    _module = value;
                }
            }
        }
        private string _module;

        /// <summary>
        /// C#真实名称
        /// </summary>
        public string FullName { get; }

        /// <summary>
        /// 在ts代码中的全名
        /// </summary>
        public string TsFullName
        {
            get { return _teFullName; }
            set
            {
                if (_teFullName == value)
                {
                    return;
                }
                if (_teFullName != null && value != _teFullName && InRuntimeing)
                {
                    throw new ArgumentException("已经注入到引擎运行环境中的对象不能改变名称: " + _teFullName);
                }
                if (!IsGeneric && !IsFree)
                {
                    MigrationRegisterTypes(this, _teFullName, Module, value);
                }

                _teFullName = value;
                TsName = TypeDeclare.GetName(value);
                TsNamespace = TypeDeclare.GetNamespace(value);
            }
        }
        private string _teFullName;

        /// <summary>
        /// 在ts代码中的名称
        /// </summary>
        public string TsName { get; private set; }

        /// <summary>
        /// 在ts代码中的命名空间
        /// </summary>
        public string TsNamespace { get; private set; }

        /// <summary>
        /// 是否已经加入到运行环境
        /// </summary>
        public bool InRuntimeing { get; set; } = false;

        /// <summary>
        /// 是否是泛型
        /// </summary>
        public bool IsGeneric { get; } = false;

        /// <summary>
        /// 是否是游离类型
        /// </summary>
        public bool IsFree { get; } = false;

        /// <summary>
        /// 子泛型数量
        /// </summary>
        public int GenericCount { get; set; } = 0;

        /// <summary>
        /// 是否是详细描述类型, 如果不是, 就会生成any类型
        /// </summary>
        public bool IsDetails { get; set; } = false;

        //注册类型
        public TsType(string module, string fullName, string tsFullName = null)
        {
            Module = module;
            FullName = fullName;
            if (tsFullName == null)
            {
                tsFullName = FullName;
            }
            TsFullName = tsFullName;
        }

        //游离类型, 不注册
        public TsType(string fullName, bool isGeneric)
        {
            IsFree = true;
            IsGeneric = isGeneric;

            Module = "";
            FullName = fullName;
            TsFullName = fullName;
        }

        public string GetParamStr()
        {
            if (GenericCount > 0) //有泛型
            {
                string str = null;
                for (int i = 0; i < GenericCount; i++)
                {
                    if (str != null)
                    {
                        str += ", ";
                    }
                    str += "any";
                }
                return GetImportStr() + $"<{str}>";
            }
            return GetImportStr();
        }

        public string GetTypeStr()
        {
            if (GenericCount > 0) //有泛型
            {
                string str = null;
                for (int i = 0; i < GenericCount; i++)
                {
                    if (str != null)
                    {
                        str += ", ";
                    }
                    str += (char)('T' + i) + " = any";
                }
                return $"{TsName}<{str}>";
            }
            return TsName;
        }

        public string GetImportStr()
        {
            return (Module == "" ? "" : $"import(\"{Module}\").") + TsFullName;
        }

        //运行环境下已经注册的对象 key: 模块 key1: tsfullName
        internal static Dictionary<string, Dictionary<string, TsType>> RegisterTsType { get; } = new Dictionary<string, Dictionary<string, TsType>>();

        /// <summary>
        /// 验证该路径是否存在对象, 如果存在, 则抛出异常
        /// </summary>
        internal static void ValidationContains(string module, string fullName)
        {
            if (module == null) module = "";
            if (RegisterTsType.ContainsKey(module) && RegisterTsType[module].ContainsKey(fullName))
            {
                throw new ArgumentException($"路径: {module} {fullName} 已经被注册, 不能重复注册!");
            }
        }

        /// <summary>
        /// 添加注册对象
        /// </summary>
        private static void AddToRegisterTypes(string module, string fullName, TsType tsType)
        {
            if (module == null) module = "";
            ValidationContains(module, fullName);

            Dictionary<string, TsType> temp;
            if (RegisterTsType.ContainsKey(module))
            {
                temp = RegisterTsType[module];
            }
            else
            {
                temp = new Dictionary<string, TsType>();
                RegisterTsType.Add(module, temp);
            }
            temp.Add(fullName, tsType);
        }

        /// <summary>
        /// 注册对象迁移
        /// </summary>
        private static void MigrationRegisterTypes(TsType tsType, string from, string toModule, string to)
        {
            if (from != null)
            {
                RegisterTsType[""].Remove(from);
            }
            AddToRegisterTypes(toModule, to, tsType);
        }
    }
}
