import { KeyMatcher } from '@ryusei/code';


/**
 * The collection of shortcuts for the Jump extension.
 *
 * @since 0.1.0
 */
export const KEYMAP: Record<string, KeyMatcher | KeyMatcher[]> = {
  jumpToLine: [ 'G', true ],
};
