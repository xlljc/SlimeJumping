
namespace Runtime {
    /**
     * 二维向量
     */
    export class Vector2 implements IEquatable<Vector2> {

        /** x坐标 */
        public x: number = 0;
        /** y坐标 */
        public y: number = 0;

        /**
         * 创建一个Vector对象,参数为 Vector
         */
        constructor()
        constructor(vector: Vector2)
        constructor(x: number, y: number)
        constructor(...args: any[]) {
            if (args.length == 0) {
                let v = args[0] as Vector2;
                this.x = v.x;
                this.y = v.y;
            } else if (args.length > 1) {
                this.x = args[0];
                this.y = args[1];
            }
        }

        /** 向量值为(0,0) */
        public static get zero(): Vector2 {
            return new Vector2(0, 0);
        }

        /** 向量值为(1,0) */
        public static get right(): Vector2 {
            return new Vector2(1, 0);
        }

        /** 向量值为(-1,0) */
        public static get left(): Vector2 {
            return new Vector2(-1, 0);
        }

        /** 向量值为(0,-1) */
        public static get up(): Vector2 {
            return new Vector2(0, -1);
        }

        /** 向量值为(0,1) */
        public static get down(): Vector2 {
            return new Vector2(0, 1);
        }

        /** 向量值为(1,1) */
        public static get one(): Vector2 {
            return new Vector2(1, 1);
        }

        /** 向量值为(-1,-1) */
        public static get negOne(): Vector2 {
            return new Vector2(-1, -1);
        }

        /** 获取向量长度 */
        public get length(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        /** 获取向量角度(弧度制),返回向量相对于X轴的弧度角,即(1,0)向量 */
        public get angle(): number {
            return Math.atan2(this.y, this.x);
        }

        /** 向量相加 */
        public add(vector: Vector2): Vector2;
        public add(num: number): Vector2;
        public add(val: Vector2 | number): Vector2 {
            if (typeof val === "number")
                return new Vector2(this.x + val, this.y + val);
            return new Vector2(this.x + val.x, this.y + val.y);
        }

        /** 向量相减 */
        public reduce(vector: Vector2): Vector2;
        public reduce(num: number): Vector2;
        public reduce(val: Vector2 | number): Vector2 {
            if (typeof val === "number")
                return new Vector2(this.x - val, this.y - val);
            return new Vector2(this.x - val.x, this.y - val.y);
        }

        /** 向量相乘 */
        public multiply(vector: Vector2): Vector2;
        public multiply(num: number): Vector2;
        public multiply(val: Vector2 | number): Vector2 {
            if (typeof val === "number")
                return new Vector2(this.x * val, this.y * val);
            return new Vector2(this.x * val.x, this.y * val.y);
        }

        /** 向量相除 */
        public divide(vector: Vector2): Vector2;
        public divide(num: number): Vector2;
        public divide(val: Vector2 | number): Vector2 {
            if (typeof val === "number")
                return new Vector2(this.x / val, this.y / val);
            return new Vector2(this.x / val.x, this.y / val.y);
        }

        /** 向量取模 */
        public mod(vector: Vector2): Vector2;
        public mod(num: number): Vector2;
        public mod(val: Vector2 | number): Vector2 {
            if (typeof val === "number")
                return new Vector2(this.x % val, this.y % val);
            return new Vector2(this.x % val.x, this.y % val.y);
        }

        /** 向量整除 */
        public div(vector: Vector2): Vector2;
        public div(num: number): Vector2;
        public div(val: Vector2 | number): Vector2 {
            if (typeof val === "number")
                return new Vector2((this.x / val) | 0, (this.y / val) | 0);
            return new Vector2((this.x / val.x) | 0, (this.y / val.y) | 0);
        }

        /** 返回与vector的点积 */
        public dot(vector: Vector2): number {
            return this.x * vector.x + this.y + vector.y;
        }

        /** 返回与vector的叉积 */
        public cross(vector: Vector2): number {
            return this.x * vector.x + this.y + vector.y;
        }

        /** 向量归一化,返回缩放到单位长度的向量,归一化的向量不能为(0,0) */
        public normalization(): Vector2 {
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
        public angleTo(vector: Vector2): number {
            return Math.atan2(this.cross(vector), this.dot(vector));
        }

        /** 返回连接两个点的线和X坐标之间的弧度角. */
        public angleToPoint(vector: Vector2): number {
            return Math.atan2(this.y - vector.y, this.x - vector.x);
        }

        /** 根据角度旋转向量 */
        public rotated(angle: number): Vector2 {
            let s = this.angle + angle;
            return new Vector2(Math.cos(s), Math.sin(s)).multiply(this.length);
        }

        /** 返回绝对值向量 */
        public abs(): Vector2 {
            return new Vector2(Math.abs(this.x), Math.abs(this.y));
        }

        /** 返回向量,其中所有分量都向下取整*/
        public floor(): Vector2 {
            return new Vector2(Math.floor(this.x), Math.floor(this.y));
        }

        /** 返回向量,其中所有分量都向上取整*/
        public ceil(): Vector2 {
            return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
        }

        /** 返回向量,其中所有分量都四舍五入到最接近的整数 */
        public round(): Vector2 {
            return new Vector2(Math.round(this.x), Math.round(this.y));
        }

        /** 返回向量,其中每个分量设置为一个或一个负数,具体取决于分量的符号 */
        public sign(): Vector2 {
            return new Vector2(this.x == 0 ? 0 : (this.x < 0 ? -1 : 1), this.y == 0 ? 0 : (this.y < 0 ? -1 : 1));
        }

        /** 返回到vector向量的距离 */
        public distanceTo(vector: Vector2): number {
            return Math.sqrt((this.x - vector.x) * (this.x - vector.x) + (this.y - vector.y) * (this.y - vector.y));
        }

        /** 返回一个角度相同,长度为length的向量 */
        public clamped(length: number): Vector2 {
            let vector = new Vector2(this);
            let num = this.length;
            if (num > 0 && length < num)
                vector = vector.divide(num * length);
            return vector;
        }

        /** 将向量朝vector移动固定的delta数量 */
        public moveToward(vector: Vector2, delta: number): Vector2 {
            let self = new Vector2(this);
            let other = vector.reduce(self);
            let num = other.length;
            return num <= delta || num < 9.99999997475243E-07 ? vector : self.add(other.divide(num).multiply(delta));
        }

        /** 比较两个向量值是否相等 */
        public equals(vector: Vector2): boolean {
            return vector && this.x === vector.x && this.y === vector.y;
        }

        /** 转换为字符串 */
        public toString(): string {
            return "{x: " + this.x + ", y: " + this.y + "}";
        }
    }
}
