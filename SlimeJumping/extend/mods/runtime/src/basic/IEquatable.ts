
namespace Runtime {

    export interface IEquatable<T> {
        /**
         * 比较当前对象是否与指定对象属性相同
         * @param other 目标对象
         */
        equals(other: T): boolean;
    }
}