import { Position } from '@ryusei/code';
import { Editor } from '../../core/Editor/Editor';
/**
 * The class for creating and controlling the caret element.
 *
 * @since 0.1.0
 */
export declare class CustomCaret {
    /**
     * The caret element.
     */
    readonly caret: HTMLDivElement;
    /**
     * Holds the Editor instance.
     */
    private readonly Editor;
    /**
     * Keeps the current position.
     */
    private position;
    /**
     * The Caret constructor.
     *
     * @param Editor - An Editor instance.
     * @param id     - An ID for the caret.
     * @param parent - A parent element where the caret is appended.
     */
    constructor(Editor: Editor, id: string, parent: HTMLElement);
    /**
     * Moves the caret to the specified position.
     *
     * @param position - A position to set as [ row, col ].
     */
    move(position: Position): void;
    /**
     * Displays the caret.
     */
    show(): void;
    /**
     * Hides the caret.
     */
    hide(): void;
    /**
     * Starts the blink animation by removing the `none` value from the `animation`.
     */
    private blink;
}
//# sourceMappingURL=../../../../src/js/components/Caret/CustomCaret.d.ts.map