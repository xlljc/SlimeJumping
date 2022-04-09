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

interface Console {
    error(...data: any[]): void;
    info(...data: any[]): void;
    log(...data: any[]): void;
    warn(...data: any[]): void;
}
declare var console: Console;




declare namespace aa {
    interface bb {
        say(): void;
    }
    interface bbConstructor {
        new(): aa.bb;
    }
    interface bbStatic {
    }
    var bb: aa.bbConstructor & aa.bbStatic;
}
declare module 'rt' {
    var TestInst: aa.bb;
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

