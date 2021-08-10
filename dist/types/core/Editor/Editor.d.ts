import { Components, Elements, Extensions, Language, Options } from '@ryusei/code';
import { AnyFunction } from '@ryusei/light/dist/types/types';
import { EventBus } from '../../event/EventBus';
/**
 * The core class for the editor.
 *
 * @since 0.1.0
 */
export declare class Editor {
    /**
     * The collection of essential editor elements.
     *
     * <div class="caution">
     *   This collection is empty before components are mounted by the <code>Editor#apply()</code>.
     * </div>
     *
     * @readonly
     *
     * @example
     * ```ts
     * const ryuseiCode = new RyuseiCode();
     * ryuseiCode.apply( 'textarea' );
     *
     * const { scroller } = ryuseiCode.Editor.elements;
     * console.log( scroller.id );
     * ```
     */
    elements: Elements;
    /**
     * The collection of all core components.
     *
     * @readonly
     *
     * @example
     * ```ts
     * const ryuseiCode = new RyuseiCode();
     * const { Selection } = ryuseiCode.Editor.Components;
     * ```
     */
    Components: Partial<Components>;
    /**
     * Holds Extension instances.
     */
    private Extensions;
    /**
     * The collection of all options.
     */
    readonly options: Options;
    /**
     * The EventBus instance.
     * Although you can attach or detach event handlers by this instance,
     * `RyuseiCode#on()` or `RyuseiCode#off()` is more useful.
     */
    readonly event: EventBus<Editor>;
    /**
     * The source element where the editor has been applied to.
     */
    protected source: HTMLElement;
    /**
     * The root element of the editor that is same with the `elements.root`.
     */
    protected root: HTMLElement;
    /**
     * The Language object.
     */
    readonly language: Language;
    /**
     * Indicates whether the editor is readonly or not.
     */
    private _readOnly;
    /**
     * The Editor constructor.
     *
     * @param language   - A Language object.
     * @param options    - Options.
     * @param extensions - An object with additional components.
     */
    constructor(language: Language, options: Options, extensions?: Partial<Extensions>);
    /**
     * Initializes the editor and components.
     */
    private mount;
    /**
     * Collects essential elements that constitute the code editor.
     */
    private collect;
    /**
     * Listens to some events.
     */
    private listen;
    /**
     * Listens to native events.
     *
     * @param elm      - A document, a window or an element.
     * @param events   - An event name or names.
     * @param callback - A callback function.
     */
    private bind;
    /**
     * Applies the editor to the target element.
     *
     * @param target - A selector to find the target element, or a target element itself.
     * @param code   - Optional. The code to overwrite the content of the target element.
     */
    apply(target: string | Element, code?: string): void;
    /**
     * Builds the HTML of the editor. This works without `document` and `window` objects,
     * but has no functionality.
     *
     * The [`maxInitialLines`](/guides/options#max-initial-lines) option limits the number of lines to generate.
     *
     * @param code   - The code for the editor.
     * @param source - Optional. Whether to embed the source code into the editor or not.
     *
     * @return The HTML of the editor.
     */
    html(code: string, source?: boolean): string;
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
     * Sets focus on the editor.
     *
     * @param reselect - Determines whether to reselect the last position or not.
     */
    focus(reselect?: boolean): void;
    /**
     * Removes the focus from the editor.
     */
    blur(): void;
    /**
     * Attempts to invoke the public method of the specified extension.
     * In terms of the "loose coupling", you'd better try not to use this method.
     * Using events is enough in most cases.
     *
     * @example
     * ```ts
     * // Attempts to show the "search" toolbar.
     * Editor.invoke( 'Toolbar', 'show', 'search' );
     * ```
     *
     * @param name   - A name of the extension.
     * @param method - A method name to invoke.
     * @param args   - Optional. Arguments for the method.
     *
     * @return The return value of the method.
     */
    invoke<K extends keyof Extensions, P extends keyof Extensions[K], V extends Extensions[K][P]>(name: K, method: P, ...args: V extends AnyFunction ? Parameters<V> : any[]): V extends AnyFunction ? ReturnType<V> : void;
    /**
     * Returns the specified extension.
     * In terms of the "loose coupling", you'd better try not to use this method.
     * Using events is enough in most cases.
     *
     * @param name - A name of an extension.
     *
     * @return The specified extension if found, or otherwise `undefined`.
     */
    require<K extends keyof Extensions>(name: K): Extensions[K] | undefined;
    /**
     * Checks if the editor has focus or not.
     *
     * @return `true` if the editor has focus, or otherwise `false`.
     */
    isFocused(): boolean;
    /**
     * Saves the final value to the source element and destroys the editor for releasing the memory.
     */
    destroy(): void;
    /**
     * Sets a new value to the editor and resets the editor.
     *
     * @param value - A new value.
     */
    set value(value: string);
    /**
     * Returns the current value of the editor.
     *
     * @return The current value.
     */
    get value(): string;
    /**
     * Sets width of the root element.
     *
     * @param width - Width to set in pixel or in the CSS format, such as '50%'.
     */
    set width(width: number | string);
    /**
     * Returns the width of the editor in pixel.
     *
     * @return The width of the editor in pixel.
     */
    get width(): number;
    /**
     * Sets the height of the root element.
     *
     * @param height - Height to set in pixel or in the CSS format, such as '50%'.
     */
    set height(height: number | string);
    /**
     * Returns the height of the editor in pixel.
     *
     * @return The height of the editor.
     */
    get height(): number;
    /**
     * Makes the editor mutable or immutable.
     * In the read-only mode, the primary caret gets hidden.
     *
     * @param readOnly - Whether to make the editor immutable or mutable.
     */
    set readOnly(readOnly: boolean);
    /**
     * Indicates whether the editor is read-only or not.
     *
     * @return - `true` if the editor is read-only or `false` if not.
     */
    get readOnly(): boolean;
}
//# sourceMappingURL=../../../../src/js/core/Editor/Editor.d.ts.map