/// <reference types="../../mods/native" />
/// <reference types="../../mods/runtime/bin/index" />
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
declare module "basic/TestExtends" {
    export class MyNode extends Godot.Node {
        constructor();
        _Process(delta: number): void;
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
declare module "framework/WarpNode" {
    export class MyNode2d {
        #private;
        constructor(nodeName: string);
        get position(): Vector2;
        set position(v: Vector2);
    }
}
declare module "framework/TestAddNode" {
    export class TestAddNode {
        Test1(): void;
        Test2(): void;
    }
}
declare module "native/TestArray" { }
//# sourceMappingURL=index.d.ts.map