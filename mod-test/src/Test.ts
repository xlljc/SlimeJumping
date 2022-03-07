import { Main } from "./index";
import { TestManager } from "./Manager/TestManager";

export class TestCls {
    static say() {
        Main.say();
        console.log("test...");
        new TestManager();
        aaa.bbb.ccc.say();
        new testA(11).SayArr([1, 2 ,6, 9]);
    }
}