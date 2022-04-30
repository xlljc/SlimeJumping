
class Scene implements IObject {
    public readonly rootNode: INode;

    #_name: string;
    static #_sceneRoot: INode;

    get index(): number {
        return 1;
    }
    get name(): string {
        return this.#_name;
    }

    public constructor(sceneName: string) {
        // 创建场景根节点
        if (!Scene.#_sceneRoot) {
            Scene.#_sceneRoot = Node.instantiate("SceneRoot");
            CShap.GameManager.Instance.ModeRoot.AddChild(Scene.#_sceneRoot["__gdNode__"]);
        }
        this.#_name = sceneName;
        this.rootNode = Node.instantiate(sceneName, Scene.#_sceneRoot, Vector2.zero);
    }

    public appendNode(node: INode): void {

    }

    public destroy(): void {
        
    }

    public equals(other: IObject): boolean {
        return other === this;
    }
}