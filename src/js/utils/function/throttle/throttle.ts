import { AnyFunction } from '@ryusei/code';
import { isUndefined } from '../../type/type';


/**
 * The interface for a throttled function.
 *
 * @since 0.1.0
 */
export interface Throttle<F extends AnyFunction = AnyFunction> extends Function {
  ( ...args: Parameters<F> ): void,

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
export function throttle<F extends AnyFunction = AnyFunction>(
  func: F,
  interval: number,
  initialCall?: boolean,
  debounce?: boolean,
  raf?: boolean
): Throttle<F> {
  let id: any;
  let invoker: () => void;

  function throttled( this: ThisParameterType<F>, ...args: Parameters<F> ): void {
    if ( debounce ) {
      cancel();
    }

    invoker = invoke.bind( this, ...args );

    if ( ! id ) {
      if ( isUndefined( id ) && initialCall ) {
        invoker();
      } else {
        id = raf ? requestAnimationFrame( invoker ) : setTimeout( invoker, interval );
      }
    }
  }

  function invoke( this: ThisParameterType<F>, ...args: Parameters<F> ): void {
    func.apply( this, args );
    cancel();
  }

  function cancel(): void {
    raf ? cancelAnimationFrame( id ) : clearTimeout( id );
    id = null;
  }

  throttled.cancel = cancel;

  throttled.invoke = () => {
    if ( id ) {
      invoker();
    }
  };

  return throttled;
}
