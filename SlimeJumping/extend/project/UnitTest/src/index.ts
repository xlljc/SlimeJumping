/**
 * 测试调用函数
 */
export function Test(...args: any[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("--------------- start " + descriptor.value.name + " ---------------");
        try {
            descriptor.value(...args);
            console.log("--------------- success ---------------");
        } catch (e) {
            console.error(e.toString());
            console.log("--------------- error ---------------");
        }
    };
}