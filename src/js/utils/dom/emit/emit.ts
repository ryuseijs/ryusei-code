import { isFunction } from '../../type/type';


/**
 * Dispatches a custom event to the provided element, window or document.
 *
 * @param elm   - A target element where a custom event is triggered.
 * @param event - An event name.
 */
export function emit( elm: Element | Window | Document, event: string ): void {
  let e: CustomEvent;

  if ( isFunction( window.CustomEvent ) ) {
    e = new CustomEvent( event, { bubbles: true, cancelable: true } );
  } else {
    // IE doesn't support a CustomEvent constructor.
    e = document.createEvent( 'CustomEvent' );
    e.initCustomEvent( event, true, true, null );
  }

  elm.dispatchEvent( e );
}
