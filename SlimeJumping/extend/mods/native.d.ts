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
    /**
     * 这是TestArr2函数
     * @params array 参数为int数组
    */
    function TestArr2(array: CsArray<int>): void;
}
declare namespace globalThis {
    function TestRef(a: int): void;
}
declare namespace globalThis {
    function TestOut(a: int): void;
}
declare namespace globalThis {
    function aaa(a: T): void;
}


declare namespace globalThis {
    interface Test1<T> {
    }
    interface Test1Constructor<T> {
    }
    interface Test1Static<T> {
    }
    var Test1: Test1Constructor<int> & Test1Static<int>;
}
declare namespace globalThis {
    interface Test2<T> extends Test1 {
        say(a: T): void;
    }
    interface Test2Constructor<T> {
        new(): Test2<T>;
    }
    interface Test2Static<T> extends Test1Static {
        Value: T;
        Value1: string;
    }
    var Test2: Test2Constructor<int> & Test2Static<int>;
}
declare namespace globalThis {
    interface Test3<T> extends Test2<any> {
    }
    interface Test3Constructor<T> {
        new(): Test3<T>;
    }
    interface Test3Static<T> extends Test2Static<any> {
    }
    var Test3: Test3Constructor<int> & Test3Static<int>;
}
declare namespace globalThis {
    interface Test4 extends Test3<any>, Test1<any> {
    }
    interface Test4Constructor {
        new(): Test4;
    }
    interface Test4Static extends Test3Static<any>, Test1Static<any> {
    }
    var Test4: Test4Constructor & Test4Static;
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
        /**
         * 这是TestArr2函数
         * @params array 参数为int数组
        */
        TestArr2(array: CsArray<int>): void;
        TestRef(a: int): void;
        TestOut(a: int): void;
    }
    var TestJsObject: TestJsObjectConstructor & TestJsObjectStatic;
}

declare namespace globalThis {
    type char = string;
}
declare namespace globalThis {
    type byte = number;
}
declare namespace globalThis {
    type short = number;
}
declare namespace globalThis {
    type ushort = number;
}
declare namespace globalThis {
    type int = number;
}
declare namespace globalThis {
    type uint = number;
}
declare namespace globalThis {
    type long = number;
}
declare namespace globalThis {
    type ulong = number;
}
declare namespace globalThis {
    type float = number;
}
declare namespace globalThis {
    type double = number;
}

