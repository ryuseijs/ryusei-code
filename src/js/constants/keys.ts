/**
 * The collection of forward arrow keys.
 *
 * @private
 * @since 0.1.0
 */
export const ARROW_FORWARD = [
  'ArrowDown',
  'ArrowRight',
];

/**
 * The collection of backward arrow keys.
 *
 * @private
 * @since 0.1.0
 */
export const ARROW_BACKWARD = [
  'ArrowUp',
  'ArrowLeft',
];

/**
 * The collection of all arrow keys.
 *
 * @private
 * @since 0.1.0
 */
export const ARROW_KEYS = [
  ...ARROW_FORWARD,
  ...ARROW_BACKWARD,
];


/**
 * The map for normalizing differences of keys in browsers.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
 *
 * @private
 * @since 0.1.0
 */
export const NORMALIZATION_MAP = {
  Up      : 'ArrowUp',
  Down    : 'ArrowDown',
  Right   : 'ArrowRight',
  Left    : 'ArrowLeft',
  Del     : 'Delete',
  Esc     : 'Escape',
  Spacebar: ' ',
};
