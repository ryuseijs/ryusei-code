import { KeyMatcher } from '@ryusei/code';


/**
 * The collection of shortcuts for the Comment extension.
 *
 * @since 0.1.0
 */
export const KEYMAP: Record<string, KeyMatcher | KeyMatcher[]> = {
  lineComment : [ '/', true ],
  blockComment: [ '?', true, true ],
};
