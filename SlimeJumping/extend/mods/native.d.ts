/*
 version: 
*/

/** Indicates this is a C# type. */
declare type CsType = {
    "System.Object": Object;
    "System.Char": char;
    "System.Byte": byte;
    "System.SByte": sbyte;
    "System.Int16": short;
    "System.UInt16": ushort;
    "System.Int32": int;
    "System.UInt32": uint;
    "System.Int64": long;
    "System.UInt64": ulong;
    "System.String": string;
    "System.Single": float;
    "System.Double": double;
    "System.Boolean": boolean;
    "System.Void": void;
    "Test1": Test1<T>;
    "Test2": Test2<T>;
    "Test3": Test3<T>;
    "Test4": Test4;
    "TestJsObject": TestJsObject;
    "Godot.Vector2": Godot.Vector2;
    "Godot.Node2D": Godot.Node2D;
}
declare interface Ref<T> {
    value: T;
}
declare var Ref: new <T>(value: T) => Ref<T>;

/** Represents an array type in C#. */
interface CsArray<T> {
    get LongLength(): long;
    get IsFixedSize(): boolean;
    get IsReadOnly(): boolean;
    get IsSynchronized(): boolean;
    get SyncRoot(): Object;
    get Length(): int;
    get Rank(): int;
    CopyTo(array: CsArray, index: int): void;
    Clone(): Object;
    CopyTo(array: CsArray, index: long): void;
    GetLongLength(dimension: int): long;
    GetValue(index: long): T;
    GetValue(index1: long, index2: long): T;
    GetValue(index1: long, index2: long, index3: long): T;
    GetValue(...indices: long[]): T;
    SetValue(value: T, index: long): void;
    SetValue(value: T, index1: long, index2: long): void;
    SetValue(value: T, index1: long, index2: long, index3: long): void;
    SetValue(value: T, ...indices: long[]): void;
    GetEnumerator(): System.Collections.IEnumerator;
    GetLength(dimension: int): int;
    GetLowerBound(dimension: int): int;
    GetValue(...indices: int[]): T;
    SetValue(value: T, ...indices: int[]): void;
    GetUpperBound(dimension: int): int;
    GetValue(index: int): T;
    GetValue(index1: int, index2: int): T;
    GetValue(index1: int, index2: int, index3: int): T;
    SetValue(value: T, index: int): void;
    SetValue(value: T, index1: int, index2: int): void;
    SetValue(value: T, index1: int, index2: int, index3: int): void;
    Initialize(): void;
}
declare interface CsArrayStatic {
    createCsArray<T1 extends keyof CsType, V extends CsType[T1]>(csType: T1, length: number): CsArray<V>;
    createCsArray<T1 extends keyof CsType, V extends CsType[T1]>(csType: T1, length1: number, length2: number): CsArray<CsArray<V>>;
    createCsArray<T1 extends keyof CsType, V extends CsType[T1]>(csType: T1, length1: number, length2: number, length3: number): CsArray<CsArray<CsArray<V>>>;
    /** Converts a JS array to a C# array of the specified type. */
    toCsArray<T1 extends keyof CsType, V extends CsType[T1]>(csType: T1, arr: V[]): CsArray<V>;
}
declare var CsArray: CsArrayStatic;

declare interface ArrayConstructor {
    /** Convert C# arrays to JS arrays. */
    toJsArray<T>(csArr: CsArray<T>): Array<T>;
}

interface Console {
    error(...data: Object[]): void;
    info(...data: Object[]): void;
    log(...data: Object[]): void;
    warn(...data: Object[]): void;
}
declare var console: Console;


declare namespace globalThis {
    function TestArr1(array: Object): void;
}
declare namespace globalThis {
    /**
     * 这是TestArr2函数
     * @params array 参数为int数组
    */
    function TestArr2(array: CsArray<int>): void;
}
declare namespace globalThis {
    function TestRef(a: Ref<int>): void;
}
declare namespace globalThis {
    function TestOut(a: Ref<int>): void;
}
declare namespace globalThis {
    function TestNodeArray(array: CsArray<CsArray<Godot.Node2D>>): void;
}
declare namespace globalThis {
    function TestIntArray(): CsArray<int>;
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
    interface Test2<T> extends Test1<int> {
        say(a: T): void;
    }
    interface Test2Constructor<T> {
        new(): Test2<T>;
    }
    interface Test2Static<T> extends Test1Static<int> {
        Value: T;
        Value1: string;
    }
    var Test2: Test2Constructor<int> & Test2Static<int>;
}
declare namespace globalThis {
    interface Test3<T> extends Test2<int> {
    }
    interface Test3Constructor<T> {
        new(): Test3<T>;
    }
    interface Test3Static<T> extends Test2Static<int> {
    }
    var Test3: Test3Constructor<int> & Test3Static<int>;
}
declare namespace globalThis {
    interface Test4 extends Test3<int>, Test1<string> {
        a1(refa: Ref<Godot.Vector2>, outb: Ref<int>): void;
        a2(ina: Godot.Vector2, Test4: Test4, outTest4: Ref<Test4>): void;
    }
    interface Test4Constructor {
        new(): Test4;
    }
    interface Test4Static extends Test3Static<int>, Test1Static<string> {
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
        TestArr1(array: Object): void;
        /**
         * 这是TestArr2函数
         * @params array 参数为int数组
        */
        TestArr2(array: CsArray<int>): void;
        TestRef(a: Ref<int>): void;
        TestOut(a: Ref<int>): void;
        TestNodeArray(array: CsArray<CsArray<Godot.Node2D>>): void;
        TestIntArray(): CsArray<int>;
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
    type sbyte = number;
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

declare namespace Godot {
    type Vector2 = any;
}
declare namespace Godot {
    type Node2D = any;
}
