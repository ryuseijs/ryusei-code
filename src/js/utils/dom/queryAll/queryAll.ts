/**
 * Returns elements that match the provided selector.
 *
 * @param parent   - A parent element to start searching from.
 * @param selector - A selector to query.
 *
 * @return The NodeList object that contains matched elements.
 */
export function queryAll<E extends Element = Element>( parent: Element | Document, selector: string ): NodeListOf<E> {
  return parent.querySelectorAll( selector );
}
