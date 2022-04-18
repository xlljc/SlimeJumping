globalThis.Array.toJsArray = globalThis.Array.toJsArray || ((arr) => {
    let len = arr.Length;
    let jsArr = [];
    for (let i = 0; i < len; i++) {
        jsArr.push(arr.GetValue(i));
    }
    return jsArr;
});
globalThis.CsArray = globalThis.CsArray || (() => {
    const __createHostArr = globalThis.__createHostArr;
    delete globalThis.__createHostArr;
    function createCsArray(type, ...length) {
        let target = __createHostArr(type, ...length);
        return target;
    }

    return {
        createCsArray,
        toCsArray: (type, arr) => {
            let csArr = createCsArray(type, arr.length);
            for (let i = 0; i < arr.length; i++) {
                csArr.SetValue(arr[i], i);
            }
            return csArr;
        }
    }
})();
