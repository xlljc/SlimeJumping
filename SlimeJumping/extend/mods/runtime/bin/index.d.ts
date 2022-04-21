declare namespace Runtime {
    interface IEquatable<T> {
        /**
         * 比较当前对象是否与指定对象属性相同
         * @param other 目标对象
         */
        equals(other: T): boolean;
    }
}
declare namespace Runtime {
    interface IEvent<EMAP> {
        addListener<T extends keyof EMAP, V extends EMAP[T]>(event: T, cb: (v: V) => void): boolean;
        dispatchEvent<T extends keyof EMAP, V extends EMAP[T]>(event: T, value: V): void;
        removeListener<T extends keyof EMAP, V extends EMAP[T]>(event: T, cb: (v: V) => void): boolean;
        clearListener<T extends keyof EMAP>(event: T): boolean;
        clearAllListener(): boolean;
    }
}
declare namespace Runtime {
    /**
     * 装饰器, 用在静态函数上, 被修饰的静态函数每帧都会被调用一次
     */
    function Update(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
    /**
     * 装饰器, 用在静态函数上, 被修饰的静态函数每物理帧都会被调用一次
     */
    function PhysicsUpdate(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
}
declare namespace Runtime {
    /**
     * 鼠标按键映射值
     */
    enum ButtonList {
        Left = 0,
        Middle = 1,
        Right = 2
    }
}
declare namespace Runtime {
    class Input {
        private constructor();
        private static key;
        private static update;
        static isKeyPressed(key: KeyList): boolean;
        static isKeyDown(key: KeyList): boolean;
        static isKeyUp(key: KeyList): boolean;
    }
}
declare namespace Runtime {
    enum KeyList {
        /** Space key. */
        Space = 32,
        /** ! key. */
        Exclam = 33,
        /** " key. */
        Quotedbl = 34,
        /** # key. */
        Numbersign = 35,
        /** $ key. */
        Dollar = 36,
        /** % key. */
        Percent = 37,
        /** & key. */
        Ampersand = 38,
        /** ' key. */
        Apostrophe = 39,
        /** ( key. */
        Parenleft = 40,
        /** ) key. */
        Parenright = 41,
        /** * key. */
        Asterisk = 42,
        /** + key. */
        Plus = 43,
        /** , key. */
        Comma = 44,
        /** - key. */
        Minus = 45,
        /** . key. */
        Period = 46,
        /** / key. */
        Slash = 47,
        /** Number 0. */
        Key0 = 48,
        /** Number 1. */
        Key1 = 49,
        /** Number 2. */
        Key2 = 50,
        /** Number 3. */
        Key3 = 51,
        /** Number 4. */
        Key4 = 52,
        /** Number 5. */
        Key5 = 53,
        /** Number 6. */
        Key6 = 54,
        /** Number 7. */
        Key7 = 55,
        /** Number 8. */
        Key8 = 56,
        /** Number 9. */
        Key9 = 57,
        /** : key. */
        Colon = 58,
        /** ; key. */
        Semicolon = 59,
        /** < key. */
        Less = 60,
        /** = key. */
        Equal = 61,
        /** > key. */
        Greater = 62,
        /** ? key. */
        Question = 63,
        /** @ key. */
        At = 64,
        /** A key. */
        A = 65,
        /** B key. */
        B = 66,
        /** C key. */
        C = 67,
        /** D key. */
        D = 68,
        /** E key. */
        E = 69,
        /** F key. */
        F = 70,
        /** G key. */
        G = 71,
        /** H key. */
        H = 72,
        /** I key. */
        I = 73,
        /** J key. */
        J = 74,
        /** K key. */
        K = 75,
        /** L key. */
        L = 76,
        /** M key. */
        M = 77,
        /** N key. */
        N = 78,
        /** O key. */
        O = 79,
        /** P key. */
        P = 80,
        /** Q key. */
        Q = 81,
        /** R key. */
        R = 82,
        /** S key. */
        S = 83,
        /** T key. */
        T = 84,
        /** U key. */
        U = 85,
        /** V key. */
        V = 86,
        /** W key. */
        W = 87,
        /** X key. */
        X = 88,
        /** Y key. */
        Y = 89,
        /** Z key. */
        Z = 90,
        /** [ key. */
        Bracketleft = 91,
        /** \ key. */
        Backslash = 92,
        /** ] key. */
        Bracketright = 93,
        /** ^ key. */
        Asciicircum = 94,
        /** _ key. */
        Underscore = 95,
        /** ` key. */
        Quoteleft = 96,
        /** { key. */
        Braceleft = 123,
        /** | key. */
        Bar = 124,
        /** } key. */
        Braceright = 125,
        /** ~ key. */
        Asciitilde = 126,
        /** Non-breakable space key. */
        Nobreakspace = 160,
        /** ¡ key. */
        Exclamdown = 161,
        /** ¢ key. */
        Cent = 162,
        /** £ key. */
        Sterling = 163,
        /** ¤ key. */
        Currency = 164,
        /** ¥ key. */
        Yen = 165,
        /** ¦ key. */
        Brokenbar = 166,
        /** § key. */
        Section = 167,
        /** ¨ key. */
        Diaeresis = 168,
        /** © key. */
        Copyright = 169,
        /** ª key. */
        Ordfeminine = 170,
        /** « key. */
        Guillemotleft = 171,
        /** ¬ key. */
        Notsign = 172,
        /** Soft hyphen key. */
        Hyphen = 173,
        /** ® key. */
        Registered = 174,
        /** ¯ key. */
        Macron = 175,
        /** ° key. */
        Degree = 176,
        /** ± key. */
        Plusminus = 177,
        /** ² key. */
        Twosuperior = 178,
        /** ³ key. */
        Threesuperior = 179,
        /** ´ key. */
        Acute = 180,
        /** µ key. */
        Mu = 181,
        /** ¶ key. */
        Paragraph = 182,
        /** · key. */
        Periodcentered = 183,
        /** ¸ key. */
        Cedilla = 184,
        /** ¹ key. */
        Onesuperior = 185,
        /** º key. */
        Masculine = 186,
        /** » key. */
        Guillemotright = 187,
        /** ¼ key. */
        Onequarter = 188,
        /** ½ key. */
        Onehalf = 189,
        /** ¾ key. */
        Threequarters = 190,
        /** ¿ key. */
        Questiondown = 191,
        /** À key. */
        Agrave = 192,
        /** Á key. */
        Aacute = 193,
        /** Â key. */
        Acircumflex = 194,
        /** Ã key. */
        Atilde = 195,
        /** Ä key. */
        Adiaeresis = 196,
        /** Å key. */
        Aring = 197,
        /** Æ key. */
        Ae = 198,
        /** Ç key. */
        Ccedilla = 199,
        /** È key. */
        Egrave = 200,
        /** É key. */
        Eacute = 201,
        /** Ê key. */
        Ecircumflex = 202,
        /** Ë key. */
        Ediaeresis = 203,
        /** Ì key. */
        Igrave = 204,
        /** Í key. */
        Iacute = 205,
        /** Î key. */
        Icircumflex = 206,
        /** Ï key. */
        Idiaeresis = 207,
        /** Ð key. */
        Eth = 208,
        /** Ñ key. */
        Ntilde = 209,
        /** Ò key. */
        Ograve = 210,
        /** Ó key. */
        Oacute = 211,
        /** Ô key. */
        Ocircumflex = 212,
        /** Õ key. */
        Otilde = 213,
        /** Ö key. */
        Odiaeresis = 214,
        /** × key. */
        Multiply = 215,
        /** Ø key. */
        Ooblique = 216,
        /** Ù key. */
        Ugrave = 217,
        /** Ú key. */
        Uacute = 218,
        /** Û key. */
        Ucircumflex = 219,
        /** Ü key. */
        Udiaeresis = 220,
        /** Ý key. */
        Yacute = 221,
        /** Þ key. */
        Thorn = 222,
        /** ß key. */
        Ssharp = 223,
        /** ÷ key. */
        Division = 247,
        /** ÿ key. */
        Ydiaeresis = 255,
        /** Escape key. */
        Escape = 16777217,
        /** Tab key. */
        Tab = 16777218,
        /** Shift+Tab key. */
        Backtab = 16777219,
        /** Backspace key. */
        Backspace = 16777220,
        /** Return key (on the main keyboard). */
        Enter = 16777221,
        /** Enter key on the numeric keypad. */
        KpEnter = 16777222,
        /** Insert key. */
        Insert = 16777223,
        /** Delete key. */
        Delete = 16777224,
        /** Pause key. */
        Pause = 16777225,
        /** Print Screen key. */
        Print = 16777226,
        /** System Request key. */
        Sysreq = 16777227,
        /** Clear key. */
        Clear = 16777228,
        /** Home key. */
        Home = 16777229,
        /** End key. */
        End = 16777230,
        /** Left arrow key. */
        Left = 16777231,
        /** Up arrow key. */
        Up = 16777232,
        /** Right arrow key. */
        Right = 16777233,
        /** Down arrow key. */
        Down = 16777234,
        /** Page Up key. */
        Pageup = 16777235,
        /** Page Down key. */
        Pagedown = 16777236,
        /** Shift key. */
        Shift = 16777237,
        /** Control key. */
        Control = 16777238,
        /** Meta key. */
        Meta = 16777239,
        /** Alt key. */
        Alt = 16777240,
        /** Caps Lock key. */
        Capslock = 16777241,
        /** Num Lock key. */
        Numlock = 16777242,
        /** Scroll Lock key. */
        Scrolllock = 16777243,
        /** F1 key. */
        F1 = 16777244,
        /** F2 key. */
        F2 = 16777245,
        /** F3 key. */
        F3 = 16777246,
        /** F4 key. */
        F4 = 16777247,
        /** F5 key. */
        F5 = 16777248,
        /** F6 key. */
        F6 = 16777249,
        /** F7 key. */
        F7 = 16777250,
        /** F8 key. */
        F8 = 16777251,
        /** F9 key. */
        F9 = 16777252,
        /** F10 key. */
        F10 = 16777253,
        /** F11 key. */
        F11 = 16777254,
        /** F12 key. */
        F12 = 16777255,
        /** F13 key. */
        F13 = 16777256,
        /** F14 key. */
        F14 = 16777257,
        /** F15 key. */
        F15 = 16777258,
        /** F16 key. */
        F16 = 16777259,
        /** Left Super key (Windows key). */
        SuperL = 16777260,
        /** Right Super key (Windows key). */
        SuperR = 16777261,
        /** Context menu key. */
        Menu = 16777262,
        /** Left Hyper key. */
        HyperL = 16777263,
        /** Right Hyper key. */
        HyperR = 16777264,
        /** Help key. */
        Help = 16777265,
        /** Left Direction key. */
        DirectionL = 16777266,
        /** Right Direction key. */
        DirectionR = 16777267,
        /** Media back key. Not to be confused with the Back button on an Android device. */
        Back = 16777280,
        /** Media forward key. */
        Forward = 16777281,
        /** Media stop key. */
        Stop = 16777282,
        /** Media refresh key. */
        Refresh = 16777283,
        /** Volume down key. */
        Volumedown = 16777284,
        /** Mute volume key. */
        Volumemute = 16777285,
        /** Volume up key. */
        Volumeup = 16777286,
        /** Bass Boost key. */
        Bassboost = 16777287,
        /** Bass up key. */
        Bassup = 16777288,
        /** Bass down key. */
        Bassdown = 16777289,
        /** Treble up key. */
        Trebleup = 16777290,
        /** Treble down key. */
        Trebledown = 16777291,
        /** Media play key. */
        Mediaplay = 16777292,
        /** Media stop key. */
        Mediastop = 16777293,
        /** Previous song key. */
        Mediaprevious = 16777294,
        /** Next song key. */
        Medianext = 16777295,
        /** Media record key. */
        Mediarecord = 16777296,
        /** Home page key. */
        Homepage = 16777297,
        /** Favorites key. */
        Favorites = 16777298,
        /** Search key. */
        Search = 16777299,
        /** Standby key. */
        Standby = 16777300,
        /** Open URL / Launch Browser key. */
        Openurl = 16777301,
        /** Launch Mail key. */
        Launchmail = 16777302,
        /** Launch Media key. */
        Launchmedia = 16777303,
        /** Launch Shortcut 0 key. */
        Launch0 = 16777304,
        /** Launch Shortcut 1 key. */
        Launch1 = 16777305,
        /** Launch Shortcut 2 key. */
        Launch2 = 16777306,
        /** Launch Shortcut 3 key. */
        Launch3 = 16777307,
        /** Launch Shortcut 4 key. */
        Launch4 = 16777308,
        /** Launch Shortcut 5 key. */
        Launch5 = 16777309,
        /** Launch Shortcut 6 key. */
        Launch6 = 16777310,
        /** Launch Shortcut 7 key. */
        Launch7 = 16777311,
        /** Launch Shortcut 8 key. */
        Launch8 = 16777312,
        /** Launch Shortcut 9 key. */
        Launch9 = 16777313,
        /** Launch Shortcut A key. */
        Launcha = 16777314,
        /** Launch Shortcut B key. */
        Launchb = 16777315,
        /** Launch Shortcut C key. */
        Launchc = 16777316,
        /** Launch Shortcut D key. */
        Launchd = 16777317,
        /** Launch Shortcut E key. */
        Launche = 16777318,
        /** Launch Shortcut F key. */
        Launchf = 16777319,
        /** Multiply (*) key on the numeric keypad. */
        KpMultiply = 16777345,
        /** Divide (/) key on the numeric keypad. */
        KpDivide = 16777346,
        /** Subtract (-) key on the numeric keypad. */
        KpSubtract = 16777347,
        /** Period (.) key on the numeric keypad. */
        KpPeriod = 16777348,
        /** Add (+) key on the numeric keypad. */
        KpAdd = 16777349,
        /** Number 0 on the numeric keypad. */
        Kp0 = 16777350,
        /** Number 1 on the numeric keypad. */
        Kp1 = 16777351,
        /** Number 2 on the numeric keypad. */
        Kp2 = 16777352,
        /** Number 3 on the numeric keypad. */
        Kp3 = 16777353,
        /** Number 4 on the numeric keypad. */
        Kp4 = 16777354,
        /** Number 5 on the numeric keypad. */
        Kp5 = 16777355,
        /** Number 6 on the numeric keypad. */
        Kp6 = 16777356,
        /** Number 7 on the numeric keypad. */
        Kp7 = 16777357,
        /** Number 8 on the numeric keypad. */
        Kp8 = 16777358,
        /** Number 9 on the numeric keypad. */
        Kp9 = 16777359,
        /** Unknown key. */
        Unknown = 33554431
    }
}
declare namespace Runtime {
    /**
     * 颜色类
     */
    class Color implements IEquatable<Color> {
        /** 红色通道值, 范围: 0 - 1 */
        r: number;
        /** 绿色通道值, 范围: 0 - 1 */
        g: number;
        /** 蓝色通道值, 范围: 0 - 1 */
        b: number;
        /** 透明通道值, 范围: 0 - 1 */
        a: number;
        /**
         * 创建一个Color对象
         */
        constructor();
        constructor(r: number, g: number, b: number);
        constructor(r: number, g: number, b: number, a: number);
        /**
         * 创建一个Color对象, 复制参数color的 r g b a 值
         */
        constructor(color: Color);
        /**
         * 从一个十进制颜色中创建Color对象
         */
        constructor(rgba: number);
        /**
         * 从一个RGBA字符串中创建颜色对象
         */
        constructor(rgba: string);
        /** HSV色调值 */
        get h(): number;
        /** HSV色调值 */
        set h(value: number);
        /**HSV饱和度值 */
        get s(): number;
        /** HSV饱和度值 */
        set s(value: number);
        /** HSV亮度值 */
        get v(): number;
        /** HSV亮度值 */
        set v(value: number);
        /** 颜色相加 */
        add(color: Color): Color;
        /** 颜色相减 */
        reduce(color: Color): Color;
        /** 颜色相乘 */
        multiply(color: Color): Color;
        multiply(scale: number): Color;
        /** 颜色相除 */
        divide(color: Color): Color;
        divide(scale: number): Color;
        /** 混合两种颜色 */
        blend(color: Color): Color;
        /** 根据amount (0-1)获取更暗的颜色 */
        darkened(amount: number): Color;
        /** 根据amount (0-1)获取更亮的颜色 */
        brighter(amount: number): Color;
        /** 获取两个颜色的中间色 */
        middle(color: Color): Color;
        /** 获取两个颜色间的过渡颜色,amount (0-1)为过渡的量 */
        transition(color: Color, amount: number): Color;
        /** 获取当前颜色的灰暗度值 */
        gray(): number;
        /** 获取该颜色的反色 */
        inverted(): Color;
        /** 获取该颜色向 #ffffff 颜色过渡,参数 amount (0-1) 为过渡的量 */
        lightened(amount: number): Color;
        /** 按权重值返回此颜色与to之间的线性插值的结果 */
        linearInterpolate(to: Color, weight: number): Color;
        linearInterpolate(to: Color, weight: Color): Color;
        /** 转换为十进制颜色,可能会丢失精度 */
        toDecimalism(): number;
        /** 转换为十六进制字符串,可能会丢失精度 */
        toHexadecimal(): string;
        /** 转换为字符串 */
        toString(): string;
        equals(other: Color): boolean;
        /**
         * 从HSV配置创建color，值范围为0到1
         * @param hue HSV色调
         * @param saturation HSV饱和
         * @param value HSV亮度
         * @param alpha alpha透明度
         */
        static FromHsv(hue: number, saturation: number, value: number, alpha?: number): Color;
        private static ParseCol8;
        static get aliceblue(): Color;
        static get antiquewhite(): Color;
        static get aqua(): Color;
        static get aquamarine(): Color;
        static get azure(): Color;
        static get beige(): Color;
        static get bisque(): Color;
        static get black(): Color;
        static get blanchedalmond(): Color;
        static get blue(): Color;
        static get blueviolet(): Color;
        static get brown(): Color;
        static get burlywood(): Color;
        static get cadetblue(): Color;
        static get chartreuse(): Color;
        static get chocolate(): Color;
        static get coral(): Color;
        static get cornflower(): Color;
        static get cornsilk(): Color;
        static get crimson(): Color;
        static get cyan(): Color;
        static get darkblue(): Color;
        static get darkcyan(): Color;
        static get darkgoldenrod(): Color;
        static get darkgray(): Color;
        static get darkgreen(): Color;
        static get darkkhaki(): Color;
        static get darkmagenta(): Color;
        static get darkolivegreen(): Color;
        static get darkorange(): Color;
        static get darkorchid(): Color;
        static get darkred(): Color;
        static get darksalmon(): Color;
        static get darkseagreen(): Color;
        static get darkslateblue(): Color;
        static get darkslategray(): Color;
        static get darkturquoise(): Color;
        static get darkviolet(): Color;
        static get deeppink(): Color;
        static get deepskyblue(): Color;
        static get dimgray(): Color;
        static get dodgerblue(): Color;
        static get firebrick(): Color;
        static get floralwhite(): Color;
        static get forestgreen(): Color;
        static get fuchsia(): Color;
        static get gainsboro(): Color;
        static get ghostwhite(): Color;
        static get gold(): Color;
        static get goldenrod(): Color;
        static get gray(): Color;
        static get green(): Color;
        static get greenyellow(): Color;
        static get honeydew(): Color;
        static get hotpink(): Color;
        static get indianred(): Color;
        static get indigo(): Color;
        static get ivory(): Color;
        static get khaki(): Color;
        static get lavender(): Color;
        static get lavenderblush(): Color;
        static get lawngreen(): Color;
        static get lemonchiffon(): Color;
        static get lightblue(): Color;
        static get lightcoral(): Color;
        static get lightcyan(): Color;
        static get lightgoldenrod(): Color;
        static get lightgray(): Color;
        static get lightgreen(): Color;
        static get lightpink(): Color;
        static get lightsalmon(): Color;
        static get lightseagreen(): Color;
        static get lightskyblue(): Color;
        static get lightslategray(): Color;
        static get lightsteelblue(): Color;
        static get lightyellow(): Color;
        static get lime(): Color;
        static get limegreen(): Color;
        static get linen(): Color;
        static get magenta(): Color;
        static get maroon(): Color;
        static get mediumaquamarine(): Color;
        static get mediumblue(): Color;
        static get mediumorchid(): Color;
        static get mediumpurple(): Color;
        static get mediumseagreen(): Color;
        static get mediumslateblue(): Color;
        static get mediumspringgreen(): Color;
        static get mediumturquoise(): Color;
        static get mediumvioletred(): Color;
        static get midnightblue(): Color;
        static get mintcream(): Color;
        static get mistyrose(): Color;
        static get moccasin(): Color;
        static get navajowhite(): Color;
        static get navyblue(): Color;
        static get oldlace(): Color;
        static get olive(): Color;
        static get olivedrab(): Color;
        static get orange(): Color;
        static get orangered(): Color;
        static get orchid(): Color;
        static get palegoldenrod(): Color;
        static get palegreen(): Color;
        static get paleturquoise(): Color;
        static get palevioletred(): Color;
        static get papayawhip(): Color;
        static get peachpuff(): Color;
        static get peru(): Color;
        static get pink(): Color;
        static get plum(): Color;
        static get powderblue(): Color;
        static get purple(): Color;
        static get rebeccapurple(): Color;
        static get red(): Color;
        static get rosybrown(): Color;
        static get royalblue(): Color;
        static get saddlebrown(): Color;
        static get salmon(): Color;
        static get sandybrown(): Color;
        static get seagreen(): Color;
        static get seashell(): Color;
        static get sienna(): Color;
        static get silver(): Color;
        static get skyblue(): Color;
        static get slateblue(): Color;
        static get slategray(): Color;
        static get snow(): Color;
        static get springgreen(): Color;
        static get steelblue(): Color;
        static get tan(): Color;
        static get teal(): Color;
        static get thistle(): Color;
        static get tomato(): Color;
        static get transparent(): Color;
        static get turquoise(): Color;
        static get violet(): Color;
        static get webgreen(): Color;
        static get webgray(): Color;
        static get webmaroon(): Color;
        static get webpurple(): Color;
        static get wheat(): Color;
        static get white(): Color;
        static get whitesmoke(): Color;
        static get yellow(): Color;
        static get yellowgreen(): Color;
    }
}
declare namespace Runtime {
    /**
     * 二维向量
     */
    class Vector2 implements IEquatable<Vector2> {
        /** x坐标 */
        x: number;
        /** y坐标 */
        y: number;
        /**
         * 创建一个Vector对象,参数为 Vector
         */
        constructor();
        constructor(vector: Vector2);
        constructor(x: number, y: number);
        /** 向量值为(0,0) */
        static get zero(): Vector2;
        /** 向量值为(1,0) */
        static get right(): Vector2;
        /** 向量值为(-1,0) */
        static get left(): Vector2;
        /** 向量值为(0,-1) */
        static get up(): Vector2;
        /** 向量值为(0,1) */
        static get down(): Vector2;
        /** 向量值为(1,1) */
        static get one(): Vector2;
        /** 向量值为(-1,-1) */
        static get negOne(): Vector2;
        /** 获取向量长度 */
        get length(): number;
        /** 获取向量角度(弧度制),返回向量相对于X轴的弧度角,即(1,0)向量 */
        get angle(): number;
        /** 向量相加 */
        add(vector: Vector2): Vector2;
        add(num: number): Vector2;
        /** 向量相减 */
        reduce(vector: Vector2): Vector2;
        reduce(num: number): Vector2;
        /** 向量相乘 */
        multiply(vector: Vector2): Vector2;
        multiply(num: number): Vector2;
        /** 向量相除 */
        divide(vector: Vector2): Vector2;
        divide(num: number): Vector2;
        /** 向量取模 */
        mod(vector: Vector2): Vector2;
        mod(num: number): Vector2;
        /** 向量整除 */
        div(vector: Vector2): Vector2;
        div(num: number): Vector2;
        /** 返回与vector的点积 */
        dot(vector: Vector2): number;
        /** 返回与vector的叉积 */
        cross(vector: Vector2): number;
        /** 向量归一化,返回缩放到单位长度的向量,归一化的向量不能为(0,0) */
        normalization(): Vector2;
        /** 返回两个向量间的弧度角 */
        angleTo(vector: Vector2): number;
        /** 返回连接两个点的线和X坐标之间的弧度角. */
        angleToPoint(vector: Vector2): number;
        /** 根据角度旋转向量 */
        rotated(angle: number): Vector2;
        /** 返回绝对值向量 */
        abs(): Vector2;
        /** 返回向量,其中所有分量都向下取整*/
        floor(): Vector2;
        /** 返回向量,其中所有分量都向上取整*/
        ceil(): Vector2;
        /** 返回向量,其中所有分量都四舍五入到最接近的整数 */
        round(): Vector2;
        /** 返回向量,其中每个分量设置为一个或一个负数,具体取决于分量的符号 */
        sign(): Vector2;
        /** 返回到vector向量的距离 */
        distanceTo(vector: Vector2): number;
        /** 返回一个角度相同,长度为length的向量 */
        clamped(length: number): Vector2;
        /** 将向量朝vector移动固定的delta数量 */
        moveToward(vector: Vector2, delta: number): Vector2;
        /** 比较两个向量值是否相等 */
        equals(vector: Vector2): boolean;
        /** 转换为字符串 */
        toString(): string;
    }
}
//# sourceMappingURL=index.d.ts.map