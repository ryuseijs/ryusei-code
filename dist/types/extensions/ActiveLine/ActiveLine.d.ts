import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { Editor } from '../../core/Editor/Editor';
/**
 * The class name for the active line element.
 *
 * @since 0.1.0
 */
export declare const CLASS_ACTIVE_LINE: string;
/**
 * The component for activating/deactivating lines according to the current selection.
 *
 * @since 0.1.0
 */
export declare class ActiveLine extends Component {
    /**
     * Holds the active line element.
     */
    private line;
    /**
     * Keeps the previous top offset.
     */
    private top;
    /**
     * The ActiveLine constructor.
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
     * Activates the element.
     */
    private activate;
    /**
     * Offsets the active line element to the current focus node.
     */
    private offset;
    /**
     * Deactivates the element.
     */
    private deactivate;
    /**
     * Checks if the element is active or not.
     *
     * @return `true` if the element is active, or otherwise `false`.
     */
    private isActive;
}
//# sourceMappingURL=../../../../src/js/extensions/ActiveLine/ActiveLine.d.ts.map