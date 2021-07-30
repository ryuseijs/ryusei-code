import { isString } from '../../type/type';


/**
 * Appends `px` to the value.
 * If the value is already string, just returns it.
 *
 * @param value - A value to append `px` to.
 */
export function unit( value: number | string ): string {
  return isString( value ) ? value : `${ value }px`;
}
