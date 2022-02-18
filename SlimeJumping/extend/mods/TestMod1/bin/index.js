"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const Util_1 = require("./Util");
class Main {
    static main() {
        Util_1.Random.randomNum();
    }
}
exports.Main = Main;
console.log("hello!", Util_1.Random.randomNum());
