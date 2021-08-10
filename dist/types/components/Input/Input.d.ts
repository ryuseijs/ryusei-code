import { Elements, InputState, TokenInfo } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
/**
 * The class for handling the user input.
 *
 * @since 0.1.0
 */
export declare class Input extends Component {
    /**
     * The `TokenInfo` object saved when any key is pressed.
     *
     * @readonly
     */
    info: TokenInfo | null;
    /**
     * Indicates whether the input is in composition session or not.
     *
     * @readonly
     */
    composing: boolean;
    /**
     * Keeps the latest focus line.
     *
     * @readonly
     */
    line: Element;
    /**
     * Keeps the latest focus row index.
     *
     * @readonly
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
     * @internal
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
     * @param value  - A value to settle.
     * @param endRow - An end row index.
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
     * If the state with the provided type exists, new props will be assigned to it.
     * The props object accepts following values:
     *
     * | State | Description |
     * |---|---|
     * | `key?` | The key that makes the input. |
     * | `startRow?` | The start row index to replace lines with the current value from. |
     * | `endRow?` | The end row index to replace lines with the current value to. |
     * | `value?` | The value to replace lines with. If omitted, the current value will be used. |
     * | `insertion?` | Specifies the value to insert at the caret position instead of setting the value. |
     * | `offset?` | The number of offset cols after the state is applied. |
     * | `position?` | Explicitly specifies the position after the state is applied. The `offset` will be ignored. |
     *
     * @param type  - The type of the state.
     * @param props - Optional. An object with state values.
     */
    set(type: string, props?: Omit<InputState, 'type'>): void;
    /**
     * Returns the current state object if available.
     *
     * @return The current state object if available, or `null` if not.
     */
    get(): InputState | null;
    /**
     * Applies the state to the editor and clears it.
     *
     * @example
     * ```ts
     * const ryuseiCode = new RyuseiCode();
     * ryuseiCode.apply( 'textarea' );
     *
     * ryuseiCode.on( 'focus', () => {
     *   const { Input } = ryuseiCode.Editor.Components;
     *
     *   setTimeout( () => {
     *     Input.apply( {
     *       insertion: 'foo',
     *       offset: 3,
     *     } );
     *   }, 1000 );
     * } );
     * ```
     *
     * @param state - Optional. A new state to apply.
     */
    apply(state?: InputState): void;
    /**
     * Returns a character at the current caret position or specified col index.
     *
     * @param col - Optional. A col index of the desired character.
     *
     * @return A character at the specified position.
     */
    char(col?: number): string;
    /**
     * Returns the value of the current line without the tailing line break.
     *
     * @return A text of the current line.
     */
    get value(): string;
    /**
     * Sets a new value to the current line.
     * In most cases, it's better to use `apply()` to edit the line instead
     * because this does not syncs the change to the editor.
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
     * @internal
     *
     * @return `true` if the input is disabled.
     */
    get disabled(): boolean;
    /**
     * Makes the input disabled.
     * All keys are ignored while it is disabled.
     *
     * @internal
     *
     * @param disabled - Determines whether to disable or enable the input.
     */
    set disabled(disabled: boolean);
}
//# sourceMappingURL=../../../../src/js/components/Input/Input.d.ts.map