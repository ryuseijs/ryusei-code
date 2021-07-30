import { EventBusCallback, Extensions, Language, Options, Position } from '@ryusei/code';
import { DEFAULT_OPTIONS } from '../../constants/defaults';
import { assert, assign, forOwn, isObject, isUndefined, toArray } from '../../utils';
import { Editor } from '../Editor/Editor';


/**
 * The frontend class for the editor.
 *
 * @since 0.1.0
 */
export class RyuseiCode {
  /**
   * Stores all language objects.
   */
  private static languages: Record<string, Language> = {};

  /**
   * Stores all Component classes.
   */
  private static Extensions: Partial<Extensions> = {};

  /**
   * Registers languages.
   *
   * @param languages - A language object or objects.
   */
  static register( languages: Language | Language[] ): void {
    toArray( languages ).forEach( language => {
      const { language: lang, id } = language;

      if ( ! RyuseiCode.languages[ id ] ) {
        ( lang.alias || [] ).concat( id ).forEach( ( id: string ) => {
          RyuseiCode.languages[ id ] = language;
        } );
      }
    } );
  }

  /**
   * Registers extensions.
   *
   * @param extensions - An object literal with extensions.
   */
  static compose( extensions: Partial<Extensions> ): void {
    forOwn( extensions, ( Extension, name ) => {
      RyuseiCode.Extensions[ name ] = Extension;
    } );
  }

  /**
   * Returns a Language object.
   *
   * @param id - The language ID.
   *
   * @return A Language object.
   */
  static get( id: string ): Language {
    const { languages } = RyuseiCode;
    assert( languages[ id ], `${ id } was not found.` );
    return languages[ id ];
  }

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
  constructor( options?: Options ) {
    this.mergeOptions( options );
    this.language = RyuseiCode.get( this.options.language );
    this.Editor   = new Editor( this.language, this.options, RyuseiCode.Extensions );
  }

  /**
   * Merges options with default values.
   *
   * @param options - Options to merge.
   */
  private mergeOptions( options: Options | undefined ): void {
    this.options = assign( {}, DEFAULT_OPTIONS );

    forOwn( options, ( value, key ) => {
      if ( ! isUndefined( value ) ) {
        if ( isObject( DEFAULT_OPTIONS[ key ] ) ) {
          if ( isObject( value ) ) {
            this.options[ key ] = assign( {}, DEFAULT_OPTIONS[ key ], value );
          }
        } else {
          this.options[ key ] = value;
        }
      }
    } );
  }

  /**
   * Applies the editor to the target element.
   *
   * @param target - A selector or an element to apply the editor to.
   * @param code   - Optional. The code to overwrite the content of the target element.
   */
  apply( target: string | Element, code?: string ): void {
    this.Editor.apply( target, code );
  }

  /**
   * Returns a HTML string for the editor.
   *
   * @param code - Initial code.
   *
   * @return A HTML string for the editor.
   */
  html( code: string ): string {
    return this.Editor.html( code, true );
  }

  /**
   * Attaches an event handler to the editor event or events.
   *
   * @param events   - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   * @param callback - A callback function.
   */
  on( events: string, callback: EventBusCallback ): void {
    this.Editor.event.on( events, callback );
  }

  /**
   * Detaches an event handler registered by `on()`.
   *
   * @param events - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   */
  off( events: string ): void {
    this.Editor.event.off( events );
  }

  /**
   * Saves the content to the source element.
   */
  save(): void {
    this.Editor.save();
  }

  /**
   * Focuses to the editable area.
   *
   * @param reselect - Determines whether to reselect the last position or not.
   */
  focus( reselect?: boolean ): void {
    this.Editor.focus( reselect );
  }

  /**
   * Sets the caret position or selection range.
   *
   * @param start - A start position as [ row, col ];
   * @param end   - Optional. An end position. If omitted, the selection will be collapsed to the start.
   */
  setRange( start: Position, end?: Position ): void {
    this.Editor.Components.Selection.set( start, end );
  }

  /**
   * The alias of the `value` property that returns the current code as a string.
   *
   * @return The current code as a string.
   */
  toString(): string {
    return this.value;
  }

  /**
   * Destroys the code editor and releases the memory.
   * The final value is applied to the source element.
   */
  destroy(): void {
    this.Editor.destroy();
    delete this.Editor;
  }

  /**
   * Sets the new value to the editor.
   *
   * @return The current code.
   */
  set value( code: string ) {
    this.Editor.value = code;
  }

  /**
   * Returns the current code as a string.
   *
   * @return The current code.
   */
  get value(): string {
    return this.Editor.value;
  }
}
