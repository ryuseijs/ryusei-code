import { isAndroid } from '../isAndroid/isAndroid';
import { isIOS } from '../isIOS/isIOS';


/**
 * Checks if the device is likely mobile or not.
 *
 * @return `true` if the device is likely mobile, or otherwise `false`.
 */
export function isMobile(): boolean {
  return isAndroid() || isIOS();
}
