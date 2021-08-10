import { Options, Token, TokenInfo } from '@ryusei/code';
/**
 * The class for managing data of each line.
 *
 * @since 0.1.0
 */
export declare class Line {
    /**
     * Holds options.
     */
    private readonly options;
    /**
     * Holds the last update time.
     */
    private time;
    /**
     * Keeps the built HTML string.
     */
    private htmlCache;
    /**
     * Keeps the built text.
     */
    private textCache;
    /**
     * Holds the depth of the first token.
     */
    depth: number;
    /**
     * Holds tokens.
     */
    tokens: readonly Token[];
    /**
     * A language of the first token.
     */
    language: string;
    /**
     * Indicates whether the first token is split into multilines or not.
     */
    split: boolean;
    /**
     * Depth of tabs.
     */
    indentDepth: number;
    /**
     * The Line constructor.
     *
     * @param options - Options.
     */
    constructor(options: Options);
    /**
     * Initializes some properties.
     */
    protected init(): void;
    /**
     * Sets new tokens and initializes properties.
     * To avoid updating tokens by the old value made by async processes,
     * pass the update time with `Date.now()`.
     *
     * @param tokens - An array with tokens.
     * @param time   - Optional. If this time is older than the current time, tokens will not be updated.
     */
    set(tokens: readonly Token[], time?: number): void;
    /**
     * Returns the indent of the line if available.
     *
     * @return An indent string if available, or an empty string if not.
     */
    getIndent(): string;
    /**
     * Returns the TokenInfo object at the index.
     *
     * @param index - A token index.
     *
     * @return A TokenInfo object if available, or `undefined` if not.
     */
    getInfo(index: number): TokenInfo | undefined;
    /**
     * Returns the TokenInfo object at the col index.
     *
     * @param col - A col index.
     *
     * @return A TokenInfo object if available, or `undefined` if not.
     */
    getInfoAt(col: number): TokenInfo | undefined;
    /**
     * Checks if the line contains only a line break/spaces or not.
     *
     * @return `true` if the line contains only a line break or spaces. Otherwise, `false`.
     */
    isEmpty(): boolean;
    /**
     * Builds the HTML by tokens.
     * This should not be pre-built in the init function for better performance.
     *
     * @return The HTML string of the line.
     */
    get html(): string;
    /**
     * Builds the text by tokens.
     *
     * @return The text of the line.
     */
    get text(): string;
    /**
     * Returns the first token.
     *
     * @return The first token.
     */
    get first(): Token;
}
//# sourceMappingURL=../../../../src/js/components/Code/Line.d.ts.map