import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
/**
 * The type for the data of the anchor or focus line.
 *
 * @since 0.1.0
 */
declare type LineBoundaryData = {
    line?: Element;
    row?: number;
};
/**
 * The class for handling line elements.
 *
 * @since 0.1.0
 */
export declare class Chunk extends Component {
    /**
     * Indicates what row corresponds with the first line element.
     * The number can be negative.
     */
    start: number;
    /**
     * The number of lines for margin.
     */
    margin: number;
    /**
     * The number of visible lines.
     */
    visibleLines: number;
    /**
     * The current offset amount in pixel.
     */
    offsetY: number;
    /**
     * The anchor line data.
     */
    private anchor;
    /**
     * The focus line data.
     */
    private focus;
    /**
     * Indicates whether the anchor line is changed or not.
     */
    private anchorChanged;
    /**
     * Indicates whether the focus line is changed or not.
     */
    private focusChanged;
    /**
     * Holds the previous scroll position.
     */
    private scrollTop;
    /**
     * Holds the scroller element.
     */
    private scroller;
    /**
     * Holds the parent element of lines.
     */
    private parent;
    /**
     * Indicates the chunk is active or not.
     */
    private active;
    /**
     * Caches the border positions.
     */
    private borderCache;
    /**
     * Initializes the component.
     *
     * @param elements - A collection of essential editor elements.
     */
    mount(elements: Elements): void;
    /**
     * Listens to some events.
     */
    private listen;
    /**
     * Called whenever the selection state changes.
     *
     * @param e         - An EventBusEvent object.
     * @param Selection - A Selection instance.
     */
    private onSelected;
    /**
     * Called whenever the editor scrolls.
     * Be aware that the `scrollY` property is not supported in IE.
     *
     * @return byScroller - Indicates whether the editor is scrolled by the editor element itself or the window.
     */
    private onScroll;
    /**
     * Called the scroll likely ends.
     *
     * @return byScroller - Indicates whether the editor is scrolled by the editor element itself or the window.
     */
    private onScrolled;
    /**
     * Activates the anchor or focus line.
     * - If the selection is collapsed outside of the view,
     *   the anchor and focus lines are merged into a single boundary line.
     * - If the line is not available but there is a boundary,
     *   that means the boundary has been added manually by the Selection component.
     *
     * @param focus - Determines whether to activate focus or anchor line.
     */
    private activate;
    /**
     * Deactivates the anchor or focus line if it is changed.
     *
     * @param focus - Determines whether to deactivate focus or anchor line.
     */
    private deactivate;
    /**
     * Emits the `changed` event for an anchor or focus line.
     *
     * @param focus - Determines whether to emit the event for the focus or anchor line.
     */
    private emitChangedEvent;
    /**
     * Sets the `anchorChanged` or `focusChanged` property.
     *
     * @param focus   - Determines which property should be changed.
     * @param changed - The value for the property.
     */
    private setBoundaryChanged;
    /**
     * Supplies line elements so that they can fill the viewport.
     */
    private supply;
    /**
     * Removes unnecessary lines.
     */
    private remove;
    /**
     * Returns a HTML string of lines.
     *
     * @param start  - A start row index.
     * @param length - A number of lines.
     * @param where  - Optional. If provided, built HTML will be inserted to the parent by the `insertAdjacentHTML`.
     *
     * @return A built HTML.
     */
    private html;
    /**
     * Moves down elements which are outside of the border.
     */
    private moveDown;
    /**
     * Moves up elements which are outside of the border.
     */
    private moveUp;
    /**
     * Computes the number of lines to move down.
     *
     * @return A number of lines to move down.
     */
    private computeLengthToMoveDown;
    /**
     * Computes the number of lines to move up.
     *
     * @return A number of lines to move up.
     */
    private computeLengthToMoveUp;
    /**
     * Detaches lines in the specified lines from the chunk.
     * Both anchor and focus lines will be preserved, and others will be returned.
     *
     * @param start - A start index.
     * @param end   - An end index.
     *
     * @return An array with detached elements.
     */
    private detach;
    /**
     * Attaches detached anchor and focus lines to the chunk.
     * Do not move the anchor and focus lines to keep the native selection.
     */
    private attach;
    /**
     * Offsets the parent element to make it visible inside the viewport.
     *
     * @param offsetY - Optional. Amount of the offset. If empty, the current `offsetY` will be used.
     */
    private offset;
    /**
     * Makes the chunk jump so that it is visible in the view.
     */
    private jumpIntoView;
    /**
     * Repositions the chunk to the current scroll top position.
     */
    private reposition;
    /**
     * Checks if the part of the scroller element is vertically visible or not.
     * This method does not care the horizontal visibility.
     *
     * @return `true` if the scroller is visible, or otherwise `false`.
     */
    private isVisible;
    /**
     * Returns the focus or anchor boundary data.
     *
     * @param focus - Determines whether to return the focus or anchor boundary data.
     *
     * @return The boundary data object.
     */
    getBoundary(focus: boolean): LineBoundaryData;
    /**
     * Manually adds preserved line.
     * This method should be only used by the Selection component.
     * Note that the `changed` event will be emitted by the `activate` method.
     *
     * @param focus - Determines whether to add a focus or anchor line.
     * @param row   - A row index.
     *
     * @return A created preserved line element.
     */
    addPreservedLine(focus: boolean, row: number): Element;
    /**
     * Updates HTML of elements by current lines.
     *
     * @param elms  - Elements to sync.
     * @param start - A start index.
     */
    sync(elms?: Element[], start?: number): void;
    /**
     * Syncs difference of the number of lines before syncing each HTML for performance.
     * If the diff length is greater than the margin, this method does nothing.
     *
     * @param row  - A row index.
     * @param diff - Difference of the number of lines before and after editing.
     */
    syncDiff(row: number, diff: number): void;
    /**
     * Updates the position and contents of line elements.
     */
    refresh(): void;
    /**
     * Makes the chunk jump to the specified row index.
     *
     * @param row - A row to jump to.
     */
    jump(row: number): void;
    /**
     * Scrolls to the specified top position
     * and manually calls the `onScroll` handler for succeeding synchronous processes.
     *
     * @param scrollTop - A scroll position.
     */
    scroll(scrollTop: number): void;
    /**
     * Returns the row index which the provided line element corresponds with.
     *
     * @param elm - A line element.
     *
     * @return The row index if available, or otherwise -1.
     */
    getRow(elm: HTMLElement): number;
    /**
     * Returns the line at the specified row if available.
     *
     * @param row - A row index.
     *
     * @return A line element if available, or `undefined` if not.
     */
    getLine(row: number): Element | undefined;
    /**
     * Checks if the chunk includes the specified row or not.
     *
     * @param row - A row index.
     *
     * @return `true` if the chunk includes the row, or otherwise `false`.
     */
    includes(row: number): boolean;
    /**
     * Returns the end index of the chunk lines.
     * This may be greater than the total number of actual lines.
     *
     * @return An end index of the chunk.
     */
    get end(): number;
    /**
     * Returns the number of chunk lines without preserved lines.
     *
     * @return A number of elements.
     */
    get length(): number;
    /**
     * Returns chunk lines without preserved lines.
     *
     * @return An array containing chunk line elements.
     */
    get elms(): Element[];
    /**
     * Returns borders to move elements up or down.
     *
     * @return A tuple containing top and bottom borders.
     */
    get border(): [number, number];
}
export {};
//# sourceMappingURL=../../../../src/js/components/Chunk/Chunk.d.ts.map