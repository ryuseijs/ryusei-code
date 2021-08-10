import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { Editor } from '../../core/Editor/Editor';
/**
 * The component for handing the Tab key to insert/remove indents.
 * Just overriding the default behavior of the Tab key can not satisfy the "No Keyboard Trap" criterion.
 * Therefore as default, the Tab indentation is initially disabled, and it will be enabled when:
 * - the editor is focused by pointer devices, such as a mouse
 * - users explicitly enable it via CTRL+M
 *
 * @link https://www.w3.org/TR/WCAG21/#no-keyboard-trap
 *
 * @since 0.1.0
 */
export declare class Indentation extends Component {
    /**
     * Indicates whether the notification message has been already shown or not.
     */
    private static noticed;
    /**
     * Holds the indent representation.
     */
    private space;
    /**
     * Indicates whether to disable tab indentation or not.
     */
    private disabled;
    /**
     * Holds options.
     */
    private opts;
    /**
     * Holds the Dialog component.
     */
    private Dialog;
    /**
     * The Indentation constructor.
     *
     * @param Editor - An Editor instance.
     */
    constructor(Editor: Editor);
    /**
     * Initializes the component.
     * This component requires the Dialog component.
     *
     * @param elements - A collection of essential elements.
     */
    mount(elements: Elements): void;
    /**
     * Explicitly enables or disables the component.
     *
     * @param disabled - Determines whether to disable the component or not.
     */
    setDisabled(disabled: boolean): void;
    /**
     * Listens to some events.
     */
    private listen;
    /**
     * Called when any key is pressed on the editor.
     *
     * @param e     - An EventBusEvent object.
     * @param ke    - A KeyboardEvent object.
     */
    private onKeydown;
    /**
     * Registers the dialog for the indentation notice.
     */
    private register;
    /**
     * Prepends indents to all selected lines.
     */
    private indent;
    /**
     * Removes indents from all selected lines.
     */
    private unindent;
    /**
     * Adds an indent to the newline when the enter key is pressed.
     */
    private indentNewline;
    /**
     * Adds an indent after specific patterns.
     */
    private indentDeep;
    /**
     * Returns an indent config index.
     *
     * @return A config index if found, or -1 if not.
     */
    private findConfigIndex;
    /**
     * Determines whether to increase the indent level or not.
     *
     * @param index - A config index.
     *
     * @return `true` if the level should be increased, or otherwise `false`.
     */
    private shouldIndentDeep;
    /**
     * Checks if the position where the indentation is being added is enclosed by paired characters or not.
     *
     * @param index - A config index.
     *
     * @return `true` if the closing representation is found, or otherwise `false`.
     */
    private isClosed;
    /**
     * When the backspace key is pressed,
     * removes indents of a line if they are same with the previous one's.
     *
     * @param e - A KeyboardEvent object.
     */
    private remove;
    /**
     * Returns a config for indentation.
     *
     * @return A config array.
     */
    private getConfig;
}
//# sourceMappingURL=../../../../src/js/extensions/Indentation/Indentation.d.ts.map