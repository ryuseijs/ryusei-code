import { AnyFunction } from '@ryusei/code';
import { Throttle } from '../throttle/throttle';
/**
 * Implements the `throttle` function via requestAnimationFrame.
 *
 * @param func - A function to throttle.
 * @param initialCall - Optional. Determines whether to call the function initially.
 *
 * @return A throttled function.
 */
export declare function rafThrottle<F extends AnyFunction = AnyFunction>(func: F, initialCall?: boolean): Throttle<F>;
//# sourceMappingURL=../../../../../src/js/utils/function/rafThrottle/rafThrottle.d.ts.map