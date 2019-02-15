
export class Timer {
    private timerId: NodeJS.Timeout;

    private totalTicks: number;

    private startTime: number;
    private currentTime: number;

    private duration: number;

    constructor(callback: any, duration: number = 1000) {
        this.duration = duration;
        this.reset();
        this.run(callback);
    }

    public reset(): void {
        this.startTime = Date.now();
        this.totalTicks = 0;
    }

    public run(callback: any): void {
        this.currentTime = Date.now();
        if (!this.startTime) {
            this.startTime = this.currentTime;
        }

        if (callback) {
            callback();
        }

        /**
         * Calculate how many ms to wait before calling this function again
         * E.g. take the duration provided (default: 1000) minus the difference
         * Difference is calulated by taking the amount of time that should have passed,
         * e.g. total ticks * duration, plus the starttime (to recive were we should be now)
         */
        const totalTimePassed = this.totalTicks * this.duration;
        const nextTick = this.duration - (this.currentTime - (this.startTime + totalTimePassed));
        this.totalTicks++;

        const timer = setTimeout(() => {
            this.run(callback);
        }, nextTick);
    }

    public stop(): void {
        clearTimeout(this.timerId);
    }
}
