import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { Throttle } from '../../utils/function/throttle/throttle';
/**
 * The class for managing the viewport.
 *
 * @since 0.1.0
 */
export declare class View extends Component {
    /**
     * Emits the resize event with reducing frequency by `throttle`.
     */
    emitResize: Throttle<() => void>;
    /**
     * Keeps the previous width of the viewport.
     */
    private lastWidth;
    /**
     * Keeps the number of lines when the height is adjusted.
     */
    private lastLength;
    /**
     * Holds Scrollbar elements.
     */
    private scrollbars;
    /**
     * Initializes the instance.
     *
     * @param elements - A collection of essential editor elements.
     */
    mount(elements: Elements): void;
    /**
     * Listens to some events.
     */
    private listen;
    /**
     * Called when the selection state is changed.
     *
     * @param e         - An EventBusEvent object.
     * @param Selection - A Selection instance.
     */
    private onSelected;
    /**
     * Creates the scrollbar elements.
     */
    private create;
    /**
     * Clips the caret position by all sides of the editor.
     * Only the left border refers the editor rect so that it includes the width of the fixed gutter.
     */
    private clipScrollOffset;
    /**
     * Returns the width before the container element.
     *
     * @return The width before the container.
     */
    private getWidthBeforeContainer;
    /**
     * Jumps to the specified row if it's not visible in the viewport.
     * If the `middle` is true, always jumps to the middle of the viewport.
     *
     * @param row        - A row index to jump to.
     * @param middle     - Optional. Determines whether to jump to the middle of the viewport.
     * @param lineOffset - Optional. A number of lines to offset top and bottom borders.
     */
    jump(row: number, middle?: boolean, lineOffset?: number): void;
    /**
     * Adjusts the width of the viewport.
     */
    autoWidth(): void;
    /**
     * Adjusts the height of the viewport.
     *
     * @param skipLengthCheck - Optional. Whether to skip checking the number of lines or not.
     */
    autoHeight(skipLengthCheck?: boolean): void;
    /**
     * Checks if the provided row is visible on the scroller or not.
     *
     * @param row        - A row index to check.
     * @param lineOffset - Optional. A number of lines to offset top and bottom borders.
     *
     * @return `true` if the row is in the scroller viewport, or otherwise `false`.
     */
    isVisible(row: number, lineOffset?: number): boolean;
    /**
     * Destroys the component.
     */
    destroy(): void;
}
//# sourceMappingURL=../../../../src/js/components/View/View.d.ts.map