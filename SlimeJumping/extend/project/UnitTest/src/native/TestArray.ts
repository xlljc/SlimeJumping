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