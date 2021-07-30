import { Component } from '../../classes/Component/Component';
/**
 * The class for syncing changes to Lines and View components.
 *
 * @since 0.1.0
 */
export declare class Sync extends Component {
    /**
     * Holds the minimum row for asynchronous syncing.
     */
    private minStart;
    /**
     * Holds the maximum row for asynchronous syncing.
     */
    private maxEnd;
    /**
     * Indicates whether the asynchronous syncing is on going or not.
     */
    private syncing;
    /**
     * Syncs the changes between the start and end rows to the Lines and View components.
     * Since the `startRow` can be very far from the `row` when pasting huge code,
     * syncs lines inaccurately by setting the `strict` to `false` at first,
     * and then starts strict synchronization.
     *
     * @param startRow  - A start row index.
     * @param endRow    - An end row index.
     * @param jumpTo    - Optional. Jumps to the specified row before starting synchronization.
     */
    sync(startRow: number, endRow: number, jumpTo?: number): void;
    /**
     * Starts the sync sequence.
     *
     * @param row    - A row index.
     * @param limit  - Limits the number of synchronously syncing.
     * @param strict - Optional. Determines whether the synchronization must be strict or not.
     */
    private run;
    /**
     * Asynchronously syncs lines between the provided range.
     * If the range is wider than the current running process, cancels it and starts a new process.
     *
     * @param startRow - A start row index.
     * @param endRow   - An end row index.
     */
    private syncLines;
    /**
     * Syncs provided ranges step by step.
     *
     * @param ranges   - An array with row ranges.
     * @param callback - Optional. A callback fired after the sync is completed.
     */
    private syncRanges;
    /**
     * Splits the provided row range into small fragments.
     *
     * @param startRow - A start row index.
     * @param endRow   - An end row index.
     *
     * @return An array with row ranges.
     */
    private splitRows;
    /**
     * Returns an info object to start syncing.
     *
     * @param row   - A row index.
     * @param limit - Limits the number of lines.
     *
     * @return An object with a start row index and code to prepend.
     */
    private find;
    /**
     * If the distance from the `row` to `startRow` is greater than the `limit`,
     * attempt to shorten the distance by generating pseudo code.
     *
     * @param startRow - A start row index.
     * @param row      - An original row index.
     * @param before   - A pseudo line to prepend.
     * @param limit    - A limit number of lines.
     *
     * @return An object with a start row index and code to prepend.
     */
    private compress;
    /**
     * Finds the likely appropriate index where tokenization should start.
     *
     * @param row   - A row index.
     * @param depth - Optional. Minimum depth of a line that can be a candidate.
     *
     * @return A better index for starting tokenization.
     */
    private findRoot;
    /**
     * Finds a sync start info in an embedded language block.
     *
     * @param row   - A row index.
     * @param limit - A limit number of lines.
     *
     * @return An object with a start row index and code to prepend.
     */
    private findStartInLanguageBlock;
    /**
     * Checks if the line at the specified row is inside an embedded block or not.
     *
     * @param row - A row index.
     *
     * @return `true` if the row is inside an embedded block, or otherwise `false`.
     */
    private isEmbedded;
}
//# sourceMappingURL=../../../../src/js/components/Sync/Sync.d.ts.map