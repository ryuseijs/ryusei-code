import { isFunction } from '../../type/type';


/**
 * Focuses the provided element without scrolling the ascendant element.
 *
 * @param elm - An element to focus.
 */
export function focus( elm: HTMLElement ): void {
  if ( isFunction( elm[ 'setActive' ] ) ) {
    elm[ 'setActive' ]();
  } else {
    elm.focus( { preventScroll: true } );
  }
}
