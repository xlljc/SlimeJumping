globalThis.__host__ = globalThis.__host__ || (() => {

    let importHostType = __tgjsLoadType;
    delete globalThis.__tgjsLoadType;
    let getNestedTypes = __tgjsGetNestedTypes;
    delete globalThis.__tgjsGetNestedTypes;

    function csTypeToClass(csType) {
        let cls = importHostType(csType);
        cls.prototype.toString = cls.prototype.ToString;

        if (cls && !cls.__init__) {
            cls.__init__ = true;
            let parentPrototype = Object.getPrototypeOf(cls.prototype);
            if (parentPrototype) {
                Object.setPrototypeOf(cls, parentPrototype.constructor);//v8 api的inherit并不能把静态属性也继承，通过这种方式修复下
            }
    
            for(var key in cls) {
                let desc = Object.getOwnPropertyDescriptor(cls, key);
                if (desc && desc.configurable && (typeof desc.get) == 'function' && (typeof desc.value) == 'undefined') {
                    let val = cls[key];
                    Object.defineProperty(cls, key, {
                        value: val,
                        writable: false,
                        configurable: false
                    });
                    if (cls.__p_isEnum && (typeof val) == 'number') {
                        cls[val] = key;
                    }
                }
            }
            
            //父类也得初始化掉
            let parent = cls.prototype.__proto__.constructor.__p_innerType;
            if (parent) {
                let parentName = parent.FullName;
                loadCsType(parentName);
            }
        }
        return cls;
    }
    
    //缓存类型
    const cache = {};

    function loadCsType(fullName) {
        let type = cache[fullName];
        if (!type) {
            type = csTypeToClass(fullName);
            cache[fullName] = type;
        }
        return type;
    }
    
    function addObject(obj, path) {
        let ns = path.split(".");
        let temp = globalThis;
        for (let i = 0; i < ns.length; i++) {
            let n = ns[i];
            if (i == ns.length - 1) {
                temp[n] = obj;
            } else {
                let temp2 = temp[n];
                if (!temp2) {
                    temp2 = {};
                    temp[n] = temp2;
                }
                temp = temp2;
            }
        }
    }

    return {
        importHostType,
        registerHostType(fullName, path) {
            let hostType = loadCsType(fullName);
            addObject(hostType, path);
        },
        registerHostTypeToModule(fullName, modulePath, name) {
            let hostType = loadCsType(fullName);
            __module__.addObject(modulePath, name, hostType);
        },
        registerHostInstance(instance, path) {
            addObject(instance, path);
        },
        registerHostInstanceToModule(instance, modulePath, name) {
            __module__.addObject(modulePath, name, instance);
        },
        registerHostFunction(clsName, funcName, path) {
            cls = importHostType(clsName);
            addObject(cls[funcName], path);
        },
        registerHostFunctionToModule(clsName, funcName, modulePath, name) {
            cls = importHostType(clsName);
            __module__.addObject(modulePath, name, cls[funcName]);
        },
    }
})();