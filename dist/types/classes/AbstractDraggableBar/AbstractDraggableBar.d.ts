/**
 * Event names for the beginning of dragging.
 *
 * @since 0.1.0
 */
export declare const DRAG_START_EVENTS = "pointerdown";
/**
 * Event names for the end of dragging.
 *
 * @since 0.1.0
 */
export declare const DRAG_END_EVENTS = "pointerup";
/**
 * Event names on dragging.
 *
 * @since 0.1.0
 */
export declare const DRAGGING_EVENTS = "pointermove";
/**
 * The abstract class for creating a draggable bar.
 *
 * @since 0.1.0
 */
export declare abstract class AbstractDraggableBar {
    /**
     * Indicates whether the bar is a vertical or horizontal sizer or not.
     */
    protected readonly vertical: boolean;
    /**
     * Holds the parent element.
     */
    protected readonly parent: HTMLElement;
    /**
     * The bar element.
     */
    protected readonly elm: HTMLDivElement;
    /**
     * Holds the prop names determined by the bar direction.
     */
    protected readonly names: Record<string, string>;
    /**
     * Keeps the coordinate at the drag start.
     */
    protected startCoord: number;
    /**
     * Keeps the last coordinate.
     */
    protected lastCoord: number;
    /**
     * The AbstractDraggableBar constructor.
     *
     * @param classes  - A class or classes of the bar.
     * @param parent   - A parent element of the bar.
     * @param vertical - Determines whether to create a vertical or horizontal bar.
     */
    protected constructor(classes: string | string[], parent: HTMLElement, vertical: boolean);
    /**
     * Listens to some events.
     */
    protected bind(): void;
    /**
     * Called when the element starts being dragged.
     *
     * @param e - A PointerEvent object.
     */
    protected onDrag(e: PointerEvent): void;
    /**
     * Called while the element is dragged.
     *
     * @param e - A PointerEvent object.
     */
    protected onDragging(e: PointerEvent): void;
    /**
     * Called when the element is released.
     */
    protected onDragged(): void;
    /**
     * Returns the `pageX` and `pageY` coordinates provided by the event.
     *
     * @param e - A PointerEvent object.
     *
     * @return A pageX or pageY coordinate.
     */
    protected getCoord(e: PointerEvent): number;
    /**
     * Toggles "dragging" classes of the element and parent element.
     *
     * @param add - Determines whether to add or remove classes.
     */
    protected toggleClass(add: boolean): void;
    /**
     * Destroys the bar.
     */
    destroy(): void;
}
//# sourceMappingURL=../../../../src/js/classes/AbstractDraggableBar/AbstractDraggableBar.d.ts.map