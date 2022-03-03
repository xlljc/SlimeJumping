var __module__ = __module__ || (() => {
    /**
     * {
     *      inited: boolean
     *      lib: string[]
     *      folder: string,
     *      execute?: function,
     *      exports: {},
     * }
     */
    const modules = {};

    function addObject(path, name, obj) {
		let module = modules[path];
		if (module == null) {
			let index = path.lastIndexOf('/');
			let folder = index >= 0 ? path.substring(0, index) : '';
			module = {
				inited: true,
				folder,
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

var __commonjs__ = __commonjs__ || (() => {
	function register(handler, path, lib) {
		if (path in __module__.modules) {
			throw new Error('发现注册重复的模块: ' + path);
		}
		if (!lib) { //这里的参数的lib是C#数组
			lib = [];
		} else {
			let temp = lib;
			lib = [];
			for (let item of temp) {
				lib.push(item);
			}
		}
		let index = path.lastIndexOf('/');
		let folder = index >= 0 ? path.substring(0, index) : '';
		let module = {
			inited: false,
			lib,
			folder,
			execute: () => {
				handler(module, module.exports, (p) => {
					if (p === '.')
						p = 'index';
					let module = __module__.getModule(__module__.getPath(folder, p));
					if (module === undefined) {
						for (let l of lib) {
							module = __module__.getModule(__module__.getPath(l + '/bin', p));
							if (module !== undefined)
								return module;
						}
					}
					return module;
				});
			},
			exports: {},
		};
		__module__.modules[path] = module;
	}
	return {
		register,
	};
})();

var System = System || (() => {
    
})();

// var System = System || {};
// var SystemModle = SystemModle || System;
// System.__modules = System.__modules || {};
// System.register = function (_path, arrs, callback) {
//     var self = this;
//     if (!self.__modules[_path])
//         self.__modules[_path] = {};
//     let result = callback(function (pOrName, cls) {
//         if (typeof (pOrName) == 'object') {
//             for (let k in pOrName) {
//                 if (k != '____imports____' && k != '____config____' && k != '____ready____')
//                     self.__modules[_path][k] = pOrName[k];
//             }
//         } else
//             self.__modules[_path][pOrName] = cls;
//     }, '');
//     self.__modules[_path].____imports____ = arrs;
//     self.__modules[_path].____config____ = result;
// }
// System.__init = function () {
//     for (let key in this.__modules) {
//         this.__moduleInit(key);
//     }
// }
// System.__moduleInit = function (key) {
//     let module = this.__modules[key];
//     if (!module.____ready____) {
//         for (let i = 0, len = module.____imports____.length; i < len; ++i) {
//             let ckey = module.____imports____[i];
//             let cmodel = this.__modules[ckey];
//             if (!cmodel) continue;
//             if (!cmodel.____ready____)
//                 this.__moduleInit(ckey);
//             module.____config____.setters[i](cmodel);
//         }
//         try {
//             module.____ready____ = true;
//             module.____config____.execute();
//         } catch (e) {
//             console.error('\'' + key + '\'' + ' init: ' + e + '\n' + e.stack);
//         }
//     }
// }
// System.__addObject = function (_path, name, obj) {
//     var model = this.__modules[_path];
//     if (model) {
//         model[name] = obj;
//     } else {
//         model = {
//             ____ready____: true,
//             ____imports____: [],
//             ____config____: {
//                 setters: [],
//                 execute: function () { },
//             },
//         }
//         model[name] = obj;
//         this.__modules[_path] = model;
//     }
// }