import { OffsetPosition, Position } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { Editor } from '../../core/Editor/Editor';
/**
 * The class for measuring offset positions and caches some values.
 *
 * @since 0.1.0
 */
export declare class Measure extends Component {
    /**
     * Caches the lineHeight.
     */
    private lineHeightCache;
    /**
     * Caches the DOMRect objects of some elements.
     */
    private rectCaches;
    /**
     * Keeps the current CSS font settings.
     */
    private font;
    /**
     * Holds the MeasureText instance.
     */
    private measureText;
    /**
     * An object with padding values as `{ top, right, bottom, left }`;
     */
    padding: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    /**
     * The Measure constructor.
     *
     * @param Editor - An Editor instance.
     */
    constructor(Editor: Editor);
    /**
     * Called just before components are mounted.
     * This component must be initialized earlier than other components.
     *
     * @param e        - An EventBusEvent object.
     * @param elements - A collection of essential editor elements.
     */
    private onMount;
    /**
     * Listens to some events.
     * The resize handler must be executed after the Style update listener and before others.
     */
    private listen;
    /**
     * Updates the cache of the padding.
     */
    private updatePadding;
    /**
     * Creates a `MeasureText` instance only when the font settings are changed.
     */
    private createMeasureText;
    /**
     * Returns the CSS font string of the current environment.
     *
     * @return A built string.
     */
    private buildCSSFont;
    /**
     * Clears the all rect caches.
     */
    private clearRectCaches;
    /**
     * Returns the top position of the line at the specified row.
     * This clamps the row index from 0 and the total length of lines.
     *
     * @param row - A row index.
     *
     * @return A top position in pixel.
     */
    getTop(row: number): number;
    /**
     * Returns the bottom position of the line at the specified row.
     * This clamps the row index from 0 and the total length of lines.
     *
     * @param row - A row index.
     *
     * @return A bottom position in pixel.
     */
    getBottom(row: number): number;
    /**
     * Computes the closest row index to the offset `top` position.
     *
     * @param top - A offset position.
     *
     * @return The closest row index to the offset position.
     */
    closest(top: number): number;
    /**
     * Measures the provided string and returns the width.
     * This method caches each width of the character in the string for performance.
     *
     * @param string   - A string to measure.
     * @param useCache - Optional. Determines whether to use the cached width or not.
     *
     * @return The width of the string.
     */
    measureWidth(string: string, useCache?: boolean): number;
    /**
     * Converts the passed position to the OffsetPosition object as `{ top: number, left: number }`.
     *
     * @param position - A position to convert.
     *
     * @return An object literal with top and left positions.
     */
    getOffset(position: Position): OffsetPosition;
    /**
     * Returns a DOMRect object of the editor element.
     *
     * @return A DOMRect object.
     */
    get editorRect(): DOMRect;
    /**
     * Returns a DOMRect object of the scroller element.
     *
     * @return A DOMRect object.
     */
    get scrollerRect(): DOMRect;
    /**
     * Returns a DOMRect object of the container element.
     *
     * @return A DOMRect object.
     */
    get containerRect(): DOMRect;
    /**
     * Returns the editor line height in pixel.
     *
     * @return The line height in pixel.
     */
    get lineHeight(): number;
}
//# sourceMappingURL=../../../../src/js/components/Measure/Measure.d.ts.map