declare module "index" {
    /**
     * 测试调用函数
     */
    export function Test(...args: any[]): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
    export function TestUstTime(...args: any[]): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
}
declare module "basic/TestColor" {
    export class TestColor {
        static Test1(): void;
        static Test2(): void;
        static TestSHV(): void;
        static Test3(): void;
    }
}
declare module "basic/TestUpdate" {
    export class TestUpdate {
        static Test1(delta: number): void;
        static Test2(delta: number): void;
    }
}
declare module "basic/TestVector2" {
    export class TestVector2 {
        Test1(): void;
        Test2(): void;
    }
}
declare module "framework/TestNode" {
    export class TestNode {
        Test1(): void;
    }
}
declare module "framework/TestScene" {
    export class TestScene {
        startScene(): void;
    }
}
//# sourceMappingURL=index.d.ts.map