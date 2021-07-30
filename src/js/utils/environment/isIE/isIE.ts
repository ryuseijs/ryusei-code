/**
 * Checks is the browser is IE or not.
 *
 * @return `true` if the browser is IE, or otherwise `false`.
 */
export function isIE(): boolean {
  return /*@cc_on!@*/false || !! document[ 'documentMode' ];
}
