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
    var Test_1, arr;
    var __moduleName = context_2 && context_2.id;
    // console.log(arr);
    // console.log(arr[3]);
    // console.log(arr.Length);
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
            //console.log("init runtime!");
            Test_1.Test1();
            // console.log(CsArray.toCsArray(["1", "2"]));
            // new CsTest().say(CsArray.toCsArray(["1", "2"]));
            // TestArr("a");
            // TestArr(1);
            arr = CsArray.createCsArray("System.Int32", 10);
            arr.Set(0, 100);
            arr.Set(1, 111);
            arr.Set(2, 222);
            TestArr2(arr);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyIsInNvdXJjZXMiOlsiVGVzdC50cyIsImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUNBLFNBQWdCLEtBQUs7UUFDakIseUJBQXlCO0lBQzdCLENBQUM7Ozs7Ozs7Ozs7OztJQ1lELG9CQUFvQjtJQUNwQix1QkFBdUI7SUFDdkIsMkJBQTJCO0lBRTNCLFNBQWdCLE9BQU8sQ0FBQyxLQUFZO0lBRXBDLENBQUM7O0lBRUQsU0FBZ0IsY0FBYyxDQUFDLEtBQVk7SUFFM0MsQ0FBQzs7Ozs7Ozs7O1lBdkJELCtCQUErQjtZQUUvQixZQUFLLEVBQUUsQ0FBQztZQUNSLDhDQUE4QztZQUM5QyxtREFBbUQ7WUFDbkQsZ0JBQWdCO1lBQ2hCLGNBQWM7WUFDVixHQUFHLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDcEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFaEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDIn0=