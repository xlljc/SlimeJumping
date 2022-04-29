
export class MyNode extends Godot.Node {
    constructor() {
        super();
    }
    public _Process(delta: number): void {
        super._Process(delta);
        let node = this.GetNode(new Godot.NodePath("test")) as Godot.Node2D;
    }
}

class TestExtends {
    //@Test()
    public TestExtends1() {
        let time = Date.now();
        for (let i = 0; i < 100; i++) {
            let a = new MyNode();
            a._Process(1.5);
            a.GetNodeOrNull(new Godot.NodePath("aa/bb"));
        }
        let time2 = Date.now() - time;
        console.log("useTime: " + time2);
    }
}

