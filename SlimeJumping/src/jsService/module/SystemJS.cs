using System.IO;
using System.Text;
using Microsoft.ClearScript;
using Microsoft.ClearScript.V8;


namespace JsService
{
    public static class SystemJS
    {
        private static bool _init = false;
        private static IScriptSerivce serivce;
        private static V8ScriptEngine engine;

        /// <summary>
        /// 初始化模块
        /// </summary>
        public static void InitModule()
        {
            if (_init) return;
            _init = true;

            serivce = ScriptManager.GetService("ClearScript");
            engine = (V8ScriptEngine)serivce.Engine;

            //初始化核心对象
            LoadAllJs(new DirectoryInfo(serivce.SearchPath + "\\native"), "native", new string[0]);
        }

        /// <summary>
        /// 加载模块
        /// </summary>
        /// <param name="path">模块路径</param>
        /// <param name="lib">依赖的其他模块</param>
        public static void LoadModule(string path, string[] lib = null)
        {

        }

        /// <summary>
        /// 加载一个开发环境下的模块
        /// </summary>
        /// <param name="directory">项目的绝对路径</param>
        /// <param name="path">模块路径</param>
        /// <param name="lib">依赖的其他模块</param>
        public static void LoadDevelopModule(string directory, string path, string[] lib = null)
        {

        }

        /// <summary>
        /// 执行一个模块
        /// </summary>
        /// <param name="path">模块路径</param>
        public static void ExecuteModule(string path)
        {

        }

        private static void LoadAllJs(DirectoryInfo root, string parent, string[] lib)
        {

        }
    }
}