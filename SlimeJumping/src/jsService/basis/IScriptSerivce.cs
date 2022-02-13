using System;
using System.Reflection;
using JsService.generate;

namespace JsService
{
    /// <summary>
    /// 文件加载处理函数
    /// </summary>
    /// <param name="serivce">脚本service</param>
    /// <param name="filePath">文件路径</param>
    public delegate string FileLoadHandler(IScriptSerivce serivce, string filePath);

    /// <summary>
    /// 文件加载处理函数
    /// </summary>
    /// <param name="serivce">脚本service</param>
    /// <param name="context">文本内容</param>
    /// <param name="filePath">文件路径</param>

    public delegate void FileWriteHandler(IScriptSerivce serivce, string context, string filePath);

    /// <summary>
    /// 脚本服接口
    /// </summary>
    public interface IScriptSerivce
    {
        /// <summary>
        /// 脚本引擎名称
        /// </summary>
        string Name { get; }

        /// <summary>
        /// 获取脚本文件的扩展名
        /// </summary>
        string ExtensionName { get; }

        /// <summary>
        /// 脚本文件的搜索路径, null则为当前运行可执行文件路径
        /// </summary>
        string SearchPath { get; set; }

        /// <summary>
        /// 打印输出
        /// </summary>
        ILog Out { get; set; }

        /// <summary>
        /// 文件加载函数
        /// </summary>
        FileLoadHandler FileLoadHandler { get; set; }

        /// <summary>
        /// 文件写出函数
        /// </summary>
        FileWriteHandler FileWriteHandler { get; set; }

        /// <summary>
        /// 获取 js 引擎
        /// </summary>
        object Engine { get; }

        /// <summary>
        /// 初始化调用
        /// </summary>
        /// <param name="gt">脚本接口生成对象</param>
        void Init(GeneratesTs gt = null);

        /// <summary>
        /// 注册脚本文件
        /// </summary>
        /// <param name="path">脚本路径</param>
        void RegisterScript(string path);

        /// <summary>
        /// 添加脚本类型
        /// </summary>
        /// <param name="types">交互对象</param>
        void AddHostType(params HostType[] types);

        /// <summary>
        /// 添加脚本交互对象
        /// </summary>
        /// <param name="objs">交互对象</param>
        void AddHostInstance(params HostInstance[] objs);

        /// <summary>
        /// 添加模块类型, 仅支持 System 模块化, 否则报错
        /// </summary>
        /// <param name="path">模块路径</param>
        /// <param name="types">交互对象</param>
        void AddHostTypeToModule(string path, params HostType[] types);

        /// <summary>
        /// 添加模块对象, 仅支持 System 模块化, 否则报错
        /// </summary>
        /// <param name="path"></param>
        /// <param name="objs">交互对象</param>
        void AddHostInstanceToModule(string path, params HostInstance[] objs);

        /// <summary>
        /// 给引用类型起别名, 如果该类型已经被注册到引擎, 则会抛出异常
        /// </summary>
        /// <param name="type">类型对象</param>
        /// <param name="name">名称</param>
        void Alias(Type type, string name);

        /// <summary>
        /// 执行一串代码, 不需要返回值
        /// </summary>
        /// <param name="code">代码内容</param>
        void Execute(string code);

        /// <summary>
        /// 执行一串代码, 并获得返回结果
        /// </summary>
        /// <param name="code">代码内容</param>
        /// <returns>执行返回内容</returns>
        IScriptObject Evaluate(string code);

        /// <summary>
        /// 调用一个方法, 并获得返回结果
        /// </summary>
        /// <param name="fullName">方法全路径名 (命名空间 + 方法名)</param>
        /// <param name="args">传递参数</param>
        /// <returns>执行返回内容</returns>
        IScriptObject Invoke(string fullName, params object[] args);

        /// <summary>
        /// 获取一个对象,属性或者方法
        /// </summary>
        /// <param name="fullPath">全路径名称</param>
        IScriptObject GetObject(string fullPath);

        /// <summary>
        /// 获取 System 模块下的数据
        /// </summary>
        /// <param name="path">模块路径</param>
        /// <param name="fullName">名称</param>
        /// <returns></returns>
        IScriptObject GetModuleObject(string path, string fullName);

        /// <summary>
        /// 创建一个空的js对象
        /// </summary>
        IScriptObject NewScriptObject();

        /// <summary>
        /// 创建一个 IScriptObject 对象
        /// </summary>
        /// <param name="o">实例</param>
        IScriptObject ToScriptObject(object o);

        /// <summary>
        /// 扫描指定程序集, 并且自动注入包含 [JsType, JsModuleType, JsFunction, JsModuleFunction] 的类
        /// </summary>
        /// <param name="assembly">程序集对象</param>
        void ScanJsClass(Assembly assembly);

        /// <summary>
        /// 执行调试控制台
        /// </summary>
        void RunDebugConsole();

    }
}
