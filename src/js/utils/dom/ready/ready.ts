/**
 * Invokes the callback when the DOM content is loaded,
 * or immediately if it is already available.
 *
 * @param callback - A callback to invoke.
 */
export function ready( callback: () => void ): void {
  if ( document.readyState !== 'loading' ) {
    callback();
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
}
