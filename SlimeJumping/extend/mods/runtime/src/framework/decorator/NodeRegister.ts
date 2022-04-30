
function NodeRegister<T extends { new(...arg: any[]): INode }>(constructor: T) {
    //节点名称
    let nodeTypeName = constructor.name;
    console.log("注册节点: " + nodeTypeName);
    return constructor;
}