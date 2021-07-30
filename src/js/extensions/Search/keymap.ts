import { KeyMatcher } from '@ryusei/code';


/**
 * The collection of shortcuts for the Search extension.
 *
 * @since 0.1.0
 */
export const KEYMAP: Record<string, KeyMatcher | KeyMatcher[]> = {
  search    : [ 'F', true ],
  searchNext: [ 'F3' ],
  searchPrev: [ 'F3', false, true ],
  replace   : [ 'F', true, true ],
};
