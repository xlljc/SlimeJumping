
namespace Runtime {

    export interface IEvent<EMAP> {
        addListener<T extends keyof EMAP, V extends EMAP[T]>(event: T, cb: (v: V) => void): boolean;
        dispatchEvent<T extends keyof EMAP, V extends EMAP[T]>(event: T, value: V): void;
        removeListener<T extends keyof EMAP, V extends EMAP[T]>(event: T, cb: (v: V) => void): boolean;
        clearListener<T extends keyof EMAP>(event: T): boolean;
        clearAllListener(): boolean;
    }
}