using Jint;
using System.IO;
using System.Text;

namespace JsService
{
    public static class CommonJS
    {
        private static bool _init = false;
        private static IScriptSerivce serivce;
        private static Engine engine;
        private static IScriptObject commonJSRegister;
        private static IScriptObject moduleExecute;

        /// <summary>
        /// 初始化模块
        /// </summary>
        public static void InitModule()
        {
            if (_init) return;
            _init = true;

            serivce = ScriptManager.GetService("Jint");
            engine = (Engine)serivce.Engine;

            //初始化核心对象
            LoadAllJs(new DirectoryInfo(serivce.SearchPath + "\\native"), "native", new string[0]);
            //CommonJS
            commonJSRegister = serivce.GetObject("__commonjs__.register");
            moduleExecute = serivce.GetObject("__module__.execute");

            //扫描并加载所有runtime下面的js文件
            LoadAllJs(new DirectoryInfo(serivce.SearchPath + "\\runtime\\bin"), "runtime/bin", new string[0]);
            //执行runtime
            CommonJS.ExecuteModule("runtime/bin/index");
        }

        /// <summary>
        /// 加载模块
        /// </summary>
        /// <param name="path">模块路径</param>
        /// <param name="lib">依赖的其他模块</param>
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
        /// 加载一个开发环境下的模块
        /// </summary>
        /// <param name="directory">项目的绝对路径</param>
        /// <param name="path">模块路径</param>
        /// <param name="lib">依赖的其他模块</param>
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
            moduleExecute.Invoke(path);
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
                object handler = engine.Evaluate(code, new Esprima.ParserOptions(fullPath));
                //注册模块
                commonJSRegister.Invoke(handler, moduleName, lib);
            }
            else
            {
                engine.Execute(code, new Esprima.ParserOptions(fullPath));
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