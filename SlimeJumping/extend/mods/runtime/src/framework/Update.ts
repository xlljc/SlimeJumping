
globalThis.__updateFuncData__ = {
    process: [],
    physicsProcess: [],
};

/**
 * 装饰器, 用在静态函数上, 被修饰的静态函数每帧都会被调用一次
 */
function Update() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        globalThis.__updateFuncData__.process.push((descriptor.value as Function).bind(target));
    };
}

/**
 * 装饰器, 用在静态函数上, 被修饰的静态函数每物理帧都会被调用一次
 */
function PhysicsUpdate() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        globalThis.__updateFuncData__.physicsProcess.push((descriptor.value as Function).bind(target));
    };
}