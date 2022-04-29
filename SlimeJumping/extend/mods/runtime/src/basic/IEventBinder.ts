
interface IEventBinder<EMAP> {
    readonly target: IEvent<EMAP>
    readonly eventName: string;
    removeListener(): boolean;
}