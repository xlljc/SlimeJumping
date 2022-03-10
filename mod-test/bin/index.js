System.register("index", [], function (exports_1, context_1) {
    "use strict";
    var Main;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Main = /** @class */ (function () {
                function Main() {
                }
                Main.main = function () {
                    console.log("Hello world!");
                };
                return Main;
            }());
            exports_1("Main", Main);
            Main.main();
        }
    };
});
