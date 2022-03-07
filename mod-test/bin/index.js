"use strict";
System.register("index", ["RunTimeManager", "Test"], function (exports_1, context_1) {
    "use strict";
    var RunTimeManager_1, Test_1, Main;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (RunTimeManager_1_1) {
                RunTimeManager_1 = RunTimeManager_1_1;
            },
            function (Test_1_1) {
                Test_1 = Test_1_1;
            }
        ],
        execute: function () {
            Main = /** @class */ (function () {
                function Main() {
                }
                Main.main = function () {
                    console.log("Hello world!");
                    Test_1.TestCls.say();
                    console.log("----------------");
                    RunTimeManager_1.RunTimeManager.say();
                };
                Main.say = function () {
                    console.log("this is Main");
                };
                return Main;
            }());
            exports_1("Main", Main);
            Main.main();
        }
    };
});
System.register("Manager/TestManager", [], function (exports_2, context_2) {
    "use strict";
    var TestManager;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            TestManager = /** @class */ (function () {
                function TestManager() {
                    console.log("new TestManager");
                }
                return TestManager;
            }());
            exports_2("TestManager", TestManager);
        }
    };
});
System.register("Test", ["index", "Manager/TestManager"], function (exports_3, context_3) {
    "use strict";
    var index_1, TestManager_1, TestCls;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (TestManager_1_1) {
                TestManager_1 = TestManager_1_1;
            }
        ],
        execute: function () {
            TestCls = /** @class */ (function () {
                function TestCls() {
                }
                TestCls.say = function () {
                    index_1.Main.say();
                    console.log("test...");
                    new TestManager_1.TestManager();
                    aaa.bbb.ccc.say();
                    new testA(11).SayArr([1, 2, 6, 9]);
                };
                return TestCls;
            }());
            exports_3("TestCls", TestCls);
        }
    };
});
var aaa;
(function (aaa) {
    var bbb;
    (function (bbb) {
        var ccc = /** @class */ (function () {
            function ccc() {
            }
            ccc.say = function () {
                console.log("this is ccc");
            };
            return ccc;
        }());
        bbb.ccc = ccc;
    })(bbb = aaa.bbb || (aaa.bbb = {}));
})(aaa || (aaa = {}));
