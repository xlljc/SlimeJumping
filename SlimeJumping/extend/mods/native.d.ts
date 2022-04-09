/*
 version: 
*/

type CsArray<T> = T[];

interface Console {
    error(...data: any[]): void;
    info(...data: any[]): void;
    log(...data: any[]): void;
    warn(...data: any[]): void;
}
declare var console: Console;




declare namespace globalThis {
    interface CsTest {
        say(arr: CsArray<string>): void;
    }
    interface CsTestConstructor {
        new(): CsTest;
    }
    interface CsTestStatic {
        a: string;
        StaticSay(): void;
    }
    var CsTest: CsTestConstructor & CsTestStatic;
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

