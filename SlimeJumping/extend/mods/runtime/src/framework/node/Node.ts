
class Node implements INode {
    get x(): number {
        return null;
    }
    set x(x: number) {
        
    }
    get y(): number {
        return null;
    }
    set y(y: number) {
        
    }
    get position(): Vector2 {
        return null;
    }
    set position(pos: Vector2) {
        
    }
    get globalPosition(): Vector2 {
        return null;
    }
    set globalPosition(pos: Vector2) {
        
    }
    get scale(): Vector2 {
        return null;
    }
    set scale(sc: Vector2) {
        
    }
    get globalScale(): Vector2 {
        return null;
    }
    set globalScale(sc: Vector2) {
        
    }
    get rotation(): number {
        return null;
    }
    set rotation(r: number) {
        
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
    get parent(): INode<NodeEventMap> {
        return null;
    }
    get childIndex(): number {
        return null;
    }
    get children(): INode<NodeEventMap>[] {
        return null;
    }
    get childCount(): number {
        return null;
    }
    getGlobalVisible(): boolean {
        return null;
    }
    getGlobalPause(): boolean {
        return null;
    }
    initialize(): void {
        
    }
    start(): void {
        
    }
    update(delta: number): void {
        
    }
    physicsUpdate(delta: number): void {
        
    }
    setParent(parent: INode<NodeEventMap>): void;
    setParent(parent: INode<NodeEventMap>, keepGlobalPos: boolean): void;
    setParent(parent: any, keepGlobalPos?: any): void {
        
    }
    addChild(child: INode<NodeEventMap>): void;
    addChild(child: INode<NodeEventMap>, index: number): void;
    addChild(child: any, index?: any): void {
        
    }
    getNode<T extends INode<NodeEventMap>>(childPath: string): T {
        return null;
    }
    getNodes<T extends INode<NodeEventMap>>(childPath: string): T[] {
        return null;
    }
    removeChild(childIndex: number): void;
    removeChild(childName: string): void;
    removeChild(child: INode<NodeEventMap>): void;
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
    clone(): INode<NodeEventMap> {
        return null;
    }
    get name(): string {
        return null;
    }
    set name(n: string) {
        
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