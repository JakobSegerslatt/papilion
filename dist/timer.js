"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A more accurate timer than setInterval.
 * Requires a callback but works as a class instead of
 * a function, and provides functions for start and stop.
 *
 * The timer works with setTimer instead of setInterval,
 * safechecking the amount of time that SHOULD have passed since the start
 * of the timer and takes that difference into account for setTimer.
 * That means that you can be sure that with an input of 1000ms,
 * after 10 minutes the callback function has been called 600 times.
 * @example
 * myTimer = new Timer(() => console.log('One seconds passed!', 1000));
 * myTimer.stop();
 */
class Timer {
    constructor(callback, duration = 1000) {
        this.duration = duration;
        this.reset();
        this.start(callback);
    }
    /**
     * Resets the start time and the ticks of the timer
     * (used for safechecking the timing accuracy),
     * making it ready for another start().
     */
    reset() {
        this.startTime = Date.now();
        this.totalTicks = 0;
    }
    /**
     * Starts the timer, invoking the callback
     * @param callback The callback to invoke
     */
    start(callback) {
        /** Current time, used to calculate the difference from the startTime times totalTicks */
        const currentTime = Date.now();
        if (!this.startTime) {
            this.startTime = currentTime;
        }
        if (typeof callback === 'function') {
            callback();
        }
        /**
         * Calculate how many ms to wait before calling this function again
         * E.g. take the duration provided (default: 1000) minus the difference
         * Difference is calulated by taking the amount of time that should have passed,
         * e.g. total ticks * duration, plus the starttime (to recive were we should be now)
         */
        const totalTimePassed = this.totalTicks * this.duration;
        const nextTick = this.duration - (currentTime - (this.startTime + totalTimePassed));
        this.totalTicks++;
        this.timerId = setTimeout(() => {
            this.start(callback);
        }, nextTick);
    }
    /** Stops the timer by clearing the current timerId for the setTimer */
    stop() {
        clearTimeout(this.timerId);
    }
}
exports.Timer = Timer;
//# sourceMappingURL=timer.js.map