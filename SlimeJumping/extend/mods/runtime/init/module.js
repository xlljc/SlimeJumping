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

function __readyRegisterModule__(folder) {
	System.register = (moduleName, imps, callback) => {
		let path = (folder == null ? '' : folder + '/') + moduleName;
		console.log(`注册模块, folder: ${folder}, moduleName: ${moduleName}, path: ${path}`);
		if (path in __module__.modules) {
			throw new Error('发现注册重复的模块: ' + path);
		}
		let module = {
			inited: false,
			execute: () => {
				let data = callback((n, v) => module.exports[n] = v);
				let setters = data.setters;
				for (let i = 0; i < imps.length; i++) {
					let imp = imps[i];
					let module = __module__.getModule(imp);
					if (!module) {
						module = __module__.getModule(folder + '/' + imp);
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