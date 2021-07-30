import { Elements, Position } from '@ryusei/code';
import { Editor } from '../../core/Editor/Editor';
import { Marker } from './Marker';
/**
 * The class for highlighting arbitrary texts.
 *
 * @since 0.1.0
 */
export declare class StandaloneMarker extends Marker {
    /**
     * The element for wrapping marker fragments.
     */
    private readonly wrapper;
    /**
     * The Marker constructor.
     *
     * @param Editor   - An Editor instance.
     * @param elements - A collection of editor elements.
     * @param classes  - Optional. Class names for the wrapper element.
     */
    constructor(Editor: Editor, elements: Elements, classes?: string | string[]);
    /**
     * Draws the range for the anchor to the focus.
     *
     * @param anchor - An anchor position.
     * @param focus  - A focus position.
     */
    protected draw(anchor: Position, focus: Position): void;
    /**
     * Clears the marker.
     */
    protected clear(): void;
    /**
     * Checks if the provided client position is inside the current range or not.
     *
     * @param clientX - X position that is relative to the client.
     * @param clientY - Y position that is relative to the client.
     *
     * @return `true` if the position is inside the range, or otherwise `false`.
     */
    isInside(clientX: number, clientY: number): boolean;
    /**
     * Destroys the instance.
     */
    destroy(): void;
}
//# sourceMappingURL=../../../../src/js/components/Range/StandaloneMarker.d.ts.map