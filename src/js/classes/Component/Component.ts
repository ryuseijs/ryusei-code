import {
  Elements,
  EventBusCallback,
  Extensions,
  IconSettings, KeyMatcher,
  Language,
  LanguageConfig,
  Options,
  Position,
} from '@ryusei/code';
import { AnyFunction } from '@ryusei/light/dist/types/types';
import {
  Caret,
  Chunk,
  Code,
  ContextMenu,
  Edit,
  Input,
  Keymap,
  Measure,
  Range,
  Scope,
  Selection,
  Style,
  Sync,
  View,
} from '../../components';
import { Lines } from '../../components/Code/Lines';
import { Editor } from '../../core/Editor/Editor';
import { EventBus } from '../../event/EventBus';
import { assert, assign, forOwn, isObject, isUndefined, off, on } from '../../utils';


/**
 * The base class for a component.
 *
 * @since 0.1.0
 */
export class Component {
  /**
   * The EventBus instance.
   * Use `on()`, `off()` and `emit()` methods instead of this.
   */
  protected readonly event: EventBus<Editor>;

  /**
   * The collection of all options.
   */
  protected readonly options: Options;

  /**
   * The Editor instance.
   */
  protected Editor: Editor;

  /**
   * The Caret instance.
   */
  protected Caret: Caret;

  /**
   * The Chunk instance.
   */
  protected Chunk: Chunk;

  /**
   * The Code instance.
   */
  protected Code: Code;

  /**
   * The ContextMenu instance.
   */
  protected ContextMenu: ContextMenu;

  /**
   * The Edit instance.
   */
  protected Edit: Edit;

  /**
   * The Input instance.
   */
  protected Input: Input;

  /**
   * The Input instance.
   */
  protected Keymap: Keymap;

  /**
   * The Measure instance.
   */
  protected Measure: Measure;

  /**
   * The Range instance.
   */
  protected Range: Range;

  /**
   * The Scope instance.
   */
  protected Scope: Scope;

  /**
   * The Selection instance.
   */
  protected Selection: Selection;

  /**
   * The Style instance.
   */
  protected Style: Style;

  /**
   * The Sync instance.
   */
  protected Sync: Sync;

  /**
   * The View instance.
   */
  protected View: View;

  /**
   * The collection of essential editor elements.
   */
  protected elements: Elements;

  /**
   * The Language object.
   */
  protected language: Language;

  /**
   * The Component constructor.
   *
   * @param Editor - An Editor instance.
   */
  constructor( Editor: Editor ) {
    this.Editor   = Editor;
    this.event    = Editor.event;
    this.options  = Editor.options;
    this.language = Editor.language;
  }

  /**
   * Called when the component is mounted.
   *
   * @param elements - A collection of editor elements.
   */
  mount( elements: Elements ): void {
    this.elements = elements;

    forOwn( this.Editor.Components, ( Component, key ) => {
      this[ key ] = Component;
    } );
  }

  /**
   * Called when the editor is destroyed.
   *
   * @internal
   */
  destroy(): void {
    off( null, '', this );
  }

  /**
   * Attaches an event handler to an event or events with passing this instance as a key.
   * They can only be detached by the `off()` member method.
   *
   * @param events   - An event name, names split by spaces, or an array with names.
   * @param callback - A callback function.
   * @param thisArg  - Optional. Specifies the `this` parameter of the callback function.
   * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
   */
  protected on<F extends EventBusCallback>(
    events: string | string[],
    callback: EventBusCallback,
    thisArg?: ThisParameterType<F>,
    priority?: number
  ): void {
    this.event.on( events, thisArg ? callback.bind( thisArg ) : callback, this, priority );
  }

  /**
   * Detaches handlers registered by `on()` without removing handlers attached by other components.
   *
   * @param events - An event name, names split by spaces, or an array with names.
   */
  protected off( events: string | string[] ): void {
    this.event.off( events, this );
  }

  /**
   * Triggers handlers attached to the event.
   *
   * @param event - An event name.
   * @param args  - Optional. Any number of arguments to pass to callback functions.
   */
  protected emit( event: string, ...args: any[] ): void {
    this.event.emit( event, ...args );
  }

  /**
   * Listens to native events.
   * This method stores all listeners and automatically removes them on destruction.
   *
   * @param elm      - A document, a window or an element.
   * @param events   - An event name or names split by spaces.
   * @param callback - A callback function.
   * @param thisArg  - Optional. Specifies the `this` parameter of the callback function.
   */
  protected bind<F extends ( e: Event ) => void>(
    elm: Document | Window | Element,
    events: string,
    callback: F,
    thisArg?: ThisParameterType<F>
  ): void {
    on( elm, events, thisArg ? callback.bind( thisArg ) : callback, this );
  }

  /**
   * Returns a Language or LanguageConfig object at the focus or specified position.
   * This method can return different objects depending on the position
   * if the language allows to embed other languages, such as HTML and PHP.
   *
   * @param position - Optional. Specifies the position to get the language at.
   *
   * @return A main Language object or sub language config object.
   */
  protected getLanguage( position?: Position ): Language | LanguageConfig {
    position = position || this.Selection.focus;

    const { language } = this;
    const info = this.lines.getInfoAt( position );

    if ( info && info.language && language.use && language.use[ info.language ] ) {
      return language.use[ info.language ].config;
    }

    return language;
  }

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
  protected invoke< K extends keyof Extensions, P extends keyof Extensions[ K ], V extends Extensions[ K ][ P ]>(
    name: K,
    method: P,
    ...args: V extends AnyFunction ? Parameters<V> : any[]
  ): V extends AnyFunction ? ReturnType<V> : void {
    return this.Editor.invoke( name, method, ...args );
  }

  /**
   * Returns the specified extension.
   * In terms of the "loose coupling", you'd better try not to use this method.
   * Using events is enough in most cases.
   *
   * @param name - A name of an extension.
   *
   * @return An extension if found, or otherwise `undefined`.
   */
  protected require<K extends keyof Extensions>( name: K ): Extensions[ K ] | undefined {
    return this.Editor.require( name );
  }

  /**
   * Adds default icon strings. They can be still overridden by options.
   * The IconSettings is a tuple as `[ string, number?, string? ]` corresponding with `[ path, stroke?, linecap? ]`.
   *
   * @example
   * ```ts
   * this.addIcons( {
   *   myIcon: [
   *     'm19 18-14-13m0 13 14-13',
   *     3,
   *   ],
   * } );
   * ```
   *
   * @param icons - Icon settings to add.
   */
  protected addIcons( icons: Record<string, IconSettings> ): void {
    const { options } = this;
    options.icons = assign( {}, icons, options.icons );
  }

  /**
   * Adds default i18n strings. They can be still overridden by options.
   *
   * @example
   * ```ts
   * this.addI18n( {
   *   myMessage: 'Hello!',
   * } );
   * ```
   *
   * @param i18n - Additional i18n strings.
   */
  protected addI18n( i18n: Record<string, string> ): void {
    const { options } = this;
    options.i18n = assign( {}, i18n, options.i18n );
  }

  /**
   * Adds default shortcuts to the keymap object. They can be still overridden by options.
   * Call this method before RyuseiCode mounts components so that the Keymap component recognizes shortcuts.
   *
   * @example
   * ```js
   * class MyExtension extends Component {
   *   constructor( Editor ) {
   *     super( Editor );
   *
   *     this.addKeyBindings( {
   *       myShortcut: [ 'P', true, true ],
   *     } );
   *   }
   * }
   * ```
   *
   * @param shortcuts - Additional shortcuts.
   */
  protected addKeyBindings( shortcuts: Record<string, KeyMatcher | KeyMatcher[]> ): void {
    const { options } = this;
    options.keymap = assign( {}, shortcuts, options.keymap );
  }

  /**
   * Returns options for each extension, merging provided default values.
   *
   * @example
   * ```js
   * class MyExtension extends Component {
   *   constructor( Editor ) {
   *     super( Editor );
   *
   *     const extensionOptions = this.getOptions( 'myExtension', { option1: true } );
   *   }
   * }
   * ```
   *
   * @param name     - An option name.
   * @param defaults - Default values.
   *
   * @return A merged options, or `null`.
   */
  protected getOptions<T extends object>( name: string, defaults?: T ): T {
    const options = this.options[ name ];

    if ( isUndefined( options ) || options === true ) {
      return defaults || {} as T;
    }

    if ( isObject( options ) ) {
      return assign( {}, defaults, options );
    }

    assert( false );
  }

  /**
   * Returns the latest Lines instance.
   * This is an alias of `Code#Lines`.
   *
   * @return The Lines instance.
   */
  get lines(): Lines {
    return this.Code.Lines;
  }

  /**
   * Returns the i18n collection.
   * This is an alias of `this.options.i18n`.
   *
   * @return The object with i18n strings.
   */
  get i18n(): Record<string, string> {
    return this.options.i18n;
  }
}
