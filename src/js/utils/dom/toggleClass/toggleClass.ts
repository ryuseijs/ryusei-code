import { toArray } from '../../array';


/**
 * Toggles the provided class or classes by following the `add` boolean.
 *
 * @param elm     - An element whose classes are toggled.
 * @param classes - A class or class names.
 * @param add     - Whether to add or remove a class.
 */
export function toggleClass( elm: Element, classes: string | string[], add: boolean ): void {
  if ( elm ) {
    toArray( classes ).forEach( name => {
      if ( name ) {
        elm.classList[ add ? 'add' : 'remove' ]( name );
      }
    } );
  }
}
