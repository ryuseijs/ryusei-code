import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { Editor } from '../../core/Editor/Editor';
/**
 * The class for a gutter.
 *
 * @since 0.1.0
 */
export declare class Gutter extends Component {
    /**
     * Holds the gutter element.
     */
    private gutter;
    /**
     * Holds the float element.
     */
    private float;
    /**
     * Keeps the active row element.
     */
    private activeElm;
    /**
     * Holds options.
     */
    private readonly opts;
    /**
     * The number where the gutter starts.
     */
    private readonly start;
    /**
     * The Gutter constructor.
     *
     * @param Editor - An Editor instance.
     */
    constructor(Editor: Editor);
    /**
     * Renders a gutter element and rows.
     */
    private render;
    /**
     * Renders rows of a gutter.
     * `+1` creates an extra row for measurement of the gutter width.
     *
     * @param lines  - An array containing lines.
     * @param append - The function that appends a HTML string.
     */
    private renderRows;
    /**
     * Initializes the component.
     *
     * @param elements - A collection of essential elements.
     */
    mount(elements: Elements): void;
    /**
     * Supplies the specified number of row and line number elements.
     *
     * @param length - The number of elements to create.
     */
    private supply;
    /**
     * Listens to some events.
     */
    private listen;
    /**
     * Called when the gutter emits the `pointerdown` event.
     *
     * @param e - A PointerEvent object.
     */
    private onPointerDown;
    /**
     * Updates line numbers and offsets the float element to the Chunk position.
     */
    private update;
    /**
     * Offsets the float element to the current Chunk position.
     */
    private offset;
    /**
     * Activates the specified row.
     */
    private activate;
    /**
     * Deactivates the active row if there is.
     */
    private deactivate;
    /**
     * Returns the element at the row index.
     *
     * @param row - A row index.
     *
     * @return A row element if available, or otherwise `undefined`.
     */
    private getElm;
}
//# sourceMappingURL=../../../../src/js/extensions/Gutter/Gutter.d.ts.map