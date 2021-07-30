/**
 * Checks if the string starts with the `search` string or not.
 *
 * @param string - A string to check.
 * @param search - A string to search.
 *
 * @return `true` if the string starts with the `search`, or otherwise `false`.
 */
export function startsWith( string: string, search: string ): boolean {
  return string.slice( 0, search.length ) === search;
}
