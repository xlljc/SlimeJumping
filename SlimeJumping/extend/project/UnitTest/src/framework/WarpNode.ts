
export class MyNode2d {

    #_node: Godot.Node2D;

    public constructor(nodeName: string) {
        this.#_node = new Godot.Node2D();
        this.#_node.Name = nodeName;
        CShap.GameManager.Instance.AddChild(this.#_node);
    }

    public get position(): Vector2 {
        let v = this.#_node.Position;
        return new Vector2(v.x, v.y);
    }
    
    public set position(v: Vector2) {
        this.#_node.Position = new Godot.Vector2(v.x, v.y);
    }

}

