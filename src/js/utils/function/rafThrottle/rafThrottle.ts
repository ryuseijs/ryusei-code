import { AnyFunction } from '@ryusei/code';
import { Throttle, throttle } from '../throttle/throttle';


/**
 * Implements the `throttle` function via requestAnimationFrame.
 *
 * @param func - A function to throttle.
 * @param initialCall - Optional. Determines whether to call the function initially.
 *
 * @return A throttled function.
 */
export function rafThrottle<F extends AnyFunction = AnyFunction>(
  func: F,
  initialCall?: boolean
): Throttle<F> {
  return throttle( func, 0, initialCall, false, true );
}
