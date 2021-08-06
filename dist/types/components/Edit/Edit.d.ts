import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
/**
 * The class for editing the code.
 *
 * @since 0.1.0
 */
export declare class Edit extends Component {
    /**
     * Indicates whether lines has been deleted by an input or not.
     */
    private deletedByInput;
    /**
     * Holds the Clipboard instance.
     */
    private clipboard;
    /**
     * Initializes the component.
     *
     * @param elements - A collection of essential editor elements.
     */
    mount(elements: Elements): void;
    /**
     * Listens to some events.
     */
    private listen;
    /**
     * Called when any key is pressed.
     *
     * @param e  - An EventBusEvent object.
     * @param ke - A KeyboardEvent object.
     */
    private onKeydown;
    /**
     * Called when the context menu item is clicked.
     *
     * @param e    - An EventBusEvent object.
     * @param menu - A ContextMenu instance.
     * @param id   - The ID of the clicked item.
     */
    private onMenuClick;
    /**
     * Called when the text is being pasted to the editor.
     *
     * @param e - A ClipboardEvent object.
     */
    private onPaste;
    /**
     * Registers items to the context menu.
     */
    private register;
    /**
     * Checks if some texts are selected or not.
     * Be aware that this is not same with negating getSelection().isCollapsed.
     *
     * @return `true` if some texts are selected, or otherwise `false`.
     */
    private isSelected;
    /**
     * Checks if the Editor is editable or not.
     *
     * @return `true` if the Editor is editable.
     */
    private isEditable;
    /**
     * Deletes the selected text. Nothing will happen when the selection is collapsed.
     */
    delete(): void;
    /**
     * Pastes the provided text at the current position.
     *
     * @param string - A string to paste.
     * @param type   - Optional. Specifies the input type.
     */
    paste(string: string, type?: string): void;
    /**
     * Copies the provided text to the clipboard.
     * If the text is not provided, this method tries to copy the current selection.
     *
     * @param string        - Optional. A string to copy.
     * @param skipSelection - Optional. Whether to restore the selection range after copy or not.
     */
    copy(string?: string, skipSelection?: boolean): void;
    /**
     * Cuts the selected code. Nothing will happen if the selection is collapsed.
     */
    cut(): void;
    /**
     * Cuts the current line.
     */
    cutLine(): void;
}
//# sourceMappingURL=../../../../src/js/components/Edit/Edit.d.ts.map