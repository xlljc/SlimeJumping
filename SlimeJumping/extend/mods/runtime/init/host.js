globalThis.__host__ = (() => {
    let importHostType = __tgjsLoadType;
    delete globalThis.__tgjsLoadType;

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
            let hostType = importHostType(fullName);
            addObject(hostType, path);
        },
        registerHostTypeToModule(fullName, modulePath, name) {
            let hostType = importHostType(fullName);
            __module__.addObject(modulePath, name, hostType);
        },
        registerHostInstance(instance, path) {
            addObject(instance, path);
        },
        registerHostInstanceToModule(instance, modulePath, name) {
            __module__.addObject(modulePath, name, instance);
        },
    }
})();