import { AnyFunction } from '@ryusei/code';


/**
 * Fires the provided function on the next tick.
 *
 * @param func - A function to call.
 */
export function nextTick( func: AnyFunction ): void {
  setTimeout( func );
}
