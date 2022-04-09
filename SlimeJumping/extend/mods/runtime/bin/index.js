System.register("Test", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function Test1() {
        //TestFunc(new CsTest());
    }
    exports_1("Test1", Test1);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("index", ["Test"], function (exports_2, context_2) {
    "use strict";
    var Test_1;
    var __moduleName = context_2 && context_2.id;
    // console.log(CsArray.toCsArray(["1", "2"]));
    // new CsTest().say(CsArray.toCsArray(["1", "2"]));
    function Process(delta) {
    }
    exports_2("Process", Process);
    function PhysicsProcess(delta) {
    }
    exports_2("PhysicsProcess", PhysicsProcess);
    return {
        setters: [
            function (Test_1_1) {
                Test_1 = Test_1_1;
            }
        ],
        execute: function () {
            console.log("init runtime!");
            Test_1.Test1();
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyIsInNvdXJjZXMiOlsiVGVzdC50cyIsImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUNBLFNBQWdCLEtBQUs7UUFDakIseUJBQXlCO0lBQzdCLENBQUM7Ozs7Ozs7Ozs7OztJQ0VELDhDQUE4QztJQUM5QyxtREFBbUQ7SUFHbkQsU0FBZ0IsT0FBTyxDQUFDLEtBQVk7SUFFcEMsQ0FBQzs7SUFFRCxTQUFnQixjQUFjLENBQUMsS0FBWTtJQUUzQyxDQUFDOzs7Ozs7Ozs7WUFiRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRTdCLFlBQUssRUFBRSxDQUFDIn0=