using System.IO;
using System.Text;
using Microsoft.ClearScript;
using Microsoft.ClearScript.V8;

namespace JsService
{
    public static class CommonJS
    {
        private static bool _init = false;
        private static IScriptSerivce serivce;
        private static V8ScriptEngine engine;
        private static IScriptObject commonJS;
        private static IScriptObject commonJSRegister;
        private static IScriptObject commonJSExecute;

        public static void InitModule()
        {
            if (_init) return;
            _init = true;

            serivce = ScriptManager.GetService("ClearScript");
            engine = (V8ScriptEngine)serivce.Engine;

            //初始化核心对象
            LoadAllJs(new DirectoryInfo(serivce.SearchPath + "\\native"), "native", new string[0]);
            //CommonJS
            commonJS = serivce.GetObject("__commonjs__");
            commonJSRegister = commonJS.GetValue("register");
            commonJSExecute = commonJS.GetValue("execute");

            //扫描并加载所有runtime下面的js文件
            LoadAllJs(new DirectoryInfo(serivce.SearchPath + "\\runtime\\bin"), "runtime/bin", new string[0]);
            //执行runtime
            CommonJS.ExecuteModule("runtime/bin/index");
        }

        public static void LoadModule(string path, string[] lib = null)
        {
            //默认加载runtime
            string[] lib2;
            if (lib is null)
            {
                lib2 = new string[] { "runtime" };
            }
            else
            {
                lib2 = new string[lib.Length + 1];
                for (var i = 0; i <= lib.Length; ++i)
                {
                    lib2[i] = lib[i];
                }
                lib2[lib2.Length - 1] = "runtime";
            }
            LoadAllJs(new DirectoryInfo(serivce.SearchPath + "\\" + path), path, lib2);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="directory"></param>
        /// <param name="path"></param>
        /// <param name="lib"></param>
        public static void LoadDevelopModule(string directory, string path, string[] lib = null)
        {
            //默认加载runtime
            string[] lib2;
            if (lib is null)
            {
                lib2 = new string[] { "runtime" };
            }
            else
            {
                lib2 = new string[lib.Length + 1];
                for (var i = 0; i <= lib.Length; ++i)
                {
                    lib2[i] = lib[i];
                }
                lib2[lib2.Length - 1] = "runtime";
            }
            LoadAllJs(new DirectoryInfo(directory + "\\" + path), path, lib2);
        }

        /// <summary>
        /// 执行一个模块
        /// </summary>
        /// <param name="path">模块路径</param>
        public static void ExecuteModule(string path)
        {
            commonJSExecute.Invoke(path);
        }

        private static void LoadAllJs(DirectoryInfo root, string parent, string[] lib)
        {
            DirectoryInfo[] dirs = root.GetDirectories();
            FileInfo[] files = root.GetFiles();

            foreach (var file in files)
            {
                if (file.Extension == serivce.ExtensionName)
                {
                    FileStream fileStream = file.OpenRead();
                    StreamReader sr = new StreamReader(fileStream, Encoding.Default);
                    string fileName = RemoveExtension(file.Name);
                    //模块名称
                    string moduleName = parent is null ? fileName : parent + "/" + fileName;
                    //代码内容
                    string code = sr.ReadToEnd();
                    sr.Close();
                    fileStream.Close();
                    //注册模块
                    RegisterModule(file.FullName, moduleName, code, lib);
                }
            }

            foreach (var dir in dirs)
            {
                string moduleName = parent is null ? dir.Name : parent + "/" + dir.Name;
                LoadAllJs(dir, moduleName, lib);
            }
        }

        private static void RegisterModule(string fullPath, string moduleName, string code, string[] lib)
        {
            //判断是不是模块, 目前先用暴力判断, 以后看看有没有更好的方法
            const string modelStr = "Object.defineProperty(exports, \"__esModule\", { value: true });";
            if (code.Contains(modelStr)) //是模块
            {
                code = "(function(module, exports, require) {" + code + "\n})";
                object handler = engine.Evaluate(new DocumentInfo(new System.Uri(fullPath)), code);
                //注册模块
                commonJSRegister.Invoke(handler, moduleName, lib);
            }
            else
            {
                engine.Execute(new DocumentInfo(new System.Uri(fullPath)), code);
            }
        }

        private static string RemoveExtension(string name)
        {
            int i = name.LastIndexOf('.');
            if (i >= 0)
            {
                name = name.Substring(0, i);
            }
            return name;
        }
    }
}