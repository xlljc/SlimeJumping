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
            console.log("--------------- test " + descriptor.value.name + " ---------------");
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
    function TestUstTime(...args) {
        return function (target, propertyKey, descriptor) {
            console.log("--------------- testUstTime " + descriptor.value.name + " ---------------");
            try {
                let time = Date.now();
                descriptor.value(...args);
                console.log("--------------- useTime " + (Date.now() - time) + " ---------------");
            }
            catch (e) {
                console.error(e.toString());
                console.log("--------------- error ---------------");
            }
        };
    }
    exports_1("TestUstTime", TestUstTime);
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
System.register("Extends", [], function (exports_3, context_3) {
    "use strict";
    var MyNode, TestExtends;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            MyNode = class MyNode extends Godot.Node {
                constructor() {
                    super();
                }
                _Process(delta) {
                    super._Process(delta);
                    //let node = this.GetNode(new Godot.NodePath("test")) as Godot.Node2D;
                }
            };
            exports_3("MyNode", MyNode);
            TestExtends = class TestExtends {
                //@Test()
                TestExtends1() {
                    let time = Date.now();
                    for (let i = 0; i < 100; i++) {
                        let a = new MyNode();
                        a._Process(1.5);
                        a.GetNodeOrNull(new Godot.NodePath("aa/bb"));
                    }
                    let time2 = Date.now() - time;
                    console.log("useTime: " + time2);
                }
            };
        }
    };
});
System.register("TestColor", ["index"], function (exports_4, context_4) {
    "use strict";
    var index_1, a, TestColor;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            a = class a {
                addListener(event, cb) {
                    throw new Error("Method not implemented.");
                }
                dispatchEvent(event, value) {
                    throw new Error("Method not implemented.");
                }
                removeListener(event, cb) {
                    throw new Error("Method not implemented.");
                }
                clearListener(event) {
                    throw new Error("Method not implemented.");
                }
                clearAllListener() {
                    throw new Error("Method not implemented.");
                }
            };
            TestColor = class TestColor {
                //@Test()
                static Test1() {
                    let color = new Runtime.Color(0.7, 0.1, 1);
                    color = color.add(new Runtime.Color(0.5, 0.5, 0.5, 0.5));
                    console.log(color, color.toHexadecimal());
                    let color2 = new Runtime.Color(0.2, 0.3, 0.5);
                    color2 = color2.lightened(0.5);
                    console.log(color2, color2.toHexadecimal());
                    let color3 = new Runtime.Color(0.2, 0.3, 0.5);
                    color3 = color3.linearInterpolate(new Runtime.Color(0.5, 0.5, 0.2), 0.5);
                    console.log(color3, color3.toHexadecimal());
                }
                //@Test()
                static Test2() {
                    // color : {r : 0, g : 0, b : 0.00392156862745098, a : 0.07058823529411765}
                    let color = new Runtime.Color(0, 0, 0.00392156862745098, 0.07058823529411765);
                    console.log(new Runtime.Color(color));
                    let color1 = color.toDecimalism();
                    let color2 = color.toHexadecimal();
                    console.log(color1);
                    console.log(color2);
                    console.log(new Runtime.Color(color1));
                    console.log(new Runtime.Color(color2));
                    console.log(new Runtime.Color(274));
                }
                //@Test()
                static TestSHV() {
                    let color = Runtime.Color.blue;
                    console.log(color.h);
                    console.log(color.s);
                    console.log(color.v);
                    color.h = 0.2;
                    console.log(color.h);
                    console.log(color);
                    //Runtime.Color.FromHsv();
                }
                static Test3() {
                    let color = Runtime.Color.white;
                    let color2 = Runtime.Color.black;
                    console.log(color2.linearInterpolate(color, 0.3));
                    console.log(color2.linearInterpolate(color, new Runtime.Color(0.1, 0.2, 0.3)));
                    console.log(color2.transition(color, 0.3));
                    console.log(color.equals(Runtime.Color.white));
                }
            };
            __decorate([
                index_1.Test()
            ], TestColor, "Test3", null);
            exports_4("TestColor", TestColor);
        }
    };
});
System.register("TestUpdate", [], function (exports_5, context_5) {
    "use strict";
    var TestUpdate;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            TestUpdate = class TestUpdate {
                static Test1(delta) {
                    if (Runtime.Input.isKeyPressed(Runtime.KeyList.A)) {
                        console.log("按下了A");
                    }
                }
                static Test2(delta) {
                }
            };
            __decorate([
                Runtime.Update()
            ], TestUpdate, "Test1", null);
            __decorate([
                Runtime.PhysicsUpdate()
            ], TestUpdate, "Test2", null);
            exports_5("TestUpdate", TestUpdate);
        }
    };
});
System.register("TestVector2", [], function (exports_6, context_6) {
    "use strict";
    var TestVector2;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            TestVector2 = class TestVector2 {
                //@Test()
                Test1() {
                    let v1 = new Runtime.Vector2(1, 10);
                    let v2 = new Runtime.Vector2(2, 20);
                    let v3 = v1.add(v2);
                    console.log(v3);
                }
                //@Test()
                Test2() {
                    let v1 = Runtime.Vector2.one;
                    let v2 = Runtime.Vector2.zero;
                    v2 = v2.add(1);
                    console.log(v1, v2);
                    console.log(v1 === v2);
                    console.log(v1 == v2);
                    console.log(v1.equals(v2));
                }
            };
            exports_6("TestVector2", TestVector2);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiLCJBcnJheS50cyIsIkV4dGVuZHMudHMiLCJUZXN0Q29sb3IudHMiLCJUZXN0VXBkYXRlLnRzIiwiVGVzdFZlY3RvcjIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0lBQUE7O09BRUc7SUFDSCxTQUFnQixJQUFJLENBQUMsR0FBRyxJQUFXO1FBQy9CLE9BQU8sVUFBVSxNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUE4QjtZQUM3RSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDLENBQUM7WUFDbEYsSUFBSTtnQkFDQSxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQzthQUMxRDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQzthQUN4RDtRQUNMLENBQUMsQ0FBQztJQUNOLENBQUM7O0lBRUQsU0FBZ0IsV0FBVyxDQUFDLEdBQUcsSUFBVztRQUN0QyxPQUFPLFVBQVUsTUFBVyxFQUFFLFdBQW1CLEVBQUUsVUFBOEI7WUFDN0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3pGLElBQUk7Z0JBQ0EsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUN0QixVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMs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