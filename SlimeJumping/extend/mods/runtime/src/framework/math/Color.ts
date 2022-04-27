
/**
 * 颜色类
 */
class Color implements IEquatable<Color> {

    /** 红色通道值, 范围: 0 - 1 */
    public r: number = 0;
    /** 绿色通道值, 范围: 0 - 1 */
    public g: number = 0;
    /** 蓝色通道值, 范围: 0 - 1 */
    public b: number = 0;
    /** 透明通道值, 范围: 0 - 1 */
    public a: number = 1;

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
    constructor(...arg: any[]) {
        if (arg.length == 1) {
            let v1 = arg[0];
            let type = typeof v1;
            if (type === "number") {
                let rgba: number = v1;
                this.a = (rgba & 0xF) / 255;
                rgba >>= 8;
                this.b = (rgba & 0xF) / 255;
                rgba >>= 8;
                this.g = (rgba & 0xF) / 255;
                rgba >>= 8;
                this.r = (rgba & 0xF) / 255;
            } else if (type == "string") {
                let rgba: string = v1;
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
                let flag: boolean;
                if (rgba.length == 8) {
                    flag = true;
                } else {
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
                } else {
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
            } else {
                let c1: Color = v1;
                this.r = c1.r;
                this.g = c1.g;
                this.b = c1.b;
                this.a = c1.a;
            }
        } else if (arg.length == 3) {
            this.r = arg[0];
            this.g = arg[1];
            this.b = arg[2];
        } else if (arg.length > 3) {
            this.r = arg[0];
            this.g = arg[1];
            this.b = arg[2];
            this.a = arg[3];
        }
    }

    /** HSV色调值 */
    public get h(): number {
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
    public set h(value: number) {
        let color = Color.FromHsv(value, this.s, this.v, this.a);
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = color.a;
    }
    /**HSV饱和度值 */
    public get s(): number {
        let num = Math.max(this.r, Math.max(this.g, this.b));
        let num2 = Math.min(this.r, Math.min(this.g, this.b));
        let num3 = num - num2;
        return (num == 0) ? 0 : (num3 / num);
    }
    /** HSV饱和度值 */
    public set s(value: number) {
        let color = Color.FromHsv(this.h, value, this.v, this.a);
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = color.a;
    }
    /** HSV亮度值 */
    public get v(): number {
        return Math.max(this.r, Math.max(this.g, this.b));
    }
    /** HSV亮度值 */
    public set v(value: number) {
        let color = Color.FromHsv(this.h, this.s, value, this.a);
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = color.a;
    }

    /** 颜色相加 */
    public add(color: Color): Color {
        return new Color(this.r + color.r, this.g + color.g, this.b + color.b, this.a + color.a);
    }

    /** 颜色相减 */
    public reduce(color: Color): Color {
        return new Color(this.r - color.r, this.g - color.g, this.b - color.b, this.a - color.a);
    }

    /** 颜色相乘 */
    public multiply(color: Color): Color;
    public multiply(scale: number): Color;
    public multiply(value: Color | number): Color {
        if (typeof value == "number") {
            return new Color(this.r * value, this.g * value, this.b * value, this.a * value);
        }
        return new Color(this.r * value.r, this.g * value.g, this.b * value.b, this.a * value.a);
    }

    /** 颜色相除 */
    public divide(color: Color): Color;
    public divide(scale: number): Color;
    public divide(value: Color | number): Color {
        if (typeof value == "number") {
            return new Color(this.r / value, this.g / value, this.b / value, this.a / value);
        }
        return new Color(this.r / value.r, this.g / value.g, this.b / value.b, this.a / value.a);
    }

    /** 混合两种颜色 */
    public blend(color: Color): Color {
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
    public darkened(amount: number): Color {
        return new Color(this.r * (1 - amount), this.g * (1 - amount), this.b * (1 - amount), this.a);
    }

    /** 根据amount (0-1)获取更亮的颜色 */
    public brighter(amount: number): Color {
        let maxNum = this.r > this.g ? (this.r > this.b ? this.r : this.b) : (this.g > this.b ? this.g : this.b);
        return new Color(this.r + (this.r / maxNum) * ((1 - maxNum) * amount),
            this.g + (this.g / maxNum) * ((1 - maxNum) * amount),
            this.b + (this.b / maxNum) * ((1 - maxNum) * amount),
            this.a);
    }

    /** 获取两个颜色的中间色 */
    public middle(color: Color): Color {
        return new Color((this.r + color.r) / 2, (this.g + color.g) / 2,
            (this.b + color.b) / 2, (this.a + color.a) / 2);
    }

    /** 获取当前颜色的灰暗度值 */
    public gray(): number {
        return (this.r + this.g + this.b) / 3;
    }

    /** 获取该颜色的反色 */
    public inverted(): Color {
        return new Color(1 - this.r, 1 - this.g, 1 - this.b, this.a);
    }

    /** 获取该颜色向 #ffffff 颜色过渡,参数 amount (0-1) 为过渡的量 */
    public lightened(amount: number): Color {
        return new Color(this.r + (1 - this.r) * amount,
            this.g + (1 - this.g) * amount,
            this.b + (1 - this.b) * amount,
            this.a)
    }

    /** 返回当前颜色对比度最高的颜色 */
    public contrasted(): Color {
        return new Color((this.r + 0.5) % 1, (this.g + 0.5) % 1, (this.b + 0.5) % 1, this.a);
    }

    /** 按权重值返回此颜色与to之间的线性插值的结果 */
    public linearInterpolate(to: Color, weight: number): Color;
    public linearInterpolate(to: Color, weight: Color): Color;
    public linearInterpolate(to: Color, weight: number | Color): Color {
        if (typeof weight === "number") {
            return new Color(this.r + (to.r - this.r) * weight,
                this.g + (to.g - this.g) * weight,
                this.b + (to.b - this.b) * weight,
                this.a + (to.a - this.a) * weight);
        }
        return new Color(this.r + (to.r - this.r) * weight.r,
            this.g + (to.g - this.g) * weight.g,
            this.b + (to.b - this.b) * weight.b,
            this.a + (to.a - this.a) * weight.a);
    }

    /** 转换为十进制颜色,可能会丢失精度 */
    public toDecimalism(): number {
        return ((this.r * 255) | 0) * 256 * 256 * 256 + ((this.g * 255) | 0) * 256 * 256 + ((this.b * 255) | 0) * 256 + ((this.a * 255) | 0);
    }

    /** 转换为十六进制字符串,可能会丢失精度 */
    public toHexadecimal(): string {
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
    public toString(): string {
        return "color : {r: " + this.r + ", g: " + this.g + ", b: " + this.b + ", a: " + this.a + "}";
    }

    public equals(other: Color): boolean {
        return other && this.r === other.r && this.g === other.g && this.g === other.g && this.g === other.g;
    }

    /**
     * 从HSV配置创建color，值范围为0到1
     * @param hue HSV色调
     * @param saturation HSV饱和
     * @param value HSV亮度
     * @param alpha alpha透明度
     */
    public static FromHsv(hue: number, saturation: number, value: number, alpha: number = 1): Color {
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

    private static ParseCol8(str: string, ofs: number): number {
        let num = 0;
        for (let i = 0; i < 2; i++) {
            let num2 = str.charCodeAt(i + ofs);
            let num3: number;
            if (num2 >= 48 && num2 <= 57) {
                num3 = num2 - 48;
            } else if (num2 >= 97 && num2 <= 102) {
                num3 = num2 - 97;
                num3 += 10;
            } else {
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

    public static get aliceblue() {
        return new Color(0.94, 0.97, 1);
    }
    public static get antiquewhite() {
        return new Color(0.98, 0.92, 0.84);
    }
    public static get aqua() {
        return new Color(0, 1, 1);
    }
    public static get aquamarine() {
        return new Color(0.5, 1, 0.83);
    }
    public static get azure() {
        return new Color(0.94, 1, 1);
    }
    public static get beige() {
        return new Color(0.96, 0.96, 0.86);
    }
    public static get bisque() {
        return new Color(1, 0.89, 0.77);
    }
    public static get black() {
        return new Color(0, 0, 0);
    }
    public static get blanchedalmond() {
        return new Color(1, 0.92, 0.8);
    }
    public static get blue() {
        return new Color(0, 0, 1);
    }
    public static get blueviolet() {
        return new Color(0.54, 0.17, 0.89);
    }
    public static get brown() {
        return new Color(0.65, 0.16, 0.16);
    }
    public static get burlywood() {
        return new Color(0.87, 0.72, 0.53);
    }
    public static get cadetblue() {
        return new Color(0.37, 0.62, 0.63);
    }
    public static get chartreuse() {
        return new Color(0.5, 1, 0);
    }
    public static get chocolate() {
        return new Color(0.82, 0.41, 0.12);
    }
    public static get coral() {
        return new Color(1, 0.5, 0.31);
    }
    public static get cornflower() {
        return new Color(0.39, 0.58, 0.93);
    }
    public static get cornsilk() {
        return new Color(1, 0.97, 0.86);
    }
    public static get crimson() {
        return new Color(0.86, 0.08, 0.24);
    }
    public static get cyan() {
        return new Color(0, 1, 1);
    }
    public static get darkblue() {
        return new Color(0, 0, 0.55);
    }
    public static get darkcyan() {
        return new Color(0, 0.55, 0.55);
    }
    public static get darkgoldenrod() {
        return new Color(0.72, 0.53, 0.04);
    }
    public static get darkgray() {
        return new Color(0.66, 0.66, 0.66);
    }
    public static get darkgreen() {
        return new Color(0, 0.39, 0);
    }
    public static get darkkhaki() {
        return new Color(0.74, 0.72, 0.42);
    }
    public static get darkmagenta() {
        return new Color(0.55, 0, 0.55);
    }
    public static get darkolivegreen() {
        return new Color(0.33, 0.42, 0.18);
    }
    public static get darkorange() {
        return new Color(1, 0.55, 0);
    }
    public static get darkorchid() {
        return new Color(0.6, 0.2, 0.8);
    }
    public static get darkred() {
        return new Color(0.55, 0, 0);
    }
    public static get darksalmon() {
        return new Color(0.91, 0.59, 0.48);
    }
    public static get darkseagreen() {
        return new Color(0.56, 0.74, 0.56);
    }
    public static get darkslateblue() {
        return new Color(0.28, 0.24, 0.55);
    }
    public static get darkslategray() {
        return new Color(0.18, 0.31, 0.31);
    }
    public static get darkturquoise() {
        return new Color(0, 0.81, 0.82);
    }
    public static get darkviolet() {
        return new Color(0.58, 0, 0.83);
    }
    public static get deeppink() {
        return new Color(1, 0.08, 0.58);
    }
    public static get deepskyblue() {
        return new Color(0, 0.75, 1);
    }
    public static get dimgray() {
        return new Color(0.41, 0.41, 0.41);
    }
    public static get dodgerblue() {
        return new Color(0.12, 0.56, 1);
    }
    public static get firebrick() {
        return new Color(0.7, 0.13, 0.13);
    }
    public static get floralwhite() {
        return new Color(1, 0.98, 0.94);
    }
    public static get forestgreen() {
        return new Color(0.13, 0.55, 0.13);
    }
    public static get fuchsia() {
        return new Color(1, 0, 1);
    }
    public static get gainsboro() {
        return new Color(0.86, 0.86, 0.86);
    }
    public static get ghostwhite() {
        return new Color(0.97, 0.97, 1);
    }
    public static get gold() {
        return new Color(1, 0.84, 0);
    }
    public static get goldenrod() {
        return new Color(0.85, 0.65, 0.13);
    }
    public static get gray() {
        return new Color(0.75, 0.75, 0.75);
    }
    public static get green() {
        return new Color(0, 1, 0);
    }
    public static get greenyellow() {
        return new Color(0.68, 1, 0.18);
    }
    public static get honeydew() {
        return new Color(0.94, 1, 0.94);
    }
    public static get hotpink() {
        return new Color(1, 0.41, 0.71);
    }
    public static get indianred() {
        return new Color(0.8, 0.36, 0.36);
    }
    public static get indigo() {
        return new Color(0.29, 0, 0.51);
    }
    public static get ivory() {
        return new Color(1, 1, 0.94);
    }
    public static get khaki() {
        return new Color(0.94, 0.9, 0.55);
    }
    public static get lavender() {
        return new Color(0.9, 0.9, 0.98);
    }
    public static get lavenderblush() {
        return new Color(1, 0.94, 0.96);
    }
    public static get lawngreen() {
        return new Color(0.49, 0.99, 0);
    }
    public static get lemonchiffon() {
        return new Color(1, 0.98, 0.8);
    }
    public static get lightblue() {
        return new Color(0.68, 0.85, 0.9);
    }
    public static get lightcoral() {
        return new Color(0.94, 0.5, 0.5);
    }
    public static get lightcyan() {
        return new Color(0.88, 1, 1);
    }
    public static get lightgoldenrod() {
        return new Color(0.98, 0.98, 0.82);
    }
    public static get lightgray() {
        return new Color(0.83, 0.83, 0.83);
    }
    public static get lightgreen() {
        return new Color(0.56, 0.93, 0.56);
    }
    public static get lightpink() {
        return new Color(1, 0.71, 0.76);
    }
    public static get lightsalmon() {
        return new Color(1, 0.63, 0.48);
    }
    public static get lightseagreen() {
        return new Color(0.13, 0.7, 0.67);
    }
    public static get lightskyblue() {
        return new Color(0.53, 0.81, 0.98);
    }
    public static get lightslategray() {
        return new Color(0.47, 0.53, 0.6);
    }
    public static get lightsteelblue() {
        return new Color(0.69, 0.77, 0.87);
    }
    public static get lightyellow() {
        return new Color(1, 1, 0.88);
    }
    public static get lime() {
        return new Color(0, 1, 0);
    }
    public static get limegreen() {
        return new Color(0.2, 0.8, 0.2);
    }
    public static get linen() {
        return new Color(0.98, 0.94, 0.9);
    }
    public static get magenta() {
        return new Color(1, 0, 1);
    }
    public static get maroon() {
        return new Color(0.69, 0.19, 0.38);
    }
    public static get mediumaquamarine() {
        return new Color(0.4, 0.8, 0.67);
    }
    public static get mediumblue() {
        return new Color(0, 0, 0.8);
    }
    public static get mediumorchid() {
        return new Color(0.73, 0.33, 0.83);
    }
    public static get mediumpurple() {
        return new Color(0.58, 0.44, 0.86);
    }
    public static get mediumseagreen() {
        return new Color(0.24, 0.7, 0.44);
    }
    public static get mediumslateblue() {
        return new Color(0.48, 0.41, 0.93);
    }
    public static get mediumspringgreen() {
        return new Color(0, 0.98, 0.6);
    }
    public static get mediumturquoise() {
        return new Color(0.28, 0.82, 0.8);
    }
    public static get mediumvioletred() {
        return new Color(0.78, 0.08, 0.52);
    }
    public static get midnightblue() {
        return new Color(0.1, 0.1, 0.44);
    }
    public static get mintcream() {
        return new Color(0.96, 1, 0.98);
    }
    public static get mistyrose() {
        return new Color(1, 0.89, 0.88);
    }
    public static get moccasin() {
        return new Color(1, 0.89, 0.71);
    }
    public static get navajowhite() {
        return new Color(1, 0.87, 0.68);
    }
    public static get navyblue() {
        return new Color(0, 0, 0.5);
    }
    public static get oldlace() {
        return new Color(0.99, 0.96, 0.9);
    }
    public static get olive() {
        return new Color(0.5, 0.5, 0);
    }
    public static get olivedrab() {
        return new Color(0.42, 0.56, 0.14);
    }
    public static get orange() {
        return new Color(1, 0.65, 0);
    }
    public static get orangered() {
        return new Color(1, 0.27, 0);
    }
    public static get orchid() {
        return new Color(0.85, 0.44, 0.84);
    }
    public static get palegoldenrod() {
        return new Color(0.93, 0.91, 0.67);
    }
    public static get palegreen() {
        return new Color(0.6, 0.98, 0.6);
    }
    public static get paleturquoise() {
        return new Color(0.69, 0.93, 0.93);
    }
    public static get palevioletred() {
        return new Color(0.86, 0.44, 0.58);
    }
    public static get papayawhip() {
        return new Color(1, 0.94, 0.84);
    }
    public static get peachpuff() {
        return new Color(1, 0.85, 0.73);
    }
    public static get peru() {
        return new Color(0.8, 0.52, 0.25);
    }
    public static get pink() {
        return new Color(1, 0.75, 0.8);
    }
    public static get plum() {
        return new Color(0.87, 0.63, 0.87);
    }
    public static get powderblue() {
        return new Color(0.69, 0.88, 0.9);
    }
    public static get purple() {
        return new Color(0.63, 0.13, 0.94);
    }
    public static get rebeccapurple() {
        return new Color(0.4, 0.2, 0.6);
    }
    public static get red() {
        return new Color(1, 0, 0);
    }
    public static get rosybrown() {
        return new Color(0.74, 0.56, 0.56);
    }
    public static get royalblue() {
        return new Color(0.25, 0.41, 0.88);
    }
    public static get saddlebrown() {
        return new Color(0.55, 0.27, 0.07);
    }
    public static get salmon() {
        return new Color(0.98, 0.5, 0.45);
    }
    public static get sandybrown() {
        return new Color(0.96, 0.64, 0.38);
    }
    public static get seagreen() {
        return new Color(0.18, 0.55, 0.34);
    }
    public static get seashell() {
        return new Color(1, 0.96, 0.93);
    }
    public static get sienna() {
        return new Color(0.63, 0.32, 0.18);
    }
    public static get silver() {
        return new Color(0.75, 0.75, 0.75);
    }
    public static get skyblue() {
        return new Color(0.53, 0.81, 0.92);
    }
    public static get slateblue() {
        return new Color(0.42, 0.35, 0.8);
    }
    public static get slategray() {
        return new Color(0.44, 0.5, 0.56);
    }
    public static get snow() {
        return new Color(1, 0.98, 0.98);
    }
    public static get springgreen() {
        return new Color(0, 1, 0.5);
    }
    public static get steelblue() {
        return new Color(0.27, 0.51, 0.71);
    }
    public static get tan() {
        return new Color(0.82, 0.71, 0.55);
    }
    public static get teal() {
        return new Color(0, 0.5, 0.5);
    }
    public static get thistle() {
        return new Color(0.85, 0.75, 0.85);
    }
    public static get tomato() {
        return new Color(1, 0.39, 0.28);
    }
    public static get transparent() {
        return new Color(1, 1, 1, 0);
    }
    public static get turquoise() {
        return new Color(0.25, 0.88, 0.82);
    }
    public static get violet() {
        return new Color(0.93, 0.51, 0.93);
    }
    public static get webgreen() {
        return new Color(0, 0.5, 0);
    }
    public static get webgray() {
        return new Color(0.5, 0.5, 0.5);
    }
    public static get webmaroon() {
        return new Color(0.5, 0, 0);
    }
    public static get webpurple() {
        return new Color(0.5, 0, 0.5);
    }
    public static get wheat() {
        return new Color(0.96, 0.87, 0.7);
    }
    public static get white() {
        return new Color(1, 1, 1);
    }
    public static get whitesmoke() {
        return new Color(0.96, 0.96, 0.96);
    }
    public static get yellow() {
        return new Color(1, 1, 0);
    }
    public static get yellowgreen() {
        return new Color(0.6, 0.8, 0.2)
    }
}