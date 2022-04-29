
class Scene implements IObject {
    public readonly rootNode: INode;

    #_name: string;

    get name(): string {
        return this.#_name;
    }

    public constructor(sceneName: string) {
        this.#_name = sceneName;
    }

    public appendNode(node: INode): void {

    }

    public destroy(): void {
        
    }

    public equals(other: IObject): boolean {
        return other === this;
    }
}