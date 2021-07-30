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
     */
    confirm(): void;
    /**
     * Registers a group to the UI.
     *
     * @param group   - A group ID.
     * @param elm     - An element to register.
     * @param title   - The title of the dialog.
     * @param buttons - The title of the dialog.
     */
    register(group: string, elm: HTMLElement, title: string, buttons?: Array<keyof typeof GENERAL_UI_BUTTONS | UIButtonSettings<Dialog>>): void;
    /**
     * Opens the dialog.
     *
     * @param group - A dialog ID.
     */
    show(group: string): void;
    /**
     * Closes the dialog.
     */
    hide(): void;
    /**
     * Displays a message with the common dialog.
     *
     * @param message - A message.
     * @param title   - Optional. A title.
     */
    message(message: string, title?: string): void;
}
//# sourceMappingURL=../../../../src/js/extensions/Dialog/Dialog.d.ts.map