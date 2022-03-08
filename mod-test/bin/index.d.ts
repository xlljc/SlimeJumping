declare module "index" {
    export class Main {
        static main(): void;
        static say(): void;
    }
}
declare module "Manager/TestManager" {
    export class TestManager {
        constructor();
    }
}
declare module "Test" {
    export class TestCls {
        static say(): void;
    }
}
declare namespace aaa.bbb {
    class ccc {
        static say(): void;
    }
}
