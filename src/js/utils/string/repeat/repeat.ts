import { floor } from '../../math';


/**
 * Returns a new string filled with a number of copies of the provided string.
 *
 * @param string - A string to repeat.
 * @param count  - An integer for determining the number of repeats.
 *
 * @return A new string containing copies of the provided string.
 */
export function repeat( string: string, count: number ): string {
  if ( ! String.prototype.repeat ) {
    let result = '';

    while ( count > 0 ) {
      if ( count % 2 ) {
        result += string;
      }

      count = floor( count / 2 );
      string += string;
    }

    return result;
  }

  return string.repeat( count );
}
