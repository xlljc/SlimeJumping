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
    }
}
