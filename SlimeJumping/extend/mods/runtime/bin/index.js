"use strict";
console.log("init runtime...");
globalThis.__process__ = function (delta) {
    let list = globalThis.__updateFuncData__.process;
    for (let i = 0; i < list.length; i++) {
        try {
            list[i](delta);
        }
        catch (e) {
            console.error(e.toString());
        }
    }
};
globalThis.__physicsProcess__ = function (delta) {
    let list = globalThis.__updateFuncData__.physicsProcess;
    for (let i = 0; i < list.length; i++) {
        try {
            list[i](delta);
        }
        catch (e) {
            console.error(e.toString());
        }
    }
};
globalThis.__input__ = function (id, state, type) {
};
var Runtime;
(function (Runtime) {
    /**
     * 二维向量
     */
    class Vector2 {
        constructor(...args) {
            /** x坐标 */
            this.x = 0;
            /** y坐标 */
            this.y = 0;
            if (args.length == 0) {
                let v = args[0];
                this.x = v.x;
                this.y = v.y;
            }
            else if (args.length > 1) {
                this.x = args[0];
                this.y = args[1];
            }
        }
        /** 向量值为(0,0) */
        static get zero() {
            return new Vector2(0, 0);
        }
        /** 向量值为(1,0) */
        static get right() {
            return new Vector2(1, 0);
        }
        /** 向量值为(-1,0) */
        static get left() {
            return new Vector2(-1, 0);
        }
        /** 向量值为(0,-1) */
        static get up() {
            return new Vector2(0, -1);
        }
        /** 向量值为(0,1) */
        static get down() {
            return new Vector2(0, 1);
        }
        /** 向量值为(1,1) */
        static get one() {
            return new Vector2(1, 1);
        }
        /** 向量值为(-1,-1) */
        static get negOne() {
            return new Vector2(-1, -1);
        }
        /** 获取向量长度 */
        get length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        /** 获取向量角度(弧度制),返回向量相对于X轴的弧度角,即(1,0)向量 */
        get angle() {
            return Math.atan2(this.y, this.x);
        }
        add(val) {
            if (typeof val === "number")
                return new Vector2(this.x + val, this.y + val);
            return new Vector2(this.x + val.x, this.y + val.y);
        }
        reduce(val) {
            if (typeof val === "number")
                return new Vector2(this.x - val, this.y - val);
            return new Vector2(this.x - val.x, this.y - val.y);
        }
        multiply(val) {
            if (typeof val === "number")
                return new Vector2(this.x * val, this.y * val);
            return new Vector2(this.x * val.x, this.y * val.y);
        }
        divide(val) {
            if (typeof val === "number")
                return new Vector2(this.x / val, this.y / val);
            return new Vector2(this.x / val.x, this.y / val.y);
        }
        mod(val) {
            if (typeof val === "number")
                return new Vector2(this.x % val, this.y % val);
            return new Vector2(this.x % val.x, this.y % val.y);
        }
        div(val) {
            if (typeof val === "number")
                return new Vector2((this.x / val) | 0, (this.y / val) | 0);
            return new Vector2((this.x / val.x) | 0, (this.y / val.y) | 0);
        }
        /** 返回与vector的点积 */
        dot(vector) {
            return this.x * vector.x + this.y + vector.y;
        }
        /** 返回与vector的叉积 */
        cross(vector) {
            return this.x * vector.x + this.y + vector.y;
        }
        /** 向量归一化,返回缩放到单位长度的向量,归一化的向量不能为(0,0) */
        normalization() {
            let vector = new Vector2(this);
            let s = vector.x * vector.x + vector.y * vector.y;
            if (s === 0)
                vector.x = vector.y = 0;
            else {
                let num = Math.sqrt(s);
                vector.x /= num;
                vector.y /= num;
            }
            return vector;
        }
        /** 返回两个向量间的弧度角 */
        angleTo(vector) {
            return Math.atan2(this.cross(vector), this.dot(vector));
        }
        /** 返回连接两个点的线和X坐标之间的弧度角. */
        angleToPoint(vector) {
            return Math.atan2(this.y - vector.y, this.x - vector.x);
        }
        /** 根据角度旋转向量 */
        rotated(angle) {
            let s = this.angle + angle;
            return new Vector2(Math.cos(s), Math.sin(s)).multiply(this.length);
        }
        /** 返回绝对值向量 */
        abs() {
            return new Vector2(Math.abs(this.x), Math.abs(this.y));
        }
        /** 返回向量,其中所有分量都向下取整*/
        floor() {
            return new Vector2(Math.floor(this.x), Math.floor(this.y));
        }
        /** 返回向量,其中所有分量都向上取整*/
        ceil() {
            return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
        }
        /** 返回向量,其中所有分量都四舍五入到最接近的整数 */
        round() {
            return new Vector2(Math.round(this.x), Math.round(this.y));
        }
        /** 返回向量,其中每个分量设置为一个或一个负数,具体取决于分量的符号 */
        sign() {
            return new Vector2(this.x == 0 ? 0 : (this.x < 0 ? -1 : 1), this.y == 0 ? 0 : (this.y < 0 ? -1 : 1));
        }
        /** 返回到vector向量的距离 */
        distanceTo(vector) {
            return Math.sqrt((this.x - vector.x) * (this.x - vector.x) + (this.y - vector.y) * (this.y - vector.y));
        }
        /** 返回一个角度相同,长度为length的向量 */
        clamped(length) {
            let vector = new Vector2(this);
            let num = this.length;
            if (num > 0 && length < num)
                vector = vector.divide(num * length);
            return vector;
        }
        /** 将向量朝vector移动固定的delta数量 */
        moveToward(vector, delta) {
            let self = new Vector2(this);
            let other = vector.reduce(self);
            let num = other.length;
            return num <= delta || num < 9.99999997475243E-07 ? vector : self.add(other.divide(num).multiply(delta));
        }
        /** 比较两个向量值是否相等 */
        equals(vector) {
            return vector !== undefined && this.x === vector.x && this.y === vector.y;
        }
        /** 转换为字符串 */
        toString() {
            return "{x: " + this.x + ", y: " + this.y + "}";
        }
    }
    Runtime.Vector2 = Vector2;
})(Runtime || (Runtime = {}));
var Runtime;
(function (Runtime) {
    class Input {
        constructor() { }
        static update(delta) {
        }
        static isKeyPressed(key) {
            return Godot.Input.IsKeyPressed(key);
        }
        static isKeyDown(key) {
            //Godot.Input.mouse
            return false;
            //Godot.Input.key
        }
        static isKeyUp(key) {
            return false;
            //Godot.Input.key
        }
    }
    Input.key = new Map();
    Runtime.Input = Input;
})(Runtime || (Runtime = {}));
var Runtime;
(function (Runtime) {
    let KeyList;
    (function (KeyList) {
        /** Space key. */
        KeyList[KeyList["Space"] = 32] = "Space";
        /** ! key. */
        KeyList[KeyList["Exclam"] = 33] = "Exclam";
        /** " key. */
        KeyList[KeyList["Quotedbl"] = 34] = "Quotedbl";
        /** # key. */
        KeyList[KeyList["Numbersign"] = 35] = "Numbersign";
        /** $ key. */
        KeyList[KeyList["Dollar"] = 36] = "Dollar";
        /** % key. */
        KeyList[KeyList["Percent"] = 37] = "Percent";
        /** & key. */
        KeyList[KeyList["Ampersand"] = 38] = "Ampersand";
        /** ' key. */
        KeyList[KeyList["Apostrophe"] = 39] = "Apostrophe";
        /** ( key. */
        KeyList[KeyList["Parenleft"] = 40] = "Parenleft";
        /** ) key. */
        KeyList[KeyList["Parenright"] = 41] = "Parenright";
        /** * key. */
        KeyList[KeyList["Asterisk"] = 42] = "Asterisk";
        /** + key. */
        KeyList[KeyList["Plus"] = 43] = "Plus";
        /** , key. */
        KeyList[KeyList["Comma"] = 44] = "Comma";
        /** - key. */
        KeyList[KeyList["Minus"] = 45] = "Minus";
        /** . key. */
        KeyList[KeyList["Period"] = 46] = "Period";
        /** / key. */
        KeyList[KeyList["Slash"] = 47] = "Slash";
        /** Number 0. */
        KeyList[KeyList["Key0"] = 48] = "Key0";
        /** Number 1. */
        KeyList[KeyList["Key1"] = 49] = "Key1";
        /** Number 2. */
        KeyList[KeyList["Key2"] = 50] = "Key2";
        /** Number 3. */
        KeyList[KeyList["Key3"] = 51] = "Key3";
        /** Number 4. */
        KeyList[KeyList["Key4"] = 52] = "Key4";
        /** Number 5. */
        KeyList[KeyList["Key5"] = 53] = "Key5";
        /** Number 6. */
        KeyList[KeyList["Key6"] = 54] = "Key6";
        /** Number 7. */
        KeyList[KeyList["Key7"] = 55] = "Key7";
        /** Number 8. */
        KeyList[KeyList["Key8"] = 56] = "Key8";
        /** Number 9. */
        KeyList[KeyList["Key9"] = 57] = "Key9";
        /** : key. */
        KeyList[KeyList["Colon"] = 58] = "Colon";
        /** ; key. */
        KeyList[KeyList["Semicolon"] = 59] = "Semicolon";
        /** < key. */
        KeyList[KeyList["Less"] = 60] = "Less";
        /** = key. */
        KeyList[KeyList["Equal"] = 61] = "Equal";
        /** > key. */
        KeyList[KeyList["Greater"] = 62] = "Greater";
        /** ? key. */
        KeyList[KeyList["Question"] = 63] = "Question";
        /** @ key. */
        KeyList[KeyList["At"] = 64] = "At";
        /** A key. */
        KeyList[KeyList["A"] = 65] = "A";
        /** B key. */
        KeyList[KeyList["B"] = 66] = "B";
        /** C key. */
        KeyList[KeyList["C"] = 67] = "C";
        /** D key. */
        KeyList[KeyList["D"] = 68] = "D";
        /** E key. */
        KeyList[KeyList["E"] = 69] = "E";
        /** F key. */
        KeyList[KeyList["F"] = 70] = "F";
        /** G key. */
        KeyList[KeyList["G"] = 71] = "G";
        /** H key. */
        KeyList[KeyList["H"] = 72] = "H";
        /** I key. */
        KeyList[KeyList["I"] = 73] = "I";
        /** J key. */
        KeyList[KeyList["J"] = 74] = "J";
        /** K key. */
        KeyList[KeyList["K"] = 75] = "K";
        /** L key. */
        KeyList[KeyList["L"] = 76] = "L";
        /** M key. */
        KeyList[KeyList["M"] = 77] = "M";
        /** N key. */
        KeyList[KeyList["N"] = 78] = "N";
        /** O key. */
        KeyList[KeyList["O"] = 79] = "O";
        /** P key. */
        KeyList[KeyList["P"] = 80] = "P";
        /** Q key. */
        KeyList[KeyList["Q"] = 81] = "Q";
        /** R key. */
        KeyList[KeyList["R"] = 82] = "R";
        /** S key. */
        KeyList[KeyList["S"] = 83] = "S";
        /** T key. */
        KeyList[KeyList["T"] = 84] = "T";
        /** U key. */
        KeyList[KeyList["U"] = 85] = "U";
        /** V key. */
        KeyList[KeyList["V"] = 86] = "V";
        /** W key. */
        KeyList[KeyList["W"] = 87] = "W";
        /** X key. */
        KeyList[KeyList["X"] = 88] = "X";
        /** Y key. */
        KeyList[KeyList["Y"] = 89] = "Y";
        /** Z key. */
        KeyList[KeyList["Z"] = 90] = "Z";
        /** [ key. */
        KeyList[KeyList["Bracketleft"] = 91] = "Bracketleft";
        /** \ key. */
        KeyList[KeyList["Backslash"] = 92] = "Backslash";
        /** ] key. */
        KeyList[KeyList["Bracketright"] = 93] = "Bracketright";
        /** ^ key. */
        KeyList[KeyList["Asciicircum"] = 94] = "Asciicircum";
        /** _ key. */
        KeyList[KeyList["Underscore"] = 95] = "Underscore";
        /** ` key. */
        KeyList[KeyList["Quoteleft"] = 96] = "Quoteleft";
        /** { key. */
        KeyList[KeyList["Braceleft"] = 123] = "Braceleft";
        /** | key. */
        KeyList[KeyList["Bar"] = 124] = "Bar";
        /** } key. */
        KeyList[KeyList["Braceright"] = 125] = "Braceright";
        /** ~ key. */
        KeyList[KeyList["Asciitilde"] = 126] = "Asciitilde";
        /** Non-breakable space key. */
        KeyList[KeyList["Nobreakspace"] = 160] = "Nobreakspace";
        /** ¡ key. */
        KeyList[KeyList["Exclamdown"] = 161] = "Exclamdown";
        /** ¢ key. */
        KeyList[KeyList["Cent"] = 162] = "Cent";
        /** £ key. */
        KeyList[KeyList["Sterling"] = 163] = "Sterling";
        /** ¤ key. */
        KeyList[KeyList["Currency"] = 164] = "Currency";
        /** ¥ key. */
        KeyList[KeyList["Yen"] = 165] = "Yen";
        /** ¦ key. */
        KeyList[KeyList["Brokenbar"] = 166] = "Brokenbar";
        /** § key. */
        KeyList[KeyList["Section"] = 167] = "Section";
        /** ¨ key. */
        KeyList[KeyList["Diaeresis"] = 168] = "Diaeresis";
        /** © key. */
        KeyList[KeyList["Copyright"] = 169] = "Copyright";
        /** ª key. */
        KeyList[KeyList["Ordfeminine"] = 170] = "Ordfeminine";
        /** « key. */
        KeyList[KeyList["Guillemotleft"] = 171] = "Guillemotleft";
        /** ¬ key. */
        KeyList[KeyList["Notsign"] = 172] = "Notsign";
        /** Soft hyphen key. */
        KeyList[KeyList["Hyphen"] = 173] = "Hyphen";
        /** ® key. */
        KeyList[KeyList["Registered"] = 174] = "Registered";
        /** ¯ key. */
        KeyList[KeyList["Macron"] = 175] = "Macron";
        /** ° key. */
        KeyList[KeyList["Degree"] = 176] = "Degree";
        /** ± key. */
        KeyList[KeyList["Plusminus"] = 177] = "Plusminus";
        /** ² key. */
        KeyList[KeyList["Twosuperior"] = 178] = "Twosuperior";
        /** ³ key. */
        KeyList[KeyList["Threesuperior"] = 179] = "Threesuperior";
        /** ´ key. */
        KeyList[KeyList["Acute"] = 180] = "Acute";
        /** µ key. */
        KeyList[KeyList["Mu"] = 181] = "Mu";
        /** ¶ key. */
        KeyList[KeyList["Paragraph"] = 182] = "Paragraph";
        /** · key. */
        KeyList[KeyList["Periodcentered"] = 183] = "Periodcentered";
        /** ¸ key. */
        KeyList[KeyList["Cedilla"] = 184] = "Cedilla";
        /** ¹ key. */
        KeyList[KeyList["Onesuperior"] = 185] = "Onesuperior";
        /** º key. */
        KeyList[KeyList["Masculine"] = 186] = "Masculine";
        /** » key. */
        KeyList[KeyList["Guillemotright"] = 187] = "Guillemotright";
        /** ¼ key. */
        KeyList[KeyList["Onequarter"] = 188] = "Onequarter";
        /** ½ key. */
        KeyList[KeyList["Onehalf"] = 189] = "Onehalf";
        /** ¾ key. */
        KeyList[KeyList["Threequarters"] = 190] = "Threequarters";
        /** ¿ key. */
        KeyList[KeyList["Questiondown"] = 191] = "Questiondown";
        /** À key. */
        KeyList[KeyList["Agrave"] = 192] = "Agrave";
        /** Á key. */
        KeyList[KeyList["Aacute"] = 193] = "Aacute";
        /** Â key. */
        KeyList[KeyList["Acircumflex"] = 194] = "Acircumflex";
        /** Ã key. */
        KeyList[KeyList["Atilde"] = 195] = "Atilde";
        /** Ä key. */
        KeyList[KeyList["Adiaeresis"] = 196] = "Adiaeresis";
        /** Å key. */
        KeyList[KeyList["Aring"] = 197] = "Aring";
        /** Æ key. */
        KeyList[KeyList["Ae"] = 198] = "Ae";
        /** Ç key. */
        KeyList[KeyList["Ccedilla"] = 199] = "Ccedilla";
        /** È key. */
        KeyList[KeyList["Egrave"] = 200] = "Egrave";
        /** É key. */
        KeyList[KeyList["Eacute"] = 201] = "Eacute";
        /** Ê key. */
        KeyList[KeyList["Ecircumflex"] = 202] = "Ecircumflex";
        /** Ë key. */
        KeyList[KeyList["Ediaeresis"] = 203] = "Ediaeresis";
        /** Ì key. */
        KeyList[KeyList["Igrave"] = 204] = "Igrave";
        /** Í key. */
        KeyList[KeyList["Iacute"] = 205] = "Iacute";
        /** Î key. */
        KeyList[KeyList["Icircumflex"] = 206] = "Icircumflex";
        /** Ï key. */
        KeyList[KeyList["Idiaeresis"] = 207] = "Idiaeresis";
        /** Ð key. */
        KeyList[KeyList["Eth"] = 208] = "Eth";
        /** Ñ key. */
        KeyList[KeyList["Ntilde"] = 209] = "Ntilde";
        /** Ò key. */
        KeyList[KeyList["Ograve"] = 210] = "Ograve";
        /** Ó key. */
        KeyList[KeyList["Oacute"] = 211] = "Oacute";
        /** Ô key. */
        KeyList[KeyList["Ocircumflex"] = 212] = "Ocircumflex";
        /** Õ key. */
        KeyList[KeyList["Otilde"] = 213] = "Otilde";
        /** Ö key. */
        KeyList[KeyList["Odiaeresis"] = 214] = "Odiaeresis";
        /** × key. */
        KeyList[KeyList["Multiply"] = 215] = "Multiply";
        /** Ø key. */
        KeyList[KeyList["Ooblique"] = 216] = "Ooblique";
        /** Ù key. */
        KeyList[KeyList["Ugrave"] = 217] = "Ugrave";
        /** Ú key. */
        KeyList[KeyList["Uacute"] = 218] = "Uacute";
        /** Û key. */
        KeyList[KeyList["Ucircumflex"] = 219] = "Ucircumflex";
        /** Ü key. */
        KeyList[KeyList["Udiaeresis"] = 220] = "Udiaeresis";
        /** Ý key. */
        KeyList[KeyList["Yacute"] = 221] = "Yacute";
        /** Þ key. */
        KeyList[KeyList["Thorn"] = 222] = "Thorn";
        /** ß key. */
        KeyList[KeyList["Ssharp"] = 223] = "Ssharp";
        /** ÷ key. */
        KeyList[KeyList["Division"] = 247] = "Division";
        /** ÿ key. */
        KeyList[KeyList["Ydiaeresis"] = 255] = "Ydiaeresis";
        /** Escape key. */
        KeyList[KeyList["Escape"] = 16777217] = "Escape";
        /** Tab key. */
        KeyList[KeyList["Tab"] = 16777218] = "Tab";
        /** Shift+Tab key. */
        KeyList[KeyList["Backtab"] = 16777219] = "Backtab";
        /** Backspace key. */
        KeyList[KeyList["Backspace"] = 16777220] = "Backspace";
        /** Return key (on the main keyboard). */
        KeyList[KeyList["Enter"] = 16777221] = "Enter";
        /** Enter key on the numeric keypad. */
        KeyList[KeyList["KpEnter"] = 16777222] = "KpEnter";
        /** Insert key. */
        KeyList[KeyList["Insert"] = 16777223] = "Insert";
        /** Delete key. */
        KeyList[KeyList["Delete"] = 16777224] = "Delete";
        /** Pause key. */
        KeyList[KeyList["Pause"] = 16777225] = "Pause";
        /** Print Screen key. */
        KeyList[KeyList["Print"] = 16777226] = "Print";
        /** System Request key. */
        KeyList[KeyList["Sysreq"] = 16777227] = "Sysreq";
        /** Clear key. */
        KeyList[KeyList["Clear"] = 16777228] = "Clear";
        /** Home key. */
        KeyList[KeyList["Home"] = 16777229] = "Home";
        /** End key. */
        KeyList[KeyList["End"] = 16777230] = "End";
        /** Left arrow key. */
        KeyList[KeyList["Left"] = 16777231] = "Left";
        /** Up arrow key. */
        KeyList[KeyList["Up"] = 16777232] = "Up";
        /** Right arrow key. */
        KeyList[KeyList["Right"] = 16777233] = "Right";
        /** Down arrow key. */
        KeyList[KeyList["Down"] = 16777234] = "Down";
        /** Page Up key. */
        KeyList[KeyList["Pageup"] = 16777235] = "Pageup";
        /** Page Down key. */
        KeyList[KeyList["Pagedown"] = 16777236] = "Pagedown";
        /** Shift key. */
        KeyList[KeyList["Shift"] = 16777237] = "Shift";
        /** Control key. */
        KeyList[KeyList["Control"] = 16777238] = "Control";
        /** Meta key. */
        KeyList[KeyList["Meta"] = 16777239] = "Meta";
        /** Alt key. */
        KeyList[KeyList["Alt"] = 16777240] = "Alt";
        /** Caps Lock key. */
        KeyList[KeyList["Capslock"] = 16777241] = "Capslock";
        /** Num Lock key. */
        KeyList[KeyList["Numlock"] = 16777242] = "Numlock";
        /** Scroll Lock key. */
        KeyList[KeyList["Scrolllock"] = 16777243] = "Scrolllock";
        /** F1 key. */
        KeyList[KeyList["F1"] = 16777244] = "F1";
        /** F2 key. */
        KeyList[KeyList["F2"] = 16777245] = "F2";
        /** F3 key. */
        KeyList[KeyList["F3"] = 16777246] = "F3";
        /** F4 key. */
        KeyList[KeyList["F4"] = 16777247] = "F4";
        /** F5 key. */
        KeyList[KeyList["F5"] = 16777248] = "F5";
        /** F6 key. */
        KeyList[KeyList["F6"] = 16777249] = "F6";
        /** F7 key. */
        KeyList[KeyList["F7"] = 16777250] = "F7";
        /** F8 key. */
        KeyList[KeyList["F8"] = 16777251] = "F8";
        /** F9 key. */
        KeyList[KeyList["F9"] = 16777252] = "F9";
        /** F10 key. */
        KeyList[KeyList["F10"] = 16777253] = "F10";
        /** F11 key. */
        KeyList[KeyList["F11"] = 16777254] = "F11";
        /** F12 key. */
        KeyList[KeyList["F12"] = 16777255] = "F12";
        /** F13 key. */
        KeyList[KeyList["F13"] = 16777256] = "F13";
        /** F14 key. */
        KeyList[KeyList["F14"] = 16777257] = "F14";
        /** F15 key. */
        KeyList[KeyList["F15"] = 16777258] = "F15";
        /** F16 key. */
        KeyList[KeyList["F16"] = 16777259] = "F16";
        /** Left Super key (Windows key). */
        KeyList[KeyList["SuperL"] = 16777260] = "SuperL";
        /** Right Super key (Windows key). */
        KeyList[KeyList["SuperR"] = 16777261] = "SuperR";
        /** Context menu key. */
        KeyList[KeyList["Menu"] = 16777262] = "Menu";
        /** Left Hyper key. */
        KeyList[KeyList["HyperL"] = 16777263] = "HyperL";
        /** Right Hyper key. */
        KeyList[KeyList["HyperR"] = 16777264] = "HyperR";
        /** Help key. */
        KeyList[KeyList["Help"] = 16777265] = "Help";
        /** Left Direction key. */
        KeyList[KeyList["DirectionL"] = 16777266] = "DirectionL";
        /** Right Direction key. */
        KeyList[KeyList["DirectionR"] = 16777267] = "DirectionR";
        /** Media back key. Not to be confused with the Back button on an Android device. */
        KeyList[KeyList["Back"] = 16777280] = "Back";
        /** Media forward key. */
        KeyList[KeyList["Forward"] = 16777281] = "Forward";
        /** Media stop key. */
        KeyList[KeyList["Stop"] = 16777282] = "Stop";
        /** Media refresh key. */
        KeyList[KeyList["Refresh"] = 16777283] = "Refresh";
        /** Volume down key. */
        KeyList[KeyList["Volumedown"] = 16777284] = "Volumedown";
        /** Mute volume key. */
        KeyList[KeyList["Volumemute"] = 16777285] = "Volumemute";
        /** Volume up key. */
        KeyList[KeyList["Volumeup"] = 16777286] = "Volumeup";
        /** Bass Boost key. */
        KeyList[KeyList["Bassboost"] = 16777287] = "Bassboost";
        /** Bass up key. */
        KeyList[KeyList["Bassup"] = 16777288] = "Bassup";
        /** Bass down key. */
        KeyList[KeyList["Bassdown"] = 16777289] = "Bassdown";
        /** Treble up key. */
        KeyList[KeyList["Trebleup"] = 16777290] = "Trebleup";
        /** Treble down key. */
        KeyList[KeyList["Trebledown"] = 16777291] = "Trebledown";
        /** Media play key. */
        KeyList[KeyList["Mediaplay"] = 16777292] = "Mediaplay";
        /** Media stop key. */
        KeyList[KeyList["Mediastop"] = 16777293] = "Mediastop";
        /** Previous song key. */
        KeyList[KeyList["Mediaprevious"] = 16777294] = "Mediaprevious";
        /** Next song key. */
        KeyList[KeyList["Medianext"] = 16777295] = "Medianext";
        /** Media record key. */
        KeyList[KeyList["Mediarecord"] = 16777296] = "Mediarecord";
        /** Home page key. */
        KeyList[KeyList["Homepage"] = 16777297] = "Homepage";
        /** Favorites key. */
        KeyList[KeyList["Favorites"] = 16777298] = "Favorites";
        /** Search key. */
        KeyList[KeyList["Search"] = 16777299] = "Search";
        /** Standby key. */
        KeyList[KeyList["Standby"] = 16777300] = "Standby";
        /** Open URL / Launch Browser key. */
        KeyList[KeyList["Openurl"] = 16777301] = "Openurl";
        /** Launch Mail key. */
        KeyList[KeyList["Launchmail"] = 16777302] = "Launchmail";
        /** Launch Media key. */
        KeyList[KeyList["Launchmedia"] = 16777303] = "Launchmedia";
        /** Launch Shortcut 0 key. */
        KeyList[KeyList["Launch0"] = 16777304] = "Launch0";
        /** Launch Shortcut 1 key. */
        KeyList[KeyList["Launch1"] = 16777305] = "Launch1";
        /** Launch Shortcut 2 key. */
        KeyList[KeyList["Launch2"] = 16777306] = "Launch2";
        /** Launch Shortcut 3 key. */
        KeyList[KeyList["Launch3"] = 16777307] = "Launch3";
        /** Launch Shortcut 4 key. */
        KeyList[KeyList["Launch4"] = 16777308] = "Launch4";
        /** Launch Shortcut 5 key. */
        KeyList[KeyList["Launch5"] = 16777309] = "Launch5";
        /** Launch Shortcut 6 key. */
        KeyList[KeyList["Launch6"] = 16777310] = "Launch6";
        /** Launch Shortcut 7 key. */
        KeyList[KeyList["Launch7"] = 16777311] = "Launch7";
        /** Launch Shortcut 8 key. */
        KeyList[KeyList["Launch8"] = 16777312] = "Launch8";
        /** Launch Shortcut 9 key. */
        KeyList[KeyList["Launch9"] = 16777313] = "Launch9";
        /** Launch Shortcut A key. */
        KeyList[KeyList["Launcha"] = 16777314] = "Launcha";
        /** Launch Shortcut B key. */
        KeyList[KeyList["Launchb"] = 16777315] = "Launchb";
        /** Launch Shortcut C key. */
        KeyList[KeyList["Launchc"] = 16777316] = "Launchc";
        /** Launch Shortcut D key. */
        KeyList[KeyList["Launchd"] = 16777317] = "Launchd";
        /** Launch Shortcut E key. */
        KeyList[KeyList["Launche"] = 16777318] = "Launche";
        /** Launch Shortcut F key. */
        KeyList[KeyList["Launchf"] = 16777319] = "Launchf";
        /** Multiply (*) key on the numeric keypad. */
        KeyList[KeyList["KpMultiply"] = 16777345] = "KpMultiply";
        /** Divide (/) key on the numeric keypad. */
        KeyList[KeyList["KpDivide"] = 16777346] = "KpDivide";
        /** Subtract (-) key on the numeric keypad. */
        KeyList[KeyList["KpSubtract"] = 16777347] = "KpSubtract";
        /** Period (.) key on the numeric keypad. */
        KeyList[KeyList["KpPeriod"] = 16777348] = "KpPeriod";
        /** Add (+) key on the numeric keypad. */
        KeyList[KeyList["KpAdd"] = 16777349] = "KpAdd";
        /** Number 0 on the numeric keypad. */
        KeyList[KeyList["Kp0"] = 16777350] = "Kp0";
        /** Number 1 on the numeric keypad. */
        KeyList[KeyList["Kp1"] = 16777351] = "Kp1";
        /** Number 2 on the numeric keypad. */
        KeyList[KeyList["Kp2"] = 16777352] = "Kp2";
        /** Number 3 on the numeric keypad. */
        KeyList[KeyList["Kp3"] = 16777353] = "Kp3";
        /** Number 4 on the numeric keypad. */
        KeyList[KeyList["Kp4"] = 16777354] = "Kp4";
        /** Number 5 on the numeric keypad. */
        KeyList[KeyList["Kp5"] = 16777355] = "Kp5";
        /** Number 6 on the numeric keypad. */
        KeyList[KeyList["Kp6"] = 16777356] = "Kp6";
        /** Number 7 on the numeric keypad. */
        KeyList[KeyList["Kp7"] = 16777357] = "Kp7";
        /** Number 8 on the numeric keypad. */
        KeyList[KeyList["Kp8"] = 16777358] = "Kp8";
        /** Number 9 on the numeric keypad. */
        KeyList[KeyList["Kp9"] = 16777359] = "Kp9";
        /** Unknown key. */
        KeyList[KeyList["Unknown"] = 33554431] = "Unknown";
    })(KeyList = Runtime.KeyList || (Runtime.KeyList = {}));
})(Runtime || (Runtime = {}));
var Runtime;
(function (Runtime) {
    const updateFuncData = {
        process: [],
        physicsProcess: [],
    };
    globalThis.__updateFuncData__ = updateFuncData;
    /**
     * 装饰器, 用在静态函数上, 被修饰的静态函数每帧都会被调用一次
     */
    function Update() {
        return function (target, propertyKey, descriptor) {
            updateFuncData.process.push(descriptor.value.bind(target));
        };
    }
    Runtime.Update = Update;
    /**
     * 装饰器, 用在静态函数上, 被修饰的静态函数每物理帧都会被调用一次
     */
    function PhysicsUpdate() {
        return function (target, propertyKey, descriptor) {
            updateFuncData.physicsProcess.push(descriptor.value.bind(target));
        };
    }
    Runtime.PhysicsUpdate = PhysicsUpdate;
})(Runtime || (Runtime = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiLCJiYXNpYy9tYXRoL1ZlY3RvcjIudHMiLCJmcmFtZXdvcmsvSW5wdXQudHMiLCJmcmFtZXdvcmsvS2V5TGlzdC50cyIsImZyYW1ld29yay9VcGRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUUvQixVQUFVLENBQUMsV0FBVyxHQUFHLFVBQVMsS0FBWTtJQUMxQyxJQUFJLElBQUksR0FBZSxVQUFVLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDO0lBQzdELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xDLElBQUk7WUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDL0I7S0FDSjtBQUNMLENBQUMsQ0FBQTtBQUNELFVBQVUsQ0FBQyxrQkFBa0IsR0FBRyxVQUFTLEtBQVk7SUFDakQsSUFBSSxJQUFJLEdBQWUsVUFBVSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQztJQUNwRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsQyxJQUFJO1lBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQy9CO0tBQ0o7QUFDTCxDQUFDLENBQUE7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