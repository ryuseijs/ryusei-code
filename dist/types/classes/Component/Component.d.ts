import { Elements, EventBusCallback, Extensions, IconSettings, KeyMatcher, Language, LanguageConfig, Options, Position } from '@ryusei/code';
import { AnyFunction } from '@ryusei/light/dist/types/types';
import { Caret, Chunk, Code, ContextMenu, Edit, Input, Keymap, Measure, Range, Scope, Selection, Style, Sync, View } from '../../components';
import { Lines } from '../../components/Code/Lines';
import { Editor } from '../../core/Editor/Editor';
import { EventBus } from '../../event/EventBus';
/**
 * The base class for a component.
 *
 * @since 0.1.0
 */
export declare class Component {
    /**
     * Holds the EventBus instance.
     */
    protected readonly event: EventBus;
    /**
     * Holds options.
     */
    protected readonly options: Options;
    /**
     * Holds the Editor instance.
     */
    protected Editor: Editor;
    /**
     * Holds the Caret instance.
     */
    protected Caret: Caret;
    /**
     * Holds the Chunk instance.
     */
    protected Chunk: Chunk;
    /**
     * Holds the Code instance.
     */
    protected Code: Code;
    /**
     * Holds the ContextMenu instance.
     */
    protected ContextMenu: ContextMenu;
    /**
     * Holds the Edit instance.
     */
    protected Edit: Edit;
    /**
     * Holds the Input instance.
     */
    protected Input: Input;
    /**
     * Holds the Input instance.
     */
    protected Keymap: Keymap;
    /**
     * Holds the Measure instance.
     */
    protected Measure: Measure;
    /**
     * Holds the Range instance.
     */
    protected Range: Range;
    /**
     * Holds the Scope instance.
     */
    protected Scope: Scope;
    /**
     * Holds the Selection instance.
     */
    protected Selection: Selection;
    /**
     * Holds the Style instance.
     */
    protected Style: Style;
    /**
     * Holds the Sync instance.
     */
    protected Sync: Sync;
    /**
     * Holds the View instance.
     */
    protected View: View;
    /**
     * Holds the collection of the editor elements.
     */
    protected elements: Elements;
    /**
     * Holds the Language object.
     */
    protected language: Language;
    /**
     * The Component constructor.
     *
     * @param Editor - An Editor instance.
     */
    constructor(Editor: Editor);
    /**
     * Called when the component is mounted.
     *
     * @param elements - A collection of editor elements.
     */
    mount(elements: Elements): void;
    /**
     * Attaches an event handler with passing this instance as a key.
     * All handlers can only be detached by the `off()` method below.
     *
     * @param events   - An event name or names.
     * @param callback - A callback function.
     * @param thisArg  - Optional. Specifies the `this` parameter of the callback function.
     * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
     */
    on<F extends EventBusCallback>(events: string | string[], callback: EventBusCallback, thisArg?: ThisParameterType<F>, priority?: number): void;
    /**
     * Detaches event handlers registered by `on()` without removing other handlers.
     *
     * @param events - An event name or names.
     */
    off(events: string | string[]): void;
    /**
     * Triggers callback functions.
     *
     * @param event - An event name.
     * @param args  - Optional. Any number of arguments to pass to callback functions.
     */
    emit(event: string, ...args: any[]): void;
    /**
     * Listens to native events.
     * All handlers will be stored for destruction.
     *
     * @param elm      - A document, a window or an element.
     * @param events   - An event name or names.
     * @param callback - A callback function.
     * @param thisArg  - Optional. Specifies the `this` parameter of the callback function.
     */
    bind<F extends (e: Event) => void>(elm: Document | Window | Element, events: string, callback: F, thisArg?: ThisParameterType<F>): void;
    /**
     * Returns a Language or LanguageConfig object at the specified position.
     *
     * @param position - Optional. A position.
     *
     * @return A main Language object or sub language config object.
     */
    getLanguage(position?: Position): Language | LanguageConfig;
    /**
     * Called when the editor is destroyed.
     */
    destroy(): void;
    /**
     * Attempts to invoke the method of the specified extension.
     *
     * @param name   - A name of the extension.
     * @param method - A method name to invoke.
     * @param args   - Optional. Arguments for the method.
     *
     * @return The return value of the method.
     */
    protected invoke<K extends keyof Extensions, P extends keyof Extensions[K], V extends Extensions[K][P]>(name: K, method: P, ...args: V extends AnyFunction ? Parameters<V> : any[]): V extends AnyFunction ? ReturnType<V> : void;
    /**
     * Returns the extension of the specified name.
     *
     * @param name - A name of an extension.
     *
     * @return An extension if found, or otherwise `undefined`.
     */
    protected require<K extends keyof Extensions>(name: K): Extensions[K] | undefined;
    /**
     * Adds default icon strings. They can be still overridden by options.
     *
     * @param icons - Additional icon strings.
     */
    protected addIcons(icons: Record<string, IconSettings>): void;
    /**
     * Adds default i18n strings. They can be still overridden by options.
     *
     * @param i18n - Additional i18n strings.
     */
    protected addI18n(i18n: Record<string, string>): void;
    /**
     * Adds default shortcuts to the keymap object. They can be still overridden by options.
     *
     * @param shortcuts - Additional shortcuts.
     */
    protected addKeyBindings(shortcuts: Record<string, KeyMatcher | KeyMatcher[]>): void;
    /**
     * Returns options for each component with merging default values.
     * If the returned value is `null`, that means the component should not be active.
     *
     * @param name     - An option name.
     * @param defaults - Default values.
     *
     * @return A merged options, or `null`.
     */
    protected getOptions<T extends object>(name: string, defaults?: T): T;
    /**
     * Returns the latest Lines instance.
     *
     * @return The Lines instance.
     */
    get lines(): Lines;
    /**
     * Returns the current i18n collection.
     *
     * @return An object with i18n strings.
     */
    get i18n(): Record<string, string>;
}
//# sourceMappingURL=../../../../src/js/classes/Component/Component.d.ts.map