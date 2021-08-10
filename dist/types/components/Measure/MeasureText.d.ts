/**
 * The utility class for measuring texts.
 *
 * @since 0.1.0
 */
export declare class MeasureText {
    /**
     * Holds the context object.
     */
    private context;
    /**
     * Stores width of characters.
     */
    private chars;
    /**
     * The MeasureText constructor.
     *
     * @param font - A font string for the context.
     */
    constructor(font: string);
    /**
     * Returns the width of the provided character.
     * Note that IE rounds the width of the text.
     *
     * @param char     - A character to measure.
     * @param useCache - Optional. Determines whether to use the cached width or not.
     *
     * @return The width of the character in pixel.
     */
    private getCharWidth;
    /**
     * Returns the width of the provided text.
     *
     * @param text     - A text to measure.
     * @param useCache - Optional. Determines whether to use the cached width or not.
     */
    measure(text: string, useCache?: boolean): number;
    /**
     * Clears cached width.
     */
    clear(): void;
}
//# sourceMappingURL=../../../../src/js/components/Measure/MeasureText.d.ts.map