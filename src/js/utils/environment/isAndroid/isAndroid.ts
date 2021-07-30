/**
 * Checks if the client is Android or not.
 *
 * @return `true` if the client is Android, or otherwise `false`.
 */
export function isAndroid(): boolean {
  return /android/i.test( navigator.userAgent );
}
