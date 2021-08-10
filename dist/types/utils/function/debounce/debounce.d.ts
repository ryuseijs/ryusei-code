import { AnyFunction } from '@ryusei/code';
import { Throttle } from '../throttle/throttle';
/**
 * Returns a debounced function that invokes the provided function only after the internal timer expires.
 * The timer is reset whenever the debounced function is called.
 *
 * @param func     - A callback function.
 * @param duration - Debounce duration in milliseconds.
 *
 * @return A debounced function.
 */
export declare function debounce<F extends AnyFunction = AnyFunction>(func: AnyFunction, duration: number): Throttle<F>;
//# sourceMappingURL=../../../../../src/js/utils/function/debounce/debounce.d.ts.map