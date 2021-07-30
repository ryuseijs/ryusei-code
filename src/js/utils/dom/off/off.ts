import { isFunction } from '../../type/type';
import { handlerMap } from '../on/on';


export function off<K extends keyof WindowEventMap>(
  elm: Window,
  events: K,
  callbackOrKey: object | ( ( e: Event ) => void )
): void;

export function off<K extends keyof DocumentEventMap>(
  elm: Document,
  events: K,
  callbackOrKey: object | ( ( e: Event ) => void )
): void;

export function off<K extends keyof HTMLElementEventMap>(
  elm: HTMLElement,
  events: K,
  callbackOrKey: object | ( ( e: Event ) => void )
): void;

export function off<K extends keyof SVGElementEventMap>(
  elm: SVGElement,
  events: K,
  callbackOrKey: object | ( ( e: Event ) => void )
): void;

export function off<K extends keyof ElementEventMap>(
  elm: Element,
  events: K,
  callbackOrKey: object | ( ( e: Event ) => void )
): void;

export function off<T extends Event = Event>(
  elm: Window | Document | Element,
  events: string,
  callbackOrKey: object | ( ( e: T ) => void )
): void;


/**
 * Detaches a handler from the event or events.
 *
 * @param elm           - An element where events are removed.
 * @param events        - Optional. An event name or names.
 * @param callbackOrKey - Optional. A handler to remove or an object key.
 */
export function off(
  elm: Window | Document | Element,
  events: string,
  callbackOrKey: object | ( ( e: Event ) => void )
): void {
  if ( isFunction( callbackOrKey ) ) {
    events.split( ' ' ).forEach( event => {
      elm.removeEventListener( event, callbackOrKey );
    } );
  } else {
    const handlers = handlerMap.get( callbackOrKey );

    if ( handlers ) {
      handlers.forEach( handler => {
        off( handler.elm, handler.events, handler.callback );
      } );

      handlerMap.delete( callbackOrKey );
    }
  }
}
