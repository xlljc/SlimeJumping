var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
System.register("index", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * 测试调用函数
     */
    function Test(...args) {
        return function (target, propertyKey, descriptor) {
            console.log("--------------- start " + descriptor.value.name + " ---------------");
            try {
                descriptor.value(...args);
                console.log("--------------- success ---------------");
            }
            catch (e) {
                console.error(e.toString());
                console.log("--------------- error ---------------");
            }
        };
    }
    exports_1("Test", Test);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Array", [], function (exports_2, context_2) {
    "use strict";
    var ArrayTest;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            ArrayTest = class ArrayTest {
                //@Test()
                NodeToArray() {
                    var arr = TestNodeArray();
                    arr.SetValue(new Godot.Node(), 0);
                    arr.SetValue(new Godot.Node2D(), 1);
                    var i1 = arr.GetValue(1);
                    console.log(i1);
                    var jsArr = Array.toJsArray(arr);
                    console.log("length: " + jsArr.length);
                    for (const item of jsArr) {
                        console.log(item);
                    }
                    console.log("---------");
                    var csArr = CsArray.toCsArray("Godot.Node", jsArr);
                    console.log("length: " + csArr.Length);
                    for (let i = 0; i < csArr.Length; i++) {
                        const item = csArr.GetValue(i);
                        console.log(item);
                    }
                }
                //@Test()
                NumberToArray() {
                    var jsArr = [1, 2, 3, 5];
                    var csArr = CsArray.toCsArray("System.Int64", jsArr);
                    console.log("length: " + csArr.Length);
                    for (let i = 0; i < csArr.Length; i++) {
                        const item = csArr.GetValue(i);
                        console.log(item);
                    }
                }
                //@Test()
                StringToArray() {
                    var jsArr = ["a", "ab", "abc"];
                    var csArr = CsArray.toCsArray("System.String", jsArr);
                    console.log("length: " + csArr.Length);
                    for (let i = 0; i < csArr.Length; i++) {
                        const item = csArr.GetValue(i);
                        console.log(item);
                    }
                }
                //@Test()
                BooleanToArray() {
                    var jsArr = [true, false, false];
                    var csArr = CsArray.toCsArray("System.Boolean", jsArr);
                    console.log("length: " + csArr.Length);
                    for (let i = 0; i < csArr.Length; i++) {
                        const item = csArr.GetValue(i);
                        console.log(item);
                    }
                }
                //@Test()
                CharToArray() {
                    var jsArr = ['a', 'b', 'c'];
                    var csArr = CsArray.toCsArray("System.Char", jsArr);
                    console.log("length: " + csArr.Length);
                    for (let i = 0; i < csArr.Length; i++) {
                        const item = csArr.GetValue(i);
                        console.log(item);
                    }
                }
                //@Test()
                ToArrayUstTime() {
                    let time = Date.now();
                    for (let i = 0; i < 999999; i++) {
                        var jsArr = [1, 2, 3, 4, 5, 6, 8, 9, 9, 5, 2, 4, 5, 6];
                        var csArr = CsArray.toCsArray("System.Int32", jsArr);
                    }
                    let time2 = Date.now() - time;
                    console.log("useTime: " + time2);
                }
                //@Test()
                ToArrayUstTime2() {
                    let time = Date.now();
                    let arr = [];
                    for (let i = 0; i < 500; i++) {
                        arr.push(i);
                    }
                    let csArr = CsArray.toCsArray("System.Int32", arr);
                    let time2 = Date.now() - time;
                    console.log("useTime: " + time2);
                    console.log(csArr.Length);
                }
            };
        }
    };
});
System.register("Extends", ["index"], function (exports_3, context_3) {
    "use strict";
    var index_1, A, ArrayExtends;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            A = class A extends Godot.Node {
                constructor() {
                    super();
                    //console.log("create A: " + this.Name);
                }
                _Process(delta) {
                    super._Process(delta);
                    //console.log("a: " + delta + " name: " + this.Name);
                }
            };
            ArrayExtends = class ArrayExtends {
                TestExtends1() {
                    let time = Date.now();
                    for (let i = 0; i < 100; i++) {
                        let a = new A();
                        a._Process(1.5);
                        a.GetNodeOrNull(new Godot.NodePath("aa/bb"));
                    }
                    let time2 = Date.now() - time;
                    console.log("useTime: " + time2);
                }
            };
            __decorate([
                index_1.Test()
            ], ArrayExtends.prototype, "TestExtends1", null);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiLCJBcnJheS50cyIsIkV4dGVuZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0lBQUE7O09BRUc7SUFDSCxTQUFnQixJQUFJLENBQUMsR0FBRyxJQUFXO1FBQy9CLE9BQU8sVUFBVSxNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUE4QjtZQUM3RSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDLENBQUM7WUFDbkYsSUFBSTtnQkFDQSxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQzthQUMxRDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQzthQUN4RDtRQUNMLENBQUMsQ0FBQztJQUNOLENBQUM7Ozs7Ozs7Ozs7Ozs7OztZQ1pELFlBQUEsTUFBTSxTQUFTO2dCQUVYLFNBQVM7Z0JBQ0YsV0FBVztvQkFDZCxJQUFJLEdBQUcsR0FBRyxhQUFhLEVBQUUsQ0FBQztvQkFDMUIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDbEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFF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