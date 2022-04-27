
declare interface Math {
    /** 圆常数,单位圆的周长,以弧度为单位 */
    readonly TAU: number;
    /** 正无穷数 */
    readonly INF: number;
    /** 负无穷数 */
    readonly NEG_INF: number;
    /** 表示无效值 */
    readonly NaN: number;
    /** 用于浮点数比较和容错,值为1E-06 */
    readonly EPSILON: number;
    /** 将笛卡尔坐标系坐标转为极坐标系坐标 */
    cartesian2Polar(x: number, y: number): Vector2;
    /** 将极坐标系坐标转为笛卡尔坐标系坐标 */
    polar2Cartesian(r: number, th: number): Vector2;
    /** 箝制一个值,使其不小于min且不大于max */
    clamp(value: number, min: number, max: number): number;
    /** 将角度制角度转为弧度制角度 */
    deg2Rad(deg: number): number;
    /** 将弧度制角度转为角度制角度 */
    rad2Deg(rad: number): number;
    /**
     * 返回 x “缓动后”的值，结果基于使用 curve 值定义的缓动函数。该缓动函数是基于指数的。curve 值可以是任意浮点数，具体数值会导致以下行为：
     * - 低于 -1.0（开区间）：缓入缓出
     * - -1.0：线性
     * - 在 -1.0 和 0.0 之间（开区间）：缓出缓入
     * - 0.0：恒定
     * - 在 0.0 到 1.0 之间（开区间）：缓出
     * - 1.0：线性
     * - 大于 1.0（开区间）：缓入
     */
    ease(s: number, curve: number): number;
    /**
     * 返回给定范围内的规范化值,它和`Math.inverseLerp()`是相反的
     * ```typescript
     * Math.lerp((20, 30, 0.75); //return 27.5;
     * ```
     */
    lerp(from: number, to: number, weight: number): number;
    /**
     * 返回给定范围内的规范化值,它和`Math.lerp()`是相反的
     * ```typescript
     * Math.inverseLerp(20, 30, 27.5); //return 0.75;
     * ```
     */
    inverseLerp(from: number, to: number, weight: number): number;
    /**
     * 将 from 向 to 移动,移动的长度是 delta
     */
    moveToward(from: number, to: number, delta: number): number;
    /**
     * 
     * 返回最接近且不小于整数 value 的 2 的幂.
     * 
     * 换句话说，返回最小值 a，其中 a = pow(2, n)，某些非负整数 n 使得值 value <= a.
     * ```typescript
     * Math.nearestPo2(3) // 返回 4
     * Math.nearestPo2(4) // 返回 4
     * Math.nearestPo2(5) // 返回 8
     * Math.nearestPo2(0) // 返回 0
     * Math.nearestPo2(-1) // 返回 0
     * ```
     */
    nearestPo2(value: number): number;
    /**
     * 返回 s 在 0 和 1 之间平滑插值的结果，基于 s 相对于边从 from 和到 to 的位置。
     * 
     * 如果 s <= from，返回值为 0；如果 s >= to，返回值为 1。如果 s 位于 from 和 to 之间，返回值遵循一个 S 型曲线，将 s 映射到 0 和 1 之间。
     * ```typescript
     * Math.smoothStep(0, 2, -5.0) // 返回 0.0
     * Math.smoothStep(0, 2, 0.5) // 返回 0.15625
     * Math.smoothStep(0, 2, 1.0) // 返回 0.5
     * Math.smoothStep(0, 2, 2.0) // 返回1.0
     * ```
     */
    smoothStep(from: number, to: number, s: number): number;
    /**
     * 如果 s 为零或几乎为零，则返回 true。
     */
    isZeroApprox(s: number): boolean;
    /**
     * 如果 a 和 b 彼此近似相等，则返回 true。
     */
    isEqualApprox(a: number, b: number): boolean;
    /**
     * 返回小数点后第一个非零数字的位置。注意最大返回值是 10，这是实现中的设计决定。
     * ```typescript
     * n = Math.stepDecimals(5)           // n = 0
     * n = Math.stepDecimals(1.0005)      // n = 4
     * n = Math.stepDecimals(0.000000005) // n = 9
     * ```
     */
    stepDecimals(step: number): number;
    /**
     * 将浮点值 s 按照给定的 step 对齐。也可以用于将浮点数四舍五入为任意的小数位数。
     * ```typescript
     * Math.stepify(100, 32) // 返回 96
     * Math.stepify(3.14159, 0.01) // 返回 3.14
     * ```
     */
    stepify(s: number, step: number): number;
    /**
     * 在 min 和 max 之间将 value 循环。
     * ```typescript
     * frame = Math.wrap(frame + 1, 5, 10) //在 5 和 9 之间无限循环
     * var result = Math.wrap(-6, -5, -1) //result 是 -2
     * ```
     */
    wrap(value: number, min: number, max: number): number;
    /**
     * 返回 a/b 的浮点模数
     */
    posMod(a: number, b: number): number;
}

Math = ((target: any) => {
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

    target.cartesian2Polar = (x: number, y: number) => {
        return new Vector2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
    }
    target.polar2Cartesian = (r: number, th: number) => {
        return new Vector2(r * Math.cos(th), r * Math.sin(th));
    }
    target.clamp = (value: number, min: number, max: number) => {
        return (value < min) ? min : ((value > max) ? max : value);
    }
    target.deg2Rad = (deg: number) => {
        return deg * (Math.PI / 180);
    }
    target.rad2Deg = (rad: number) => {
        return rad * 57.29578;
    }
    target.ease = (s: number, curve: number) => {
        if (s < 0) {
            s = 0;
        } else if (s > 1) {
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
    }
    target.lerp = (from: number, to: number, weight: number) => {
        return (weight - from) / (to - from);
    }
    target.inverseLerp = (from: number, to: number, weight: number) => {
        return from + (to - from) * weight;
    }
    target.moveToward = (from: number, to: number, delta: number) => {
        if (Math.abs(to - from) <= delta) {
            return to;
        }
        return from + Math.sign(to - from) * delta;
    }
    target.nearestPo2 = (value: number) => {
        value--;
        value |= value >> 1;
        value |= value >> 2;
        value |= value >> 4;
        value |= value >> 8;
        value |= value >> 16;
        value++;
        return value;
    }
    target.smoothStep = (from: number, to: number, s: number) => {
        if (Math.isEqualApprox(from, to)) {
            return from;
        }
        let num = Math.clamp((s - from) / (to - from), 0, 1);
        return num * num * (3 - 2 * num);
    }
    target.isEqualApprox = (a: number, b: number) => {
        if (a == b) {
            return true;
        }
        let num = 1E-06 * Math.abs(a);
        if (num < 1E-06) {
            num = 1E-06;
        }
        return Math.abs(a - b) < num;
    }
    target.stepDecimals = (step: number) => {
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
    }
    target.stepify = (s: number, step: number) => {
        if (step != 0) {
            return Math.floor(s / step + 0.5) * step;
        }
        return s;
    }
    target.isZeroApprox = (s: number) => {
        return Math.abs(s) < 1E-06;
    }
    target.wrap = (value: number, min: number, max: number) => {
        let num = max - min;
        if (Math.isZeroApprox(num)) {
            return min;
        }
        return min + ((value - min) % num + num) % num;
    }
    target.posMod = (a: number, b: number) => {
        let num = a % b;
        if ((num < 0 && b > 0) || (num > 0 && b < 0)) {
            num += b;
        }
        return num;
    }

    return target;
})(Math);