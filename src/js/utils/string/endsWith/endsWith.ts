/**
 * Checks if the string ends with the `search` string or not.
 *
 * @param string - A string to check.
 * @param search - A string to search.
 *
 * @return `true` if the string ends with the `search`, or otherwise `false`.
 */
export function endsWith( string: string, search: string ): boolean {
  return string.slice( - search.length ) === search;
}
