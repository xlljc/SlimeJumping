"use strict";
var aaa;
(function (aaa) {
    class a2 {
        constructor() {
            console.log("new a2");
            new aaa.a1();
        }
    }
    aaa.a2 = a2;
})(aaa || (aaa = {}));
