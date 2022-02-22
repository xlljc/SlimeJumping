import { Random } from "./Util";
import { test3cls } from "./test/test3";

export class Main {
    static main() {
        console.log("hello world!");
        console.log("hello!", new test3cls().getNum());
        console.log("hello!", Random.randomNum());
        new aaa.a2();
    }
}
Main.main();
console.log("----------------");