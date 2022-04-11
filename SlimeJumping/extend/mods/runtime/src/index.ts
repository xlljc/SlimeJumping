import { Test1 } from "./Test";

//console.log("init runtime!");

Test1();
// console.log(CsArray.toCsArray(["1", "2"]));
// new CsTest().say(CsArray.toCsArray(["1", "2"]));
// TestArr("a");
// TestArr(1);
var arr = CsArray.createCsArray("System.Int32", 10);
arr.Set(0, 100);
arr.Set(1, 111);
arr.Set(2, 222);
let a: Godot.KinematicBody2D;

TestArr2(arr);

export function Process(delta: float) {

}

export function PhysicsProcess(delta: float) {

}