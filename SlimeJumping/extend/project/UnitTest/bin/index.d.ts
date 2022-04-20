/// <reference types="../../mods/native" />
declare module "index" {
    /**
     * 测试调用函数
     */
    export function Test(...args: any[]): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
    export function TestUstTime(...args: any[]): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
}
declare module "Array" { }
declare module "Extends" {
    export class MyNode extends Godot.Node {
        constructor();
        _Process(delta: number): void;
    }
}
declare module "TestUpdate" {
    export class TestUpdate {
        static Test1(delta: number): void;
        static Test2(delta: number): void;
    }
}
declare module "TestVector2" {
    export class TestVector2 {
        Test1(): void;
        Test2(): void;
    }
}
//# sourceMappingURL=index.d.ts.map