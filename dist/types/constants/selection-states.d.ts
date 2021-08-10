/**
 * The editor is not active.
 */
export declare const IDLE = 0;
/**
 * The selection is collapsed.
 */
export declare const COLLAPSED = 1;
/**
 * The selection will change soon. The native selection has not been updated at this timing.
 */
export declare const START = 2;
/**
 * The selection has just changed after the `START` state. The native selection has been updated.
 */
export declare const CHANGED = 3;
/**
 * The selection has been programmatically updated.
 */
export declare const UPDATE = 4;
/**
 * An user is selecting a document.
 */
export declare const SELECTING = 5;
/**
 * The existing selection is being extended.
 */
export declare const EXTEND = 6;
/**
 * User finishes the selection. The native selection has not been updated at this timing (in Gecko).
 */
export declare const END = 7;
/**
 * The selection is settled and it is not collapsed.
 */
export declare const SELECTED = 8;
/**
 * All contents are selected.
 */
export declare const SELECTED_ALL = 9;
/**
 * The selection is right-clicked.
 */
export declare const CLICKED_RIGHT = 10;
//# sourceMappingURL=../../../src/js/constants/selection-states.d.ts.map