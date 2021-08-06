import { Components, Elements, Extensions, Language, Options } from '@ryusei/code';
import { AnyFunction } from '@ryusei/light/dist/types/types';
import * as CoreComponents from '../../components';
import {
  CLASS_BACKGROUND,
  CLASS_BODY,
  CLASS_CONTAINER,
  CLASS_EDITOR,
  CLASS_EMPTY,
  CLASS_FOCUSED,
  CLASS_INITIALIZED,
  CLASS_LINES,
  CLASS_MOBILE,
  CLASS_OVERLAY,
  CLASS_READONLY,
  CLASS_RENDERED,
  CLASS_SCROLLER,
  CLASS_VIEW,
} from '../../constants/classes';
import {
  EVENT_BLUR,
  EVENT_CHANGED,
  EVENT_COMPOSITION_START,
  EVENT_DESTROYED,
  EVENT_FOCUS,
  EVENT_MOUNT,
  EVENT_MOUNTED,
  EVENT_READONLY,
  EVENT_RESET,
} from '../../constants/events';
import { PROJECT_CODE } from '../../constants/project';
import { EventBus } from '../../event/EventBus';
import {
  activeElement,
  addClass,
  assert,
  assign,
  attr,
  debounce,
  div,
  escapeHtml,
  focus,
  forOwn,
  hasClass,
  isFunction,
  isHTMLElement,
  isMobile,
  isString,
  isUndefined,
  nextTick,
  on,
  query,
  remove,
  removeClass,
  styles,
  text,
  toggleClass,
  uniqueId,
  unit,
} from '../../utils';
import { toggleEditable } from '../../utils/dom/toggleEditable/toggleEditable';
import { Renderer } from '../Renderer/Renderer';


/**
 * The debounce duration for evaluating `focusout` of the editor.
 *
 * @since 0.1.0
 */
const FOCUSOUT_DEBOUNCE_DURATION = 10;

/**
 * The core class for the editor.
 *
 * @since 0.1.0
 */
export class Editor {
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
  Components: Partial<Components> = {};

  /**
   * Holds Extension instances.
   */
  private Extensions: Partial<Extensions> = {};

  /**
   * An object with options.
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
  private _readOnly: boolean;

  /**
   * The Editor constructor.
   *
   * @param language   - A Language object.
   * @param options    - Options.
   * @param extensions - An object with additional components.
   */
  constructor( language: Language, options: Options, extensions: Partial<Extensions> = {} ) {
    this.language   = language;
    this.options    = options;
    this.event      = new EventBus( this );
    this.options.id = this.options.id || uniqueId( PROJECT_CODE );

    forOwn( CoreComponents, ( Component, name ) => {
      this.Components[ name ] = new Component( this );
    } );

    forOwn( extensions, ( Extension, name ) => {
      const value = this.options[ name.charAt( 0 ).toLowerCase() + name.slice( 1 ) ];

      if ( isUndefined( value ) || value ) {
        this.Extensions[ name ] = new Extension( this );
      }
    } );
  }

  /**
   * Initializes the editor and components.
   */
  private mount(): void {
    const { options, event, elements } = this;

    this.listen();
    event.emit( EVENT_MOUNT, elements );

    forOwn( this.Components, Component => {
      Component.mount( elements );
    } );

    forOwn( this.Extensions, Extension => {
      Extension.mount( elements );
    } );

    event.emit( EVENT_MOUNTED, elements );

    this.readOnly = options.readOnly;

    if ( options.autofocus ) {
      this.focus();
    }
  }

  /**
   * Collects essential elements that constitute the code editor.
   */
  private collect(): void {
    const { root } = this;
    const editor = query<HTMLDivElement>( root, `.${ CLASS_EDITOR }` );
    const lines  = query<HTMLDivElement>( root, `.${ CLASS_LINES }` );

    toggleEditable( lines, true );
    attr( lines, { tabindex: 0 } );

    this.elements = Object.freeze( {
      root,
      editor,
      lines,
      editable  : lines,
      view      : query<HTMLDivElement>( root, `.${ CLASS_VIEW }` ),
      body      : query<HTMLDivElement>( root, `.${ CLASS_BODY }` ),
      scroller  : query<HTMLDivElement>( root, `.${ CLASS_SCROLLER }` ),
      container : query<HTMLDivElement>( root, `.${ CLASS_CONTAINER }` ),
      overlay   : div( CLASS_OVERLAY, root ),
      background: div( { class: CLASS_BACKGROUND, 'aria-hidden': true }, editor ),
    } );
  }

  /**
   * Listens to some events.
   */
  private listen(): void {
    const { elements, elements: { root }, event } = this;
    const isFocused = this.isFocused.bind( this );

    let type: string;

    this.bind( root, 'pointerdown', () => {
      type = 'pointer';
    } );

    this.bind( elements.editor, 'click', () => {
      if ( ! isFocused() ) {
        this.focus( true );
      }
    } );

    this.bind( root, 'focusin', () => {
      if ( isFocused() && ! hasClass( root, CLASS_FOCUSED ) ) {
        addClass( root, CLASS_FOCUSED );
        event.emit( EVENT_FOCUS, type );
      }
    } );

    this.bind( root, 'focusout', debounce( () => {
      if ( ! isFocused() && hasClass( root, CLASS_FOCUSED ) ) {
        removeClass( root, CLASS_FOCUSED );
        event.emit( EVENT_BLUR );
        type = '';
      }
    }, FOCUSOUT_DEBOUNCE_DURATION ) );

    event.on( [ EVENT_MOUNTED, EVENT_CHANGED, EVENT_COMPOSITION_START, EVENT_RESET ], () => {
      nextTick( () => {
        toggleClass( root, CLASS_EMPTY, ! this.value && ! this.Components.Input.composing );
      } );
    } );
  }

  /**
   * Listens to native events.
   *
   * @param elm      - A document, a window or an element.
   * @param events   - An event name or names.
   * @param callback - A callback function.
   */
  private bind( elm: Document | Window | Element, events: string, callback: ( e: Event ) => void ): void {
    on( elm, events, callback, this );
  }

  /**
   * Applies the editor to the target element.
   *
   * @param target - A selector to find the target element, or a target element itself.
   * @param code   - Optional. The code to overwrite the content of the target element.
   */
  apply( target: string | Element, code?: string ): void {
    assert( ! this.root, 'Already initialized.' );

    const elm = isString( target ) ? query( document, target ) : target;

    if ( isHTMLElement( elm ) ) {
      this.source = elm;

      if ( hasClass( elm, CLASS_RENDERED ) ) {
        this.root = elm;
        const pre = query( elm, 'pre' );
        this.Components.Code.init( text( pre ) || '' );
        remove( pre );
      } else {
        elm.insertAdjacentHTML( 'afterend', this.html( isUndefined( code ) ? text( elm ) : code, false ) );
        styles( elm, { display: 'none' } );
        this.root = elm.nextElementSibling as HTMLElement;
      }

      addClass( this.root, [ CLASS_INITIALIZED, isMobile() ? CLASS_MOBILE : '' ] );

      this.collect();
      this.mount();
    } else {
      assert( false, `${ target } is invalid.` );
    }
  }

  /**
   * Builds the HTML of the editor. This works without `document` and `window` objects,
   * but has no functionality.
   *
   * The [`maxInitialLine`](/guides/options#max-initial-lines) option limits the number of lines to generate.
   *
   * @param code   - The code for the editor.
   * @param source - Optional. Whether to embed the source code into the editor or not.
   *
   * @return The HTML of the editor.
   */
  html( code: string, source?: boolean ): string {
    const { Code } = this.Components;
    Code.init( code );
    return new Renderer( Code, this.event, this.options ).html( source );
  }

  /**
   * Saves the content to the source element if available.
   *
   * For example, if you apply the editor to the empty `textarea` element,
   * it remains empty even after you edit the code by the editor.
   *
   * This method applies back the change to the `textarea` element.
   */
  save(): void {
    const { source, value } = this;

    if ( source instanceof HTMLTextAreaElement ) {
      source.value = value;
    } else {
      text( source, escapeHtml( value ) );
    }
  }

  /**
   * Sets focus on the editor.
   *
   * @param reselect - Determines whether to reselect the last position or not.
   */
  focus( reselect?: boolean ): void {
    if ( reselect ) {
      this.Components.Selection.reselect();
    } else {
      focus( this.elements.editable );
    }
  }

  /**
   * Removes the focus from the editor.
   */
  blur(): void {
    const elm = activeElement();

    if ( this.isFocused() && isHTMLElement( elm ) ) {
      elm.blur();
    }
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
  invoke<K extends keyof Extensions, P extends keyof Extensions[ K ], V extends Extensions[ K ][ P ]>(
    name: K,
    method: P,
    ...args: V extends AnyFunction ? Parameters<V> : any[]
  ): V extends AnyFunction ? ReturnType<V> : void {
    const extension = this.Extensions[ name ];

    if ( extension && isFunction( extension[ method ] ) ) {
      return extension[ method ]( ...args );
    }
  }

  /**
   * Returns the extension.
   * In terms of the "loose coupling", you'd better try not to use this method.
   * Using events is enough in most cases.
   *
   * @param name - A name of an extension.
   *
   * @return The specified extension if found, or otherwise `undefined`.
   */
  require<K extends keyof Extensions>( name: K ): Extensions[ K ] | undefined {
    return this.Extensions[ name ];
  }

  /**
   * Checks if the editor has focus or not.
   *
   * @return `true` if the editor has focus, or otherwise `false`.
   */
  isFocused(): boolean {
    return this.root.contains( activeElement() );
  }

  /**
   * Saves the final value to the source element and destroys the editor for releasing the memory.
   */
  destroy(): void {
    const { event } = this;

    this.save();

    forOwn( assign( this.Components, this.Extensions ), Component => {
      Component.destroy();
    } );

    delete this.Components;
    delete this.Extensions;

    styles( this.source, { display: '' } );
    remove( this.elements.root );

    event.emit( EVENT_DESTROYED );
    event.destroy();
  }

  /**
   * Sets a new value to the editor and resets the editor.
   *
   * @param value - A new value.
   */
  set value( value: string ) {
    const { Components, Components: { Code, Selection } } = this;
    Code.value = value;

    Components.View.jump( 0 );
    Components.Sync.sync( 0, Code.size - 1 );

    if ( this.isFocused() ) {
      Selection.set( [ 0, 0 ] );
    } else {
      Selection.update( [ 0, 0 ], [ 0, 0 ], true );
    }

    this.event.emit( EVENT_RESET );
  }

  /**
   * Returns the current value of the editor.
   *
   * @return The current value.
   */
  get value(): string {
    return this.Components.Code.value;
  }

  /**
   * Sets width of the root element.
   *
   * @param width - Width to set in pixel or in the CSS format, such as '50%'.
   */
  set width( width: number | string ) {
    styles( this.root, { width: unit( width ) } );
    this.Components.View.emitResize();
  }

  /**
   * Returns the width of the editor in pixel.
   *
   * @return The width of the editor in pixel.
   */
  get width(): number {
    return this.root.clientWidth;
  }

  /**
   * Sets the height of the root element.
   *
   * @param height - Height to set in pixel or in the CSS format, such as '50%'.
   */
  set height( height: number | string ) {
    styles( this.root, { height: unit( height ) } );
    this.Components.View.emitResize();
  }

  /**
   * Returns the height of the editor in pixel.
   *
   * @return The height of the editor.
   */
  get height(): number {
    return this.root.clientHeight;
  }

  /**
   * Makes the editor mutable or immutable.
   * In the read-only mode, the primary caret gets hidden.
   *
   * @param readOnly - Whether to make the editor immutable or mutable.
   */
  set readOnly( readOnly: boolean ) {
    const { elements } = this;

    toggleClass( elements.root, CLASS_READONLY, readOnly );
    toggleEditable( elements.editable, ! readOnly );

    this._readOnly = readOnly;
    this.event.emit( EVENT_READONLY, readOnly );
  }

  /**
   * Indicates whether the editor is read-only or not.
   *
   * @return - `true` if the editor is read-only or `false` if not.
   */
  get readOnly(): boolean {
    return this._readOnly;
  }
}
