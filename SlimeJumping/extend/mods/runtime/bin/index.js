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
System.register("index", [], function (exports_2, context_2) {
    "use strict";
    var arr, i1, jsArr, csArr;
    var __moduleName = context_2 && context_2.id;
    function Process(delta) {
    }
    exports_2("Process", Process);
    function PhysicsProcess(delta) {
    }
    exports_2("PhysicsProcess", PhysicsProcess);
    return {
        setters: [],
        execute: function () {
            arr = TestIntArray();
            i1 = arr.GetValue(1);
            console.log(i1);
            jsArr = Array.toJsArray(arr);
            arr.Length;
            for (const item of jsArr) {
                console.log(item);
            }
            csArr = CsArray.toCsArray("System.Double", jsArr);
            for (let i = 0; i < csArr.Length; i++) {
                const item = csArr.GetValue(i);
                console.log(item);
            }
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyIsInNvdXJjZXMiOlsiVGVzdC50cyIsImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUNBLFNBQWdCLEtBQUs7UUFDakIseUJBQXlCO0lBQzdCLENBQUM7Ozs7Ozs7Ozs7OztJQ2NELFNBQWdCLE9BQU8sQ0FBQyxLQUFZO0lBRXBDLENBQUM7O0lBRUQsU0FBZ0IsY0FBYyxDQUFDLEtBQVk7SUFFM0MsQ0FBQzs7Ozs7WUF0QkcsR0FBRyxHQUFHLFlBQVksRUFBRSxDQUFDO1lBQ3JCLEVBQUUsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFWixLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxHQUFHLENBQUMsTUFBTSxDQUFBO1lBQ1YsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7Z0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckI7WUFFRyxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckIifQ==