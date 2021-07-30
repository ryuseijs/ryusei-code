import { Elements, KeyMatcher } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
/**
 * The component for detecting keyboard shortcuts and distributing them as internal events.
 *
 * @since 0.1.0
 */
export declare class Keymap extends Component {
    /**
     * Stores the target keys.
     */
    private keys;
    /**
     * The collection of shortcuts.
     */
    private keymap;
    /**
     * Initializes the component.
     *
     * @param elements - A collection of essential elements.
     */
    mount(elements: Elements): void;
    /**
     * Called when any key is pressed.
     *
     * @param e  - An EventBusEvent object.
     * @param ke - A KeyboardEvent object.
     */
    private onKeydown;
    /**
     * Finds the shortcut action from keymap definition.
     *
     * @param e - A KeyboardEvent object.
     *
     * @return A found action.
     */
    private find;
    /**
     * Checks if the keyboard event matches keys of the provided ID or not.
     *
     * @param e  - A KeyboardEvent object.
     * @param id - An ID.
     *
     * @return `true` if the keyboard event matches keys of the ID, or otherwise `false`.
     */
    matches(e: KeyboardEvent, id: string): boolean;
    /**
     * Builds a shortcut that describes keys of the provided keymap ID or a KeyMatcher object.
     * For example, `undo` or `[ 'Z', true ]` will be `Ctrl + Z`.
     *
     * @param id - An ID in a keymap or a KeyMatcher object.
     *
     * @return A built shortcut as a string.
     */
    getShortcut(id: string | KeyMatcher): string;
}
//# sourceMappingURL=../../../../src/js/components/Keymap/Keymap.d.ts.map