import { EventBusCallback, Extensions, Language, Options, Position } from '@ryusei/code';
import { Editor } from '../Editor/Editor';
/**
 * The frontend class for the editor.
 *
 * @since 0.1.0
 */
export declare class RyuseiCode {
    /**
     * Stores all language objects.
     */
    private static languages;
    /**
     * Stores all Component classes.
     */
    private static Extensions;
    /**
     * Registers languages.
     *
     * @param languages - A language object or objects.
     */
    static register(languages: Language | Language[]): void;
    /**
     * Registers extensions.
     *
     * @param extensions - An object literal with extensions.
     */
    static compose(extensions: Partial<Extensions>): void;
    /**
     * Returns a Language object.
     *
     * @param id - The language ID.
     *
     * @return A Language object.
     */
    static get(id: string): Language;
    /**
     * Holds options.
     */
    options: Options;
    /**
     * Holds the Editor instance.
     */
    Editor: Editor;
    /**
     * Holds the language object.
     */
    language: Language;
    /**
     * The constructor.
     *
     * @param options - Optional. Options.
     */
    constructor(options?: Options);
    /**
     * Merges options with default values.
     *
     * @param options - Options to merge.
     */
    private merge;
    /**
     * Applies the editor to the target element.
     *
     * @param target - A selector or an element to apply the editor to.
     * @param code   - Optional. The code to overwrite the content of the target element.
     */
    apply(target: string | Element, code?: string): void;
    /**
     * Returns a HTML string for the editor.
     *
     * @param code - Initial code.
     *
     * @return A HTML string for the editor.
     */
    html(code: string): string;
    /**
     * Attaches an event handler to the editor event or events.
     *
     * @param events   - An event name or names separated by spaces. Use a dot(.) to add a namespace.
     * @param callback - A callback function.
     */
    on(events: string, callback: EventBusCallback): void;
    /**
     * Detaches an event handler registered by `on()`.
     *
     * @param events - An event name or names separated by spaces. Use a dot(.) to add a namespace.
     */
    off(events: string): void;
    /**
     * Saves the content to the source element.
     */
    save(): void;
    /**
     * Focuses to the editable area.
     *
     * @param reselect - Determines whether to reselect the last position or not.
     */
    focus(reselect?: boolean): void;
    /**
     * Sets the caret position or selection range.
     *
     * @param start - A start position as [ row, col ];
     * @param end   - Optional. An end position. If omitted, the selection will be collapsed to the start.
     */
    setRange(start: Position, end?: Position): void;
    /**
     * The alias of the `value` property that returns the current code as a string.
     *
     * @return The current code as a string.
     */
    toString(): string;
    /**
     * Destroys the code editor and releases the memory.
     * The final value is applied to the source element.
     */
    destroy(): void;
    /**
     * Sets the new value to the editor.
     *
     * @return The current code.
     */
    set value(code: string);
    /**
     * Returns the current code as a string.
     *
     * @return The current code.
     */
    get value(): string;
}
//# sourceMappingURL=../../../../src/js/core/RyuseiCode/RyuseiCode.d.ts.map