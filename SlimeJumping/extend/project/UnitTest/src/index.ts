/**
 * 测试调用函数
 */
export function Test(...args: any[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("--------------- test " + descriptor.value.name + " ---------------");
        try {
            descriptor.value(...args);
            console.log("--------------- success ---------------");
        } catch (e: any) {
            console.error(e.toString() + "\n" + e.stack);
            console.log("--------------- error ---------------");
        }
    };
}

export function TestUstTime(...args: any[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("--------------- testUstTime " + descriptor.value.name + " ---------------");
        try {
            let time = Date.now();
            descriptor.value(...args);
            console.log("--------------- useTime " + (Date.now() - time) + " ---------------");
        } catch (e: any) {
            console.error(e.toString() + "\n" + e.stack);
            console.log("--------------- error ---------------");
        }
    };
}