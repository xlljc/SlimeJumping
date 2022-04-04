/*
 version: 
*/

type CsArray<T> = T[];



declare namespace globalThis {
    function CallSay(obj: testA): void;
}
declare namespace globalThis {
    function Test(o: any): void;
}


declare namespace globalThis {
    interface GodotLog extends JsService.ILog {
       log(...args: any[]): void;
       error(...args: any[]): void;
       warn(...args: any[]): void;
    }
    interface GodotLogConstructor {
        new(): GodotLog;
    }
    interface GodotLogStatic extends JsService.ILogStatic {
    }
}
declare namespace globalThis {
    var console: GodotLog;
}
declare namespace JsService {
    interface ILog {
       log(...args: any[]): void;
       error(...args: any[]): void;
       warn(...args: any[]): void;
    }
    interface ILogConstructor {
    }
    interface ILogStatic {
    }
}
declare namespace globalThis {
    interface testA {
        a: int;
       Say(): void;
       SayArr(arr: CsArray<float>): void;
    }
    interface testAConstructor {
        new(a: int): testA;
    }
    interface testAStatic {
    }
    var testA: testAConstructor & testAStatic;
}
declare namespace globalThis {
    interface TestJs {
    }
    interface TestJsConstructor {
        new(): TestJs;
    }
    interface TestJsStatic {
        CallSay(obj: testA): void;
        Test(o: any): void;
    }
    var TestJs: TestJsConstructor & TestJsStatic;
}

declare namespace globalThis {
    type byte = number;
    var byte: never;
}
declare namespace globalThis {
    type short = number;
    var short: never;
}
declare namespace globalThis {
    type int = number;
    var int: never;
}
declare namespace globalThis {
    type long = number;
    var long: never;
}
declare namespace globalThis {
    type string = string;
    var string: never;
}
declare namespace globalThis {
    type float = number;
    var float: never;
}
declare namespace globalThis {
    type double = number;
    var double: never;
}
declare namespace globalThis {
    type boolean = boolean;
    var boolean: never;
}

