function __WrapHostFunc(hostFunc) {
    return (...args) => {
        for (let i = 0; i < args.length; ++i) {
            const item = args[i];
            if (item != null) {
                let __csObject__ = item.__csObject__;
                if (__csObject__ !== undefined) args[i] = __csObject__;
            }
        }
        hostFunc(...args);
    }
}

function __WrapHostType(hostType) {
    let WrapperClass = class {
        constructor(...args1) {
            let target = new hostType(...args1);
            this.__csObject__ = target;
            Object.setPrototypeOf(this, new Proxy(Object.getPrototypeOf(this), {
                has: (proto, key) => key in proto || key in target,
                get: (proto, key) => {
                    if (key in proto) return proto[key];
                    return (...args2) => {
                        for (let i = 0; i < args2.length; ++i) {
                            const item = args2[i];
                            if (item != null) {
                                let __csObject__ = item.__csObject__;
                                if (__csObject__ !== undefined) args2[i] = __csObject__;
                            }
                        }
                        target[key](...args2);
                    }
                },
                set: (proto, key, value) => {
                    if (typeof value == 'function') proto[key] = value;
                    else key in proto ? proto[key] = value : target[key] = value;
                    return true;
                },
            }));
        }
    };
    WrapperClass.csType = hostType;
    Object.setPrototypeOf(WrapperClass, new Proxy({...WrapperClass}, {
        has: (proto, key) => key in proto || key in hostType,
        get: (proto, key) => {
            if (key in proto) return proto[key];
            return (...args3) => {
                for (let i = 0; i < args3.length; ++i) {
                    const item = args3[i];
                    if (item != null) {
                        let __csObject__ = item.__csObject__;
                        if (__csObject__ !== undefined) args3[i] = __csObject__;
                    }
                }
                hostType[key](...args3);
            }
        },
        set: (proto, key, value) => {
            if (typeof value == 'function') proto[key] = value;
            else key in proto ? proto[key] = value : hostType[key] = value;
            return true;
        },
    }));
    return WrapperClass;
}