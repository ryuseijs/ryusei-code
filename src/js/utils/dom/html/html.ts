import { isUndefined } from '../../type/type';


export function html( elm: Element ): string;
export function html( elm: Element, html: string ): void;

/**
 * Sets or gets HTML of the provided element.
 *
 * @param elm - A element to get or set HTML.
 * @param html - Optional. HTML to set.
 */
export function html( elm: Element, html?: string ): string | void {
  if ( elm ) {
    if ( isUndefined( html ) ) {
      return elm.innerHTML;
    }

    if ( elm.innerHTML !== html ) {
      elm.innerHTML = html;
    }
  }
}
