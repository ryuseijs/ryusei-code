import { Elements, InputState, TokenInfo } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
/**
 * The class for handling the user input.
 *
 * @since 0.1.0
 */
export declare class Input extends Component {
    /**
     * Holds the TokenInfo object when any key is pressed.
     */
    info: TokenInfo | null;
    /**
     * Indicates whether the input is in composition session or not.
     */
    composing: boolean;
    /**
     * Keeps the latest focus line.
     */
    line: Element;
    /**
     * Keeps the latest focus row index.
     */
    row: number;
    /**
     * Holds the current state.
     */
    private state;
    /**
     * Indicates whether the input is currently disabled or not.
     */
    private _disabled;
    /**
     * Initialized the component.
     *
     * @param elements - A collection of essential editor elements.
     */
    mount(elements: Elements): void;
    /**
     * Listen to some events.
     */
    private listen;
    /**
     * Called when the composition starts.
     * Needs to emit the `change` event at this timing to save the start position.
     * Note that some browsers do not support a CompositionEvent object.
     *
     * @param e - A CompositionEvent object or a regular Event object.
     */
    private onCompositionStart;
    /**
     * Called whenever the composing content is updated.
     *
     * @param e - A CompositionEvent object or a regular Event object.
     */
    private onCompositionUpdate;
    /**
     * Called when the composition ends.
     *
     * @param e - A CompositionEvent object or a regular Event object.
     */
    private onCompositionEnd;
    /**
     * Called whenever any key is pressed.
     *
     * @param e - A KeyboardEvent object.
     */
    private onKeydown;
    /**
     * Called whenever any input is received.
     * Need to wait for the `compositionend` before calling `apply()`.
     */
    private onInput;
    /**
     * Handles the Enter key.
     *
     * @param e - A KeyboardEvent object.
     */
    private handleEnter;
    /**
     * Handles the delete key.
     *
     * @param e - A KeyboardEvent object.
     */
    private handleDelete;
    /**
     * Handles the backspace key.
     */
    private handleBackspace;
    /**
     * Appends a line break if the provided row is not the end of the document.
     *
     * @param value - A value where the line break will be appended.
     * @param row   - Optional. A row index.
     *
     * @return The value with the line break, or the provided value itself.
     */
    private appendLineBreak;
    /**
     * Settles the final value to apply.
     *
     * @param value - A value to settle.
     */
    private settleValue;
    /**
     * Settles the final position to apply.
     *
     * @param position - A position to settle.
     */
    private settlePosition;
    /**
     * Returns the current caret position.
     *
     * @return A position of the caret.
     */
    private getCaretPosition;
    /**
     * Sets the input state.
     * If the state with the provided type exists, new props will be assigne to it.
     *
     * @param type  - The type of the state.
     * @param props - Optional. An object with state values.
     */
    set(type: string, props?: Omit<InputState, 'type'>): void;
    /**
     * Returns the current state object.
     */
    get(): InputState | null;
    /**
     * Applies the current input state to the editor.
     *
     * @param state - Optional. A new state to apply.
     */
    apply(state?: InputState): void;
    /**
     * Inserts a text at the current or specified index.
     *
     * @param text  - A text to insert.
     * @param index - Optional. An index where the text is inserted.
     */
    insert(text: string, index?: number): void;
    /**
     * Returns a character at the current caret position or specified col index.
     *
     * @param col - Optional. A col index of the desired character.
     *
     * @return A character at the specified position.
     */
    char(col?: number): string;
    /**
     * Returns the value of the current line.
     *
     * @return A text of the current line.
     */
    get value(): string;
    /**
     * Sets a new value to the current line.
     *
     * @param value - A new value to set.
     */
    set value(value: string);
    /**
     * Returns the string of the current line before the caret position.
     *
     * @return The string before the caret.
     */
    get before(): string;
    /**
     * Returns the string of the current line after the caret position.
     *
     * @return The string after the caret.
     */
    get after(): string;
    /**
     * Returns the length of the current line.
     *
     * @return The length of the current line.
     */
    get length(): number;
    /**
     * Returns the current col index.
     *
     * @return The col index of the caret.
     */
    get col(): number;
    /**
     * Returns `true` if the input is disabled.
     *
     * @return `true` if the input is disabled.
     */
    get disabled(): boolean;
    /**
     * Makes the input disabled.
     * All keys are ignored while it is disabled.
     */
    set disabled(disabled: boolean);
}
//# sourceMappingURL=../../../../src/js/components/Input/Input.d.ts.map