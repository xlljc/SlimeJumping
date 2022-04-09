using System.Reflection;
using System;
using System.Collections.Generic;
using System.IO;
using NVelocity;
using NVelocity.App;
using NVelocity.Runtime;

namespace JsService.generate
{
    /// <summary>
    /// Ts代码生成类
    /// </summary>
    public class GeneratesTs
    {
        /// <summary>
        /// 定义项, key: cs全名
        /// </summary>
        internal readonly Dictionary<string, DeclareBase> DecType = new Dictionary<string, DeclareBase>();

        /// <summary>
        /// 生成ts类时, 排除的引用类型和自定义类型
        /// </summary>
        internal readonly List<string> IgnoreTsType = new List<string>();

        internal bool wrote = false;

        //模板引擎
        private VelocityEngine _vltEngine;

        /// <summary>
        /// 模板引擎上下文对象
        /// </summary>
        private VelocityContext _vltContext;

        private int index = 0;

        public GeneratesTs()
        {

        }

        /// <summary>
        /// 添加类型到写出文件中
        /// </summary>
        /// <param name="module">模块名, 可以为null</param>
        /// <param name="hostType">主机类型</param>
        /// <exception cref="ArgumentException"></exception>
        public void AddType(string module, HostType hostType)
        {
            AddType(module, hostType, true);
        }

        internal void AddType(string module, HostType hostType, bool canInstance)
        {
            Type type = hostType.Type;
            // 当前类型全称
            var fullName = TypeDeclare.GetRealName(type.FullName);
            if (DecType.ContainsKey(fullName)) //更改路径
            {
                var dt = DecType[fullName];
                dt.Name = hostType.Name;
                bool flag = false;
                List<InstanceDeclare> instanceList = null;
                if (dt is ClassDeclare cdt && !cdt.CanInstance)
                {
                    if (hostType.TypeStr != null)
                    {
                        flag = true;
                        instanceList = cdt.InstanceList;
                    }
                    else
                    {
                        cdt.TypeDeclare.Name = hostType.Name;
                        cdt.TypeDeclare.RefType.Module = module;
                        cdt.TypeDeclare.RefType.TsFullName = hostType.Name;
                        cdt.SetCanInstance(true, type);
                    }
                }
                else if (dt is EnumDeclare edt && !edt.CanInstance)
                {
                    if (hostType.TypeStr != null)
                    {
                        flag = true;
                        instanceList = edt.InstanceList;
                    }
                    else
                    {
                        edt.CanInstance = true;
                        edt.TypeDeclare.Name = hostType.Name;
                        edt.TypeDeclare.RefType.Module = module;
                        edt.TypeDeclare.RefType.TsFullName = hostType.Name;
                    }
                }
                else if (dt is CustomDeclare cut && !cut.CanInstance)
                {
                    cut.CanInstance = true;
                    cut.TypeDeclare.Name = hostType.Name;
                    cut.TypeDeclare.RefType.Module = module;
                    cut.TypeDeclare.RefType.TsFullName = hostType.Name;
                }
                else
                {
                    throw new ArgumentException($"类型: {fullName} 已经被注册, 不能重复注册!");
                }
                if (flag)
                {
                    var custom = new CustomDeclare(type, hostType.Name, hostType.TypeStr);
                    custom.TypeDeclare.RefType.IsDetails = true;
                    custom.TypeDeclare.RefType.Module = module;
                    custom.CanInstance = canInstance;
                    custom.InstanceList.AddRange(instanceList);
                    DecType[fullName] = custom;
                }
            }
            else
            {
                if (hostType.TypeStr != null) //自定义类型内容
                {
                    var custom = new CustomDeclare(type, hostType.Name, hostType.TypeStr);
                    custom.TypeDeclare.RefType.IsDetails = true;
                    custom.TypeDeclare.RefType.Module = module;
                    custom.CanInstance = canInstance;
                    DecType.Add(fullName, custom);
                }
                else if (type.IsEnum) //枚举
                {
                    var enu = new EnumDeclare(type, hostType.Name);
                    enu.TypeDeclare.RefType.IsDetails = true;
                    enu.TypeDeclare.RefType.Module = module;
                    enu.CanInstance = canInstance;
                    DecType.Add(fullName, enu);
                }
                else //类
                {
                    var fullName2 = TypeDeclare.GetAssemblyName(type.FullName);
                    // 定义类型
                    var cls = new ClassDeclare(type.Assembly.GetType(fullName2), hostType.Name);
                    cls.TypeDeclare.RefType.IsDetails = true;
                    cls.TypeDeclare.RefType.Module = module;
                    cls.SetCanInstance(canInstance, type);
                    DecType.Add(fullName, cls);

                    //父类
                    if (type.BaseType != null)
                    {
                        string baseName = TypeDeclare.GetCsFullName(type.BaseType);
                        if (baseName != "System.Object")
                        {
                            if (!DecType.ContainsKey(baseName))
                            {
                                AddType(null, new HostType(baseName, type.BaseType), false);
                            }
                            cls.BaseType = (ClassDeclare)DecType[baseName];
                        }
                        //实现的接口
                        Type[] types = ClassDeclare.GetImplInterface(type);
                        foreach (var item in types)
                        {
                            string n = TypeDeclare.GetCsFullName(item);
                            if (!DecType.ContainsKey(n))
                            {
                                AddType(null, new HostType(n, item), false);
                            }
                            cls.ImplTypes.Add((ClassDeclare)DecType[n]);
                        }
                    }
                }
            }
        }

        /// <summary>
        /// 添加实例到写出文件中
        /// </summary>
        /// <param name="module">模块名, 可以为 null</param>
        /// <param name="hostInst">主机实例</param>
        public void AddInstance(string module, HostInstance hostInst)
        {
            Type type;
            if (hostInst.Type != null)
            {
                type = hostInst.Type;
            }
            else
            {
                type = hostInst.Obj.GetType();
            }
            //验证路径
            TsType.ValidationContains(module, hostInst.Name);

            //实例对象
            // 定义实例变量
            InstanceDeclare vd = new InstanceDeclare(module, hostInst.Name, type);

            // 当前类型全称
            var fullName = TypeDeclare.GetRealName(type.FullName);

            if (!DecType.ContainsKey(fullName))
            {
                AddType(module, new HostType(fullName, type), false);
            }
            DeclareBase declare = DecType[fullName];
            if (declare is ClassDeclare cls)
            {
                cls.InstanceList.Add(vd);
            }
            else if (declare is EnumDeclare edt)
            {
                edt.InstanceList.Add(vd);
            }
            else if (declare is CustomDeclare cut)
            {
                cut.InstanceList.Add(vd);
            }
        }

        /// <summary>
        /// 添加函数到写出文件中
        /// </summary>
        /// <param name="module">模块名, 可以为 null</param>
        /// <param name="hostInst">主机函数</param>
        public void AddFunction(string module, string csFullName, HostFunction hostFunction)
        {
            var fun = new FunctionDeclare(hostFunction.MethodInfo, module, hostFunction.Name);
            DecType.Add(csFullName + "#_" + index++, fun);
        }

        /// <summary>
        /// 给引用类型起别名, 如果该类型已经被注册到引擎, 则会抛出异常
        /// </summary>
        public void Alias(Type type, string name)
        {
            string fullName = TypeDeclare.GetCsFullName(type);
            TypeDeclare.Alias(fullName, name);
        }

        private void InitVelocityEngine()
        {
            // 排除类型
            IgnoreTsType.Add("void");
            IgnoreTsType.Add("any");
            IgnoreTsType.Add("number");
            IgnoreTsType.Add("object");
            IgnoreTsType.Add("undefined");
            IgnoreTsType.Add("null");
            IgnoreTsType.Add("CsArray");

            // 创建模板引擎
            _vltEngine = new VelocityEngine();
            _vltEngine.SetProperty(RuntimeConstants.INPUT_ENCODING, "utf-8");
            _vltEngine.SetProperty(RuntimeConstants.OUTPUT_ENCODING, "utf-8");
            _vltEngine.SetProperty(RuntimeConstants.RESOURCE_LOADER, "file");
            _vltEngine.SetProperty(RuntimeConstants.FILE_RESOURCE_LOADER_PATH, PuertsScriptManager.LoadPath);
            _vltEngine.Init();
            // 模板引擎上下文
            _vltContext = new VelocityContext();
        }

        /// <summary>
        /// 写出ts代码, 使用指定模板
        /// </summary>
        /// <param name="outFile">写出的文件路径</param>
        /// <param name="context">模板字符串</param>
        public void WriteByContext(string outFile, string context)
        {
            wrote = true;
            if (_vltEngine == null)
            {
                InitVelocityEngine();
            }
            //写出路径
            string writePath;
            try
            {
                writePath = Path.Combine(PuertsScriptManager.LoadPath, outFile);
                // 注入对象
                Inject();

                // 不存在路径就创建路径
                var dir = Path.GetDirectoryName(writePath);
                if (!Directory.Exists(dir))
                {
                    Directory.CreateDirectory(dir);
                }

                var sw = new StringWriter();
                _vltEngine.Evaluate(_vltContext, sw, "mystring", context);
                //写出文件
                string CodeContent = sw.ToString();
                File.WriteAllText(writePath, CodeContent);
            }
            catch (Exception e)
            {
                Godot.GD.PrintErr("模板引擎写出异常: " + e.Message);
                return;
            }
            Godot.GD.Print($"{writePath}写出成功!");
        }

        /// <summary>
        /// 将类型注入到模板引擎上下文对象
        /// </summary>
        private void Inject()
        {
            // 方法列表
            List<DeclareBase> funcList = new List<DeclareBase>();
            // 类列表
            List<DeclareBase> clsList = new List<DeclareBase>();
            // 枚举列表
            List<DeclareBase> enumList = new List<DeclareBase>();
            // 自定义类型
            List<DeclareBase> custList = new List<DeclareBase>();
            // 引用类型
            List<TsType> refList = new List<TsType>();

            foreach (var item in DecType)
            {
                item.Value.OnWrite();
                //类
                if (item.Value is ClassDeclare)
                {
                    clsList.Add(item.Value);
                }
                //枚举
                else if (item.Value is EnumDeclare)
                {
                    enumList.Add(item.Value);
                }
                //方法
                else if (item.Value is FunctionDeclare)
                {
                    if (!IgnoreTsType.Contains(item.Key))
                    {
                        funcList.Add(item.Value);
                    }
                }
                //自定义类型
                else if (item.Value is CustomDeclare cls)
                {
                    if (!cls.TypeDeclare.IsArray)
                    {
                        cls.Ignore = IgnoreTsType.Contains(cls.TypeDeclare.RefType.TsFullName);
                        custList.Add(cls);
                    }
                }
            }

            //引用类型
            foreach (var module in TsType.RegisterTsType)
            {
                foreach (var item in module.Value)
                {
                    if (!item.Value.IsDetails && !IgnoreTsType.Contains(item.Key))
                    {
                        refList.Add(item.Value);
                    }
                }

            }

            _vltContext.Put("func", funcList);
            _vltContext.Put("class", clsList);
            _vltContext.Put("enum", enumList);
            _vltContext.Put("cust", custList);
            _vltContext.Put("ref", refList);
        }
    }
}
