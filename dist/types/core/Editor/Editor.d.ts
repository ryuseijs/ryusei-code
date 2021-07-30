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
     * Holds collection of editor elements.
     */
    elements: Elements;
    /**
     * Holds Component instances.
     */
    Components: Partial<Components>;
    /**
     * Holds Extension instances.
     */
    private Extensions;
    /**
     * Holds options.
     */
    readonly options: Options;
    /**
     * Holds the EventBus instance.
     */
    readonly event: EventBus;
    /**
     * Holds the source element.
     */
    protected source: HTMLElement;
    /**
     * Holds the root element.
     */
    protected root: HTMLElement;
    /**
     * Holds the language object.
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
     * Returns HTML of the editor.
     * This may not contain all lines because IE can not render tons of HTML tags at the same time.
     * The number of lines can be specified by options.
     *
     * @param code   - A code string.
     * @param source - Optional. Whether to embed the source code into the editor or not.
     *
     * @return The HTML of the editor.
     */
    html(code: string, source?: boolean): string;
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
     * Removes the focus from the editor.
     */
    blur(): void;
    /**
     * Attempts to invoke the method of the specified extension.
     *
     * @param name   - A name of the extension.
     * @param method - A method name to invoke.
     * @param args   - Optional. Arguments for the method.
     *
     * @return The return value of the method.
     */
    invoke<K extends keyof Extensions, P extends keyof Extensions[K], V extends Extensions[K][P]>(name: K, method: P, ...args: V extends AnyFunction ? Parameters<V> : any[]): V extends AnyFunction ? ReturnType<V> : void;
    /**
     * Returns the extension of the specified name.
     *
     * @param name - A name of an extension.
     *
     * @return An extension if found, or otherwise `undefined`.
     */
    require<K extends keyof Extensions>(name: K): Extensions[K] | undefined;
    /**
     * Checks if the editor is focused or not.
     *
     * @return `true` if the editor is focused, or otherwise `false`.
     */
    isFocused(): boolean;
    /**
     * Destroys the editor.
     */
    destroy(): void;
    /**
     * Sets a new value to the editor.
     *
     * @param value - A value to set.
     */
    set value(value: string);
    /**
     * Returns the current value of the editor.
     *
     * @return The current value.
     */
    get value(): string;
    /**
     * Sets the width of the root element.
     *
     * @param width - Width to set as pixel or CSS styles.
     */
    set width(width: number | string);
    /**
     * Returns the width of the editor in pixel.
     *
     * @return The width of the editor.
     */
    get width(): number;
    /**
     * Sets the height of the root element.
     *
     * @param height - Height to set as pixel or CSS styles.
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
     *
     * @param readOnly - Whether to make the editor immutable or mutable.
     */
    set readOnly(readOnly: boolean);
    /**
     * Indicates whether the editor is disabled or not.
     *
     * @return - `true` if the input is read-only or `false` if not.
     */
    get readOnly(): boolean;
}
//# sourceMappingURL=../../../../src/js/core/Editor/Editor.d.ts.map