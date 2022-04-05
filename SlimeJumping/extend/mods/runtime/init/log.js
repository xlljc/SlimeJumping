(() => {
    function toString(args) {
        return Array.prototype.map.call(args, x => {
            try {
                return x + '';
            } catch (err) {
                return err;
            }
        }).join(',');
    }
    let gd = __tgjsLoadType('Godot.GD');
    globalThis.console = {};
    console.log = function () {
        gd.Print(toString(arguments));
    }
    console.info = function () {
        gd.Print(toString(arguments));
    }
    console.warn = function () {
        gd.Print(toString(arguments));
    }
    console.error = function () {
        gd.PrintErr(toString(arguments));
    }
})();