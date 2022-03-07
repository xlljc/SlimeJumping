using Jint;
using System.IO;
using System.Text;

namespace JsService
{
    public static class SystemJS
    {
        private static bool _init = false;
        private static IScriptSerivce serivce;
        private static Engine engine;

        private static IScriptObject systemObject;
        private static IScriptObject systemJSRegister;
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

            //SystemJS
            systemObject = serivce.GetObject("System");
            systemJSRegister = serivce.GetObject("__systemRegisterFunc__");
            moduleExecute = serivce.GetObject("__module__.execute");

            //扫描并加载所有runtime下面的js文件
            LoadAllJs(new DirectoryInfo(serivce.SearchPath + "\\runtime\\bin"), "runtime/bin", new string[0]);
            //执行runtime
            ExecuteModule("runtime/bin/index");
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
                    //文件路径
                    string folder = parent;
                    //代码内容
                    string code = sr.ReadToEnd();
                    sr.Close();
                    fileStream.Close();
                    //注册模块
                    RegisterModule(file.FullName, folder, code, lib);
                }
            }

            foreach (var dir in dirs)
            {
                string moduleName = parent is null ? dir.Name : parent + "/" + dir.Name;
                LoadAllJs(dir, moduleName, lib);
            }
        }

        private static void RegisterModule(string fullPath, string folder, string code, string[] lib)
        {
            if (systemJSRegister != null && systemObject != null)
            {
                //注入System.register
                var func = systemJSRegister.Invoke(folder, lib);
                systemObject.SetValue("register", func);
                engine.Execute(code, new Esprima.ParserOptions(fullPath));
                //移除System.register
                systemObject.Delete("register");
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