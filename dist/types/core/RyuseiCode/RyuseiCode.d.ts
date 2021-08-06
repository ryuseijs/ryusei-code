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
     * Registers a language or languages.
     *
     * @example
     * ```js
     * import { RyuseiCode, javascript, html } from '@ryusei/code';
     *
     * RyuseiLight.register( javascript() );
     *
     * // Or pass an array:
     * RyuseiLight.register( [ javascript(), html() ] );
     * ```
     *
     * If you want to register all languages the `languages` object is helpful:
     *
     * ```js
     * import { RyuseiCode, languages } from '@ryusei/code';
     *
     * RyuseiLight.register( Object.values( languages ).map( lang => lang() ) );
     * ```
     *
     * @param languages - A Language object or an array with objects.
     */
    static register(languages: Language | Language[]): void;
    /**
     * Registers extensions.
     *
     * @example
     * ```js
     * import { RyuseiCode, ActiveLine, History } from '@ryusei/code';
     *
     * RyuseiLight.register( { ActiveLine, History } );
     * ```
     *
     * If you want to compose all extensions, the `Extensions` object is helpful:
     *
     * ```js
     * import { RyuseiCode, Extensions } from '@ryusei/code';
     *
     * RyuseiLight.register( Extensions );
     * ```
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
     * An object with all options.
     */
    options: Options;
    /**
     * The Editor instance.
     */
    Editor: Editor;
    /**
     * The Language object.
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
    private mergeOptions;
    /**
     * Applies the editor to the specified target element.
     *
     * @example
     * ```js
     * const ryuseiCode = new RyuseiCode();
     * ryuseiCode.apply( 'textarea' );
     *
     * // or
     * const textarea = document.querySelector( 'textarea' );
     * ryuseiCode.apply( textarea )
     * ```
     *
     * <div class="caution">
     * The instance can not have multiple targets.
     * If the <code>apply()</code> method is called twice to the same element, it throws an error.
     * </div>
     *
     * @param target - A selector or an element to apply the editor to.
     * @param code   - Optional. The code to overwrite the content of the target element.
     */
    apply(target: string | Element, code?: string): void;
    /**
     * Builds the HTML of the editor. This works without `document` and `window` objects,
     * but has no functionality.
     *
     * The [`maxInitialLine`](/guides/options#max-initial-lines) option limits the number of lines to generate.
     *
     * @param code - Initial code.
     *
     * @return A HTML string for the editor.
     */
    html(code: string): string;
    /**
     * Attaches an event handler to the editor event or events.
     *
     * ```js
     * // ke is the native KeyboardEvent object
     * ryuseiCode.on( 'keydown', ( e, ke ) => {
     *   console.log( ke.key );
     * } );
     *
     * // With a namespace:
     * ryuseiCode.on( 'keydown.myNamespace', ( e, ke ) => {
     *   console.log( ke.key );
     * } );
     * ```
     *
     * @param events   - An event name or names separated by spaces, or an array with event names.
     *                   Use a dot(.) to add a namespace.
     * @param callback - A callback function.
     */
    on(events: string | string[], callback: EventBusCallback): void;
    /**
     * Detaches an event handler registered by `on()`.
     *
     * ```js
     * // Detach all handlers:
     * ryuseiCode.off( 'keydown' );
     *
     * // Detach handlers only in the namespace:
     * ryuseiCode.off( 'keydown.myNamespace' );
     * ```
     *
     * @param events - An event name or names separated by spaces, or or an array with event names.
     *                 Use a dot(.) to add a namespace.
     */
    off(events: string | string[]): void;
    /**
     * Saves the content to the source element if available.
     *
     * For example, if you apply the editor to the empty `textarea` element,
     * it remains empty even after you edit the code by the editor.
     *
     * This method applies back the change to the `textarea` element.
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
     * @param start - A start position as `[ row, col ]`.
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
     * Saves the final value to the source element and destroys the editor for releasing the memory.
     */
    destroy(): void;
    /**
     * Sets a new value to the editor and refreshes it.
     *
     * @param value - A new value.
     */
    set value(value: string);
    /**
     * Returns the current value as a string.
     *
     * @return The current value.
     */
    get value(): string;
}
//# sourceMappingURL=../../../../src/js/core/RyuseiCode/RyuseiCode.d.ts.map