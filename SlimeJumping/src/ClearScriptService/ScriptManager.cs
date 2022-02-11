using System;
using System.Collections.Generic;

namespace Calljs
{
    /// <summary>
    /// 脚本管理器
    /// </summary>
    public class ScriptManager
    {
        /// <summary>
        /// log工具
        /// </summary>
        public static ILog Out { get; set; } = new ConsoleLog();

        /// <summary>
        /// 脚本文件加载函数
        /// </summary>
        public static ScriptLoadHandler ScriptLoadHandler { get; set; } = ScripLoader.Load;

        private static readonly Dictionary<string, IScriptSerivce> serviceDic = new Dictionary<string, IScriptSerivce>();

        /// <summary>
        /// 注册脚本服务对象
        /// </summary>
        public static void Register(IScriptSerivce scriptSerivce)
        {
            if (serviceDic.ContainsKey(scriptSerivce.Name))
            {
                throw new Exception($"{scriptSerivce.Name}已经被注册!不能重复注册!");
            }
            serviceDic.Add(scriptSerivce.Name, scriptSerivce);

            // 输出
            if (scriptSerivce.Out == null)
            {
                scriptSerivce.Out = Out;
            }

            // 文件加载函数
            if (scriptSerivce.ScriptLoadHandler == null)
            {
                scriptSerivce.ScriptLoadHandler = ScriptLoadHandler;
            }

            scriptSerivce.Init();
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
    }
}
