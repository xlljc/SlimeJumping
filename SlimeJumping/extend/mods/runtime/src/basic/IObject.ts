
interface IObject extends IDestroy, IEquatable<IObject> {
    get index(): number;
    get name(): string;
}
