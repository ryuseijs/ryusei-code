/**
 * Checks if the client is iOS or not.
 *
 * @return `true` if the client is iOS, or otherwise `false`.
 */
export function isIOS(): boolean {
  const { userAgent } = navigator;
  return /iPad|iPhone|iPod/.test( userAgent )
    || ( userAgent.indexOf( 'Mac' ) > -1 && navigator.maxTouchPoints > 1 );
}
