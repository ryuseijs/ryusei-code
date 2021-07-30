import { isFunction } from '../../type/type';
import { matches } from '../matches/matches';


/**
 * With starting at the given element,
 * finds the closest parent element that matches the selector.
 *
 * @since 0.1.0
 *
 * @param elm      - A start element.
 * @param selector - A selector to search for.
 *
 * @return The closest element if found, or `null` if not.
 *
 * @throws TypeError
 */
export function closest( elm: HTMLElement, selector: string ): HTMLElement | null {
  if ( isFunction( elm.closest ) ) {
    return elm.closest( selector );
  }

  while ( elm ) {
    if ( matches( elm, selector ) ) {
      return elm;
    }

    elm = elm.parentElement;
  }

  return null;
}
