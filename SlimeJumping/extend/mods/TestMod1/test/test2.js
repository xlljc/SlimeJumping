"use strict";
var aaa;
(function (aaa) {
    class a1 {
        constructor() {
            console.log("new a1");
        }
    }
    aaa.a1 = a1;
})(aaa || (aaa = {}));
