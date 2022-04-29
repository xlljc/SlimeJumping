
interface IEvent<EMAP> {
    addEventListener<T extends keyof EMAP, V extends EMAP[T]>(event: T, cb: (v: V) => void): IEventBinder<EMAP>;
    dispatchEvent<T extends keyof EMAP, V extends EMAP[T]>(event: T, value: V): void;
    removeEventListener<T extends keyof EMAP, V extends EMAP[T]>(event: T, cb: (v: V) => void): boolean;
    clearEventListener<T extends keyof EMAP>(event: T): boolean;
    clearAllEventListener(): boolean;
}