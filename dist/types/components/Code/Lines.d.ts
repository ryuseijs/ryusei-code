import { Language, Options, Position, ScanResult, TokenInfo, TokenMatcher } from '@ryusei/code';
import { AbstractArrayLike } from '../../classes/AbstractArrayLike/AbstractArrayLike';
import { Editor } from '../../core/Editor/Editor';
import { EventBus } from '../../event/EventBus';
import { Line } from './Line';
/**
 * The class for managing data of all lines.
 *
 * @since 0.1.0
 */
export declare class Lines extends AbstractArrayLike<Line> {
    /**
     * Holds the setTimeout ids.
     */
    private readonly timers;
    /**
     * Holds the language object.
     */
    private readonly language;
    /**
     * Holds options.
     */
    private readonly options;
    /**
     * Holds the EventBus object.
     */
    private readonly event;
    /**
     * The Lines constructor.
     *
     * @param event    - An EventBus instance.
     * @param language - A Language object.
     * @param options  - Options.
     */
    constructor(event: EventBus<Editor>, language: Language, options: Options);
    /**
     * Inserts a new empty Line instance or instances at the specified row.
     *
     * @param row   - A row index.
     * @param count - A number of lines to insert.
     */
    insert(row: number, count?: number): void;
    /**
     * Deletes a Line instance or instances from the specified row.
     *
     * @param row   - A row index.
     * @param count - A number of lines to delete.
     */
    delete(row: number, count: number): void;
    /**
     * Syncs Line instances with the provided code.
     *
     * @param row    - A row index where sync starts.
     * @param code   - Code to sync.
     * @param limit  - Optional. Limits the number of lines to sync.
     * @param before - Optional. A pseudo line prepended to the code.
     * @param time   - Optional. A timestamp when the sync starts.
     *
     * @return `true` if the last line is changed, or otherwise `false`.
     */
    sync(row: number, code: string, limit?: number, before?: string, time?: number): boolean;
    /**
     * Starts an asynchronous sync process.
     *
     * @param id       - A worker ID.
     * @param row      - A row index where sync starts.
     * @param code     - Code to sync.
     * @param limit    - Optional. Limits the number of lines to sync.
     * @param before   - Optional. A pseudo line prepended to the code.
     * @param callback - Optional. A function called after syncing.
     */
    asyncSync(id: string, row: number, code: string, limit?: number, before?: string, callback?: () => void): void;
    /**
     * Finds the minimum indent string between the `startRow` and the `endRow`.
     *
     * @param startRow - A start row index to search from.
     * @param endRow   - An end row index to search to.
     *
     * @return A minimum indent string.
     */
    findMinIndent(startRow: number, endRow: number): string;
    /**
     * Returns a token info at the specified position.
     *
     * @param position - A position to search at.
     *
     * @return A TokenInfo if available, or otherwise `undefined`.
     */
    getInfoAt(position: Position): TokenInfo | undefined;
    /**
     * Searches backwards for a token that matches the matcher.
     * If the `counterpart` matcher is provided,
     * this method attempts to match the target and counterpart, such as `{` and `}`.
     *
     * @param position    - A position to start searching.
     * @param matcher     - A matcher.
     * @param counterpart - Optional. A matcher of the counter part.
     * @param depth       - Optional. Determines the initial depth.
     * @param limit       - Optional. Limits the number of lines to scan.
     *
     * @return A TokenInfo object if found, or `undefined` if not.
     */
    scanUp(position: Position, matcher: TokenMatcher, counterpart?: TokenMatcher, depth?: number, limit?: number): ScanResult | undefined;
    /**
     * Searches forwards for a token that matches the matcher.
     * If the `counterpart` matcher is provided,
     * this method attempts to match the target and counterpart, such as `{` and `}`.
     *
     * @param position    - A position to start searching.
     * @param matcher     - A matcher.
     * @param counterpart - Optional. A matcher of the counter part.
     * @param depth       - Optional. Determines the initial depth.
     * @param limit       - Optional. Limits the number of lines to scan.
     *
     * @return A TokenInfo object if found, or `undefined` if not.
     */
    scanDown(position: Position, matcher: TokenMatcher, counterpart?: TokenMatcher, depth?: number, limit?: number): ScanResult | undefined;
    /**
     * Searches for a start position where the split token actually starts.
     * If the token at the position is not split, this returns `undefined`.
     *
     * @param position - A position.
     *
     * @return A position where the split token starts if available.
     */
    findBlockStart(position: Position): Position | undefined;
    /**
     * Searches for an end position where the split token actually ends.
     * If the token at the position is not split, this returns `undefined`.
     *
     * @param position - A position.
     *
     * @return A position where the split token ends if available.
     */
    findBlockEnd(position: Position): Position | undefined;
    /**
     * Syncs the number of lines.
     *
     * @param row   - A row index.
     * @param value - A new size.
     *
     * @return Increased or decreased number of lines.
     */
    syncSize(row: number, value: number): number;
    /**
     * Destroys the instance.
     *
     * @internal
     */
    destroy(): void;
    /**
     * Sets the length of this Lines.
     * All overflown items will be removed from the end, or all missing items are added to the end as empty lines.
     *
     * @param value - A new length.
     */
    private setLength;
    /**
     * Checks if the passed 2 arrays with tokens are same or not.
     *
     * @param tokens1 - An array with tokens.
     * @param tokens2 - Another array with tokens.
     *
     * @return `true` if they are considered as same, or otherwise `false`.
     */
    private isSame;
}
//# sourceMappingURL=../../../../src/js/components/Code/Lines.d.ts.map