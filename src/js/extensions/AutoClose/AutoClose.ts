import { AutoCloseConfig, Elements } from '@ryusei/code';
import { CATEGORY_STRING } from '@ryusei/light';
import { Component } from '../../classes/Component/Component';
import { EVENT_CHANGED, EVENT_KEYDOWN } from '../../constants/events';
import { compare, isArray, isFunction, isString, normalizeKey, prevent } from '../../utils';


/**
 * The component for auto closing brackets.
 *
 * @since 0.1.0
 */
export class AutoClose extends Component {
  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );

    this.on( EVENT_KEYDOWN, ( e, ke ) => {
      this.skip( ke );
      this.remove( ke );
    } );

    this.on( EVENT_CHANGED, ( e, type ) => {
      if ( type === 'input' ) {
        this.close();
      }
    } );
  }

  /**
   * Closes the entered opening character.
   */
  private close(): void {
    const { Input } = this;

    if ( ! Input.composing ) {
      const index = this.getChars( false ).indexOf( Input.get().key );

      if ( index > -1 && this.validate( index, 'close' ) ) {
        Input.apply( {
          type     : 'autoClose',
          insertion: this.getClosingString( index ),
          offset   : this.getOffset( index ),
        } );
      }
    }
  }

  /**
   * Skips the entered close character if the next character is already the closing character.
   *
   * @param e - A KeyboardEvent object.
   */
  private skip( e: KeyboardEvent ): void {
    const { Input } = this;

    if ( ! Input.composing ) {
      const closingChars = this.getChars( true );
      const index        = closingChars.indexOf( normalizeKey( e.key ) );

      if ( index > -1 && this.validate( index, 'skip' ) ) {
        if ( closingChars[ index ] === Input.char() ) {
          const { Selection, Selection: { focus } } = this;
          Selection.set( [ focus[ 0 ], focus[ 1 ] + 1 ] );
          prevent( e );
        }
      }
    }
  }

  /**
   * Automatically removes the paired characters when the backspace key is pressed.
   *
   * @param e - A KeyboardEvent object.
   */
  private remove( e: KeyboardEvent ): void {
    const { Input } = this;

    if ( e.key === 'Backspace' ) {
      const index = this.getChars( false ).indexOf( Input.char( Input.col - 1 ) );

      if ( index > -1 && this.validate( index, 'remove' ) ) {
        if ( this.getChars( true )[ index ] === Input.char() ) {
          const { Selection, Selection: { focus } } = this;
          Input.value = Input.before + Input.after.slice( 1 );
          Selection.set( focus );
        }
      }
    }
  }

  /**
   * Returns an array with opening/closing characters.
   *
   * @param closing - Determines whether to get closing or opening characters.
   *
   * @return An array with characters.
   */
  private getChars( closing: boolean ): string[] {
    return this.getConfig().map( chars => {
      const value = chars[ closing ? 1 : 0 ];
      return isString( value ) ? value : '';
    } );
  }

  /**
   * Returns a closing string.
   *
   * @param index - A config index.
   *
   * @return A closing string. This may be empty.
   */
  private getClosingString( index: number ): string {
    const config = this.getConfig()[ index ];
    const closer = config && config[ 1 ];
    return isFunction( closer ) ? closer( this.Editor ) : closer || '';
  }

  /**
   * Returns a number of characters to offset.
   *
   * @param index - A config index.
   *
   * @return The number of characters to offset.
   */
  private getOffset( index: number ): number {
    const config = this.getConfig()[ index ];
    const data   = config && config[ 2 ];
    return data ? data.offset || 0 : 0;
  }

  /**
   * Executes the validator defined by the language data.
   *
   * @param index - A config index.
   * @param key   - A key of the validator.
   *
   * @return `true` if the input satisfies the validator, or otherwise `false`.
   */
  private validate( index: number, key: 'close' | 'skip' | 'remove' ): boolean {
    const { Scope } = this;
    const config    = this.getConfig()[ index ];
    const data      = config[ 2 ];

    if ( ! data ) {
      return true;
    }

    const validator = data[ key ];

    if ( isFunction( validator ) ) {
      return validator( this.Editor, config );
    }

    if ( isString( validator ) ) {
      if ( validator === '@quotes' ) {
        return this.validateQuote( key );
      }

      return false;
    }

    if ( isArray( validator ) ) {
      return Scope.isIn( validator );
    }

    return validator;
  }

  /**
   * Determines whether to proceed completion of quotes or not.
   * - RegExp: checks the string after the input quote.
   *
   * @param key - The key of the validator.
   *
   * @return `true` if the completion process should be proceeded, or otherwise `false`.
   */
  private validateQuote( key: 'close' | 'skip' | 'remove' ): boolean {
    const { start } = this.Selection.get();
    const { Input } = this;
    const currInfo = this.lines.getInfoAt( start );
    const prevInfo = Input.info;

    if ( currInfo ) {
      if ( currInfo.category === CATEGORY_STRING || prevInfo && prevInfo.category === CATEGORY_STRING ) {
        if ( key === 'skip' || key === 'remove' ) {
          return compare( start, [ start[ 0 ], currInfo.to - 1 ] ) === 0;
        }

        return false;
      }
    }

    const { after } = Input;
    return ! this.Scope.isIn( 'comment' )  && ( !after || /^\s/.test( after ) );
  }

  /**
   * Returns the config array.
   *
   * @return A config array.
   */
  private getConfig(): AutoCloseConfig[]  {
    return this.getLanguage().autoClose || [];
  }
}
