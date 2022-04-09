Array.toJsArray = (arr) => [...arr];
globalThis.CsArray = {};
CsArray.toCsArray = (arg1, arg2) => {
    let csArr;
    if (arg2 == undefined) {
        csArr = __hostFunc.newArr(arg1.length);
    } else {
        csArr = __hostFunc.newArr(arg1, arg2.length)
    }
    for (let i = 0; i < arg2.length; i++) csArr[i] = arg2[i];
    return csArr;
}