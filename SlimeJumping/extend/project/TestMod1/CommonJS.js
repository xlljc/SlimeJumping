(() => {
    const module = {};
    function register(handler, path) {
        if (path in module) {
            return;
        }
        let index = path.lastIndexOf('/');
        let folder = index >= 0 ? path.substring(0, index) : '';
        let data = {
            inited: false,
            folder,
            execute: () => {
                handler(data, data.exports, (p) => {
                    let mudelName = getPath(folder, p);
                    return getModule(mudelName);
                })
            },
            exports: {},
        }
        module[path] = data;
    }
    function execute(path) {
        let data = module[path];
        if (data && !data.inited) {
            data.inited = true;
            data.execute();
        }
    }
    function getModule(path) {
        let data = module[path];
        if (data) {
            if (!data.inited) {
                data.inited = true;
                data.execute();
            }
            return data.exports;
        }
        return undefined;
    }
    function getPath(folder, path) {
        let nodes = folder.split('/');
        let node2s = path.split('/');
        for (let node of node2s) {
            switch(node) {
                case '.': break;
                case '..': nodes.pop(); break;
                default: nodes.push(node);
            }
        }
        return nodes.join('/');
    }

    return {
        module,
        register,
        execute,
    }
})()