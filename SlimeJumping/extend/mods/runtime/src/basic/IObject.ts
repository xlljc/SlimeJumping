
interface IObject extends IDestroy, IEquatable<IObject>, IClone<IObject> {
    get name(): string;
    set name(n: string);
}
