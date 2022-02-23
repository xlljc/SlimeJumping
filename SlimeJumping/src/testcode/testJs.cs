using Godot;
using JsService;

[JsType("testA")]
public class testA {
    public int a;
    public testA(int a) {
        this.a = a;
    }
    public void Say() {
        GD.Print("testA.Say: " + a);
    }

    public void SayArr(float[] arr) {

    }
}

[JsType("TestJs")]
public class TestJs {
    [JsFunction("CallSay")]
    public static void CallSay(testA obj) {
        GD.Print("TestJs.CallSay");
        obj.Say();
    }

    [JsFunction("Test")]
    public static void Test(object o) {
        var jsObj = ScriptManager.GetService("ClearScript").ToScriptObject(o);
        jsObj.GetValue("say").Invoke();;
    }
}