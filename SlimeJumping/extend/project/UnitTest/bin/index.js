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
    var index_1, TestColor;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
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
                static Test3() {
                    let color = Color.white;
                    let color2 = Color.black;
                    console.log(color2.linearInterpolate(color, 0.3));
                    console.log(color2.linearInterpolate(color, new Color(0.1, 0.2, 0.3)));
                    console.log(color.equals(Color.white));
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
                    if (Input.isKeyPressed(KeyList.A)) {
                        console.log("按下了A");
                    }
                    //Math.moveToward();
                }
                static Test2(delta) {
                    Vector2.zero;
                }
            };
            __decorate([
                Update()
            ], TestUpdate, "Test1", null);
            __decorate([
                PhysicsUpdate()
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
            exports_6("TestVector2", TestVector2);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyIsInNvdXJjZXMiOlsidGVzdC50cyIsImluZGV4LnRzIiwiQXJyYXkudHMiLCJFeHRlbmRzLnRzIiwiVGVzdENvbG9yLnRzIiwiVGVzdFVwZGF0ZS50cyIsIlRlc3RWZWN0b3IyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUNBQTs7T0FFRztJQUNILFNBQWdCLElBQUksQ0FBQyxHQUFHLElBQVc7UUFDL0IsT0FBTyxVQUFVLE1BQVcsRUFBRSxXQUFtQixFQUFFLFVBQThCO1lBQzdFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztZQUNsRixJQUFJO2dCQUNBLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO2FBQzFEO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO2FBQ3hEO1FBQ0wsQ0FBQyxDQUFDO0lBQ04sQ0FBQzs7SUFFRCxTQUFnQixXQUFXLENBQUMsR0FBRyxJQUFXO1FBQ3RDLE9BQU8sVUFBVSxNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUE4QjtZQUM3RSxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDLENBQUM7WUFDekYsSUFBSTtnQkFDQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3RCLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDO2FBQ3RGO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO2FBQ3hEO1FBQ0wsQ0FBQyxDQUFDO0lBQ04sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O1lDMUJELFlBQUEsTUFBTSxTQUFTO2dCQUVYLFNBQVM7Z0JBQ0YsV0FBVztvQkFDZCxJQUFJLEdBQUcsR0FBRyxhQUFhLEVBQUUsQ0FBQztvQkFDMUIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDbEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFFaEIsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN2QyxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTt3QkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDckI7b0JBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDekIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ25DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3JCO2dCQUNMLENBQUM7Z0JBRUQsU0FBUztnQkFDRixhQUFhO29CQUNoQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN6QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN2QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDbkMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDckI7Z0JBQ0wsQ0FBQztnQkFFRCxTQUFTO2dCQUNGLGFBQWE7b0JBQ2hCLElBQUksS0FBSyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDL0IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ25DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3JCO2dCQUNMLENBQUM7Z0JBRUQsU0FBUztnQkFDRixjQUFjO29CQUNqQixJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ2pDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ25DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3JCO2dCQUNMLENBQUM7Z0JBRUQsU0FBUztnQkFDRixXQUFXO29CQUNkLElBQUksS0FBSyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ25DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3JCO2dCQUNMLENBQUM7Z0JBRUQsU0FBUztnQkFDRixjQUFjO29CQUNqQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQzdCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztxQkFDeEQ7b0JBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztvQkFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7Z0JBRUQsU0FBUztnQkFDRixlQUFlO29CQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ3RCLElBQUksR0FBRyxHQUFhLEVBQUUsQ0FBQztvQkFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDZjtvQkFDRCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDbkQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztvQkFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUM7b0JBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5QixDQUFDO2FBRUosQ0FBQTs7Ozs7Ozs7Ozs7WUM3RkQsU0FBQSxNQUFhLE1BQU8sU0FBUSxLQUFLLENBQUMsSUFBSTtnQkFDbEM7b0JBQ0ksS0FBSyxFQUFFLENBQUM7Z0JBQ1osQ0FBQztnQkFDTSxRQUFRLENBQUMsS0FBYTtvQkFDekIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdEIsc0VBQXNFO2dCQUMxRSxDQUFDO2FBQ0osQ0FBQTs7WUFFRCxjQUFBLE1BQU0sV0FBVztnQkFDYixTQUFTO2dCQUNGLFlBQVk7b0JBQ2YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUMxQixJQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO3dCQUNyQixDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNoQixDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3FCQUNoRDtvQkFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO29CQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDckMsQ0FBQzthQUNKLENBQUE7Ozs7Ozs7Ozs7Ozs7OztZQ3RCRCxZQUFBLE1BQWEsU0FBUztnQkFFbEIsU0FBUztnQkFDRixNQUFNLENBQUMsS0FBSztvQkFDZixJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNuQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDdEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO29CQUM1QyxJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN0QyxNQUFNLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDO2dCQUVELFNBQVM7Z0JBQ0YsTUFBTSxDQUFDLEtBQUs7b0JBQ2YsMkVBQTJFO29CQUMzRSxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLG1CQUFtQixFQUFFLG1CQUFtQixDQUFDLENBQUM7b0JBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUNsQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7Z0JBRUQsU0FBUztnQkFDRixNQUFNLENBQUMsT0FBTztvQkFDakIsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckIsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7b0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ25CLGtCQUFrQjtnQkFDdEIsQ0FBQztnQkFHTSxNQUFNLENBQUMsS0FBSztvQkFDZixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUN4QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2RSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLENBQUM7YUFDSixDQUFBO1lBUEc7Z0JBREMsWUFBSSxFQUFFO3dDQU9OOzs7Ozs7Ozs7Ozs7WUNqREwsYUFBQSxNQUFhLFVBQVU7Z0JBR1osTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFhO29CQUM3QixJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUN2QjtvQkFDRCxvQkFBb0I7Z0JBQ3hCLENBQUM7Z0JBR00sTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFhO29CQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNqQixDQUFDO2FBQ0osQ0FBQTtZQVhHO2dCQURDLE1BQU0sRUFBRTt5Q0FNUjtZQUdEO2dCQURDLGFBQWEsRUFBRTt5Q0FHZjs7Ozs7Ozs7Ozs7O1lDWEwsY0FBQSxNQUFhLFdBQVc7Z0JBRXBCLFNBQVM7Z0JBQ0YsS0FBSztvQkFDUixJQUFJLEVBQUUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzVCLElBQUksRUFBRSxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDcEIsQ0FBQztnQkFFRCxTQUFTO2dCQUNGLEtBQUs7b0JBQ1IsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztvQkFDckIsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDdEIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLENBQUM7YUFFSixDQUFBIn0=