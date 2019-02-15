export declare class Timer {
    private timerId;
    private totalTicks;
    private startTime;
    private currentTime;
    private duration;
    constructor(callback: any, duration?: number);
    reset(): void;
    run(callback: any): void;
    stop(): void;
}
