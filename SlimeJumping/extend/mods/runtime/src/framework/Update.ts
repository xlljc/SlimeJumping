namespace Runtime {
    const updateFuncData = {
        process: [],
        physicsProcess: [],
    }
    globalThis.__updateFuncData__ = updateFuncData;

    /**
     * 装饰器, 用在静态函数上, 被修饰的静态函数每帧都会被调用一次
     */
    export function Update() {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            updateFuncData.process.push((descriptor.value as Function).bind(target));
        };
    }

    /**
     * 装饰器, 用在静态函数上, 被修饰的静态函数每物理帧都会被调用一次
     */
    export function PhysicsUpdate() {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            updateFuncData.physicsProcess.push((descriptor.value as Function).bind(target));
        };
    }
}