import { RunTimeManager } from "RunTimeManager";
import { TestCls } from "./Test";

export class Main {
    static main() {
        console.log("Hello world!");
        TestCls.say();
        console.log("----------------");
        RunTimeManager.say();
    }
    static say() {
        console.log("this is Main");
    }
}
Main.main();