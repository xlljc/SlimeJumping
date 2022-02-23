using Godot;
using JsService;

[JsType("testA")]
public class testA {
    public int a;
    public testA(int a) {
        this.a = a;
    }
    public void Say() {
        //GD.Print("testA.Say: " + a);
    }
}

[JsType("TestJs")]
public class TestJs {
    [JsFunction("CallSay")]
    public static void CallSay(testA obj) {
        //GD.Print("TestJs.CallSay");
        obj.Say();
    }
}