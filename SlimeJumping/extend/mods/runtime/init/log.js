globalThis.console = (() => {
    function toString(args) {
        return Array.prototype.map.call(args, x => {
            try {
                return x + '';
            } catch (err) {
                return err;
            }
        }).join(', ');
    }
    console
    let gd = __host__.importHostType('Godot.GD');
    return {
        log() {
            gd.Print(toString(arguments));
        },
        info() {
            gd.Print(toString(arguments));
        },
        warn() {
            gd.Print(toString(arguments));
        },
        error() {
            gd.PrintErr(toString(arguments));
        },
    }
})();