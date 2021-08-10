import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { Editor } from '../../core/Editor/Editor';
/**
 * The ID for the "Jump to the Line" toolbar.
 *
 * @since 0.1.0
 */
export declare const TOOLBAR_ID = "jump-to-line";
/**
 * The throttle duration for applying the input result to the range.
 *
 * @since 0.1.0
 */
export declare const JUMP_DEBOUNCE_DURATION = 10;
/**
 * The class for jumping to the specific line.
 *
 * @since 0.1.0
 */
export declare class Jump extends Component {
    /**
     * Holds the Toolbar component.
     */
    private Toolbar;
    /**
     * Holds the input element.
     */
    private field;
    /**
     * Holds the location element.
     */
    private location;
    /**
     * The Indentation constructor.
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
     * Creates elements for the jump interface and registers the wrapper to the toolbar.
     */
    private create;
    /**
     * Listens to some events.
     */
    private listen;
    /**
     * Jumps to the line specified by the input.
     */
    private jump;
    /**
     * Updates the location.
     */
    private update;
}
//# sourceMappingURL=../../../../src/js/extensions/Jump/Jump.d.ts.map