/**
 * The class for normalizing different copy/paste behaviours in browsers.
 *
 * @since 0.1.0
 */
export declare class Clipboard {
    /**
     * Creates a temporary textarea element.
     *
     * @param text - A value for the textarea.
     *
     * @return A created element.
     */
    protected create(text: string): HTMLTextAreaElement;
    /**
     * Pastes the text via execCommand for old browsers.
     *
     * @return A pasted text.
     */
    protected execPaste(): string;
    /**
     * Copies the provided text via execCommand for old browsers.
     *
     * @param text     - A text to copy.
     * @param onFailed - Optional. A callback fired when copy failed.
     */
    protected execCopy(text: string, onFailed?: () => void): void;
    /**
     * Pastes the clipboard text.
     *
     * @param onPaste - A callback fired after pasting a text, taking a pasted value as the first argument.
     */
    paste(onPaste: (text: string) => void): void;
    /**
     * Copies the passed text.
     *
     * @param text     - A text to copy.
     * @param onFailed - Optional. A callback fired when copy failed.
     */
    copy(text: string, onFailed?: () => void): void;
}
//# sourceMappingURL=../../../../src/js/components/Edit/Clipboard.d.ts.map