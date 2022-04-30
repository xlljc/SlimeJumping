
interface INode<EMAP = NodeEventMap> extends IObject, IEvent<EMAP> {

    set name(v: string);
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    get position(): Vector2;
    set position(pos: Vector2);
    get globalPosition(): Vector2;
    set globalPosition(pos: Vector2);
    get scale(): Vector2;
    set scale(sc: Vector2);
    get globalScale(): Vector2;
    set globalScale(sc: Vector2);
    get rotation(): number;
    set rotation(r: number);
    get globalRotation(): number;
    set globalRotation(r: number);
    get rotationDegrees(): number;
    set rotationDegrees(r: number);
    get globalRotationDegrees(): number;
    set globalRotationDegrees(r: number);
    get layer(): number;
    set layer(layer: number);
    get globalLayer(): number;
    set globalLayer(layer: number);
    get modulate(): Color;
    set modulate(v: Color);
    get selfModulate(): Color;
    set selfModulate(v: Color);

    get visible(): boolean;
    set visible(v: boolean);
    get pause(): boolean;
    set pause(p: boolean);
    
    get parent(): INode | null;
    get childIndex(): number | null;
    get children(): INode[];
    get childCount(): number;

    getGlobalVisible(): boolean;
    getGlobalPause(): boolean;

    initialize(): void;
    start(): void;
    update(delta: number): void;
    physicsUpdate(delta: number): void;

    setParent(parent: INode): void;
    setParent(parent: INode, keepGlobalPos: boolean): void;
    addChild(child: INode): void;
    addChild(child: INode, index: number): void;
    getNode<T extends INode>(childPath: string): T | null;
    getNodes<T extends INode>(childPath: string): T[];
    removeChild(childIndex: number): void;
    removeChild(childName: string): void;
    removeChild(child: INode): void;

    lookAt(target: Vector2): void;
    rotate(radians: number): void;
    getAngleTo(point: Vector2): number;
    toLocal(globalPoint: Vector2): Vector2;
    toGlobal(localPoint: Vector2): Vector2;

    startCoroutine(iterator: Generator<any, any, any>): ICoroutine;
    stopCoroutine(coroutine: ICoroutine): boolean;

    clone(): INode<EMAP>;
}