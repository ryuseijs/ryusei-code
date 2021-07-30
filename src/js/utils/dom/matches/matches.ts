/**
 * Extends the HTMLElement interface for IE.
 *
 * @private
 * @since 0.1.0
 */
interface HTMLElementIE extends HTMLElement {
  msMatchesSelector( selector: string ): boolean;
}

/**
 * Checks if the element matches the provided selector, or passes the predicate function.
 *
 * @since 0.1.0
 *
 * @param elm      - An element to test.
 * @param selector - A selector string to match.
 *
 * @return `true` if the element matches the selector.
 */
export function matches( elm: Element, selector: string ): boolean {
  Element.prototype.matches = Element.prototype.matches || ( Element.prototype as HTMLElementIE ).msMatchesSelector;
  return elm.matches( selector );
}
