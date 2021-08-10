import { Elements, Position, Range } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import * as STATES from '../../constants/selection-states';
import { State } from './State';
/**
 * The class for handing both a native and custom selection.
 *
 * @since 0.1.0
 */
export declare class Selection extends Component {
    /**
     * The collection of selection states.
     *
     * | State | Description |
     * |---|---|
     * | `IDLE` | The editor is not active. |
     * | `COLLAPSED` | The selection is collapsed. |
     * | `START` | The selection will change soon. The native selection has not been updated at this timing. |
     * | `CHANGED` | Fired every time when the tween is updated. |
     * | `UPDATE` | The selection has just changed after the `START` state. The native selection has been updated. |
     * | `SELECTING` | An user starts selecting texts. |
     * | `EXTEND` | The existing selection is being extended. |
     * | `END` | User finishes the selection. The native selection has not been updated at this timing (in FF). |
     * | `SELECTED` | The selection is settled and it is not collapsed. |
     * | `SELECTED_ALL` | All contents are selected. |
     * | `CLICKED_RIGHT` | The selection is right-clicked. |
     */
    readonly STATES: typeof STATES;
    /**
     * The State instance that manages the selection states.
     *
     * @readonly
     */
    state: State;
    /**
     * The position where the selection starts.
     *
     * @readonly
     */
    anchor: Position;
    /**
     * The position where the selection ends.
     *
     * @readonly
     */
    focus: Position;
    /**
     * Keeps the latest scrollTop amount.
     */
    private scrollTop;
    /**
     * Initializes the component.
     *
     * @internal
     *
     * @param elements - A collection of essential elements.
     */
    mount(elements: Elements): void;
    /**
     * Listens to some events.
     */
    private listen;
    /**
     * Called whenever the selection is changed.
     * Be aware that this is fired even when the editor is not focused.
     */
    private onSelectionChange;
    /**
     * Called when the mouse button is pressed.
     * Detects the double-click earlier than the `dblclick` to prevent the native smart selection.
     *
     * @param e - A MouseEvent object.
     */
    private onMouseDown;
    /**
     * Called when the code element is double-clicked.
     * If a word is clicked, selects it. Otherwise, selects a clicked node.
     */
    private onDblClick;
    /**
     * Called whenever the selection state is changed.
     *
     * - Updating positions at the `START` state is too early
     *   because the native selection has not been updated yet.
     * - Jumps to the focus position just before extending the existing selection by a keyboard
     *   so that the native selection is able to be updated.
     * - The `EVENT_SELECTING` event must be emitted after `EVENT_SELECTED` event
     *   for listeners to prepare something at the `SELECTING` state.
     * - When the state goes into `SELECTED` state, the custom selection may be collapsed,
     *   e.g. single backward selection -> shift + arrow. To make sure the state becomes `COLLAPSED`,
     *   sets the native selection.
     *
     * @param e     - An EventBusEvent object.
     * @param state - A state number.
     * @param prev  - A previous state number.
     */
    private onStateChanged;
    /**
     * Called when the window or scroller scrolls.
     */
    private onScroll;
    /**
     * Sets a new selection.
     *
     * @param anchor - An anchor position.
     * @param focus  - Optional. A focus position. If omitted, the selection will be collapsed to the anchor.
     */
    set(anchor: Position, focus?: Position): void;
    /**
     * Returns positions of the current selection.
     * If the `normalize` is `true`, the `start` will be always preceding position.
     *
     * @param normalize - Optional. Whether to normalize the position or not.
     *
     * @return An object literal with anchor and focus positions.
     */
    get(normalize?: boolean): Range;
    /**
     * Updates the custom selection range without using the native selection.
     *
     * @param anchor   - An anchor position.
     * @param focus    - Optional. A focus position.
     * @param silently - Optional. Whether to change the state or not.
     */
    update(anchor: Position, focus?: Position, silently?: boolean): void;
    /**
     * Selects the current or specified line.
     *
     * @param row       - Optional. A row index where to select.
     * @param refresh   - Optional. Determines whether to refresh the current selection or not.
     * @param backwards - Optional. Determines whether to select a line backwards or not.
     */
    selectLine(row?: number, refresh?: boolean, backwards?: boolean): void;
    /**
     * Selects again the current selection.
     */
    reselect(): void;
    /**
     * Selects the whole code.
     */
    selectAll(): void;
    /**
     * Holds the current state so that it won't change.
     */
    hold(): void;
    /**
     * Disables to hold the state so that it will change.
     */
    release(): void;
    /**
     * Converts the selection to a string.
     * This returns an empty string when the selection is collapsed.
     *
     * @return A string representing the current selection.
     */
    toString(): string;
    /**
     * Returns the DOMRect object of the native selection boundary.
     * Note that the boundary node is usually a Text node,
     * but sometimes the line or the editable element.
     *
     * @param focus - Determines whether to get the DOMRect of the focus or anchor node.
     *
     * @return A DOMRect object if available, or otherwise `null`.
     */
    getRect(focus: boolean): DOMRect | null;
    /**
     * Returns the current location as a string formatted by the i18n definition, such as `'Line: %s, Column: %s'`.
     *
     * @return A string that describes the current location.
     */
    getLocation(): string;
    /**
     * Checks if the selection state is one of the provided states or not.
     * This is just an alias of the `state.is()` method.
     *
     * @example
     * ```ts
     * // Checks if the state is COLLAPSED or not:
     * Selection.is( Selection.STATES.COLLAPSED );
     *
     * // Checks if the state is START, EXTEND or not:
     * Selection.is( Selection.STATES.START, Selection.STATES.EXTEND );
     * ```
     *
     * @param states - A state or states to check.
     *
     * @return `true` if the current state is one of the provided states, or otherwise `false`.
     */
    is(...states: number[]): boolean;
    /**
     * Collapses the selection to the anchor or focus position.
     *
     * @param toFocus - Optional. Collapses the selection to the focus position.
     */
    collapse(toFocus?: boolean): void;
    /**
     * Checks is the selection is backward or not.
     *
     * @return `true` if the selection is backward, or otherwise `false`.
     */
    isBackward(): boolean;
    /**
     * Checks if the selection is collapsed or not.
     *
     * @return `true` if the selection is collapsed, or otherwise `false`.
     */
    isCollapsed(): boolean;
    /**
     * Checks if more than one line is selected or not.
     *
     * @return `true` if more than one line is selected or otherwise `false`.
     */
    isMultiline(): boolean;
    /**
     * Checks if the provided client position is inside the current selection or not.
     *
     * @param clientX - The X position that is relative to the client.
     * @param clientY - The Y position that is relative to the client.
     *
     * @return `true` if the position is inside the selection, or otherwise `false`.
     */
    isInside(clientX: number, clientY: number): boolean;
    /**
     * Destroys the instance.
     *
     * @internal
     */
    destroy(): void;
    /**
     * Sets a native selection range.
     * Be aware that calling `setSelection` emits `selectionchange` only in IE, but does not in others.
     *
     * @param start - A start position.
     * @param end   - Optional. An end position. If omitted, the start position is used alternatively.
     *
     * @return `true` if the selection is successfully changed, or otherwise `undefined`.
     */
    private setNativeSelection;
    /**
     * Converts the native selection boundary to a position represented as [ row, col ].
     * In FF, the selection
     *
     * @param focus - Optional. Whether to returns a position on the focus boundary or not.
     *
     * @return A converted position. If the position is not found, always returns [ 0, 0 ].
     */
    private getNativeSelection;
    /**
     * Finds a line where the native anchor node belongs.
     * If the `focus` is set to `true`, finds a line where the native focus node belongs.
     *
     * @param focus - Determines whether to find a line that has focus node or not.
     *
     * @return A line where an anchor or a focus node belongs.
     */
    private findActiveLine;
    /**
     * Converts the provided position to the range for wrapping the word at the position.
     * If the text at the position is not a word, such as `/` or `-`, this returns `null`.
     *
     * @param row - A row index.
     * @param col - A col index.
     *
     * @return An object that describes the range of the word at the position.
     *         If the text is not a word, returns `null`.
     */
    private getWordRangeAt;
    /**
     * Returns a boundary node and offset of the native selection.
     * Be aware that the target node must be in the chunk,
     * or otherwise this method returns `null`.
     * Besides, IE returns a parent node as a boundary node, and child index as a offset
     * if the boundary is `<br>`(an empty line).
     *
     * @param focus - Whether to get the focus boundary or not.
     *
     * @return An object literal with a node and offset.
     */
    private getNativeSelectionBoundary;
    /**
     * Detects selection of all contents in a immediate way, such as the `Select All` iOS context menu.
     *
     * @return `true` if all contents are selected, or otherwise `false`.
     */
    private detectSelectAll;
    /**
     * The dirty code to ensure the selection contains the latest nodes.
     */
    private ensureSelection;
    /**
     * Checks if the editor is focused or not.
     *
     * @return `true` if the editor is focused, or otherwise `false`.
     */
    private isFocused;
}
//# sourceMappingURL=../../../../src/js/components/Selection/Selection.d.ts.map