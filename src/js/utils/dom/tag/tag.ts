import { toArray } from '../../array';
import { assign } from '../../object';
import { joinAttrs } from '../joinAttrs/joinAttrs';


/**
 * Returns an open tag with provided classes.
 *
 * @param classes - Classes.
 * @param attrs   - Optional. An object with attributes.
 * @param tag     - Optional. A tag name.
 */
export function tag(
  classes: string | string[],
  attrs: Record<string, string | number | boolean> = {},
  tag?: string
): string {
  return `<${ tag || 'div' } ${ joinAttrs( assign( attrs, {
    class: toArray( classes ).filter( Boolean ).join( ' ' ),
  } ) ) }>`;
}
