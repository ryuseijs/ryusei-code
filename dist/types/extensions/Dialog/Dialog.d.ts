import { DialogGroupData, Elements, UIButtonSettings } from '@ryusei/code';
import { UIComponent } from '../../classes/UIComponent/UIComponent';
import { GENERAL_UI_BUTTONS } from './buttons';
/**
 * The component for displaying a dialog.
 *
 * @since 0.1.0
 */
export declare class Dialog extends UIComponent<DialogGroupData> {
    /**
     * Initializes the component.
     *
     * @param elements - A collection of editor elements.
     */
    mount(elements: Elements): void;
    /**
     * Listens to some events.
     */
    protected listen(): void;
    /**
     * Creates dialog elements.
     * Note that the dialog element must/should have:
     * - an accessible name by `aria-label` or `aria-labelledby`.
     * - at least one focusable descendant element.
     *
     * @link https://www.w3.org/TR/wai-aria-1.2/#dialog
     */
    protected create(): void;
    /**
     * Called when the general confirm button is clicked.
     *
     * @internal
     */
    confirm(): void;
    /**
     * Registers a new dialog.
     * Use `message()` instead just for showing a message.
     *
     * @example
     * ```ts
     * const ryuseiCode = new RyuseiCode();
     * const Dialog     = ryuseiCode.Editor.require( 'Dialog' );
     *
     * // The Dialog extension may not exist.
     * if ( Dialog ) {
     *   const body = document.createElement( 'p' );
     *   body.textContent = 'Hello!';
     *   Dialog.register( 'sample', body, 'Sample Dialog', [ 'confirm' ] );
     *   Dialog.show( 'sample' );
     * }
     * ```
     *
     * If you want to add custom buttons, pass an array with button settings to the `buttons`.
     *
     * ```ts
     * const settings = [
     *   {
     *     id: 'myButton',
     *     html: 'Click Me',
     *     click() {
     *       console.log( 'Clicked!' );
     *     },
     *   }
     * ];
     *
     * Dialog.register( 'sample', body, 'Sample Dialog', settings );
     * ```
     *
     * @param group   - A group ID.
     * @param elm     - An element to display as a dialog body.
     * @param title   - A title of a dialog.
     * @param buttons - Optional. General button names, `'confirm'`, `'cancel'`, or objects with button settings.
     */
    register(group: string, elm: HTMLElement, title: string, buttons?: Array<keyof typeof GENERAL_UI_BUTTONS | UIButtonSettings<Dialog>>): void;
    /**
     * Opens the specified dialog. The dialog must be registered by `register()` before opening it.
     *
     * @param group - A dialog ID to open.
     */
    show(group: string): void;
    /**
     * Closes the dialog which is visible now. Nothing will happen when there is no shown dialog.
     */
    hide(): void;
    /**
     * Displays a message with a common dialog. No registration required.
     *
     * @param message - A message to display.
     * @param title   - Optional. A title of a dialog. If omitted, uses the `notice` in the `i18n` collection.
     */
    message(message: string, title?: string): void;
}
//# sourceMappingURL=../../../../src/js/extensions/Dialog/Dialog.d.ts.map