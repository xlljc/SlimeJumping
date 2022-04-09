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
        say(): void;
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
    interface PuertsScriptManager {
    }
    interface PuertsScriptManagerConstructor {
    }
    interface PuertsScriptManagerStatic {
        readonly ExtensionName: string;
        get JsService(): Puerts.JsEnv;
        get LoadPath(): string;
        Test(t: CsTest): void;
        Init(debugFlag?: DebugFlag, port?: int): void;
        AddHostInstance(obj: JsService.HostInstance): void;
        AddHostInstanceToModule(path: string, obj: JsService.HostInstance): void;
        AddHostType(type: JsService.HostType): void;
        AddHostTypeToModule(path: string, type: JsService.HostType): void;
        Alias(type: System.Type, name: string): void;
        GeneratesTsCode(): void;
        Process(delta: float): void;
        PhysicsProcess(delta: float): void;
        LoadModule(path: string): void;
        LoadDevelopModule(directory: string, path: string): void;
        ExecuteModule(path: string): void;
        ExecuteFile(path: string): void;
    }
    var PuertsScriptManager: PuertsScriptManagerConstructor & PuertsScriptManagerStatic;
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

declare namespace Puerts {
    type JsEnv = any;
}
declare namespace globalThis {
    type DebugFlag = any;
}
declare namespace JsService {
    type HostInstance = any;
}
declare namespace JsService {
    type HostType = any;
}
declare namespace System {
    type Type = any;
}
