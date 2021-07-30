import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
/**
 * The component for auto closing brackets.
 *
 * @since 0.1.0
 */
export declare class AutoClose extends Component {
    /**
     * Initializes the component.
     *
     * @param elements - A collection of essential elements.
     */
    mount(elements: Elements): void;
    /**
     * Closes the entered opening character.
     */
    private close;
    /**
     * Skips the entered close character if the next character is already the closing character.
     *
     * @param e - A KeyboardEvent object.
     */
    private skip;
    /**
     * Automatically removes the paired characters when the backspace key is pressed.
     *
     * @param e - A KeyboardEvent object.
     */
    private remove;
    /**
     * Returns an array with opening/closing characters.
     *
     * @param closing - Determines whether to get closing or opening characters.
     *
     * @return An array with characters.
     */
    private getChars;
    /**
     * Returns a closing string.
     *
     * @param index - A config index.
     *
     * @return A closing string. This may be empty.
     */
    private getClosingString;
    /**
     * Returns a number of characters to offset.
     *
     * @param index - A config index.
     *
     * @return The number of characters to offset.
     */
    private getOffset;
    /**
     * Executes the validator defined by the language data.
     *
     * @param index - A config index.
     * @param key   - A key of the validator.
     *
     * @return `true` if the input satisfies the validator, or otherwise `false`.
     */
    private validate;
    /**
     * Determines whether to proceed completion of quotes or not.
     * - RegExp: checks the string after the input quote.
     *
     * @param key - The key of the validator.
     *
     * @return `true` if the completion process should be proceeded, or otherwise `false`.
     */
    private validateQuote;
    /**
     * Returns the config array.
     *
     * @return A config array.
     */
    private getConfig;
}
//# sourceMappingURL=../../../../src/js/extensions/AutoClose/AutoClose.d.ts.map