import { OffsetPosition, Elements, Position } from '@ryusei/code';
import { Editor } from '../../core/Editor/Editor';
/**
 * The class for highlighting arbitrary texts.
 *
 * @since 0.1.0
 */
export declare class Marker {
    /**
     * Holds the Editor instance.
     */
    protected Editor: Editor;
    /**
     * Holds the editor elements.
     */
    protected elements: Elements;
    /**
     * Holds the scroller element.
     */
    protected scroller: HTMLElement;
    /**
     * Caches the generated HTML string.
     */
    protected cache: string;
    /**
     * Holds the marker content.
     */
    protected content: string;
    /**
     * The Marker constructor.
     *
     * @param Editor   - An Editor instance.
     * @param elements - A collection of editor elements.
     */
    constructor(Editor: Editor, elements: Elements);
    /**
     * Calculates boundaries for drawing the marker.
     *
     * @param anchor - An anchor position.
     * @param focus  - A focus position.
     *
     * @return An object with start and end boundaries.
     */
    protected calcBoundaries(anchor: Position, focus: Position): {
        start: OffsetPosition;
        end: OffsetPosition;
    };
    /**
     * Generates HTML of the marker.
     *
     * @param anchor   - An anchor position.
     * @param focus    - A focus position.
     * @param useCache - A focus position.
     *
     * @return The generated HTML string of the marker.
     */
    html(anchor: Position, focus: Position, useCache?: boolean): string;
    /**
     * Builds HTML of each line.
     *
     * @param top    - A top position.
     * @param left   - A left position.
     * @param width  - Width.
     * @param height - Optional. Height.
     *
     * @return A generated HTML string.
     */
    protected buildLine(top: number, left: number, width: number | string, height?: number | string): string;
}
//# sourceMappingURL=../../../../src/js/components/Range/Marker.d.ts.map