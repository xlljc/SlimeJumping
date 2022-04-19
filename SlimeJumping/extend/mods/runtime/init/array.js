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
    const __toHostArr = globalThis.__toHostArr;
    delete globalThis.__toHostArr;

    return {
        createCsArray(type, ...length) {
            return __createHostArr(type, ...length);
        },
        toCsArray: (type, arr) => {
            return __toHostArr(type, ...arr);
        }
    }
})();
