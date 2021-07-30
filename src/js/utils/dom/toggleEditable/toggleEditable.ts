/**
 * Sets the `contentEditable` attribute of the provided element.
 *
 * @param elm      - An element.
 * @param editable - Whether to set the value to `true` or `false`.
 */
export function toggleEditable( elm: HTMLElement, editable: boolean ): void {
  elm.contentEditable = editable ? 'true' : 'false';
}
