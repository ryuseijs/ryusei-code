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
     * @internal
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
     * Checks if the keyboard event matches keys of the provided action ID or not.
     *
     * @param e  - A KeyboardEvent object.
     * @param id - An ID.
     *
     * @return `true` if the keyboard event matches keys of the ID, or otherwise `false`.
     */
    matches(e: KeyboardEvent, id: string): boolean;
    /**
     * Builds a shortcut string that describes keys of the provided action ID or a KeyMatcher object.
     * For example, `undo` or `[ 'Z', true ]` will be `Ctrl+Z`.
     *
     * @param id - An action ID in the keymap or a KeyMatcher object line.
     *
     * @return A built shortcut string. If the ID is not available, it returns an empty string.
     */
    getShortcut(id: string | KeyMatcher): string;
}
//# sourceMappingURL=../../../../src/js/components/Keymap/Keymap.d.ts.map