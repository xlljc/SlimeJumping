globalThis.Array.toJsArray = globalThis.Array.toJsArray || ((arr) => [...arr]);
globalThis.CsArray = globalThis.CsArray || (() => {
    const __createHostArr = globalThis.__createHostArr;
    delete globalThis.__createHostArr;
    function createCsArray(type, ...length) {
        let target = __createHostArr(type, ...length);
        //访问器
        Object.defineProperties(target, {
            //定义迭代器
            [Symbol.iterator]: {
                get() {
                    return () => {
                        let index = 0;
                        return {
                            next: () => index < target.Length ?
                                { value: target.get_Item(index++), done: false } : { value: undefined, done: true }
                        }
                    }
                }
            },
            //读取
            "Get": {
                get() {
                    return (index) => {
                        return target.get_Item(index);
                    }
                }
            },
            //设置
            "Set": {
                get() {
                    return (index, value) => {
                        return target.set_Item(index, value);
                    }
                }
            }
        });
        return target;
    }

    return {
        createCsArray,
        toCsArray: (type, arr) => {
            let csArr = createCsArray(type, arr.length)
            for (let i = 0; i < arr.length; i++) csArr[i] = arr[i];
            return csArr;
        }
    }
})();
