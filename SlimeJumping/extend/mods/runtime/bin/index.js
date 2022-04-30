"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
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
globalThis.__updateFuncData__ = {
    process: [],
    physicsProcess: [],
};
/**
 * 装饰器, 用在静态函数上, 被修饰的静态函数每帧都会被调用一次
 */
function Update() {
    return function (target, propertyKey, descriptor) {
        globalThis.__updateFuncData__.process.push(descriptor.value.bind(target));
    };
}
/**
 * 装饰器, 用在静态函数上, 被修饰的静态函数每物理帧都会被调用一次
 */
function PhysicsUpdate() {
    return function (target, propertyKey, descriptor) {
        globalThis.__updateFuncData__.physicsProcess.push(descriptor.value.bind(target));
    };
}
function NodeRegister(constructor) {
    //节点名称
    let nodeTypeName = constructor.name;
    console.log("注册节点: " + nodeTypeName);
    return constructor;
}
/**
 * 鼠标按键映射值
 */
var ButtonList;
/**
 * 鼠标按键映射值
 */
(function (ButtonList) {
    ButtonList[ButtonList["Left"] = 0] = "Left";
    ButtonList[ButtonList["Middle"] = 1] = "Middle";
    ButtonList[ButtonList["Right"] = 2] = "Right";
})(ButtonList || (ButtonList = {}));
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
var KeyList;
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
})(KeyList || (KeyList = {}));
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
    /** 获取当前颜色的灰暗度值 */
    gray() {
        return (this.r + this.g + this.b) / 3;
    }
    /** 获取该颜色的反色 */
    inverted() {
        return new Color(1 - this.r, 1 - this.g, 1 - this.b, this.a);
    }
    /** 获取该颜色向 #ffffff 颜色过渡,参数 amount (0-1) 为过渡的量 */
    lightened(amount) {
        return new Color(this.r + (1 - this.r) * amount, this.g + (1 - this.g) * amount, this.b + (1 - this.b) * amount, this.a);
    }
    /** 返回当前颜色对比度最高的颜色 */
    contrasted() {
        return new Color((this.r + 0.5) % 1, (this.g + 0.5) % 1, (this.b + 0.5) % 1, this.a);
    }
    linearInterpolate(to, weight) {
        if (typeof weight === "number") {
            return new Color(this.r + (to.r - this.r) * weight, this.g + (to.g - this.g) * weight, this.b + (to.b - this.b) * weight, this.a + (to.a - this.a) * weight);
        }
        return new Color(this.r + (to.r - this.r) * weight.r, this.g + (to.g - this.g) * weight.g, this.b + (to.b - this.b) * weight.b, this.a + (to.a - this.a) * weight.a);
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
        return "color : {r: " + this.r + ", g: " + this.g + ", b: " + this.b + ", a: " + this.a + "}";
    }
    equals(other) {
        return other && this.r === other.r && this.g === other.g && this.g === other.g && this.g === other.g;
    }
    /** 克隆当前的颜色, 返回新的颜色对象 */
    clone() {
        return new Color(this);
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
Math = ((target) => {
    target.TAU = Math.PI * 2;
    Object.defineProperty(target, "TAU", { writable: false, });
    target.INF = Number.POSITIVE_INFINITY;
    Object.defineProperty(target, "INF", { writable: false, });
    target.NEG_INF = Number.NEGATIVE_INFINITY;
    Object.defineProperty(target, "NEG_INF", { writable: false, });
    target.NaN = NaN;
    Object.defineProperty(target, "NaN", { writable: false, });
    target.EPSILON = 1E-06;
    Object.defineProperty(target, "EPSILON", { writable: false, });
    target.cartesian2Polar = (x, y) => {
        return new Vector2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
    };
    target.polar2Cartesian = (r, th) => {
        return new Vector2(r * Math.cos(th), r * Math.sin(th));
    };
    target.clamp = (value, min, max) => {
        return (value < min) ? min : ((value > max) ? max : value);
    };
    target.deg2Rad = (deg) => {
        return deg * (Math.PI / 180);
    };
    target.rad2Deg = (rad) => {
        return rad * 57.29578;
    };
    target.ease = (s, curve) => {
        if (s < 0) {
            s = 0;
        }
        else if (s > 1) {
            s = 1;
        }
        if (curve > 0) {
            if (curve < 1) {
                return 1 - Math.pow(1 - s, 1 / curve);
            }
            return Math.pow(s, curve);
        }
        if (curve < 0) {
            if (s < 0.5) {
                return Math.pow(s * 2, 0 - curve) * 0.5;
            }
            return (1 - Math.pow(1 - (s - 0.5) * 2, 0 - curve)) * 0.5 + 0.5;
        }
        return 0;
    };
    target.lerp = (from, to, weight) => {
        return (weight - from) / (to - from);
    };
    target.inverseLerp = (from, to, weight) => {
        return from + (to - from) * weight;
    };
    target.moveToward = (from, to, delta) => {
        if (Math.abs(to - from) <= delta) {
            return to;
        }
        return from + Math.sign(to - from) * delta;
    };
    target.nearestPo2 = (value) => {
        value--;
        value |= value >> 1;
        value |= value >> 2;
        value |= value >> 4;
        value |= value >> 8;
        value |= value >> 16;
        value++;
        return value;
    };
    target.smoothStep = (from, to, s) => {
        if (Math.isEqualApprox(from, to)) {
            return from;
        }
        let num = Math.clamp((s - from) / (to - from), 0, 1);
        return num * num * (3 - 2 * num);
    };
    target.isEqualApprox = (a, b) => {
        if (a == b) {
            return true;
        }
        let num = 1E-06 * Math.abs(a);
        if (num < 1E-06) {
            num = 1E-06;
        }
        return Math.abs(a - b) < num;
    };
    target.stepDecimals = (step) => {
        let array = [
            0.9999,
            0.09999,
            0.009999,
            0.0009999,
            9.999E-05,
            9.999E-06,
            9.999E-07,
            9.999E-08,
            9.999E-09
        ];
        let num = Math.abs(step);
        let num2 = num - (num | 0);
        for (let i = 0; i < array.length; i++) {
            if (num2 >= array[i]) {
                return i;
            }
        }
        return 0;
    };
    target.stepify = (s, step) => {
        if (step != 0) {
            return Math.floor(s / step + 0.5) * step;
        }
        return s;
    };
    target.isZeroApprox = (s) => {
        return Math.abs(s) < 1E-06;
    };
    target.wrap = (value, min, max) => {
        let num = max - min;
        if (Math.isZeroApprox(num)) {
            return min;
        }
        return min + ((value - min) % num + num) % num;
    };
    target.posMod = (a, b) => {
        let num = a % b;
        if ((num < 0 && b > 0) || (num > 0 && b < 0)) {
            num += b;
        }
        return num;
    };
    return target;
})(Math);
/**
 * 二维向量
 */
class Vector2 {
    constructor(...args) {
        /** x坐标 */
        this.x = 0;
        /** y坐标 */
        this.y = 0;
        if (args.length == 1) {
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
    /** 正无穷大的向量 */
    static get inf() {
        return new Vector2(Math.INF, Math.INF);
    }
    /** 获取向量长度 */
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /** 获取向量角度(弧度制),返回向量相对于X轴的弧度角,即(1,0)向量 */
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    /** 返回这个向量长度的平方 */
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    set(val, val2) {
        if (typeof val === "number") {
            this.x = val;
            this.y = val2;
        }
        else {
            this.x = val.x;
            this.y = val.y;
        }
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
    /** 返回当前向量方向相反向量, 等同于new Vector2(this.x * -1, this.y * -1) */
    negative() {
        return new Vector2(this.x * -1, this.y * -1);
    }
    /** 返回与vector的点积 */
    dot(vector) {
        return this.x * vector.x + this.y + vector.y;
    }
    /** 返回与vector的叉积 */
    cross(vector) {
        return this.x * vector.x + this.y + vector.y;
    }
    /** 向量归一化,返回缩放到单位长度的向量,需要归一化的向量不能为(0,0) */
    normalized() {
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
    /** 返回到vector向量的距离的平方 */
    DistanceSquaredTo(to) {
        return (this.x - to.x) * (this.x - to.x) + (this.y - to.y) * (this.y - to.y);
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
    linearInterpolate(to, weight) {
        if (typeof weight == "number") {
            return new Vector2(Math.lerp(this.x, to.x, weight), Math.lerp(this.y, to.y, weight));
        }
        return new Vector2(Math.lerp(this.x, to.x, weight.x), Math.lerp(this.y, to.y, weight.y));
    }
    /** 返回当前向量宽高比, 即 x / y */
    aspect() {
        return this.x / this.y;
    }
    /** 返回由方向向量`normal`定义的直线上的反射(即镜像或对称)向量。 */
    reflect(normal) {
        if (!normal.isNormalized()) {
            throw new Error("Argument 'normal' is not normalized");
        }
        return normal.multiply(2 * this.dot(normal)).reduce(this);
    }
    /** 返回当前向量是否是归一化后的向量 */
    isNormalized() {
        return Math.abs(this.lengthSquared() - 1) < 1E-06;
    }
    /** 返回当前向量指向`b`的归一化向量 */
    directionTo(b) {
        return new Vector2(b.x - this.x, b.y - this.y).normalized();
    }
    /** 返回向量的反值, 等同于 new Vector2(1 / this.x, 1 / this.y) */
    inverse() {
        return new Vector2(1 / this.x, 1 / this.y);
    }
    /** 返回一个与原向量相比，逆时针旋转90度的垂直向量，其长度相同。 */
    perpendicular() {
        return new Vector2(this.y, 0 - this.x);
    }
    /** 将当前向量投影到`onNormal`向量上,并返回结果 */
    project(onNormal) {
        return onNormal.multiply(this.dot(onNormal) / onNormal.lengthSquared());
    }
    // public cubicInterpolate(b: Vector2, preA: Vector2, postB: Vector2, weight: number): Vector2
    // {
    //     let vec = this;
    //     let num = weight * weight;
    //     let scale = num * weight;
    //     return 0.5 * 
    //     (vec * 2 + 
    //         (preA.contrary().add(b)).multiply(weight) + 
    //         (2 * preA - 5 * vec + 4 * b - postB) * num + 
    //         (-preA + 3 * vec - 3 * b + postB) * scale
    //     );
    // }
    /** 比较两个向量值是否相等 */
    equals(vector) {
        return vector && this.x === vector.x && this.y === vector.y;
    }
    /** 克隆当前的向量, 返回新的向量对象 */
    clone() {
        return new Vector2(this);
    }
    /** 转换为字符串 */
    toString() {
        return "{x: " + this.x + ", y: " + this.y + "}";
    }
}
let Node = class Node {
    constructor() {
        this._position = Vector2.zero;
        this._scale = Vector2.one;
        this._rotation = 0;
        this["__gdNodeType__"] = "Node2D";
    }
    static instantiate(...args) {
        var _a, _b;
        //节点名称
        let nodeName = args.length >= 1 ? args[0] : this.name;
        let node = new this();
        // 绑定的 Godot 类型
        let gdNodeType = node["__gdNodeType__"];
        // 实例化 Godot 节点
        let gdNode;
        switch (gdNodeType) {
            case "Node2D":
                gdNode = new Godot.Node2D();
                break;
            case "Sprite":
                gdNode = new Godot.Sprite();
                break;
            default: throw new Error("暂不支持绑定`" + gdNodeType + "`类型的Godot节点!");
        }
        if (gdNodeType == "Sprite") {
            let sprite = gdNode;
            sprite.Texture;
        }
        gdNode.Name = nodeName;
        node["__gdNode__"] = gdNode;
        Object.defineProperty(this, "__gdNode__", { writable: false });
        if (args.length >= 3) {
            let parent = args[1];
            if (!parent) {
                throw new Error("argument `parent` is " + parent + "!");
            }
            node.position = args[2];
            parent.addChild(node);
        }
        else if (args.length == 2) {
            node.position = args[1];
            (_a = SceneManager.activeScene) === null || _a === void 0 ? void 0 : _a.rootNode.addChild(node);
        }
        else {
            (_b = SceneManager.activeScene) === null || _b === void 0 ? void 0 : _b.rootNode.addChild(node);
        }
        node.initialize();
        return node;
    }
    get index() {
        return 1;
    }
    get name() {
        return this._name;
    }
    set name(n) {
        this._name = n;
    }
    get x() {
        return this._position.x;
    }
    set x(x) {
        this._position.x = x;
    }
    get y() {
        return this._position.y;
    }
    set y(y) {
        this._position.y = y;
    }
    get position() {
        return new Vector2(this._position.x, this._position.y);
    }
    set position(pos) {
        this._position.set(pos);
    }
    get globalPosition() {
        return null;
    }
    set globalPosition(pos) {
    }
    get scale() {
        return new Vector2(this._scale.x, this._scale.y);
    }
    set scale(sc) {
        this._scale.set(sc);
    }
    get globalScale() {
        return null;
    }
    set globalScale(sc) {
    }
    get rotation() {
        return this._rotation;
    }
    set rotation(r) {
        this._rotation = r;
    }
    get globalRotation() {
        return null;
    }
    set globalRotation(r) {
    }
    get rotationDegrees() {
        return null;
    }
    set rotationDegrees(r) {
    }
    get globalRotationDegrees() {
        return null;
    }
    set globalRotationDegrees(r) {
    }
    get layer() {
        return null;
    }
    set layer(layer) {
    }
    get globalLayer() {
        return null;
    }
    set globalLayer(layer) {
    }
    get modulate() {
        return null;
    }
    set modulate(v) {
    }
    get selfModulate() {
        return null;
    }
    set selfModulate(v) {
    }
    get visible() {
        return null;
    }
    set visible(v) {
    }
    get pause() {
        return null;
    }
    set pause(p) {
    }
    get parent() {
        return null;
    }
    get childIndex() {
        return null;
    }
    get children() {
        return null;
    }
    get childCount() {
        return null;
    }
    getGlobalVisible() {
        return null;
    }
    getGlobalPause() {
        return null;
    }
    initialize() {
        console.log("初始化完成! node: " + this.name);
    }
    start() {
    }
    update(delta) {
    }
    physicsUpdate(delta) {
    }
    setParent(parent, keepGlobalPos) {
    }
    addChild(child, index) {
        let gdNode = this["__gdNode__"];
        gdNode.AddChild(child["__gdNode__"]);
    }
    getNode(childPath) {
        return null;
    }
    getNodes(childPath) {
        return null;
    }
    removeChild(child) {
    }
    lookAt(target) {
    }
    rotate(radians) {
    }
    getAngleTo(point) {
        return null;
    }
    toLocal(globalPoint) {
        return null;
    }
    toGlobal(localPoint) {
        return null;
    }
    startCoroutine(iterator) {
        return null;
    }
    stopCoroutine(coroutine) {
        return null;
    }
    clone() {
        return null;
    }
    destroy() {
    }
    equals(other) {
        return null;
    }
    addEventListener(event, cb) {
        return null;
    }
    dispatchEvent(event, value) {
    }
    removeEventListener(event, cb) {
        return null;
    }
    clearEventListener(event) {
        return null;
    }
    clearAllEventListener() {
        return null;
    }
};
Node = __decorate([
    NodeRegister
], Node);
var _a, _Scene__name, _Scene__sceneRoot;
class Scene {
    constructor(sceneName) {
        _Scene__name.set(this, void 0);
        // 创建场景根节点
        if (!__classPrivateFieldGet(Scene, _a, "f", _Scene__sceneRoot)) {
            __classPrivateFieldSet(Scene, _a, Node.instantiate("SceneRoot"), "f", _Scene__sceneRoot);
            CShap.GameManager.Instance.ModeRoot.AddChild(__classPrivateFieldGet(Scene, _a, "f", _Scene__sceneRoot)["__gdNode__"]);
        }
        __classPrivateFieldSet(this, _Scene__name, sceneName, "f");
        this.rootNode = Node.instantiate(sceneName, __classPrivateFieldGet(Scene, _a, "f", _Scene__sceneRoot), Vector2.zero);
    }
    get index() {
        return 1;
    }
    get name() {
        return __classPrivateFieldGet(this, _Scene__name, "f");
    }
    appendNode(node) {
    }
    destroy() {
    }
    equals(other) {
        return other === this;
    }
}
_a = Scene, _Scene__name = new WeakMap();
_Scene__sceneRoot = { value: void 0 };
class SceneManager {
    constructor() { }
    static get sceneCount() {
        return 1;
    }
    static getSceneByIndex(index) {
        return null;
    }
    static getSceneByName(sceneName) {
        return null;
    }
    static get activeScene() {
        return this._activeScene;
    }
    static setActiveScene(value) {
        switch (typeof value) {
            case "object":
                this._activeScene = value;
                break;
            case "string":
                break;
            case "number":
                break;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiLCJiYXNpYy9JQ2xvbmUudHMiLCJiYXNpYy9JQ29yb3V0aW5lLnRzIiwiYmFzaWMvSURlc3Ryb3kudHMiLCJiYXNpYy9JRXF1YXRhYmxlLnRzIiwiYmFzaWMvSUV2ZW50LnRzIiwiYmFzaWMvSUV2ZW50QmluZGVyLnRzIiwiYmFzaWMvSU5vZGUudHMiLCJiYXNpYy9JT2JqZWN0LnRzIiwiZnJhbWV3b3JrL0NvbnNvbGUudHMiLCJmcmFtZXdvcmsvVXBkYXRlLnRzIiwiZnJhbWV3b3JrL2RlY29yYXRvci9Ob2RlUmVnaXN0ZXIudHMiLCJmcmFtZXdvcmsvaW5wdXQvQnV0dG9uTGlzdC50cyIsImZyYW1ld29yay9pbnB1dC9JbnB1dC50cyIsImZyYW1ld29yay9pbnB1dC9LZXlMaXN0LnRzIiwiZnJhbWV3b3JrL21hdGgvQ29sb3IudHMiLCJmcmFtZXdvcmsvbWF0aC9NYXRoLnRzIiwiZnJhbWV3b3JrL21hdGgvVmVjdG9yMi50cyIsImZyYW1ld29yay9ub2RlL05vZGUudHMiLCJmcmFtZXdvcmsvbm9kZS9Ob2RlRXZlbnRNYXAudHMiLCJmcmFtZXdvcmsvc2NlbmUvU2NlbmUudHMiLCJmcmFtZXdvcmsvc2NlbmUvU2NlbmVNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUUvQixVQUFVLENBQUMsV0FBVyxHQUFHLFVBQVMsS0FBWTtJQUMxQyxJQUFJLElBQUksR0FBZSxVQUFVLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDO0lBQzdELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xDLElBQUk7WUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMs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Q0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBS00saUJBQWlCLENBQUMsRUFBUyxFQUFFLE1BQXNCO1FBQ3RELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzVCLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFDOUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFDakMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFDakMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFDaEQsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQ25DLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUNuQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lB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QyxDQUFDO0lBQ3ZDLENBQUM7SUFDTSxNQUFNLEtBQUssTUFBTTtRQUNwQixPQUFPLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNNLE1BQU0sS0FBSyxVQUFVO1FBQ3hCLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ00sTUFBTSxLQUFLLFFBQVE7UUFDdEIsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDTSxNQUFNLEtBQUssUUFBUTtRQUN0QixPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNNLE1BQU0sS0FBSyxNQUFNO1FBQ3BCLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ00sTUFBTSxLQUFLLE1BQU07UUFDcEIsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDTSxNQUFNLEtBQUssT0FBTztRQUNyQixPQUFPLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNNLE1BQU0sS0FBSyxTQUFTO1FBQ3ZCLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ00sTUFBTSxLQUFLLFNBQVM7UUFDdkIsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDTSxNQUFNLEtBQUssSUFBSTtRQUNsQixPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsRUFB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