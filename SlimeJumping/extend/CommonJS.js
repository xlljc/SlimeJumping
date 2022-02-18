

(() => {
    class Mod {
        //mod下的模块
        models = {};
        constructor(modName) {
            this.modName = modName;
        }
        //执行
        execute() {

        }
        //注册新的模块
        register(path) {
    
        }
        //卸载
        uninstall() {

        }
    }

    const mods = {};

    // //注册mod
    // Object.defineProperty(this, "__registerMod__", {
    //     writable: false,
    //     value: function(modName) {
    //         if (modName in mods) {
    //             return;
    //         }
    //         const mod = new Mod(modName);
    //         mods[modName] = mod;
    //         mod.execute();
    //     }
    // });
})()

// __registerMod__("TestMod1");

//数据格式
var mod = {
    "__runtime__": {

    },
    //model
    "TestMod1": {
        "index": {
            "__esModule": true,
            "Main": class {
                //xxxxx
            },
        },
        "Util": {
            "__esModule": true,
            "Random": class {
                //xxxxx
            },
        }
    }
}

// function require(p){
//     var path = require.resolve(p);
//     var mod = require.modules[path];
//     if (!mod) throw new Error('failed to require "' + p + '"');
//     if (!mod.exports) {
//       mod.exports = {};
//       mod.call(mod.exports, mod, mod.exports, require.relative(path));
//     }
//     return mod.exports;
//   }
  
//   require.modules = {};
  
//   require.resolve = function (path){
//     var orig = path;
//     var reg = path + '.js';
//     var index = path + '/index.js';
//     return require.modules[reg] && reg
//       || require.modules[index] && index
//       || orig;
//   };
  
//   require.register = function (path, fn){
//     require.modules[path] = fn;
//   };
  
//   require.relative = function (parent) {
//     return function(p){
//       if ('.' != p.charAt(0)) return require(p);
//       var path = parent.split('/');
//       var segs = p.split('/');
//       path.pop();
  
//       for (var i = 0; i < segs.length; i++) {
//         var seg = segs[i];
//         if ('..' == seg) path.pop();
//         else if ('.' != seg) path.push(seg);
//       }
  
//       return require(path.join('/'));
//     };
//   };