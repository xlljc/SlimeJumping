using System.Reflection;
using System;
using JsService;
using Godot;
using Namotion.Reflection;

[JsType("TestJsObject")]
public class TestJsObject {

    [JsService.JsRegister]
    public static void Test() {
        PuertsScriptManager.AddHostType(new HostType("Godot.Node", typeof(Node)));
        PuertsScriptManager.AddHostType(new HostType("Godot.Node2D", typeof(Node2D)));
        PuertsScriptManager.AddHostType(new HostType("Godot.Sprite", typeof(Sprite)));
        PuertsScriptManager.AddHostType(new HostType("Godot.AnimationPlayer", typeof(AnimationPlayer)));
        PuertsScriptManager.AddHostType(new HostType("Godot.KinematicBody2D", typeof(KinematicBody2D)));
        PuertsScriptManager.AddHostType(new HostType("Godot.KeyList", typeof(KeyList)));
    }

    [JsService.JsFunction("TestArr1")]
    public static void TestArr1(object array) {
        GD.Print("TestArr1: " + array.GetType().FullName);
    }
    /// <summary>
    /// 这是TestArr2函数
    /// </summary>
    /// <param name="array">参数为int数组</param>
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