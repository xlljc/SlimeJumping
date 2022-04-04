using System.Text;
using System;
using System.Net;
using System.IO;
using Puerts;

public static class PuertsScriptManager
{

    public static JsEnv JsService { get; private set; }

    public static readonly string ExtensionName = ".js";

    public static string LoadPath { get; private set; }

    private static bool _init = false;
    private static Action<string, string[]> __readyRegisterModule__;
    private static Action __overRegisterModule__;
    private static Action<string> __moduleExecute__;
    private static Action<object> __process__;
    private static Action<object> __physicsProcess__;

    public static void Init(int debugPort = -1)
    {
        if (_init) return;
        _init = true;

        string currDir = System.Environment.CurrentDirectory;
        LoadPath = (currDir + @"\extend\mods").Replace("/", "\\");

        JsService = new JsEnv(new DefaultLoader(), debugPort);

        //log输出
        JsService.Eval(code2);
        //SystenJs模块化准备阶段代码
        JsService.Eval(code1);

        //注册模块函数
        __readyRegisterModule__ = JsService.Eval<Action<string, string[]>>("__readyRegisterModule__");
        __overRegisterModule__ = JsService.Eval<Action>("__overRegisterModule__");
        //执行模块函数
        __moduleExecute__ = JsService.Eval<Action<string>>("__module__.execute");

        //扫描并加载所有runtime下面的js文件
        LoadAllJs(new DirectoryInfo(LoadPath + "\\runtime\\bin"), "runtime/bin", new string[0]);
        //执行runtime
        ExecuteModule("runtime/bin/index");
        __process__ = JsService.Eval<Action<object>>("__module__.getModule('runtime/bin/index').Process");
        __physicsProcess__ = JsService.Eval<Action<object>>("__module__.getModule('runtime/bin/index').PhysicsProcess");
    }

    public static void Process(float delta)
    {
        JsService.Tick();
        __process__(delta);
    }

    public static void PhysicsProcess(float delta)
    {
        JsService.Tick();
        __physicsProcess__(delta);
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
        LoadAllJs(new DirectoryInfo(LoadPath + "\\" + path), path, lib2);
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
        __moduleExecute__(path);
    }

    private static void LoadAllJs(DirectoryInfo root, string parent, string[] lib)
    {
        DirectoryInfo[] dirs = root.GetDirectories();
        FileInfo[] files = root.GetFiles();

        foreach (var file in files)
        {
            if (file.Extension == ExtensionName)
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
        __readyRegisterModule__(folder, lib);
        JsService.Eval(code, fullPath);
        __overRegisterModule__();
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

    private const string code1 = @"
globalThis.__module__ = globalThis.__module__ || (() => {
    /**
     * {
     *      inited: boolean
	 *      exports: {},
     *      execute?: function,
     * }
     */
    const modules = {};

    function addObject(path, name, obj) {
		let module = modules[path];
		if (module == null) {
			module = {
				inited: true,
				exports: {},
			};
			modules[path] = module;
		}
		module.exports[name] = obj;
	}
    function execute(path) {
		let module = modules[path];
		if (module && !module.inited) {
			module.inited = true;
			module.execute();
		}
	}
	function getModule(path) {
		let module = modules[path];
		if (module) {
			if (!module.inited) {
				module.inited = true;
				module.execute();
			}
			return module.exports;
		}
		return undefined;
	}
	function getPath(folder, path) {
		let nodes = folder.split('/');
		let node2s = path.split('/');
		for (let node of node2s) {
			switch (node) {
				case '.': break;
				case '..':
					nodes.pop();
					break;
				default: nodes.push(node);
			}
		}
		return nodes.join('/');
	}
    return {
        modules,
        addObject,
        getModule,
        getPath,
        execute,
    }
})();

globalThis.System = globalThis.System || {};

function __readyRegisterModule__(folder, lib) {
	System.register = (moduleName, imps, callback) => {
		let path = (folder == null ? '' : folder + '/') + moduleName;
		//console.log(`注册模块, folder: ${folder}, moduleName: ${moduleName}, path: ${path}`);
		if (path in __module__.modules) {
			throw new Error('发现注册重复的模块: ' + path);
		}
		if (!lib) {
			lib = [];
		}
		let module = {
			inited: false,
			execute: () => {
				let data = callback((n, v) => module.exports[n] = v);
				let setters = data.setters;
				for (let i = 0; i < imps.length; i++) {
					let imp = imps[i];
					let module = __module__.getModule(folder + '/' + imp);
					if (module === undefined) {
						for (let l of lib) {
							module = __module__.getModule(l + '/bin/' + imp);
							if (module !== undefined) break;
						}
					}
					setters[i](module);
				}
				data.execute();
			},
			exports: {},
		};
		__module__.modules[path] = module;
	}
}
function __overRegisterModule__() {
    delete System.register;
}
";

    private const string code2 = @"
(() => {
	function toString(args) {
		return Array.prototype.map.call(args, x => {
			try {
				return x+'';
            } catch (err) {
				return err;
            }
        }).join(',');
    }
	let gd = __tgjsLoadType('Godot.GD');
    globalThis.console = {};
    console.log = function() {
        gd.Print(toString(arguments));
    }
    console.info = function() {
        gd.Print(toString(arguments));
    }
    console.warn = function() {
        gd.Print(toString(arguments));
    }
    console.error = function() {
        gd.PrintErr(toString(arguments));
    }
})();
";
}