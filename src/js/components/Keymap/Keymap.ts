import { Elements, EventBusEvent, KeyMatcher } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { EVENT_KEYDOWN, EVENT_KEYMAP } from '../../constants/events';
import { KEYMAP, MODIFIER_KEYS } from '../../constants/keymap';
import { Editor } from '../../core/Editor/Editor';
import { assign, forOwn, includes, isArray, isMac, isString, matchesKey, normalizeKey, toArray } from '../../utils';


/**
 * The component for detecting keyboard shortcuts and distributing them as internal events.
 *
 * @since 0.1.0
 */
export class Keymap extends Component {
  /**
   * Stores the target keys.
   */
  private keys: string[] = [];

  /**
   * The collection of shortcuts.
   */
  private keymap: Record<string, KeyMatcher| KeyMatcher[] | null | false>;

  /**
   * Initializes the component.
   *
   * @internal
   *
   * @param elements - A collection of essential elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );

    this.keymap = assign( {}, KEYMAP, this.options.keymap );

    forOwn( this.keymap, matchers => {
      if ( matchers ) {
        this.keys.push( ...toArray( matchers, true ).map( matcher => {
          return matcher[ 0 ].toUpperCase();
        } ) );
      }
    } );

    this.on( EVENT_KEYDOWN, this.onKeydown, this, 0 );
  }

  /**
   * Called when any key is pressed.
   *
   * @param e  - An EventBusEvent object.
   * @param ke - A KeyboardEvent object.
   */
  private onKeydown( e: EventBusEvent<Editor>, ke: KeyboardEvent ): void {
    if ( ! this.Editor.readOnly ) {
      if ( includes( this.keys, normalizeKey( ke.key ).toUpperCase() ) ) {
        const action = this.find( ke );

        if ( action ) {
          this.emit( `${ EVENT_KEYMAP }:${ action }`, ke, action );
        }
      }
    }
  }

  /**
   * Finds the shortcut action from keymap definition.
   *
   * @param e - A KeyboardEvent object.
   *
   * @return A found action.
   */
  private find( e: KeyboardEvent ): string {
    let action  = '';

    forOwn( this.keymap, ( matchers, id ) => {
      if ( this.matches( e, id ) ) {
        action = id;
        return false;
      }
    } );

    return action;
  }

  /**
   * Checks if the keyboard event matches keys of the provided action ID or not.
   *
   * @param e  - A KeyboardEvent object.
   * @param id - An ID.
   *
   * @return `true` if the keyboard event matches keys of the ID, or otherwise `false`.
   */
  matches( e: KeyboardEvent, id: string ): boolean {
    const matchers = this.keymap[ id ];
    return matchers && matchesKey( e, matchers );
  }

  /**
   * Builds a shortcut string that describes keys of the provided action ID or a KeyMatcher object.
   * For example, `undo` or `[ 'Z', true ]` will be `Ctrl+Z`.
   *
   * @param id - An action ID in the keymap or a KeyMatcher object line.
   *
   * @return A built shortcut string. If the ID is not available, it returns an empty string.
   */
  getShortcut( id: string | KeyMatcher ): string {
    const matchers = isString( id ) ? this.keymap[ id ] : id;

    if ( matchers ) {
      const matcher = isArray( matchers[ 0 ] ) ? matchers[ 0 ] : matchers as KeyMatcher;

      if ( matcher ) {
        const modifiers = MODIFIER_KEYS[ isMac() ? 'mac' : 'default' ];
        const keys      = matcher.slice( 1 ).map( ( use, index ) => use && modifiers[ index ] ).filter( Boolean );
        return keys.concat( matcher[ 0 ] ).join( '+' );
      }
    }

    return '';
  }
}
