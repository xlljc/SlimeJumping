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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiLCJiYXNpYy9JQ2xvbmUudHMiLCJiYXNpYy9JRGVzdHJveS50cyIsImJhc2ljL0lFcXVhdGFibGUudHMiLCJiYXNpYy9JRXZlbnQudHMiLCJiYXNpYy9JTm9kZS50cyIsImJhc2ljL0lPYmplY3QudHMiLCJmcmFtZXdvcmsvVXBkYXRlLnRzIiwiZnJhbWV3b3JrL2lucHV0L0J1dHRvbkxpc3QudHMiLCJmcmFtZXdvcmsvaW5wdXQvSW5wdXQudHMiLCJmcmFtZXdvcmsvaW5wdXQvS2V5TGlzdC50cyIsImZyYW1ld29yay9tYXRoL0NvbG9yLnRzIiwiZnJhbWV3b3JrL21hdGgvTWF0aC50cyIsImZyYW1ld29yay9tYXRoL1ZlY3RvcjIudHMiLCJmcmFtZXdvcmsvb2JqZWN0L05vZGVFdmVudE1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRS9CLFVBQVUsQ0FBQyxXQUFXLEdBQUcsVUFBUyxLQUFZO0lBQzFDLElBQUksSUFBSSxHQUFlLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7SUFDN0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEMsSUFBSTtZQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUMvQjtLQUNKO0FBQ0wsQ0FBQyxDQUFBO0FBQ0QsVUFBVSxDQUFDLGtCQUFrQixHQUFHLFVBQVMsS0FBWTtJQUNqRCxJQUFJLElBQUksR0FBZSxVQUFVLENBQUMsa0JBQWtCLENBQUMsY0FBYyxD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