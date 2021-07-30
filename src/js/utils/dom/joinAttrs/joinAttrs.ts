import { forOwn } from '../../object';


/**
 * Joins the provided object as a single line for DOM attributes.
 *
 * @param attrs - An object literal for attributes.
 *
 * @return A single string containing all attributes.
 */
export function joinAttrs( attrs: Record<string, string | number | boolean> ): string {
  let result = '';

  forOwn( attrs, ( value, prop ) => {
    if ( prop && ( value || value === false || value === 0 ) ) {
      result += ` ${ prop }="${ value }"`;
    }
  } );

  return result.trim();
}
