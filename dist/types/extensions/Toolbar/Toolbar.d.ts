import { ToolbarGroupData } from '@ryusei/code';
import { UIComponent } from '../../classes/UIComponent/UIComponent';
/**
 * The class for creating a toolbar.
 *
 * @since 0.1.0
 */
export declare class Toolbar extends UIComponent<ToolbarGroupData> {
    /**
     * Holds the toolbar element.
     */
    private body;
    /**
     * Listens to some events and receives requests from other components.
     */
    protected listen(): void;
    /**
     * Creates toolbar elements.
     *
     * @link https://www.w3.org/TR/wai-aria-1.2/#toolbar
     */
    protected create(): void;
    /**
     * Appends the group element to the body element instead of the wrapper element.
     *
     * @param group - A group ID.
     */
    protected append(group: string): void;
    /**
     * Resizes the scroller according to the toolbar height.
     */
    private resize;
    /**
     * Registers a group to the toolbar.
     *
     * @param group - A group ID.
     * @param elm   - An element to register.
     * @param label - A label of the toolbar.
     */
    register(group: string, elm: HTMLDivElement, label: string): void;
    /**
     * Displays the toolbar.
     *
     * @param group - A group ID to display.
     */
    show(group: string): void;
    /**
     * Hides the toolbar.
     */
    hide(): void;
}
//# sourceMappingURL=../../../../src/js/extensions/Toolbar/Toolbar.d.ts.map