/**
 * Returns a DOMRect object of the provided element or the selection range.
 *
 * @param target - An element or a range instance.
 */
export function rect( target: Element | Range ): DOMRect {
  return target.getBoundingClientRect();
}
