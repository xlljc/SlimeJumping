namespace JsService.primeval
{
    /// <summary>
    /// 脚本内置脚本
    /// </summary>
    public static class JsScript
    {
        /// <summary>
        /// System 模块化脚本
        /// </summary>
        public const string SystemJs = @"
var System = System || {};
var SystemModle = SystemModle || System;
System.__modules = System.__modules || {};
System.register = function (_path, arrs, callback) {
    var self = this;
    if (!self.__modules[_path])
        self.__modules[_path] = {};
    let result = callback(function (pOrName, cls) {
        if (typeof (pOrName) == 'object') {
            for (let k in pOrName) {
                if (k != '____imports____' && k != '____config____' && k != '____ready____')
                    self.__modules[_path][k] = pOrName[k];
            }
        } else
            self.__modules[_path][pOrName] = cls;
    }, '');
    self.__modules[_path].____imports____ = arrs;
    self.__modules[_path].____config____ = result;
}
System.__init = function () {
    for (let key in this.__modules) {
        this.__moduleInit(key);
    }
}
System.__moduleInit = function (key) {
    let module = this.__modules[key];
    if (!module.____ready____) {
        for (let i = 0, len = module.____imports____.length; i < len; ++i) {
            let ckey = module.____imports____[i];
            let cmodel = this.__modules[ckey];
            if (!cmodel) continue;
            if (!cmodel.____ready____)
                this.__moduleInit(ckey);
            module.____config____.setters[i](cmodel);
        }
        try {
            module.____ready____ = true;
            module.____config____.execute();
        } catch (e) {
            console.error('\'' + key + '\'' + ' init: ' + e + '\n' + e.stack);
        }
    }
}
System.__addObject = function (_path, name, obj) {
    var model = this.__modules[_path];
    if (model) {
        model[name] = obj;
    } else {
        model = {
            ____ready____: true,
            ____imports____: [],
            ____config____: {
                setters: [],
                execute: function () { },
            },
        }
        model[name] = obj;
        this.__modules[_path] = model;
    }
}
";

        public const string CommonJS = @"
(() => {
    const module = {};
    function register(handler, path) {
        if (path in module) {
            return;
        }
        let index = path.lastIndexOf('/');
        let folder = index >= 0 ? path.substring(0, index) : '';
        let data = {
            inited: false,
            folder,
            execute: () => {
                handler(data, data.exports, (p) => {
                    let mudelName = getPath(folder, p);
                    return getModule(mudelName);
                })
            },
            exports: {},
        }
        module[path] = data;
    }
    function execute(path) {
        let data = module[path];
        if (data && !data.inited) {
            data.inited = true;
            data.execute();
        }
    }
    function getModule(path) {
        let data = module[path];
        if (data) {
            if (!data.inited) {
                data.inited = true;
                data.execute();
            }
            return data.exports;
        }
        return undefined;
    }
    function getPath(folder, path) {
        let nodes = folder.split('/');
        let node2s = path.split('/');
        for (let node of node2s) {
            switch(node) {
                case '.': break;
                case '..': nodes.pop(); break;
                default: nodes.push(node);
            }
        }
        return nodes.join('/');
    }

    return {
        module,
        register,
        execute,
    }
})()
";

        /// <summary>
        /// 创建对应主机类型的js类的函数
        /// </summary>
        public const string HostClassFunc = @"
(function (hostType, hostFunc) {
    let WrapperClass = class {
        constructor() {
            let target = new hostType(...arguments);
            Object.defineProperty(this, 'super', { value: target });
            Object.setPrototypeOf(this, new Proxy(Object.getPrototypeOf(this), {
                has: (proto, key) => key in proto || key in target,
                get: (proto, key) => key in proto ? proto[key] : target[key],
                set: (proto, key, value) => {
                    if (typeof value == 'function') proto[key] = value;
                    else key in proto ? proto[key] = value : target[key] = value;
                    return true;
                },
            }));
        }
    };
    WrapperClass.csTarget = hostType;
    Object.setPrototypeOf(WrapperClass, new Proxy({...WrapperClass}, {
        has: (proto, key) => key in proto || key in hostType,
        get: (proto, key) => key in proto ? proto[key] : hostType[key],
        set: (proto, key, value) => {
            if (typeof value == 'function') proto[key] = value;
            else key in proto ? proto[key] = value : hostType[key] = value;
            return true;
        },
    }));
    return WrapperClass;
})
";

        /// <summary>
        /// 初始化脚本
        /// </summary>
        public const string InitJs = @"
(function () {
    Array.toJsArray = (arr) => [...arr];
    CsArray.toCsArray = (arg1, arg2) => {
        let csArr;
        if (arg2 == undefined) {
            csArr = __hostFunc.newArr(arg1.length);
        } else {
            let csType = arg1.csTarget;
            csArr = __hostFunc.newArr(csType ? csType : arg1, arg2.length)
        }
        for (let i = 0; i < arg2.length; i++) csArr[i] = arg2[i];
        return csArr;
    }
})()
";
    }
}
