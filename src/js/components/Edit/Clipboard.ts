import { create, focus, remove, styles } from '../../utils';


/**
 * The class for normalizing different copy/paste behaviours in browsers.
 *
 * @since 0.1.0
 */
export class Clipboard {
  /**
   * Creates a temporary textarea element.
   *
   * @param text - A value for the textarea.
   *
   * @return A created element.
   */
  private create( text: string ): HTMLTextAreaElement {
    const textarea = create( 'textarea', {}, document.body );
    const offset   = '-999999px';
    styles( textarea, { position: 'absolute', top: offset, left: offset } );

    textarea.value = text;
    focus( textarea );
    textarea.setSelectionRange( 0, text.length );

    return textarea;
  }

  /**
   * Pastes the text via execCommand for old browsers.
   *
   * @return A pasted text.
   */
  private execPaste(): string {
    const textarea = this.create( '' );
    document.execCommand( 'paste' );

    const { value } = textarea;
    remove( textarea );

    return value;
  }

  /**
   * Copies the provided text via execCommand for old browsers.
   *
   * @param text     - A text to copy.
   * @param onFailed - Optional. A callback fired when copy failed.
   */
  private execCopy( text: string, onFailed?: () => void ): void {
    const textarea = this.create( text );

    try {
      document.execCommand( 'copy' );
    } catch ( e ) {
      if ( onFailed ) {
        onFailed();
      }
    }

    remove( textarea );
  }

  /**
   * Pastes the clipboard text.
   *
   * @param onPaste - A callback fired after pasting a text, taking a pasted value as the first argument.
   */
  paste( onPaste: ( text: string ) => void ): void {
    const { clipboard } = navigator;

    if ( clipboard ) {
      clipboard.readText().then( onPaste );
    } else {
      onPaste( this.execPaste() );
    }
  }

  /**
   * Copies the passed text.
   *
   * @param text     - A text to copy.
   * @param onFailed - Optional. A callback fired when copy failed.
   */
  copy( text: string, onFailed?: () => void ): void {
    const { clipboard } = navigator;

    if ( clipboard ) {
      clipboard.writeText( text ).catch( () => {
        this.execCopy( text, onFailed );
      } );
    } else {
      this.execCopy( text, onFailed );
    }
  }
}
