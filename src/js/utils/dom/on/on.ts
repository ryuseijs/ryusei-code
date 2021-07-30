/**
 * Stores registered handlers which has a key.
 *
 * @since 0.1.0
 */
export const handlerMap = new WeakMap<object, Array<{
  elm: Document | Window | Element,
  events: string,
  callback: ( e: Event ) => void
}>>();

export function on<K extends keyof DocumentEventMap>(
  elm: Document,
  events: K,
  callback: ( e: DocumentEventMap[ K ] ) => void,
  key?: object
): void;

export function on<K extends keyof WindowEventMap>(
  elm: Window,
  events: K,
  callback: ( e: WindowEventMap[ K ] ) => void,
  key?: object
): void;

export function on<K extends keyof HTMLElementEventMap>(
  elm: HTMLElement,
  events: K,
  callback: ( e: HTMLElementEventMap[ K ] ) => void,
  key?: object
): void;

export function on<K extends keyof ElementEventMap>(
  elm: Element,
  events: K,
  callback: ( e: ElementEventMap[ K ] ) => void,
  key?: object
): void;

export function on<T extends Event = Event>(
  elm: Window | Document | Element,
  events: string,
  callback: ( e: T ) => void,
  key?: object
): void;

/**
 * Attaches a handler to the event.
 *
 * @param elm      - An element, a window or a document.
 * @param events   - An event name or names.
 * @param callback - A handler to attach.
 * @param key      - Optional. The key for identifying the registered handler.
 */
export function on(
  elm: Element | Window | Document,
  events: string,
  callback: ( e: Event ) => void,
  key?: object
): void {
  events.split( ' ' ).forEach( event => {
    elm.addEventListener( event, callback );

    if ( key ) {
      const handlers = handlerMap.get( key ) || [];
      handlers.push( { elm, events, callback } );
      handlerMap.set( key, handlers );
    }
  } );
}
