import { Editor } from '../../core/Editor/Editor';
import { State as Base } from '../../event/State';
/**
 * The class for observing the selection states.
 *
 * @since 0.1.0
 */
export declare class State extends Base<number> {
    /**
     * Holds collection of elements.
     */
    private readonly elements;
    /**
     * Holds the Editor instance.
     */
    private readonly Editor;
    /**
     * Holds the Selection instance.
     */
    private readonly Selection;
    /**
     * The WeakMap key for identifying event handlers(just uses a new empty object).
     */
    private readonly key;
    /**
     * Describes what device makes the selection change.
     */
    device: 'pointer' | 'keyboard';
    /**
     * The State constructor.
     *
     * @param Editor - An Editor instance.
     */
    constructor(Editor: Editor);
    /**
     * Listens to some events.
     * Note that the `mouseup` event of `window` needs to be listened to instead of the editable element,
     * because users may release the mouse outside of it.
     */
    private listen;
    /**
     * Called when the editor is focused.
     */
    private onFocus;
    /**
     * Called when the editor is blurred.
     * Needs to check the Components existence because this may be called after destruction.
     */
    private onBlur;
    /**
     * Called whenever the selection of the document is changed.
     * - Only handles the change made by the editable element.
     * - Detects the selection change that made by the start action, such as `pointerdown` and
     *   makes the state go into the `CHANGED` state.
     * - If the selection changes after `CHANGED`, which means user selects texts and the range is not collapsed,
     *   makes the state go into the `SELECTING` state.
     * - In FF, the event is sometimes fired after `pointerdown`.
     * - In iOS, the event is fired after `pointerup`.
     */
    private onSelectionChange;
    /**
     * Called when the pointer becomes active or when arrow keys are pressed.
     * If a shift key is pressed,
     * that means the existing selection is being updated instead that a new one is created.
     *
     * @param e - An event object.
     */
    private onSelectionStart;
    /**
     * Called when the `pointerup` or `keyup` event is triggered on the window object.
     * Note that the state goes into `SELECTED` when the previous state is `EXTEND`
     * even if the native selection is collapsed,
     * because an anchor node may disappear after scrolling.
     * The selection is correctly handled by the Selection class.
     */
    private onSelectionEnd;
    /**
     * Called when any key is pressed.
     *
     * @param e - A KeyboardEvent object.
     */
    private onKeydown;
    /**
     * Called when any key is released.
     *
     * @param e - A KeyboardEvent object.
     */
    private onKeyup;
    /**
     * Checks if the editor or the context menu has focus or not.
     *
     * @return `true` if they have focus or otherwise `false`.
     */
    private isFocused;
    /**
     * Should be called when the custom selection is manually updated.
     *
     * @param collapsed - Indicates whether the new selection is collapsed or not.
     */
    update(collapsed: boolean): void;
    /**
     * Attempts to refresh the selection state.
     *
     * @param collapsed - Indicates whether the new selection is collapsed or not.
     */
    refresh(collapsed: boolean): void;
    /**
     * Destroys the instance.
     */
    destroy(): void;
}
//# sourceMappingURL=../../../../src/js/components/Selection/State.d.ts.map