import { AbstractDraggableBar } from '../../classes/AbstractDraggableBar/AbstractDraggableBar';
import { Editor } from '../../core/Editor/Editor';
/**
 * The class for creating a scrollbar.
 *
 * @since 0.1.0
 */
export declare class Scrollbar extends AbstractDraggableBar {
    /**
     * Holds the Editor element.
     */
    protected readonly Editor: Editor;
    /**
     * The target element to scroll.
     */
    protected readonly scroller: HTMLElement;
    /**
     * Holds the margin settings.
     */
    private readonly margin;
    /**
     * Keeps the scrollbar height.
     */
    private lastHeight;
    /**
     * The conversion ratio from the scroll offset to the bar offset.
     * - top = scrollTop * ratio
     * - scrollTop = top / ratio
     */
    private ratio;
    /**
     * The Scrollbar constructor.
     *
     * @param Editor   - An EventBus instance.
     * @param parent   - A parent element.
     * @param scroller - A target element to scroll.
     * @param vertical - Determines whether to create a vertical or horizontal scroll bar.
     * @param margin   - Optional. Margins in pixel as `[ top, bottom ]` ( or `[ left, right ]` ).
     */
    constructor(Editor: Editor, parent: HTMLElement, scroller: HTMLElement, vertical: boolean, margin?: [number, number] | (() => [number, number]));
    /**
     * Initializes the instance.
     * Note that `aria-valuemin` and `aria-valuemax` is not necessary because their default values are `0` and `100`.
     *
     * @link https://www.w3.org/TR/wai-aria-1.2/#scrollbar
     */
    private init;
    /**
     * Listens to some events.
     */
    protected listen(): void;
    /**
     * Called while the bar is dragged.
     *
     * @param e - A PointerEvent object.
     */
    protected onDragging(e: PointerEvent): void;
    /**
     * Updates the scrollbar height and offset according to the current scroll offset.
     */
    protected update(): void;
    /**
     * Checks if the scrollbar is active or not.
     *
     * @return `true` if the scrollbar is active, or otherwise `false`.
     */
    private isActive;
    /**
     * Toggles the scrollbar.
     */
    protected toggle(): void;
    /**
     * Destroys the instance.
     */
    destroy(): void;
}
//# sourceMappingURL=../../../../src/js/components/View/Scrollbar.d.ts.map