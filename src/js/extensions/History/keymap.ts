import { KeyMatcher } from '@ryusei/code';


/**
 * The collection of shortcuts for the History extension.
 *
 * @since 0.1.0
 */
export const KEYMAP: Record<string, KeyMatcher | KeyMatcher[]> = {
  undo: [ 'Z', true, false ],
  redo: [ 'Z', true, true ],
};
