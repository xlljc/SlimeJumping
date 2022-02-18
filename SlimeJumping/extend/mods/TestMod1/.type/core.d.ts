/*
 Generate time: 2022/2/19 2:21:59
 Runtime environment: ClearScript
*/

/** Indicates this is a C# type. */
declare interface CsType {
    /** The type object of the C# class referred to. */
    csTarget: any;
}
/** Represents an array type in C#. */
declare interface CsArray<T = any> {
    [Symbol.iterator](): IterableIterator<T>;
    [index: number]: T;
    get Length(): number;
    get LongLength(): number;
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


declare namespace JsService {
    type LogMethod = (...args: any[]) => void;
}
declare namespace console {
    function log(...args: any[]): void;
}
declare namespace console {
    function error(...args: any[]): void;
}
declare namespace console {
    function warn(...args: any[]): void;
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

