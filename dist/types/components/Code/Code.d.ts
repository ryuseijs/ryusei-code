import { Position, Range } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { Lines } from './Lines';
/**
 * The class for handling the raw text and syncing it to lines.
 *
 * @since 0.1.0
 */
export declare class Code extends Component {
    /**
     * Holds the text data.
     */
    protected text: string;
    /**
     * Holds the minimum row for asynchronous syncing.
     */
    protected minStart: number;
    /**
     * Holds the maximum row for asynchronous syncing.
     */
    protected maxEnd: number;
    /**
     * Caches the number of lines.
     */
    protected sizeCache: number;
    /**
     * The Lines instance.
     */
    Lines: Lines;
    /**
     * Sets a new value.
     *
     * @internal
     *
     * @param value - A new value.
     */
    init(value: string): void;
    /**
     * Returns a text before the specified row index, including the row itself.
     *
     * @param row - A row index.
     *
     * @return A sliced text.
     */
    before(row: number): string;
    /**
     * Returns a text after the specified row index, including the row itself.
     *
     * @param row - A row index.
     *
     * @return A sliced text.
     */
    after(row: number): string;
    /**
     * Returns the code at the row index.
     *
     * @param row - A row index.
     *
     * @return The text of the line at the specified row.
     */
    getLine(row: number): string;
    /**
     * Slices the code by the specified row range.
     *
     * @param startRow - A start row index to start slicing a text.
     * @param endRow   - An end row index to end slicing a text.
     *
     * @return A sliced text.
     */
    sliceLines(startRow: number, endRow: number): string;
    /**
     * Slices the code by the specified position range.
     *
     * @param start - A start position to start slicing a text.
     * @param end   - Optional. An end position to end slicing a text.
     *
     * @return A sliced text.
     */
    sliceRange(start: Position, end?: Position): string;
    /**
     * Replaces lines by the replacement text.
     *
     * @param startRow    - A start row index.
     * @param endRow      - An end row index.
     * @param replacement - A replacement text.
     */
    replaceLines(startRow: number, endRow: number, replacement: string): void;
    /**
     * Replaces the code in a specified range by the replacement text.
     *
     * @param start       - A start position.
     * @param end         - An end position.
     * @param replacement - A replacement text.
     */
    replaceRange(start: Position, end: Position, replacement: string): void;
    /**
     * Replaces lines by the iteratee function invoked for each line.
     * The returning string of the function will be used as a new line.
     *
     * @param startRow - A start row index.
     * @param endRow   - An end row index.
     * @param iteratee - An iteratee function invoked for each line.
     */
    replaceLinesBy(startRow: number, endRow: number, iteratee: (line: string, index: number, array: string[]) => string): void;
    /**
     * Searches the provided word or regexp.
     *
     * @param search     - A string or a regexp object.
     * @param ignoreCase - Optional. Whether to perform case-insensitive search or not.
     * @param wholeWord  - Optional. Whether to only match a whole word or not.
     * @param limit      - Optional. Limits the number of matched results.
     *
     * @return An array with tuples that contains `[ index, length ]`.
     */
    search(search: string | RegExp, ignoreCase?: boolean, wholeWord?: boolean, limit?: number): Range[];
    /**
     * Destroys the component.
     *
     * @internal
     */
    destroy(): void;
    /**
     * Converts the provided position to the text index.
     *
     * @param position - A position to convert.
     *
     * @return A converted index.
     */
    private positionToIndex;
    /**
     * Normalizes characters of line breaks.
     *
     * @param value - A value to normalize.
     *
     * @return A normalized text.
     */
    protected normalize(value: string): string;
    /**
     * Sets a new value.
     *
     * @param value - A value to set.
     */
    set value(value: string);
    /**
     * Returns the current code.
     *
     * @return The current code.
     */
    get value(): string;
    /**
     * Returns the number of lines by counting line breaks.
     *
     * @return The number of lines.
     */
    get size(): number;
}
//# sourceMappingURL=../../../../src/js/components/Code/Code.d.ts.map