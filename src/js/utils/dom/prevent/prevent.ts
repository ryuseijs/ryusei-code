/**
 * Call the `preventDefault()` of the provided event.
 *
 * @param e               - An Event object.
 * @param stopPropagation - Optional. Whether to stop the event propergation or not.
 */
export function prevent( e: Event, stopPropagation?: boolean ): void {
  if ( e ) {
    if ( e.cancelable ) {
      e.preventDefault();
    }

    if ( stopPropagation ) {
      e.stopPropagation();
    }
  }
}
