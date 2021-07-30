/**
 * Checks is the browser is based on the Gecko engine or not.
 *
 * @return `true` if the browser is the browser is based on the Gecko (Firefox), or otherwise `false`.
 */
export function isGecko(): boolean {
  return !! window[ 'InstallTrigger' ];
}
