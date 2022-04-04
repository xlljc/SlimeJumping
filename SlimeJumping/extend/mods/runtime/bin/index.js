System.register("Test", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function a() {
        return 1 + 1;
    }
    exports_1("a", a);
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
    function Process(delta) {
        Test_1.a();
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
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyIsInNvdXJjZXMiOlsiVGVzdC50cyIsImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLFNBQWdCLENBQUM7UUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsQ0FBQzs7Ozs7Ozs7Ozs7O0lDQUQsU0FBZ0IsT0FBTyxDQUFDLEtBQVk7UUFDaEMsUUFBQyxFQUFFLENBQUM7SUFDUixDQUFDOztJQUVELFNBQWdCLGNBQWMsQ0FBQyxLQUFZO0lBRTNDLENBQUMifQ==