import { Elements, EventBusEvent, Position } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { LINE_BREAK } from '../../constants/characters';
import { CONTEXT_MENU_EDIT, CONTEXT_MENU_SELECTION, MAIN_CONTEXT_MENU_ID } from '../../constants/context-menu';
import {
  EVENT_CHANGE,
  EVENT_CHANGED,
  EVENT_CONTEXT_MENU_CLICKED,
  EVENT_COPY,
  EVENT_CUT,
  EVENT_KEYDOWN,
  EVENT_PASTE,
} from '../../constants/events';
import { Editor } from '../../core/Editor/Editor';
import { count, includes, isIE, isUndefined, normalizeKey, prevent, toArray } from '../../utils';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import { Clipboard } from './Clipboard';


/**
 * The class for editing the code.
 *
 * @since 0.1.0
 */
export class Edit extends Component {
  /**
   * Indicates whether lines has been deleted by an input or not.
   */
  private deletedByInput: boolean;

  /**
   * Holds the Clipboard instance.
   */
  private clipboard = new Clipboard();

  /**
   * Initializes the component.
   *
   * @internal
   *
   * @param elements - A collection of essential editor elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );
    this.register();
    this.listen();
  }

  /**
   * Listens to some events.
   */
  private listen(): void {
    const { editable } = this.elements;

    this.on( EVENT_KEYDOWN, this.onKeydown, this );

    this.bind( editable, 'paste', this.onPaste, this );

    this.bind( editable, 'copy cut', e => {
      this[ e.type ]();
    } );

    this.bind( editable, 'dragover drop paste cut', e => {
      prevent( e, true );
    } );

    this.on( EVENT_CONTEXT_MENU_CLICKED, this.onMenuClicked, this );

    if ( isIE() ) {
      this.bind( editable, 'compositionstart', e => {
        if ( this.deletedByInput ) {
          prevent( e, true );
        }
      } );
    }
  }

  /**
   * Called when any key is pressed.
   *
   * @param e  - An EventBusEvent object.
   * @param ke - A KeyboardEvent object.
   */
  private onKeydown( e: EventBusEvent<Editor>, ke: KeyboardEvent ): void {
    const { Selection } = this;
    const key   = normalizeKey( ke.key );
    const isKey = ( keys: string | string[] ) => includes( toArray( keys ), key );

    this.deletedByInput = false;

    if ( this.Keymap.matches( ke, 'selectAll' ) ) {
      Selection.selectAll();
      return prevent( ke, true );
    }

    if ( ke.altKey || ke.metaKey || ke.ctrlKey ) {
      return;
    }

    if ( Selection.isMultiline() ) {
      if ( key.length === 1 || isKey( [ 'Process', 'Enter' ] ) ) {
        this.delete();
        this.deletedByInput = true;
      } else if ( isKey( [ 'Delete', 'Backspace' ] ) ) {
        this.delete();
        prevent( ke );
      }
    }
  }

  /**
   * Called when the context menu item is clicked.
   *
   * @param e           - An EventBusEvent object.
   * @param ContextMenu - A ContextMenu instance.
   * @param group       - A group ID.
   * @param id          - The ID of the clicked item.
   */
  private onMenuClicked( e: EventBusEvent<Editor>, ContextMenu: ContextMenu, group: string, id: string ): void {
    if ( group === MAIN_CONTEXT_MENU_ID ) {
      const { Selection } = this;

      if ( id === 'copy' || id === 'cut' ) {
        if ( ! this.isSelected() ) {
          Selection.selectLine( undefined, id === 'copy', true );
        }

        this[ id ]();
      } else if ( id === 'paste' ) {
        this.clipboard.paste( this.paste.bind( this ) );
      } else if ( id === 'selectAll' ) {
        Selection.selectAll();
      }
    }
  }

  /**
   * Called when the text is being pasted to the editor.
   *
   * @param e - A ClipboardEvent object.
   */
  private onPaste( e: ClipboardEvent ): void {
    const string = ( e.clipboardData || window[ 'clipboardData' ] ).getData( 'text' );

    if ( string ) {
      this.paste( string );
    }

    prevent( e );
  }

  /**
   * Registers items to the context menu.
   */
  private register(): void {
    const { ContextMenu } = this;
    ContextMenu.register( MAIN_CONTEXT_MENU_ID, 'edit', CONTEXT_MENU_EDIT );
    ContextMenu.register( MAIN_CONTEXT_MENU_ID, 'selection', CONTEXT_MENU_SELECTION );
  }

  /**
   * Checks if some texts are selected or not.
   * Be aware that this is not same with negating getSelection().isCollapsed.
   *
   * @return `true` if some texts are selected, or otherwise `false`.
   */
  private isSelected(): boolean {
    return ! this.Selection.isCollapsed();
  }

  /**
   * Checks if the Editor is editable or not.
   *
   * @return `true` if the Editor is editable.
   */
  private isEditable(): boolean {
    return ! this.Editor.readOnly;
  }

  /**
   * Deletes the selected text. Nothing will happen when the selection is collapsed.
   */
  delete(): void {
    if ( this.isSelected() ) {
      this.paste( '', 'delete' );
    }
  }

  /**
   * Pastes the provided text at the current position.
   *
   * @param string - A string to paste.
   * @param type   - Optional. Specifies the input type.
   */
  paste( string: string, type = 'paste' ): void {
    if ( ! this.isEditable() ) {
      return;
    }

    if ( type === 'paste' ) {
      this.emit( EVENT_PASTE, string );
    }

    const { Selection, Code } = this;
    const { start, end } = Selection.get();
    const size     = count( string, LINE_BREAK ) + 1;
    const startRow = start[ 0 ];
    const endRow   = startRow + size - 1;
    const endLine  = string.slice( string.lastIndexOf( LINE_BREAK ) + 1 );
    const col      = endLine.length + ( size > 1 ? 0 : start[ 1 ] );
    const position = [ endRow, col ] as Position;

    this.emit( EVENT_CHANGE, type );

    Code.replaceRange( start, end, string );

    this.Sync.sync( startRow, endRow, endRow );
    Selection.set( position );

    this.emit( EVENT_CHANGED, type );
  }

  /**
   * Copies the provided text to the clipboard.
   * If the text is not provided, this method tries to copy the current selection.
   *
   * @param string        - Optional. A string to copy.
   * @param skipSelection - Optional. Whether to restore the selection range after copy or not.
   */
  copy( string?: string, skipSelection?: boolean ): void {
    const { failedToCopy } = this.i18n;
    const onFailed  = () => {
      if ( this.require( 'Dialog' ) ) {
        this.invoke( 'Dialog', 'message', failedToCopy );
      } else {
        alert( this.i18n.failedToCopy );
      }
    };

    const copySelection = isUndefined( string );
    string = copySelection ? this.Selection.toString() : string;

    this.emit( EVENT_COPY, string );

    const { Selection } = this;
    const range = Selection.get( false );

    this.clipboard.copy( string, onFailed );

    if ( ! skipSelection ) {
      Selection.set( range.start, range.end );
    }
  }

  /**
   * Cuts the selected code. Nothing will happen if the selection is collapsed.
   */
  cut(): void {
    if ( this.isSelected() && this.isEditable() ) {
      this.emit( EVENT_CUT );
      this.copy( undefined, true );
      this.delete();
    }
  }

  /**
   * Cuts the current line.
   */
  cutLine(): void {
    if ( ! this.isEditable() ) {
      return;
    }

    this.emit( EVENT_CUT );

    const { Selection } = this;
    const { start: [ startRow ] } = Selection.get();
    const position = [ startRow, 0 ] as Position;

    this.View.jump( startRow );
    Selection.selectLine( startRow, false );

    this.copy( undefined, true );

    Selection.update( position );

    this.emit( EVENT_CHANGE );

    this.Code.replaceLines( startRow, startRow, '' );
    this.Sync.sync( startRow, startRow );

    Selection.set( position );

    this.emit( EVENT_CHANGED );
  }
}
