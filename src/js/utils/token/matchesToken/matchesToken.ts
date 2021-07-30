import { Token, TokenMatcher } from '@ryusei/code';
import { isUndefined } from '../../type/type';


/**
 * Checks if the token matches the provided matcher or not.
 *
 * @param token   - A token to test.
 * @param matcher - An array described as a TokenMatcher tuple.
 */
export function matchesToken( token: Token, matcher: TokenMatcher ): boolean {
  if ( token && token[ 0 ] === matcher[ 0 ] && ( ! matcher[ 1 ] || matcher[ 1 ].test( token[ 1 ] ) ) ) {
    return isUndefined( matcher[ 2 ] ) || token[ 2 ].state === matcher[ 2 ];
  }

  return false;
}
