"use strict";
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
                console.error(e.toString() + "\n" + e.stack);
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
                console.error(e.toString() + "\n" + e.stack);
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
System.register("basic/TestColor", [], function (exports_2, context_2) {
    "use strict";
    var TestColor;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            TestColor = class TestColor {
                //@Test()
                static Test1() {
                    let color = new Color(0.7, 0.1, 1);
                    color = color.add(new Color(0.5, 0.5, 0.5, 0.5));
                    console.log(color, color.toHexadecimal());
                    let color2 = new Color(0.2, 0.3, 0.5);
                    color2 = color2.lightened(0.5);
                    console.log(color2, color2.toHexadecimal());
                    let color3 = new Color(0.2, 0.3, 0.5);
                    color3 = color3.linearInterpolate(new Color(0.5, 0.5, 0.2), 0.5);
                    console.log(color3, color3.toHexadecimal());
                }
                //@Test()
                static Test2() {
                    // color : {r : 0, g : 0, b : 0.00392156862745098, a : 0.07058823529411765}
                    let color = new Color(0, 0, 0.00392156862745098, 0.07058823529411765);
                    console.log(new Color(color));
                    let color1 = color.toDecimalism();
                    let color2 = color.toHexadecimal();
                    console.log(color1);
                    console.log(color2);
                    console.log(new Color(color1));
                    console.log(new Color(color2));
                    console.log(new Color(274));
                }
                //@Test()
                static TestSHV() {
                    let color = Color.blue;
                    console.log(color.h);
                    console.log(color.s);
                    console.log(color.v);
                    color.h = 0.2;
                    console.log(color.h);
                    console.log(color);
                    //Color.FromHsv();
                }
                //@Test()
                static Test3() {
                    let color = Color.white;
                    let color2 = Color.black;
                    console.log(color2.linearInterpolate(color, 0.3));
                    console.log(color2.linearInterpolate(color, new Color(0.1, 0.2, 0.3)));
                    console.log(color.equals(Color.white));
                }
            };
            exports_2("TestColor", TestColor);
        }
    };
});
System.register("basic/TestUpdate", [], function (exports_3, context_3) {
    "use strict";
    var TestUpdate;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            TestUpdate = class TestUpdate {
                static Test1(delta) {
                }
                static Test2(delta) {
                }
            };
            __decorate([
                Update()
            ], TestUpdate, "Test1", null);
            __decorate([
                PhysicsUpdate()
            ], TestUpdate, "Test2", null);
            exports_3("TestUpdate", TestUpdate);
        }
    };
});
System.register("basic/TestVector2", [], function (exports_4, context_4) {
    "use strict";
    var TestVector2;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            TestVector2 = class TestVector2 {
                //@Test()
                Test1() {
                    let v1 = new Vector2(1, 10);
                    let v2 = new Vector2(2, 20);
                    let v3 = v1.add(v2);
                    console.log(v3);
                }
                //@Test()
                Test2() {
                    let v1 = Vector2.one;
                    let v2 = Vector2.zero;
                    v2 = v2.add(1);
                    console.log(v1, v2);
                    console.log(v1 === v2);
                    console.log(v1 == v2);
                    console.log(v1.equals(v2));
                }
            };
            exports_4("TestVector2", TestVector2);
        }
    };
});
System.register("framework/TestNode", ["index"], function (exports_5, context_5) {
    "use strict";
    var index_1, MySprite, MyNode2, TestNode;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            MySprite = class MySprite extends Node {
                constructor() {
                    super();
                    this["__gdNodeType__"] = "Sprite";
                }
                initialize() {
                    console.log("初始化完成! MyNode: " + this.name + ", " + this.position);
                }
            };
            MySprite = __decorate([
                NodeRegister
            ], MySprite);
            MyNode2 = class MyNode2 extends Node {
                initialize() {
                    console.log("初始化完成! MyNode2: " + this.name + ", " + this.position);
                }
                update(delta) {
                }
            };
            MyNode2 = __decorate([
                NodeRegister
            ], MyNode2);
            TestNode = class TestNode {
                Test1() {
                    let scene = new Scene("TestNodeAdd");
                    SceneManager.setActiveScene(scene);
                    MySprite.instantiate("n1");
                    MyNode2.instantiate("n2");
                }
            };
            __decorate([
                index_1.Test()
            ], TestNode.prototype, "Test1", null);
            exports_5("TestNode", TestNode);
        }
    };
});
System.register("framework/TestScene", [], function (exports_6, context_6) {
    "use strict";
    var TestScene;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            TestScene = class TestScene {
                //@Test()
                startScene() {
                    let scene = new Scene("testScene");
                    // new MyNode();
                }
            };
            exports_6("TestScene", TestScene);
        }
    };
});
// import { MyNode2d } from "./WarpNode";
// export class TestAddNode {
//     //@Test()
//     public Test1() {
//         let v = Vector2.one.add(10);
//         let node = new Godot.Node2D();
//         node.Name = "MyNode";
//         node.Position = new Godot.Vector2(v.x, v.y);
//         CShap.GameManager.Instance.AddChild(node);
//     }
//     // @TestUstTime()
//     // @Test()
//     public Test2() {
//         let node = new MyNode2d("MyNode2d");
//         for (let i = 0; i < 99999; i++) {
//             node.position = Vector2.negOne;
//         }
//     }
// }
// import { Test } from "../index";
// class ArrayTest {
//     //@Test()
//     public NodeToArray() {
//         var arr = TestNodeArray();
//         arr.SetValue(new Godot.Node(), 0);
//         arr.SetValue(new Godot.Node2D(), 1);
//         var i1 = arr.GetValue(1);
//         console.log(i1);
//         var jsArr = Array.toJsArray(arr);
//         console.log("length: " + jsArr.length);
//         for (const item of jsArr) {
//             console.log(item);
//         }
//         console.log("---------");
//         var csArr = CsArray.toCsArray("Godot.Node", jsArr);
//         console.log("length: " + csArr.Length);
//         for (let i = 0; i < csArr.Length; i++) {
//             const item = csArr.GetValue(i);
//             console.log(item);
//         }
//     }
//     //@Test()
//     public NumberToArray() {
//         var jsArr = [1, 2, 3, 5];
//         var csArr = CsArray.toCsArray("System.Int64", jsArr);
//         console.log("length: " + csArr.Length);
//         for (let i = 0; i < csArr.Length; i++) {
//             const item = csArr.GetValue(i);
//             console.log(item);
//         }
//     }
//     //@Test()
//     public StringToArray() {
//         var jsArr = ["a", "ab", "abc"];
//         var csArr = CsArray.toCsArray("System.String", jsArr);
//         console.log("length: " + csArr.Length);
//         for (let i = 0; i < csArr.Length; i++) {
//             const item = csArr.GetValue(i);
//             console.log(item);
//         }
//     }
//     //@Test()
//     public BooleanToArray() {
//         var jsArr = [true, false, false];
//         var csArr = CsArray.toCsArray("System.Boolean", jsArr);
//         console.log("length: " + csArr.Length);
//         for (let i = 0; i < csArr.Length; i++) {
//             const item = csArr.GetValue(i);
//             console.log(item);
//         }
//     }
//     //@Test()
//     public CharToArray() {
//         var jsArr = ['a', 'b', 'c'];
//         var csArr = CsArray.toCsArray("System.Char", jsArr);
//         console.log("length: " + csArr.Length);
//         for (let i = 0; i < csArr.Length; i++) {
//             const item = csArr.GetValue(i);
//             console.log(item);
//         }
//     }
//     //@Test()
//     public ToArrayUstTime() {
//         let time = Date.now();
//         for (let i = 0; i < 999999; i++) {
//             var jsArr = [1,2,3,4,5,6,8,9,9,5,2,4,5,6];
//             var csArr = CsArray.toCsArray("System.Int32", jsArr);
//         }
//         let time2 = Date.now() - time;
//         console.log("useTime: " + time2);
//     }
//     //@Test()
//     public ToArrayUstTime2() {
//         let time = Date.now();
//         let arr: number[] = [];
//         for (let i = 0; i < 500; i++) {
//             arr.push(i);
//         }
//         let csArr = CsArray.toCsArray("System.Int32", arr);
//         let time2 = Date.now() - time;
//         console.log("useTime: " + time2);
//         console.log(csArr.Length);
//     }
// }
// export class MyNode extends Godot.Node {
//     constructor() {
//         super();
//     }
//     public _Process(delta: number): void {
//         super._Process(delta);
//         let node = this.GetNode(new Godot.NodePath("test")) as Godot.Node2D;
//     }
// }
// class TestExtends {
//     //@Test()
//     public TestExtends1() {
//         let time = Date.now();
//         for (let i = 0; i < 100; i++) {
//             let a = new MyNode();
//             a._Process(1.5);
//             a.GetNodeOrNull(new Godot.NodePath("aa/bb"));
//         }
//         let time2 = Date.now() - time;
//         console.log("useTime: " + time2);
//     }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyIsInNvdXJjZXMiOlsibmF0aXZlL1Rlc3RBZGROb2RlLnRzIiwiaW5kZXgudHMiLCJiYXNpYy9UZXN0Q29sb3IudHMiLCJiYXNpYy9UZXN0VXBkYXRlLnRzIiwiYmFzaWMvVGVzdFZlY3RvcjIudHMiLCJmcmFtZXdvcmsvVGVzdE5vZGUudHMiLCJmcmFtZXdvcmsvVGVzdFNjZW5lLnRzIiwibmF0aXZlL1Rlc3RBcnJheS50cyIsIm5hdGl2ZS9UZXN0RXh0ZW5kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lDQUE7O09BRUc7SUFDSCxTQUFnQixJQUFJLENBQUMsR0FBRyxJQUFXO1FBQy9CLE9BQU8sVUFBVSxNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUE4QjtZQUM3RSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDLENBQUM7WUFDbEYsSUFBSTtnQkFDQSxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQzthQUMxRDtZQUFDLE9BQU8sQ0FBTSxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQzthQUN4RDtRQUNMLENBQUMsQ0FBQztJQUNOLENBQUM7O0lBRUQsU0FBZ0IsV0FBVyxDQUFDLEdBQUcsSUFBVztRQUN0QyxPQUFPLFVBQVUsTUFBVyxFQUFFLFdBQW1CLEVBQUUsVUFBOEI7WUFDN0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxrQkFB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