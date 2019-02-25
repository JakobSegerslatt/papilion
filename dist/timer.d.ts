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
export declare class Timer {
    /** Id returned by setTimer, used to stop the timer */
    private timerId;
    /** The amount of ticks/callbacks that has been invoked for the current instance */
    private totalTicks;
    /** Starttime of when the timer starts, used for the accuracy calculation */
    private startTime;
    /** Interval duration in ms, defaults to 1000 */
    private duration;
    constructor(callback: any, duration?: number);
    /**
     * Resets the start time and the ticks of the timer
     * (used for safechecking the timing accuracy),
     * making it ready for another start().
     */
    reset(): void;
    /**
     * Starts the timer, invoking the callback
     * @param callback The callback to invoke
     */
    start(callback: any): void;
    /** Stops the timer by clearing the current timerId for the setTimer */
    stop(): void;
}
