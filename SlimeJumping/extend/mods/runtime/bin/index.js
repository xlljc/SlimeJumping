"use strict";
System.register("RunTimeManager", [], function (exports_1, context_1) {
    "use strict";
    var RunTimeManager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RunTimeManager = /** @class */ (function () {
                function RunTimeManager() {
                }
                RunTimeManager.say = function () {
                    console.log("this is RunTimeManager...");
                };
                return RunTimeManager;
            }());
            exports_1("RunTimeManager", RunTimeManager);
        }
    };
});
console.log("init runtime");
