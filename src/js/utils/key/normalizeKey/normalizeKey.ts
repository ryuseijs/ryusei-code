import { NORMALIZATION_MAP } from '../../../constants/keys';


/**
 * Normalizes the provided key for different browsers.
 *
 * @param key - A key to normalize.
 */
export function normalizeKey( key: string ): string {
  return NORMALIZATION_MAP[ key ] || key;
}
