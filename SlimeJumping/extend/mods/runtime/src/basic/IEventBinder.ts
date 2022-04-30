
interface IEventBinder<EMAP> {
    get target(): IEvent<EMAP>
    get eventName(): string;
    removeListener(): boolean;
}