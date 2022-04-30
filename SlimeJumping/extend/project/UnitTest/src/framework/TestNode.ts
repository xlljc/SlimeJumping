import { Test } from "../index";

@NodeRegister
class MySprite extends Node {
    constructor() {
        super();
        this["__gdNodeType__"] = "Sprite";
    }
    public initialize(): void {
        console.log("初始化完成! MyNode: " + this.name + ", " + this.position);
    }
}

@NodeRegister
class MyNode2 extends Node {
    public initialize(): void {
        console.log("初始化完成! MyNode2: " + this.name + ", " + this.position);
    }
    update(delta: number): void {
        
    }
}
export class TestNode {
    @Test()
    public Test1() {
        let scene = new Scene("TestNodeAdd");
        SceneManager.setActiveScene(scene);
        MySprite.instantiate("n1");
        MyNode2.instantiate("n2");
    }
}
