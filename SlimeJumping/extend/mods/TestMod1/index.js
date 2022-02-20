"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const Util_1 = require("./Util");
const test3_1 = require("./test/test3");
class Main {
    static main() {
        console.log("hello world!");
        console.log("hello!", new test3_1.test3cls().getNum());
        console.log("hello!", Util_1.Random.randomNum());
        new aaa.a2();
    }
}
exports.Main = Main;
Main.main();
