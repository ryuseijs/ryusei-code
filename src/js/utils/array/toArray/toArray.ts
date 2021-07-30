import { isArray } from '../../type/type';


export function toArray<T>( value: T | T[], nest: true ): T extends any[] ? T[] : T[][];
export function toArray<T>( value: T | T[] ): T[];

/**
 * Push the provided value to an array if the value is not an array.
 *
 * @param value - A value to push.
 * @param nest  - Optional. Whether to push the value to an array if the value is already an array.
 *
 * @return An array containing the value, or the value itself if it is already an array.
 *         If the `nest` is `true` and the first child of the array is not an array,
 *         this returns an array with the provided array.
 */
export function toArray<T>( value: T | T[], nest = false ): T[] | T[][] {
  if ( isArray( value ) ) {
    if ( nest && ! isArray( value[ 0 ] ) ) {
      return [ value ];
    }

    return value;
  }

  return [ value ];
}
