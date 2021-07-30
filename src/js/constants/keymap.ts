import { KeyMatcher } from '@ryusei/code';


/**
 * The map for kay bindings (`[ key, ctrl, shift, alt ]`).
 *
 * @since 0.1.0
 */
export const KEYMAP: Record<string, KeyMatcher | KeyMatcher[] | null | false> = {
  selectAll: [ 'A', true ],
};

/**
 * The collection of modifier keys.
 *
 * @since 0.1.0
 */
export const MODIFIER_KEYS = {
  default: [ 'Ctrl', 'Shift', 'Alt' ],
  mac    : [ '⌘', '⇧', '⌥' ],
};
