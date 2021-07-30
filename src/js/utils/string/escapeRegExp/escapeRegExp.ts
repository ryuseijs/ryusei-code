/**
 * Escapes string for the RegExp source.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 *
 * @param string - A string to escape.
 */
export function escapeRegExp( string: string ): string {
  return string.replace( /[.*+\-?^${}()|[\]\\]/g, '\\$&' );
}
