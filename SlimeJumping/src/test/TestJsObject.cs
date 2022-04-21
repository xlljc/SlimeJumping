using System.Collections.Generic;
using System;
using JsService;
using Godot;

[JsType("Test1", Generics = new Type[] { typeof(int) })]
public interface Test1<T> 
{
    
}

[JsType("Test2", Generics = new Type[] { typeof(int) })]
public class Test2<T> : Test1<T>
{
    public void say(T a) {
        //GD.Print("say: " + a);
    }
    public static T Value;
    public static string Value1 = "9xx";
}

[JsType("Test3", Generics = new Type[] { typeof(int) })]
public class Test3<T> : Test2<T>
{
    public override string ToString()
    {
        return "+++" + base.ToString();
    }
}
[JsType("Test4")]
public class Test4 : Test3<int>, Test1<string>
{
    public void a1(ref Vector2 refa, out int outb)
    {
        refa.x += 100;
        outb = 155;
    }
    public void a2(in Vector2 ina, Test4 Test4, out Test4 outTest4)
    {
        outTest4 = null;
    }
}

[JsType("TestJsObject")]
public class TestJsObject {

    [JsRegister]
    public static void Test()
    {
        PuertsScriptManager.AddHostType(new HostType("Godot.Vector2", typeof(Vector2)));
        PuertsScriptManager.AddHostType(new HostType("Godot.Vector3", typeof(Vector3)));
        PuertsScriptManager.AddHostType(new HostType("Godot.Transform2D", typeof(Transform2D)));
        PuertsScriptManager.AddHostType(new HostType("Godot.Transform", typeof(Transform)));
        PuertsScriptManager.AddHostType(new HostType("Godot.Input", typeof(Input)));
        PuertsScriptManager.AddHostType(new HostType("Godot.Node", typeof(Node)));
        PuertsScriptManager.AddHostType(new HostType("Godot.NodePath", typeof(NodePath)));
        PuertsScriptManager.AddHostType(new HostType("Godot.Node2D", typeof(Node2D)));
        PuertsScriptManager.AddHostType(new HostType("Godot.SceneTree", typeof(SceneTree)));
        PuertsScriptManager.AddHostType(new HostType("Godot.Sprite", typeof(Sprite)));
        PuertsScriptManager.AddHostType(new HostType("Godot.AnimationPlayer", typeof(AnimationPlayer)));
        PuertsScriptManager.AddHostType(new HostType("Godot.KinematicBody2D", typeof(KinematicBody2D)));
        PuertsScriptManager.AddHostType(new HostType("Godot.KeyList", typeof(KeyList)));
        PuertsScriptManager.AddHostType(new HostType("Godot.WebSocketClient", typeof(WebSocketClient)));
        PuertsScriptManager.AddHostType(new HostType("Godot.WebSocketServer", typeof(WebSocketServer)));
        PuertsScriptManager.AddHostTypeToModule("Native/GameManager", new HostType("GameManager", typeof(GameManager)));
    }

    [JsFunction("TestArr1")]
    public static void TestArr1(object array) {
        //GD.Print("TestArr1: " + array.GetType().FullName);
    }
    /// <summary>
    /// 这是TestArr2函数
    /// </summary>
    /// <param name="array">参数为int数组</param>
    [JsFunction("TestArr2")]
    public static void TestArr2(int[] array)
    {
        for (int i = 0; i < array.Length; i++)
        {
            GD.Print("arr val: " + array[i]);   
        }
        GD.Print("TestArr2: " + array);
    }

    [JsFunction("TestRef")]
    public static void TestRef(ref int a) {
        a = 5;
    }

    [JsFunction("TestOut")]
    public static void TestOut(out int a) {
        a = 5;
    }

    [JsFunction("TestSetNodeArray")]
    public static void TestNodeArray(Node2D[][] array) {

    }

    [JsFunction("TestIntArray")]
    public static double[] TestIntArray()
    {
        var arr = new double[10];
        arr[1] = 999;
        return arr;
    }

    [JsFunction("TestNodeArray")]
    public static Node[] TestNodeArray()
    {
        var arr = new Node[10];
        arr[1] = new Node();
        return arr;
    }
}