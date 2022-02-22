using System.IO;
using System.Text;
using Microsoft.ClearScript;
using Microsoft.ClearScript.V8;

namespace JsService
{
    public static class JsModuleManager
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

            //扫描并加载所有runtime下面的js文件
            LoadAllJs(new DirectoryInfo(serivce.SearchPath + "\\runtime"));

            //CommonJS初始化
            commonJS = serivce.GetObject("__commonjs__");
            commonJSRegister = commonJS.GetValue("register");
            commonJSExecute = commonJS.GetValue("execute");
        }
        
        public static void LoadModule(string path)
        {
            LoadAllJs(new DirectoryInfo(serivce.SearchPath + "\\" + path), path);
        }

        public static void LoadDevelopModule(string directory, string path)
        {
            LoadAllJs(new DirectoryInfo(directory + "\\" + path), path);
        }

        public static void ExecuteModule(string path)
        {
            commonJSExecute.Invoke(path);
        }

        private static void LoadAllJs(DirectoryInfo root, string parent = null)
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
                    RegisterModule(file.FullName, moduleName, code);
                }
            }

            foreach (var dir in dirs)
            {
                string moduleName = parent is null ? dir.Name : parent + "/" + dir.Name;
                LoadAllJs(dir, moduleName);
            }
        }

        private static void RegisterModule(string fullPath, string moduleName, string code)
        {
            //判断是不是模块, 目前先用暴力判断, 以后看看有没有更好的方法
            const string modelStr = "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });";
            if (code.StartsWith(modelStr)) //是模块
            {
                code = "(function(module, exports, require) {" + code + "})";
                object handler = engine.Evaluate(new DocumentInfo(new System.Uri(fullPath)), code);
                //注册模块
                commonJSRegister.Invoke(handler, moduleName);
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