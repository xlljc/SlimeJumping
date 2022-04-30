interface Console {
    error(...data: Object[]): void;
    info(...data: Object[]): void;
    log(...data: Object[]): void;
    warn(...data: Object[]): void;
}
declare var console: Console;