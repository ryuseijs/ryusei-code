/**
 * The editor is not active.
 */
export const IDLE = 0;

/**
 * The selection is collapsed.
 */
export const COLLAPSED = 1;

/**
 * The selection will change soon. The native selection has not been updated at this timing.
 */
export const START = 2;

/**
 * The selection has just changed after the `START` state. The native selection has been updated.
 */
export const CHANGED = 3;

/**
 * The selection has been programmatically updated.
 */
export const UPDATE = 4;

/**
 * An user is selecting a document.
 */
export const SELECTING = 5;

/**
 * The existing selection is being extended.
 */
export const EXTEND = 6;

/**
 * User finishes the selection. The native selection has not been updated at this timing (in FF).
 */
export const END = 7;

/**
 * The selection is settled and it is not collapsed.
 */
export const SELECTED = 8;

/**
 * All contents are selected.
 */
export const SELECTED_ALL = 9;

/**
 * The selection is right-clicked.
 */
export const CLICKED_RIGHT = 10;
