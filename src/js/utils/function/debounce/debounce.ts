import { AnyFunction } from '@ryusei/code';
import { Throttle, throttle } from '../throttle/throttle';


/**
 * Returns a debounced function that invokes the provided function only after the internal timer expires.
 * The timer is reset whenever the debounced function is called.
 *
 * @param func     - A callback function.
 * @param duration - Debounce duration in milliseconds.
 *
 * @return A debounced function.
 */
export function debounce<F extends AnyFunction = AnyFunction>( func: AnyFunction, duration: number ): Throttle<F> {
  return throttle( func, duration, false, true );
}
