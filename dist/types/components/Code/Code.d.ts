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
     * Although the `Lines[ row ]` also returns the code at the row,
     * which is much faster than this method,
     * it may not be the latest before the `Sync` finishes syncing process.
     *
     * @param row - A row index.
     *
     * @return The text of the line at the specified row.
     */
    getLine(row: number): string;
    /**
     * Slices the code by the specified row range.
     *
     * @example
     * ```ts
     * // Gets lines from 1 to 9:
     * const code = Code.sliceLines( 2, 10 );
     * ```
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
     * @example
     * ```ts
     * const code = Code.sliceLines( [ 0, 1 ], [ 2, 9 ] );
     * ```
     *
     * @param start - A start position to start slicing a text.
     * @param end   - Optional. An end position to end slicing a text.
     *
     * @return A sliced text.
     */
    sliceRange(start: Position, end?: Position): string;
    /**
     * Replaces lines by the replacement text.
     * This method only modifies the raw value,
     * and you need to call `Sync#sync()` to apply the change to the editor.
     *
     * @example
     * Consider the following HTML as an example:
     *
     * ```html
     * <pre>
     * function message() {
     *   console.log( 'Hi!' );
     * }
     * </pre>
     * ```
     *
     * The following code replaces line 2 (the row index is `1`),
     * and syncs the change with the editor.
     *
     * ```ts
     * const ryuseiCode = new RyuseiCode();
     * ryuseiCode.apply( 'pre' );
     *
     * const { Code, Sync } = ryuseiCode.Editor.Components;
     *
     * setTimeout( () => {
     *   Code.replaceLines( 1, 1, `  console.log( 'Bye!' );\n` );
     *   Sync.sync( 1, 1 );
     * }, 2000 );
     * ```
     *
     * @param startRow    - A start row index.
     * @param endRow      - An end row index.
     * @param replacement - A replacement text.
     */
    replaceLines(startRow: number, endRow: number, replacement: string): void;
    /**
     * Replaces the code in a specified range by the replacement text.
     * This method only modifies the raw value,
     * and you need to call `Sync#sync()` to apply the change to the editor.
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
     * This method only modifies the raw value,
     * and you need to call `Sync#sync()` to apply the change to the editor.
     *
     * @example
     * Consider the following HTML as an example:
     *
     * ```html
     * <pre>
     * 1
     * 2
     * 3
     * </pre>
     * ```
     *
     * The following code replaces lines from `0` to `2` by an iteratee function:
     *
     * ```ts
     * const ryuseiCode = new RyuseiCode();
     * ryuseiCode.apply( 'pre' );
     *
     * const { Code, Sync } = ryuseiCode.Editor.Components;
     *
     * setTimeout( () => {
     *   Code.replaceLinesBy( 0, 2, line => `Line: ${ line }` );
     *   Sync.sync( 0, 2 );
     * }, 2000 );
     * ```
     *
     * The result will be:
     * ```none
     * Line: 1
     * Line: 2
     * Line: 3
     * ```
     *
     * @param startRow - A start row index.
     * @param endRow   - An end row index.
     * @param iteratee - An iteratee function invoked for each line.
     */
    replaceLinesBy(startRow: number, endRow: number, iteratee: (line: string, index: number, array: string[]) => string): void;
    /**
     * Searches the provided word or regexp and returns matched ranges.
     *
     * @example
     * ```html
     * <pre>
     * foo
     * bar
     * foo
     * </pre>
     * ```
     *
     * ```ts
     * const ryuseiCode = new RyuseiCode();
     * ryuseiCode.apply( 'pre' );
     *
     * const { Code } = ryuseiCode.Editor.Components;
     * const ranges = Code.search( 'foo' );
     *
     * // The ranges will contain 2 results:
     * // { start: [ 0, 0 ], end: [ 0, 3 ] }
     * // { start: [ 2, 0 ], end: [ 2, 3 ] }
     * ```
     *
     * @param search     - A string or a regexp object.
     * @param ignoreCase - Optional. Whether to perform case-insensitive search or not.
     * @param wholeWord  - Optional. Whether to only match a whole word or not.
     * @param limit      - Optional. Limits the number of matched results.
     *
     * @return An array with Range objects.
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