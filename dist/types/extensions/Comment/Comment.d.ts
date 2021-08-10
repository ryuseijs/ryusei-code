import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { Editor } from '../../core/Editor/Editor';
/**
 * The class for commenting out or uncommenting code.
 *
 * @since 0.1.0
 */
export declare class Comment extends Component {
    /**
     * The Comment constructor.
     *
     * @param Editor - An Editor instance.
     */
    constructor(Editor: Editor);
    /**
     * Initializes the component.
     *
     * @param elements - A collection of essential elements.
     */
    mount(elements: Elements): void;
    /**
     * Toggles block comments.
     * If the `start` or `end` position of the selection is inside a comment, unwraps the comment.
     * Otherwise, comments out the selection.
     */
    private toggleBlock;
    /**
     * Toggles line comments.
     */
    private toggleLine;
    /**
     * Comments out code between the start and end positions.
     *
     * @param start - A start position.
     * @param end   - An end position.
     * @param line  - Whether to use a line comment or not.
     */
    private commentOut;
    /**
     * Converts back the commented out code into the source code.
     *
     * @param start - A start position.
     * @param end   - An end position.
     * @param line  - Whether to use a line comment or not.
     */
    private uncomment;
    /**
     * Syncs the code to the viewport.
     *
     * @param start       - A start position
     * @param end         - An end position.
     * @param uncommented - Determines whether to sync code for uncommented or commented out lines.
     * @param line        - Determines whether to sync code for line or block comments.
     */
    private sync;
    /**
     * Returns the comment config object at the position.
     *
     * @param position - A position.
     * @param line     - Determines whether to get a line comment configuration or not.
     *
     * @return An object with `start` and `end` that represent a comment syntax.
     */
    private getConfig;
    /**
     * Detects the range of a block comment around the provided position.
     *
     * @param position - A position that may be inside a block comment.
     *
     * @return A Range object if the passed position is inside a block comment.
     *         Otherwise, `null`.
     */
    private detectBlockComment;
    /**
     * Detects the range of a line comment at the provided position.
     * This method does not care that the code is actually categorized as a comment,
     * but only care about the representation of the line comment.
     *
     * @param position - A position that may be on the line containing a line comment.
     *
     * @return A Range object if the row contains a line comment. Otherwise, `null`.
     */
    private detectLineComment;
}
//# sourceMappingURL=../../../../src/js/extensions/Comment/Comment.d.ts.map