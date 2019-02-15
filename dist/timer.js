"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    constructor(callback, duration = 1000) {
        this.duration = duration;
        this.reset();
        this.run(callback);
    }
    reset() {
        this.startTime = Date.now();
        this.totalTicks = 0;
    }
    run(callback) {
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
    stop() {
        clearTimeout(this.timerId);
    }
}
exports.Timer = Timer;
