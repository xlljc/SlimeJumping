"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
function a(a1, a2) {
    return a1 + a2;
}
class Main {
    static main() {
        console.log("hello world!");
        new testA(11).Say();
        // console.log("hello!", new test3cls().getNum());
        // console.log("hello!", Random.randomNum());
        // new aaa.a2();
        let time = Date.now();
        let temp = new testA(22);
        time = Date.now();
        for (let i = 0; i < 99999; i++) {
            temp.Say();
        }
        console.log("use Time: ", Date.now() - time);
        time = Date.now();
        for (let i = 0; i < 99999; i++) {
            TestJs.CallSay(new testA(22));
        }
        console.log("use Time: ", Date.now() - time);
        time = Date.now();
        for (let i = 0; i < 99999; i++) {
            CallSay(new testA(33));
        }
        console.log("use Time: ", Date.now() - time);
        let time2 = Date.now();
        for (let i = 0; i < 99999; i++) {
            a(1, 2);
        }
        console.log("use Time: ", Date.now() - time2);
    }
}
exports.Main = Main;
Main.main();
console.log("----------------");
