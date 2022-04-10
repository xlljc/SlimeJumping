/*
 version: 
*/

/** Indicates this is a C# type. */
declare type CsType = {
    "System.Int32": number,
    "System.String": string,
    "System.Boolean": boolean,
    "System.Object": Object,
}
/** Represents an array type in C#. */
declare interface CsArray<T = any> {
    [Symbol.iterator](): IterableIterator<T>;
    get Length(): number;
    Get(index: number): T;
    Set(index: number, value: T): void;
}
declare interface CsArrayStatic {
    createCsArray<T1 extends keyof CsType, V extends CsType[T1]>(csType: T1, ...length: number[]): CsArray<V>;
    createCsArray(csType: string, ...length: number[]): CsArray<any>;
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


declare namespace globalThis {
    function TestArr1(array: any): void;
}
declare namespace globalThis {
    function TestArr2(array: CsArray<int>): void;
}


declare namespace globalThis {
    interface TestJsObject {
    }
    interface TestJsObjectConstructor {
        new(): TestJsObject;
    }
    interface TestJsObjectStatic {
        Test(): void;
        TestArr1(array: any): void;
        TestArr2(array: CsArray<int>): void;
    }
    var TestJsObject: TestJsObjectConstructor & TestJsObjectStatic;
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

