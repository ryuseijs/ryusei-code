import { KeyMatcher } from '@ryusei/code';


/**
 * The collection of shortcuts for the Shortcut extension.
 *
 * @since 0.1.0
 */
export const KEYMAP: Record<string, KeyMatcher | KeyMatcher[]> = {
  cutLine : [ 'X', true ],
  copyLine: [ 'C', true ],
  moveUp  : [ 'ArrowUp', true ],
  moveDown: [ 'ArrowDown', true ],
};
