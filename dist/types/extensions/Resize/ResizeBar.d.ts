import { AbstractDraggableBar } from '../../classes/AbstractDraggableBar/AbstractDraggableBar';
import { Editor } from '../../core/Editor/Editor';
/**
 * The class name for the resize bar.
 *
 * @since 0.1.0
 */
export declare const CLASS_SIZER_BAR: string;
/**
 * The class for creating a resize bar.
 *
 * @since 0.1.0
 */
export declare class ResizeBar extends AbstractDraggableBar {
    /**
     * Holds the Editor instance.
     */
    private readonly Editor;
    /**
     * Keeps the initial width/height of the target element.
     */
    private startSize;
    /**
     * The ResizeBar constructor.
     *
     * @param Editor   - An Editor instance.
     * @param parent   - A parent element where the bar will be appended.
     * @param vertical - Determines whether to create a vertical or horizontal sizer.
     */
    constructor(Editor: Editor, parent: HTMLElement, vertical: boolean);
    /**
     * Initializes the instance.
     * Note that `aria-valuemin` and `aria-valuemax` is not necessary because their default values are `0` and `100`.
     *
     * @link https://www.w3.org/TR/wai-aria-1.2/#separator
     */
    private init;
    /**
     * Called when the bar starts being dragged.
     *
     * @param e - A PointerEvent object.
     */
    protected onDrag(e: PointerEvent): void;
    /**
     * Called while the bar is dragged.
     *
     * @param e - A PointerEvent object.
     */
    protected onDragging(e: PointerEvent): void;
    /**
     * Updates aria attributes related with the separator role.
     * This method will be called through the event bus.
     */
    private updateAria;
    /**
     * Converts the CSS value to pixel.
     *
     * @param prop - A CSS prop name.
     *
     * @return A value in pixel.
     */
    private convertValueToPixel;
    /**
     * Destroys the instance.
     */
    destroy(): void;
}
//# sourceMappingURL=../../../../src/js/extensions/Resize/ResizeBar.d.ts.map