var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
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
System.register("basic/TestExtends", [], function (exports_3, context_3) {
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
                    let node = this.GetNode(new Godot.NodePath("test"));
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
System.register("basic/TestUpdate", [], function (exports_4, context_4) {
    "use strict";
    var TestUpdate;
    var __moduleName = context_4 && context_4.id;
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
            exports_4("TestUpdate", TestUpdate);
        }
    };
});
System.register("basic/TestVector2", [], function (exports_5, context_5) {
    "use strict";
    var TestVector2;
    var __moduleName = context_5 && context_5.id;
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
            exports_5("TestVector2", TestVector2);
        }
    };
});
System.register("framework/WarpNode", [], function (exports_6, context_6) {
    "use strict";
    var _MyNode2d__node, MyNode2d;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            MyNode2d = class MyNode2d {
                constructor(nodeName) {
                    _MyNode2d__node.set(this, void 0);
                    __classPrivateFieldSet(this, _MyNode2d__node, new Godot.Node2D(), "f");
                    __classPrivateFieldGet(this, _MyNode2d__node, "f").Name = nodeName;
                    CShap.GameManager.Instance.AddChild(__classPrivateFieldGet(this, _MyNode2d__node, "f"));
                }
                get position() {
                    let v = __classPrivateFieldGet(this, _MyNode2d__node, "f").Position;
                    return new Vector2(v.x, v.y);
                }
                set position(v) {
                    __classPrivateFieldGet(this, _MyNode2d__node, "f").Position = new Godot.Vector2(v.x, v.y);
                }
            };
            exports_6("MyNode2d", MyNode2d);
            _MyNode2d__node = new WeakMap();
        }
    };
});
System.register("framework/TestAddNode", ["framework/WarpNode"], function (exports_7, context_7) {
    "use strict";
    var WarpNode_1, TestAddNode;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (WarpNode_1_1) {
                WarpNode_1 = WarpNode_1_1;
            }
        ],
        execute: function () {
            TestAddNode = class TestAddNode {
                //@Test()
                Test1() {
                    let v = Vector2.one.add(10);
                    let node = new Godot.Node2D();
                    node.Name = "MyNode";
                    node.Position = new Godot.Vector2(v.x, v.y);
                    CShap.GameManager.Instance.AddChild(node);
                }
                // @TestUstTime()
                // @Test()
                Test2() {
                    let node = new WarpNode_1.MyNode2d("MyNode2d");
                    for (let i = 0; i < 99999; i++) {
                        node.position = Vector2.negOne;
                    }
                    let g;
                }
            };
            exports_7("TestAddNode", TestAddNode);
        }
    };
});
System.register("native/TestArray", [], function (exports_8, context_8) {
    "use strict";
    var ArrayTest;
    var __moduleName = context_8 && context_8.id;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiLCJiYXNpYy9UZXN0Q29sb3IudHMiLCJiYXNpYy9UZXN0RXh0ZW5kcy50cyIsImJhc2ljL1Rlc3RVcGRhdGUudHMiLCJiYXNpYy9UZXN0VmVjdG9yMi50cyIsImZyYW1ld29yay9XYXJwTm9kZS50cyIsImZyYW1ld29yay9UZXN0QWRkTm9kZS50cyIsIm5hdGl2ZS9UZXN0QXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQTs7T0FFRztJQUNILFNBQWdCLElBQUksQ0FBQyxHQUFHLElBQVc7UUFDL0IsT0FBTyxVQUFVLE1BQVcsRUFBRSxXQUFtQixFQUFFLFVBQThCO1lBQzdFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztZQUNsRixJQUFJO2dCQUNBLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO2FBQzFEO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO2FBQ3hEO1FBQ0wsQ0FBQyxDQUFDO0lBQ04sQ0FBQzs7SUFFRCxTQUFnQixXQUFXLENBQUMsR0FBRyxJQUFXO1FBQ3RDLE9BQU8sVUFBVSxNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUE4QjtZQUM3RSxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDLENBQUM7WUFDekYsSUFBSTtnQkFDQSxJQUFJLElBQUksR0FB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