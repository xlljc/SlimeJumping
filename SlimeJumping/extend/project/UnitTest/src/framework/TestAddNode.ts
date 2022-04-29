import { MyNode2d } from "./WarpNode";

export class TestAddNode {

    //@Test()
    public Test1() {
        let v = Vector2.one.add(10);

        let node = new Godot.Node2D();
        node.Name = "MyNode";
        node.Position = new Godot.Vector2(v.x, v.y);
        CShap.GameManager.Instance.AddChild(node);
    }

    // @TestUstTime()
    // @Test()
    public Test2() {
        let node = new MyNode2d("MyNode2d");
        for (let i = 0; i < 99999; i++) {
            node.position = Vector2.negOne;
        }
        let g: INode;
    }
}