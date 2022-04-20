console.log("init runtime...");

globalThis.__process__ = function(delta: float) {
    let list: Function[] = globalThis.__updateFuncData__.process;
    for (let i = 0; i < list.length; i++) {
        try {
            list[i](delta);
        } catch (e) {
            console.error(e.toString());
        }
    }
}
globalThis.__physicsProcess__ = function(delta: float) {
    let list: Function[] = globalThis.__updateFuncData__.physicsProcess;
    for (let i = 0; i < list.length; i++) {
        try {
            list[i](delta);
        } catch (e) {
            console.error(e.toString());
        }
    }
}
globalThis.__input__ = function(id: number, state: number, type: number) {
    
}