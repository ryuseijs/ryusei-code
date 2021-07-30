/**
 * Counts the search string occurrence in the provided sting.
 *
 * @param string - A string to search in.
 * @param search - A string to search for.
 * @param from   - An index to search from.
 * @param to     - An index to search to.
 *
 * @return A number of occurrence.
 */
export function count( string: string, search: string, from = 0, to = string.length ): number {
  if ( from || to !== string.length ) {
    string = string.slice( from, to );
  }

  return ( string.match( new RegExp( search, 'g' ) ) || [] ).length;
}
