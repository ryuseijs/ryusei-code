import { AnyFunction } from '@ryusei/code';
/**
 * The interface for a throttled function.
 *
 * @since 0.1.0
 */
export interface Throttle<F extends AnyFunction = AnyFunction> extends Function {
    (...args: Parameters<F>): void;
    /**
     * Cancels the active timer.
     */
    cancel: () => void;
    /**
     * Invokes the pending process immediately.
     */
    invoke: () => void;
}
/**
 * Returns a function that invokes the provided function at most once in the specified duration.
 *
 * @since 0.1.0
 *
 * @param func        - A function to throttle.
 * @param interval    - A throttle duration in milliseconds.
 * @param initialCall - Optional. Determines whether to call the function initially.
 * @param debounce    - Optional. If `true`, the function returns a debounced function instead of throttled one.
 * @param raf         - Optional. Determines whether to use the `requestAnimationFrame` or not.
 *
 * @return A throttled function.
 */
export declare function throttle<F extends AnyFunction = AnyFunction>(func: F, interval: number, initialCall?: boolean, debounce?: boolean, raf?: boolean): Throttle<F>;
//# sourceMappingURL=../../../../../src/js/utils/function/throttle/throttle.d.ts.map