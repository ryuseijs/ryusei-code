import { create } from '../create/create';


/**
 * The `create` function whose tag argument is fixed to `div`.
 *
 * @param attrs  - Optional. An object with attributes to apply the created element to, or a string with classes.
 * @param parent - Optional. A parent element where the created element is appended.
 */
export function div(
  attrs?: Record<string, string | number | boolean> | string | string[],
  parent?: HTMLElement
): HTMLDivElement {
  return create( 'div', attrs, parent );
}
