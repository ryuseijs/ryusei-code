import { KeyMatcher } from '@ryusei/code';


/**
 * The collection of shortcuts for the Indentation extension.
 *
 * @since 0.1.0
 */
export const KEYMAP: Record<string, KeyMatcher | KeyMatcher[]> = {
  indent       : [ 'Tab' ],
  unindent     : [ 'Tab', false, true ],
  toggleTabMode: [ 'M', true ],
};
