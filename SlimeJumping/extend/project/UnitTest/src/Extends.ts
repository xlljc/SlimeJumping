import { Test } from "./index";

class A extends Godot.Node {
    constructor() {
        super();
        //console.log("create A: " + this.Name);
    }
    public _Process(delta: number): void {
        super._Process(delta);
        //console.log("a: " + delta + " name: " + this.Name);
    }
}

class ArrayExtends {
    @Test()
    public TestExtends1() {
        let time = Date.now();
        for (let i = 0; i < 100; i++) {
            let a = new A();
            a._Process(1.5);
            a.GetNodeOrNull(new Godot.NodePath("aa/bb"));
        }
        let time2 = Date.now() - time;
        console.log("useTime: " + time2);
    }
}

