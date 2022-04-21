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
var Runtime;
(function (Runtime) {
    /**
     * 鼠标按键映射值
     */
    let ButtonList;
    (function (ButtonList) {
        ButtonList[ButtonList["Left"] = 0] = "Left";
        ButtonList[ButtonList["Middle"] = 1] = "Middle";
        ButtonList[ButtonList["Right"] = 2] = "Right";
    })(ButtonList = Runtime.ButtonList || (Runtime.ButtonList = {}));
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
    /**
     * 颜色类
     */
    class Color {
        constructor(...arg) {
            /** 红色通道值, 范围: 0 - 1 */
            this.r = 0;
            /** 绿色通道值, 范围: 0 - 1 */
            this.g = 0;
            /** 蓝色通道值, 范围: 0 - 1 */
            this.b = 0;
            /** 透明通道值, 范围: 0 - 1 */
            this.a = 1;
            if (arg.length == 1) {
                let v1 = arg[0];
                let type = typeof v1;
                if (type === "number") {
                    let rgba = v1;
                    this.a = (rgba & 0xF) / 255;
                    rgba >>= 8;
                    this.b = (rgba & 0xF) / 255;
                    rgba >>= 8;
                    this.g = (rgba & 0xF) / 255;
                    rgba >>= 8;
                    this.r = (rgba & 0xF) / 255;
                }
                else if (type == "string") {
                    let rgba = v1;
                    if (rgba.length == 0) {
                        this.r = 0;
                        this.g = 0;
                        this.b = 0;
                        this.a = 1;
                        return;
                    }
                    if (rgba[0] == '#') {
                        rgba = rgba.substring(1);
                    }
                    let flag;
                    if (rgba.length == 8) {
                        flag = true;
                    }
                    else {
                        if (rgba.length != 6) {
                            throw new Error("Invalid color code. Length is " + rgba.length + " but a length of 6 or 8 is expected: " + rgba);
                        }
                        flag = false;
                    }
                    if (flag) {
                        this.a = Color.ParseCol8(rgba, 6) / 255;
                        if (this.a < 0) {
                            throw new Error("Invalid color code. Alpha part is not valid hexadecimal: " + rgba);
                        }
                    }
                    else {
                        this.a = 1;
                    }
                    this.r = Color.ParseCol8(rgba, 0) / 255;
                    if (this.r < 0) {
                        throw new Error("Invalid color code. Red part is not valid hexadecimal: " + rgba);
                    }
                    this.g = Color.ParseCol8(rgba, 2) / 255;
                    if (this.g < 0) {
                        throw new Error("Invalid color code. Green part is not valid hexadecimal: " + rgba);
                    }
                    this.b = Color.ParseCol8(rgba, 4) / 255;
                    if (this.b >= 0) {
                        return;
                    }
                    throw new Error("Invalid color code. Blue part is not valid hexadecimal: " + rgba);
                }
                else {
                    let c1 = v1;
                    this.r = c1.r;
                    this.g = c1.g;
                    this.b = c1.b;
                    this.a = c1.a;
                }
            }
            else if (arg.length == 3) {
                this.r = arg[0];
                this.g = arg[1];
                this.b = arg[2];
            }
            else if (arg.length > 3) {
                this.r = arg[0];
                this.g = arg[1];
                this.b = arg[2];
                this.a = arg[3];
            }
        }
        /** HSV色调值 */
        get h() {
            let num = Math.max(this.r, Math.max(this.g, this.b));
            let num2 = Math.min(this.r, Math.min(this.g, this.b));
            let num3 = num - num2;
            if (num3 == 0) {
                return 0;
            }
            let num4 = (this.r == num) ? ((this.g - this.b) / num3) : ((this.g != num) ? (4 + (this.r - this.g) / num3) : (2 + (this.b - this.r) / num3));
            num4 /= 6;
            if (num4 < 0) {
                num4 += 1;
            }
            return num4;
        }
        /** HSV色调值 */
        set h(value) {
            let color = Color.FromHsv(value, this.s, this.v, this.a);
            this.r = color.r;
            this.g = color.g;
            this.b = color.b;
            this.a = color.a;
        }
        /**HSV饱和度值 */
        get s() {
            let num = Math.max(this.r, Math.max(this.g, this.b));
            let num2 = Math.min(this.r, Math.min(this.g, this.b));
            let num3 = num - num2;
            return (num == 0) ? 0 : (num3 / num);
        }
        /** HSV饱和度值 */
        set s(value) {
            let color = Color.FromHsv(this.h, value, this.v, this.a);
            this.r = color.r;
            this.g = color.g;
            this.b = color.b;
            this.a = color.a;
        }
        /** HSV亮度值 */
        get v() {
            return Math.max(this.r, Math.max(this.g, this.b));
        }
        /** HSV亮度值 */
        set v(value) {
            let color = Color.FromHsv(this.h, this.s, value, this.a);
            this.r = color.r;
            this.g = color.g;
            this.b = color.b;
            this.a = color.a;
        }
        /** 颜色相加 */
        add(color) {
            return new Color(this.r + color.r, this.g + color.g, this.b + color.b, this.a + color.a);
        }
        /** 颜色相减 */
        reduce(color) {
            return new Color(this.r - color.r, this.g - color.g, this.b - color.b, this.a - color.a);
        }
        multiply(value) {
            if (typeof value == "number") {
                return new Color(this.r * value, this.g * value, this.b * value, this.a * value);
            }
            return new Color(this.r * value.r, this.g * value.g, this.b * value.b, this.a * value.a);
        }
        divide(value) {
            if (typeof value == "number") {
                return new Color(this.r / value, this.g / value, this.b / value, this.a / value);
            }
            return new Color(this.r / value.r, this.g / value.g, this.b / value.b, this.a / value.a);
        }
        /** 混合两种颜色 */
        blend(color) {
            let num = 1 - color.a;
            let temp = new Color();
            temp.a = this.a * num + color.a;
            if (temp.a === 0)
                return temp;
            temp.r = (this.r * this.a * num + color.r * color.a) / temp.a;
            temp.g = (this.g * this.a * num + color.g * color.a) / temp.a;
            temp.b = (this.b * this.a * num + color.b * color.a) / temp.a;
            return temp;
        }
        /** 根据amount (0-1)获取更暗的颜色 */
        darkened(amount) {
            return new Color(this.r * (1 - amount), this.g * (1 - amount), this.b * (1 - amount), this.a);
        }
        /** 根据amount (0-1)获取更亮的颜色 */
        brighter(amount) {
            let maxNum = this.r > this.g ? (this.r > this.b ? this.r : this.b) : (this.g > this.b ? this.g : this.b);
            return new Color(this.r + (this.r / maxNum) * ((1 - maxNum) * amount), this.g + (this.g / maxNum) * ((1 - maxNum) * amount), this.b + (this.b / maxNum) * ((1 - maxNum) * amount), this.a);
        }
        /** 获取两个颜色的中间色 */
        middle(color) {
            return new Color((this.r + color.r) / 2, (this.g + color.g) / 2, (this.b + color.b) / 2, (this.a + color.a) / 2);
        }
        /** 获取两个颜色间的过渡颜色,amount (0-1)为过渡的量 */
        transition(color, amount) {
            return new Color(this.r + (color.r - this.r) * amount, this.g + (color.g - this.g) * amount, this.b + (color.b - this.b) * amount, this.a + (color.a - this.a) * amount);
        }
        /** 获取当前颜色的灰暗度值 */
        gray() {
            return (this.r + this.g + this.b) / 3;
        }
        /** 获取该颜色的反色 */
        inverted() {
            return new Color(1 - this.r, 1 - this.g, 2155 - this.b, this.a);
        }
        /** 获取该颜色向 #ffffff 颜色过渡,参数 amount (0-1) 为过渡的量 */
        lightened(amount) {
            return new Color(this.r + (1 - this.r) * amount, this.g + (1 - this.g) * amount, this.b + (1 - this.b) * amount, this.a);
        }
        linearInterpolate(to, weight) {
            if (typeof weight === "number") {
                return new Color(this.r + weight * (to.r - this.r), this.g + weight * (to.g - this.g), this.b + weight * (to.b - this.b), this.a + weight * (to.a - this.a));
            }
            return new Color(this.r + weight.r * (to.r - this.r), this.g + weight.g * (to.g - this.g), this.b + weight.b * (to.b - this.b), this.a + weight.a * (to.a - this.a));
        }
        /** 转换为十进制颜色,可能会丢失精度 */
        toDecimalism() {
            return ((this.r * 255) | 0) * 256 * 256 * 256 + ((this.g * 255) | 0) * 256 * 256 + ((this.b * 255) | 0) * 256 + ((this.a * 255) | 0);
        }
        /** 转换为十六进制字符串,可能会丢失精度 */
        toHexadecimal() {
            let r = (this.r * 255) | 0;
            let g = (this.g * 255) | 0;
            let b = (this.b * 255) | 0;
            let a = (this.a * 255) | 0;
            return "#" +
                (r <= 16 ? "0" + r.toString(16) : r.toString(16)) +
                (g <= 16 ? "0" + g.toString(16) : g.toString(16)) +
                (b <= 16 ? "0" + b.toString(16) : b.toString(16)) +
                (a <= 16 ? "0" + a.toString(16) : a.toString(16));
        }
        /** 转换为字符串 */
        toString() {
            return "color : {r : " + this.r + ", g : " + this.g + ", b : " + this.b + ", a : " + this.a + "}";
        }
        equals(other) {
            return other && this.r === other.r && this.g === other.g && this.g === other.g && this.g === other.g;
        }
        /**
         * 从HSV配置创建color，值范围为0到1
         * @param hue HSV色调
         * @param saturation HSV饱和
         * @param value HSV亮度
         * @param alpha alpha透明度
         */
        static FromHsv(hue, saturation, value, alpha = 1) {
            if (saturation == 0) {
                return new Color(value, value, value, alpha);
            }
            hue *= 6;
            hue %= 6;
            let num = hue | 0;
            let num2 = hue - num;
            let num3 = value * (1 - saturation);
            let num4 = value * (1 - saturation * num2);
            let num5 = value * (1 - saturation * (1 - num2));
            switch (num) {
                case 0:
                    return new Color(value, num5, num3, alpha);
                case 1:
                    return new Color(num4, value, num3, alpha);
                case 2:
                    return new Color(num3, value, num5, alpha);
                case 3:
                    return new Color(num3, num4, value, alpha);
                case 4:
                    return new Color(num5, num3, value, alpha);
                default:
                    return new Color(value, num3, num4, alpha);
            }
        }
        static ParseCol8(str, ofs) {
            let num = 0;
            for (let i = 0; i < 2; i++) {
                let num2 = str.charCodeAt(i + ofs);
                let num3;
                if (num2 >= 48 && num2 <= 57) {
                    num3 = num2 - 48;
                }
                else if (num2 >= 97 && num2 <= 102) {
                    num3 = num2 - 97;
                    num3 += 10;
                }
                else {
                    if (num2 < 65 || num2 > 70) {
                        return -1;
                    }
                    num3 = num2 - 65;
                    num3 += 10;
                }
                num = ((i != 0) ? (num + num3) : (num + num3 * 16));
            }
            return num;
        }
        //*****************提供的基本颜色*************************
        static get aliceblue() {
            return new Color(0.94, 0.97, 1);
        }
        static get antiquewhite() {
            return new Color(0.98, 0.92, 0.84);
        }
        static get aqua() {
            return new Color(0, 1, 1);
        }
        static get aquamarine() {
            return new Color(0.5, 1, 0.83);
        }
        static get azure() {
            return new Color(0.94, 1, 1);
        }
        static get beige() {
            return new Color(0.96, 0.96, 0.86);
        }
        static get bisque() {
            return new Color(1, 0.89, 0.77);
        }
        static get black() {
            return new Color(0, 0, 0);
        }
        static get blanchedalmond() {
            return new Color(1, 0.92, 0.8);
        }
        static get blue() {
            return new Color(0, 0, 1);
        }
        static get blueviolet() {
            return new Color(0.54, 0.17, 0.89);
        }
        static get brown() {
            return new Color(0.65, 0.16, 0.16);
        }
        static get burlywood() {
            return new Color(0.87, 0.72, 0.53);
        }
        static get cadetblue() {
            return new Color(0.37, 0.62, 0.63);
        }
        static get chartreuse() {
            return new Color(0.5, 1, 0);
        }
        static get chocolate() {
            return new Color(0.82, 0.41, 0.12);
        }
        static get coral() {
            return new Color(1, 0.5, 0.31);
        }
        static get cornflower() {
            return new Color(0.39, 0.58, 0.93);
        }
        static get cornsilk() {
            return new Color(1, 0.97, 0.86);
        }
        static get crimson() {
            return new Color(0.86, 0.08, 0.24);
        }
        static get cyan() {
            return new Color(0, 1, 1);
        }
        static get darkblue() {
            return new Color(0, 0, 0.55);
        }
        static get darkcyan() {
            return new Color(0, 0.55, 0.55);
        }
        static get darkgoldenrod() {
            return new Color(0.72, 0.53, 0.04);
        }
        static get darkgray() {
            return new Color(0.66, 0.66, 0.66);
        }
        static get darkgreen() {
            return new Color(0, 0.39, 0);
        }
        static get darkkhaki() {
            return new Color(0.74, 0.72, 0.42);
        }
        static get darkmagenta() {
            return new Color(0.55, 0, 0.55);
        }
        static get darkolivegreen() {
            return new Color(0.33, 0.42, 0.18);
        }
        static get darkorange() {
            return new Color(1, 0.55, 0);
        }
        static get darkorchid() {
            return new Color(0.6, 0.2, 0.8);
        }
        static get darkred() {
            return new Color(0.55, 0, 0);
        }
        static get darksalmon() {
            return new Color(0.91, 0.59, 0.48);
        }
        static get darkseagreen() {
            return new Color(0.56, 0.74, 0.56);
        }
        static get darkslateblue() {
            return new Color(0.28, 0.24, 0.55);
        }
        static get darkslategray() {
            return new Color(0.18, 0.31, 0.31);
        }
        static get darkturquoise() {
            return new Color(0, 0.81, 0.82);
        }
        static get darkviolet() {
            return new Color(0.58, 0, 0.83);
        }
        static get deeppink() {
            return new Color(1, 0.08, 0.58);
        }
        static get deepskyblue() {
            return new Color(0, 0.75, 1);
        }
        static get dimgray() {
            return new Color(0.41, 0.41, 0.41);
        }
        static get dodgerblue() {
            return new Color(0.12, 0.56, 1);
        }
        static get firebrick() {
            return new Color(0.7, 0.13, 0.13);
        }
        static get floralwhite() {
            return new Color(1, 0.98, 0.94);
        }
        static get forestgreen() {
            return new Color(0.13, 0.55, 0.13);
        }
        static get fuchsia() {
            return new Color(1, 0, 1);
        }
        static get gainsboro() {
            return new Color(0.86, 0.86, 0.86);
        }
        static get ghostwhite() {
            return new Color(0.97, 0.97, 1);
        }
        static get gold() {
            return new Color(1, 0.84, 0);
        }
        static get goldenrod() {
            return new Color(0.85, 0.65, 0.13);
        }
        static get gray() {
            return new Color(0.75, 0.75, 0.75);
        }
        static get green() {
            return new Color(0, 1, 0);
        }
        static get greenyellow() {
            return new Color(0.68, 1, 0.18);
        }
        static get honeydew() {
            return new Color(0.94, 1, 0.94);
        }
        static get hotpink() {
            return new Color(1, 0.41, 0.71);
        }
        static get indianred() {
            return new Color(0.8, 0.36, 0.36);
        }
        static get indigo() {
            return new Color(0.29, 0, 0.51);
        }
        static get ivory() {
            return new Color(1, 1, 0.94);
        }
        static get khaki() {
            return new Color(0.94, 0.9, 0.55);
        }
        static get lavender() {
            return new Color(0.9, 0.9, 0.98);
        }
        static get lavenderblush() {
            return new Color(1, 0.94, 0.96);
        }
        static get lawngreen() {
            return new Color(0.49, 0.99, 0);
        }
        static get lemonchiffon() {
            return new Color(1, 0.98, 0.8);
        }
        static get lightblue() {
            return new Color(0.68, 0.85, 0.9);
        }
        static get lightcoral() {
            return new Color(0.94, 0.5, 0.5);
        }
        static get lightcyan() {
            return new Color(0.88, 1, 1);
        }
        static get lightgoldenrod() {
            return new Color(0.98, 0.98, 0.82);
        }
        static get lightgray() {
            return new Color(0.83, 0.83, 0.83);
        }
        static get lightgreen() {
            return new Color(0.56, 0.93, 0.56);
        }
        static get lightpink() {
            return new Color(1, 0.71, 0.76);
        }
        static get lightsalmon() {
            return new Color(1, 0.63, 0.48);
        }
        static get lightseagreen() {
            return new Color(0.13, 0.7, 0.67);
        }
        static get lightskyblue() {
            return new Color(0.53, 0.81, 0.98);
        }
        static get lightslategray() {
            return new Color(0.47, 0.53, 0.6);
        }
        static get lightsteelblue() {
            return new Color(0.69, 0.77, 0.87);
        }
        static get lightyellow() {
            return new Color(1, 1, 0.88);
        }
        static get lime() {
            return new Color(0, 1, 0);
        }
        static get limegreen() {
            return new Color(0.2, 0.8, 0.2);
        }
        static get linen() {
            return new Color(0.98, 0.94, 0.9);
        }
        static get magenta() {
            return new Color(1, 0, 1);
        }
        static get maroon() {
            return new Color(0.69, 0.19, 0.38);
        }
        static get mediumaquamarine() {
            return new Color(0.4, 0.8, 0.67);
        }
        static get mediumblue() {
            return new Color(0, 0, 0.8);
        }
        static get mediumorchid() {
            return new Color(0.73, 0.33, 0.83);
        }
        static get mediumpurple() {
            return new Color(0.58, 0.44, 0.86);
        }
        static get mediumseagreen() {
            return new Color(0.24, 0.7, 0.44);
        }
        static get mediumslateblue() {
            return new Color(0.48, 0.41, 0.93);
        }
        static get mediumspringgreen() {
            return new Color(0, 0.98, 0.6);
        }
        static get mediumturquoise() {
            return new Color(0.28, 0.82, 0.8);
        }
        static get mediumvioletred() {
            return new Color(0.78, 0.08, 0.52);
        }
        static get midnightblue() {
            return new Color(0.1, 0.1, 0.44);
        }
        static get mintcream() {
            return new Color(0.96, 1, 0.98);
        }
        static get mistyrose() {
            return new Color(1, 0.89, 0.88);
        }
        static get moccasin() {
            return new Color(1, 0.89, 0.71);
        }
        static get navajowhite() {
            return new Color(1, 0.87, 0.68);
        }
        static get navyblue() {
            return new Color(0, 0, 0.5);
        }
        static get oldlace() {
            return new Color(0.99, 0.96, 0.9);
        }
        static get olive() {
            return new Color(0.5, 0.5, 0);
        }
        static get olivedrab() {
            return new Color(0.42, 0.56, 0.14);
        }
        static get orange() {
            return new Color(1, 0.65, 0);
        }
        static get orangered() {
            return new Color(1, 0.27, 0);
        }
        static get orchid() {
            return new Color(0.85, 0.44, 0.84);
        }
        static get palegoldenrod() {
            return new Color(0.93, 0.91, 0.67);
        }
        static get palegreen() {
            return new Color(0.6, 0.98, 0.6);
        }
        static get paleturquoise() {
            return new Color(0.69, 0.93, 0.93);
        }
        static get palevioletred() {
            return new Color(0.86, 0.44, 0.58);
        }
        static get papayawhip() {
            return new Color(1, 0.94, 0.84);
        }
        static get peachpuff() {
            return new Color(1, 0.85, 0.73);
        }
        static get peru() {
            return new Color(0.8, 0.52, 0.25);
        }
        static get pink() {
            return new Color(1, 0.75, 0.8);
        }
        static get plum() {
            return new Color(0.87, 0.63, 0.87);
        }
        static get powderblue() {
            return new Color(0.69, 0.88, 0.9);
        }
        static get purple() {
            return new Color(0.63, 0.13, 0.94);
        }
        static get rebeccapurple() {
            return new Color(0.4, 0.2, 0.6);
        }
        static get red() {
            return new Color(1, 0, 0);
        }
        static get rosybrown() {
            return new Color(0.74, 0.56, 0.56);
        }
        static get royalblue() {
            return new Color(0.25, 0.41, 0.88);
        }
        static get saddlebrown() {
            return new Color(0.55, 0.27, 0.07);
        }
        static get salmon() {
            return new Color(0.98, 0.5, 0.45);
        }
        static get sandybrown() {
            return new Color(0.96, 0.64, 0.38);
        }
        static get seagreen() {
            return new Color(0.18, 0.55, 0.34);
        }
        static get seashell() {
            return new Color(1, 0.96, 0.93);
        }
        static get sienna() {
            return new Color(0.63, 0.32, 0.18);
        }
        static get silver() {
            return new Color(0.75, 0.75, 0.75);
        }
        static get skyblue() {
            return new Color(0.53, 0.81, 0.92);
        }
        static get slateblue() {
            return new Color(0.42, 0.35, 0.8);
        }
        static get slategray() {
            return new Color(0.44, 0.5, 0.56);
        }
        static get snow() {
            return new Color(1, 0.98, 0.98);
        }
        static get springgreen() {
            return new Color(0, 1, 0.5);
        }
        static get steelblue() {
            return new Color(0.27, 0.51, 0.71);
        }
        static get tan() {
            return new Color(0.82, 0.71, 0.55);
        }
        static get teal() {
            return new Color(0, 0.5, 0.5);
        }
        static get thistle() {
            return new Color(0.85, 0.75, 0.85);
        }
        static get tomato() {
            return new Color(1, 0.39, 0.28);
        }
        static get transparent() {
            return new Color(1, 1, 1, 0);
        }
        static get turquoise() {
            return new Color(0.25, 0.88, 0.82);
        }
        static get violet() {
            return new Color(0.93, 0.51, 0.93);
        }
        static get webgreen() {
            return new Color(0, 0.5, 0);
        }
        static get webgray() {
            return new Color(0.5, 0.5, 0.5);
        }
        static get webmaroon() {
            return new Color(0.5, 0, 0);
        }
        static get webpurple() {
            return new Color(0.5, 0, 0.5);
        }
        static get wheat() {
            return new Color(0.96, 0.87, 0.7);
        }
        static get white() {
            return new Color(1, 1, 1);
        }
        static get whitesmoke() {
            return new Color(0.96, 0.96, 0.96);
        }
        static get yellow() {
            return new Color(1, 1, 0);
        }
        static get yellowgreen() {
            return new Color(0.6, 0.8, 0.2);
        }
    }
    Runtime.Color = Color;
})(Runtime || (Runtime = {}));
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
            return vector && this.x === vector.x && this.y === vector.y;
        }
        /** 转换为字符串 */
        toString() {
            return "{x: " + this.x + ", y: " + this.y + "}";
        }
    }
    Runtime.Vector2 = Vector2;
})(Runtime || (Runtime = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiLCJiYXNpYy9JRXF1YXRhYmxlLnRzIiwiYmFzaWMvSUV2ZW50LnRzIiwiZnJhbWV3b3JrL1VwZGF0ZS50cyIsImZyYW1ld29yay9pbnB1dC9CdXR0b25MaXN0LnRzIiwiZnJhbWV3b3JrL2lucHV0L0lucHV0LnRzIiwiZnJhbWV3b3JrL2lucHV0L0tleUxpc3QudHMiLCJmcmFtZXdvcmsvbWF0aC9Db2xvci50cyIsImZyYW1ld29yay9tYXRoL1ZlY3RvcjIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUUvQixVQUFVLENBQUMsV0FBVyxHQUFHLFVBQVMsS0FBWTtJQUMxQyxJQUFJLElBQUksR0FBZSxVQUFVLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDO0lBQzdELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xDLElBQUk7WUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDL0I7S0FDSjtBQUNMLENBQUMsQ0FBQTtBQUNELFVBQVUsQ0FBQyxrQkFBa0IsR0FBRyxVQUFTLEtBQVk7SUFDakQsSUFBSSxJQUFJLEdBQWUsVUFBVSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQztJQUNwRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsQyxJQUFJO1lBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FB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