/**
 * Checks is the platform is Mac or not.
 *
 * @return `true` if the platform is Mac, or otherwise `false`.
 */
export function isMac(): boolean {
  return /Mac/i.test( navigator.platform );
}
