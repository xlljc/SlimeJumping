using System;
using JsService.primeval;
using System.Collections.Generic;
using JsService.generate;

namespace JsService
{
    /// <summary>
    /// 写出ts代码前执行的注册操作
    /// 在该阶段注入的所有对象都会被写出到 .d.ts 文件中
    /// </summary>
    public delegate void RegisterObjectHandler(IScriptSerivce serivce);

    /// <summary>
    /// 脚本管理器
    /// </summary>
    public class ScriptManager
    {
        /// <summary>
        /// log输出对象
        /// </summary>
        public static ILog Out { get; set; } = new ConsoleLog();

        /// <summary>
        /// 文件加载函数
        /// </summary>
        public static FileLoadHandler FileLoadHandler { get; set; } = FileHandler.Load;

        /// <summary>
        /// 文件写出函数
        /// </summary>
        public static FileWriteHandler FileWriteHandler { get; set; } = FileHandler.Write;

        /// <summary>
        /// 文件搜索路径
        /// </summary>
        public static string SearchPath { get; set; } = Environment.CurrentDirectory;

        private static readonly Dictionary<string, IScriptSerivce> serviceDic = new Dictionary<string, IScriptSerivce>();

        /// <summary>
        /// 注册脚本服务对象
        /// </summary>
        public static void Register(IScriptSerivce serivce)
        {
            Register(serivce, null);
        }

        /// <summary>
        /// 注册service, 并生成基础的接口代码, 使用默认的模板文件
        /// </summary>
        /// <param name="writePath">文件写出路径</param>
        /// <param name="handler">注册对象函数, 在该函数内注册的所有对象都会被写出到ts文件中</param>
        public static void RegisterAndWriteTs(IScriptSerivce serivce, string writePath, RegisterObjectHandler handler)
        {
            RegisterAndWriteTs(serivce, null, writePath, handler);
        }

        /// <summary>
        /// 注册service, 并生成基础的接口代码, 使用自定义模板文件
        /// </summary>
        /// <param name="templatePath">模板路径地址</param>
        /// <param name="writePath">文件写出路径</param>
        /// <param name="handler">注册对象函数, 在该函数内注册的所有对象都会被写出到ts文件中</param>
        public static void RegisterAndWriteTs(IScriptSerivce serivce, string templatePath, string writePath, RegisterObjectHandler handler)
        {
            var gt = new GeneratesTs(serivce);
            Register(serivce, gt);
            handler(serivce);
            if (templatePath == null)
            {
                gt.Write(writePath);
            }
            else 
            {
                gt.Write(templatePath, writePath);
            }
        }

        /// <summary>
        /// 根据语言类型获取脚本服务对象
        /// </summary>
        public static T GetService<T>(string name) where T : IScriptSerivce
        {
            return (T)serviceDic[name];
        }

        /// <summary>
        /// 根据语言类型获取脚本服务对象
        /// </summary>
        public static IScriptSerivce GetService(string name)
        {
            return serviceDic[name];
        }

        private static void Register(IScriptSerivce serivce, GeneratesTs gt)
        {
            if (serviceDic.ContainsKey(serivce.Name))
            {
                throw new Exception($"{serivce.Name}已经被注册!不能重复注册!");
            }
            serviceDic.Add(serivce.Name, serivce);

            // 文件搜索路径
            if (serivce.SearchPath == null)
            {
                serivce.SearchPath = SearchPath;
            }

            // 输出
            if (serivce.Out == null)
            {
                serivce.Out = Out;
            }

            // 文件加载函数
            if (serivce.FileLoadHandler == null)
            {
                serivce.FileLoadHandler = FileLoadHandler;
            }

            // 文件写出函数
            if (serivce.FileWriteHandler == null)
            {
                serivce.FileWriteHandler = FileWriteHandler;
            }

            serivce.Init(gt);
        }
    }
}
