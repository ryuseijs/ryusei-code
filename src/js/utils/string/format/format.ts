/**
 * Formats a string.
 *
 * @param string       - A string to format.
 * @param replacements - A replacement or replacements.
 *
 * @return A formatted string.
 */
export function format( string: string, ...replacements: Array<string | number> ): string {
  for ( let i = 0; i < replacements.length; i++ ) {
    string = string.replace( '%s', String( replacements[ i ] ) );
  }

  return string;
}
