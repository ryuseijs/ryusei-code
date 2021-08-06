import { ContextMenuButtonSettings, ContextMenuGroupData } from '@ryusei/code';
import { UIComponent } from '../../classes/UIComponent/UIComponent';
/**
 * The class for creating a context menu replacing the native one.
 *
 * @since 0.1.0
 */
export declare class ContextMenu extends UIComponent<ContextMenuGroupData> {
    /**
     * The index of the current menu item.
     */
    private index;
    /**
     * Holds buttons that are currently displayed.
     * This may be null when the menu is hidden.
     */
    buttons: Record<string, HTMLButtonElement> | null;
    /**
     * Listens some events.
     */
    protected listen(): void;
    /**
     * Creates the context menu elements.
     *
     * @link https://www.w3.org/TR/wai-aria-1.2/#menu
     */
    protected create(): void;
    /**
     * Called when the mouse button is clicked.
     * If the button number is 2, which means a right click,
     * displays the menu and moves it at the cursor location, otherwise hides the menu.
     *
     * @param e - A MouseEvent object.
     */
    private onMouseDown;
    /**
     * Called when the contextmenu event of the document is fired.
     * Since the context menu may scroll the scroller or the window,
     * displaying the menu at this moment is too early.
     *
     * @param e - An Event object.
     */
    private onContextMenu;
    /**
     * Called when the window receives the keydown.
     *
     * @param e - A KeyboardEvent object.
     */
    private onKeydown;
    /**
     * Sets focus on the menu item in order.
     *
     * @param backwards - Whether to decrement or increment the menu index.
     */
    private focus;
    /**
     * Moves the menu to the provided client coordinates.
     *
     * @param clientX - A client x coordinate.
     * @param clientY - A client y coordinate.
     */
    private move;
    /**
     * Checks whether the editor contains the passed element/event target or not.
     *
     * @param target - An EventTarget object that is an Element instance in most cases.
     *
     * @return `true` if the editor contains the target, or otherwise `false`.
     */
    private contains;
    /**
     * Creates elements for menu items.
     *
     * @param group - A group ID.
     */
    private build;
    /**
     * Finds the each button settings from the array of settings.
     *
     * @param settings - An array with settings.
     * @param id       - A button ID to find.
     *
     * @return The found button settings.
     */
    private findSettings;
    /**
     * Registers a menu item or items.
     *
     * @example
     *
     * Registers a new item to the "edit" list in the "main" context menu:
     * ```ts
     * const ryuseiCode = new RyuseiCode();
     * ryuseiCode.apply( 'textarea' );
     *
     * const { ContextMenu } = ryuseiCode.Editor.Components;
     *
     * ContextMenu.register( 'main', 'edit', {
     *   id  : 'myButton',
     *   html: 'Click Me',
     *   click() {
     *     console.log( 'Clicked! );
     *   },
     * } );
     * ```
     *
     * Registers a new list and items to the the "main" context menu:
     * ```ts
     * const ryuseiCode = new RyuseiCode();
     * ryuseiCode.apply( 'textarea' );
     *
     * const { ContextMenu } = ryuseiCode.Editor.Components;
     *
     * ContextMenu.register( 'main', 'my-list', [
     *   {
     *     id  : 'button1',
     *     html: 'Button 1',
     *     click() {
     *       console.log( 'You clicked the Button 1' );
     *     },
     *   },
     *   {
     *     id  : 'button2',
     *     html: 'Button 2',
     *     click() {
     *       console.log( 'You clicked the Button 2' );
     *     },
     *   },
     * ] );
     * ```
     *
     * Registers a new group:
     * ```ts
     * const ryuseiCode = new RyuseiCode();
     * ryuseiCode.apply( 'textarea' );
     *
     * const { ContextMenu } = ryuseiCode.Editor.Components;
     *
     * ContextMenu.register( 'my-context-menu', 'my-list', [
     *   ...
     * ] );
     *
     * ContextMenu.show( 'my-context-menu' );
     * ```
     *
     * @param group    - A group ID. If it does not exist, a new group will be generated.
     * @param list     - A list ID.
     * @param settings - An menu item or items.
     */
    register(group: string, list: string, settings: ContextMenuButtonSettings[]): void;
    /**
     * Displays the specified context menu.
     *
     * @param group - A group ID.
     */
    show(group: string): void;
    /**
     * Hides the context menu.
     */
    hide(): void;
}
//# sourceMappingURL=../../../../src/js/components/ContextMenu/ContextMenu.d.ts.map