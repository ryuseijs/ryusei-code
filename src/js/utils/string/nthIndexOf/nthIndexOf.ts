/**
 * Returns the index within the provided string of the nth occurrence.
 * The optional `from` index determines the start position to search the target from.
 *
 * @param string - A string to search in.
 * @param search - A string to search startsWith
 * @param nth    - A number of the occurrence.
 * @param from   - Optional. A start index to search from.
 *
 * @return An index if the nth occurrence of the `search` string is found, or `-1` if not.
 */
export function nthIndexOf( string: string, search: string, nth: number, from = 0 ): number {
  let index = from - 1;
  let count = nth;

  while( ( index !== -1 || nth === count ) && count-- ) {
    index = string.indexOf( search, index + 1 );
  }

  return index;
}
