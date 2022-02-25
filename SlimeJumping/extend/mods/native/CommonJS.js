var __commonjs__ = __commonjs__ || (() => {
	const modules = {};
	function register(handler, path, lib) {
		if (path in modules) {
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
					let module = getModule(getPath(folder, p));
					if (module === undefined) {
						for (let l of lib) {
							module = getModule(getPath(l + '/bin', p));
							if (module !== undefined)
								return module;
						}
					}
					return module;
				});
			},
			exports: {},
		};
		modules[path] = module;
	}
	function execute(path) {
		let module = modules[path];
		if (module && !module.inited) {
			module.inited = true;
			module.execute();
		}
	}
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
		register,
		execute,
		addObject,
	};
})();