using System.Reflection;
using System;
using JsService;
using Godot;

[JsType("TestJsObject")]
public class TestJsObject {
    [JsService.JsRegister]
    public static void Test() {

    }

    [JsService.JsFunction("TestArr1")]
    public static void TestArr1(object array) {
        GD.Print("TestArr1: " + array.GetType().FullName);
    }
    [JsService.JsFunction("TestArr2")]
    public static void TestArr2(int[] array)
    {
        for (int i = 0; i < array.Length; i++)
        {
            GD.Print("arr val: " + array[i]);   
        }
        GD.Print("TestArr2: " + array);
    }
}