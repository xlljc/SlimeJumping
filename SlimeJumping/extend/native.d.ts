/*
 version: 
*/

/** Indicates this is a C# type. */
declare interface CsType { }
/** Represents an array type in C#. */
declare interface CsArray<T = any> {
    [Symbol.iterator](): IterableIterator<T>;
    [index: number]: T;
    get Length(): number;
}
declare interface CsArrayStatic {
    /** Convert JS array to C# Object array. */
    toCsArray<T>(arr: Array<T>): CsArray<T>;
    /** Converts a JS array to a C# array of the specified type. */
    toCsArray<T>(csType: CsType, arr: Array<T>): CsArray<T>;
}
declare var CsArray: CsArrayStatic;

declare interface ArrayConstructor {
    /** Convert C# arrays to JS arrays. */
    toJsArray<T>(csArr: CsArray<T>): Array<T>;
}



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
    var testA: testAConstructor & testAStatic & CsType;
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
    var TestJs: TestJsConstructor & TestJsStatic & CsType;
}

declare namespace globalThis {
    type byte = number;
    var byte: CsType;
}
declare namespace globalThis {
    type short = number;
    var short: CsType;
}
declare namespace globalThis {
    type int = number;
    var int: CsType;
}
declare namespace globalThis {
    type long = number;
    var long: CsType;
}
declare namespace globalThis {
    type string = string;
    var string: CsType;
}
declare namespace globalThis {
    type float = number;
    var float: CsType;
}
declare namespace globalThis {
    type double = number;
    var double: CsType;
}
declare namespace globalThis {
    type boolean = boolean;
    var boolean: CsType;
}

