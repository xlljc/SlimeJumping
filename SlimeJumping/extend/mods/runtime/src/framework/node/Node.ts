
@NodeRegister
class Node implements INode {

    public static instantiate<T extends INode>(): T;
    public static instantiate<T extends INode>(nodeName: string): T;
    public static instantiate<T extends INode>(nodeName: string, position: Vector2): T;
    public static instantiate<T extends INode>(nodeName: string, parent: INode, position: Vector2): T;
    public static instantiate(...args: any[]): INode {
        //节点名称
        let nodeName: string = args.length >= 1 ? args[0] : this.name;
        let node = new this();
        // 绑定的 Godot 类型
        let gdNodeType: string = node["__gdNodeType__"];
        // 实例化 Godot 节点
        let gdNode: Godot.Node2D;
        switch (gdNodeType) {
            case "Node2D": gdNode = new Godot.Node2D(); break;
            case "Sprite": gdNode = new Godot.Sprite(); break;
            default: throw new Error("暂不支持绑定`" + gdNodeType + "`类型的Godot节点!");
        }
        if (gdNodeType == "Sprite") {
            let sprite = gdNode as Godot.Sprite;
            sprite.Texture
        }
        gdNode.Name = nodeName;
        node["__gdNode__"] = gdNode;
        Object.defineProperty(this, "__gdNode__", { writable: false });

        if (args.length >= 3) {
            let parent: INode = args[1];
            if (!parent) {
                throw new Error("argument `parent` is " + parent + "!");
            }
            node.position = args[2];
            parent.addChild(node);
        } else if (args.length == 2) {
            node.position = args[1];
            SceneManager.activeScene?.rootNode.addChild(node);
        } else {
            SceneManager.activeScene?.rootNode.addChild(node);
        }
        node.initialize();
        return node;
    }

    get index(): number {
        return 1;
    }
    get name(): string {
        return this._name;
    }
    set name(n: string) {
        this._name = n;
    }
    get x(): number {
        return this._position.x;
    }
    set x(x: number) {
        this._position.x = x;
    }
    get y(): number {
        return this._position.y;
    }
    set y(y: number) {
        this._position.y = y;
    }
    get position(): Vector2 {
        return new Vector2(this._position.x, this._position.y);
    }
    set position(pos: Vector2) {
        this._position.set(pos);
    }
    get globalPosition(): Vector2 {
        return null;
    }
    set globalPosition(pos: Vector2) {
        
    }
    get scale(): Vector2 {
        return new Vector2(this._scale.x, this._scale.y);
    }
    set scale(sc: Vector2) {
        this._scale.set(sc);
    }
    get globalScale(): Vector2 {
        return null;
    }
    set globalScale(sc: Vector2) {
        
    }
    get rotation(): number {
        return this._rotation;
    }
    set rotation(r: number) {
        this._rotation = r;
    }
    get globalRotation(): number {
        return null;
    }
    set globalRotation(r: number) {
        
    }
    get rotationDegrees(): number {
        return null;
    }
    set rotationDegrees(r: number) {
        
    }
    get globalRotationDegrees(): number {
        return null;
    }
    set globalRotationDegrees(r: number) {
        
    }
    get layer(): number {
        return null;
    }
    set layer(layer: number) {
        
    }
    get globalLayer(): number {
        return null;
    }
    set globalLayer(layer: number) {
        
    }
    get modulate(): Color {
        return null;
    }
    set modulate(v: Color) {
        
    }
    get selfModulate(): Color {
        return null;
    }
    set selfModulate(v: Color) {
        
    }
    get visible(): boolean {
        return null;
    }
    set visible(v: boolean) {
        
    }
    get pause(): boolean {
        return null;
    }
    set pause(p: boolean) {
        
    }
    get parent(): INode {
        return null;
    }
    get childIndex(): number {
        return null;
    }
    get children(): INode[] {
        return null;
    }
    get childCount(): number {
        return null;
    }

    private _name: string;
    private _position: Vector2 = Vector2.zero;
    private _scale: Vector2 = Vector2.one;
    private _rotation: number = 0;

    public constructor() {
        this["__gdNodeType__"] = "Node2D";
    }

    getGlobalVisible(): boolean {
        return null;
    }
    getGlobalPause(): boolean {
        return null;
    }
    initialize(): void {
        console.log("初始化完成! node: " + this.name);
    }
    start(): void {
        
    }
    update(delta: number): void {
        
    }
    physicsUpdate(delta: number): void {
        
    }
    setParent(parent: INode): void;
    setParent(parent: INode, keepGlobalPos: boolean): void;
    setParent(parent: any, keepGlobalPos?: any): void {
        
    }
    addChild(child: INode): void;
    addChild(child: INode, index: number): void;
    addChild(child: INode, index?: any): void {
        let gdNode: Godot.Node2D = this["__gdNode__"];
        gdNode.AddChild(child["__gdNode__"]);
    }
    getNode<T extends INode>(childPath: string): T {
        return null;
    }
    getNodes<T extends INode>(childPath: string): T[] {
        return null;
    }
    removeChild(childIndex: number): void;
    removeChild(childName: string): void;
    removeChild(child: INode): void;
    removeChild(child: any): void {
        
    }
    lookAt(target: Vector2): void {
        
    }
    rotate(radians: number): void {
        
    }
    getAngleTo(point: Vector2): number {
        return null;
    }
    toLocal(globalPoint: Vector2): Vector2 {
        return null;
    }
    toGlobal(localPoint: Vector2): Vector2 {
        return null;
    }
    startCoroutine(iterator: Generator<any, any, any>): ICoroutine {
        return null;
    }
    stopCoroutine(coroutine: ICoroutine): boolean {
        return null;
    }
    clone(): INode {
        return null;
    }
    destroy(): void {
        
    }
    equals(other: IObject): boolean {
        return null;
    }
    addEventListener<T extends keyof NodeEventMap, V extends NodeEventMap[T]>(event: T, cb: (v: V) => void): IEventBinder<NodeEventMap> {
        return null;
    }
    dispatchEvent<T extends keyof NodeEventMap, V extends NodeEventMap[T]>(event: T, value: V): void {
        
    }
    removeEventListener<T extends keyof NodeEventMap, V extends NodeEventMap[T]>(event: T, cb: (v: V) => void): boolean {
        return null;
    }
    clearEventListener<T extends keyof NodeEventMap>(event: T): boolean {
        return null;
    }
    clearAllEventListener(): boolean {
        return null;
    }

}