import { KeyMatcher } from '@ryusei/code';
import { toArray } from '../../array';
import { normalizeKey } from '../normalizeKey/normalizeKey';


/**
 * Checks if the keyboard event matches the provided matcher or not.
 *
 * @param e        - A KeyboardEvent object.
 * @param matchers - A KeyMatcher tuple or an array with matchers.
 *
 * @return `true` if the keyboard event satisfies the matcher, or otherwise `false`.
 */
export function matchesKey( e: KeyboardEvent, matchers: KeyMatcher | KeyMatcher[] | null | false ): boolean {
  const key = normalizeKey( e.key ).toUpperCase();

  return matchers && toArray( matchers, true ).some( matcher => {
    return key === matcher[ 0 ].toUpperCase()
      && ! matcher[ 1 ] === ! e.ctrlKey
      && ! matcher[ 2 ] === ! e.shiftKey
      && ! matcher[ 3 ] === ! e.altKey;
  } );
}
