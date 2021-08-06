import { Elements, EventBusEvent, IndentationOptions, IndentConfig, Position } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { LINE_BREAK } from '../../constants/characters';
import {
  EVENT_CHANGE,
  EVENT_CHANGED,
  EVENT_FOCUS,
  EVENT_KEYDOWN,
  EVENT_KEYMAP,
  EVENT_NEWLINE,
} from '../../constants/events';
import { Editor } from '../../core/Editor/Editor';
import { div, format, html, isFunction, max, prevent } from '../../utils';
import { Dialog } from '../Dialog/Dialog';
import { DEFAULT_OPTIONS } from './defaults';
import { I18N } from './i18n';
import { KEYMAP } from './keymap';


/**
 * The dialog ID for the indent notice.
 *
 * @since 0.1.0
 */
const DIALOG_ID = 'tab-notice';

/**
 * The component for handing the Tab key to insert/remove indents.
 * Just overriding the default behavior of the Tab key can not satisfy the "No Keyboard Trap" criterion.
 * Therefore as default, the Tab indentation is initially disabled, and it will be enabled when:
 * - the editor is focused by pointer devices, such as a mouse
 * - users explicitly enable it via CTRL+M
 *
 * @link https://www.w3.org/TR/WCAG21/#no-keyboard-trap
 *
 * @since 0.1.0
 */
export class Indentation extends Component {
  /**
   * Indicates whether the notification message has been already shown or not.
   */
  private static noticed: boolean;

  /**
   * Holds the indent representation.
   */
  private space: string;

  /**
   * Indicates whether to disable tab indentation or not.
   */
  private disabled: boolean;

  /**
   * Holds options.
   */
  private opts: IndentationOptions;

  /**
   * Holds the Dialog component.
   */
  private Dialog: Dialog;

  /**
   * The Indentation constructor.
   *
   * @param Editor - An Editor instance.
   */
  constructor( Editor: Editor ) {
    super( Editor );
    this.addI18n( I18N );
    this.addKeyBindings( KEYMAP );
  }

  /**
   * Initializes the component.
   * This component requires the Dialog component.
   *
   * @param elements - A collection of essential elements.
   */
  mount( elements: Elements ): void {
    if ( ! ( this.Dialog = this.require( 'Dialog' ) ) ) {
      return;
    }

    super.mount( elements );

    this.space    = this.options.indent;
    this.opts     = this.getOptions<IndentationOptions>( 'indentation', DEFAULT_OPTIONS );
    this.disabled = this.opts.activation !== 'load';

    this.register();
    this.listen();
  }

  /**
   * Explicitly enables or disables the component.
   *
   * @param disabled - Determines whether to disable the component or not.
   */
  setDisabled( disabled: boolean ): void {
    this.disabled = disabled;
    Indentation.noticed = true;
  }

  /**
   * Listens to some events.
   */
  private listen(): void {
    let focused: boolean;

    this.on( EVENT_FOCUS, ( e, type ) => {
      if ( type === 'pointer' && ! focused ) {
        this.setDisabled( false );
      }

      focused = true;
    } );

    this.on( `${ EVENT_KEYMAP }:indent ${ EVENT_KEYMAP }:unindent`, ( e, ke, action ) => {
      if ( ! this.disabled ) {
        if ( action === 'indent' ) {
          this.indent();
        } else {
          this.unindent();
        }

        prevent( ke );
      }
    } );

    this.on( `${ EVENT_KEYMAP }:toggleTabMode`, ( e, ke ) => {
      this.setDisabled( ! this.disabled );
      prevent( ke );
    } );

    this.on( EVENT_NEWLINE, () => {
      this.indentNewline();

      if ( this.opts.deepIndent ) {
        this.indentDeep();
      }
    } );

    this.on( EVENT_KEYDOWN, this.onKeydown, this );
  }

  /**
   * Called when any key is pressed on the editor.
   *
   * @param e     - An EventBusEvent object.
   * @param ke    - A KeyboardEvent object.
   */
  private onKeydown( e: EventBusEvent<Editor>, ke: KeyboardEvent ): void {
    if ( this.opts.help && ! Indentation.noticed && ke.key === 'Tab' ) {
      this.Dialog.show( DIALOG_ID );
      Indentation.noticed = true;
      prevent( ke );
      return;
    }

    this.remove( ke );
  }

  /**
   * Registers the dialog for the indentation notice.
   */
  private register(): void {
    const { i18n } = this;
    const body = div();

    html( body, format(
      `<p>${ i18n.indentDisabled }</p>`,
      `<strong>${ this.Keymap.getShortcut( 'toggleTabMode' ) }</strong>`
    ) );

    this.Dialog.register( DIALOG_ID, body, i18n.indentNotice, [
      {
        id   : 'activate',
        click: () => {
          this.setDisabled( false );
          this.Dialog.hide();
        },
      },
      'confirm',
    ] );
  }

  /**
   * Prepends indents to all selected lines.
   */
  private indent(): void {
    const { Input, Selection, space, space: { length: size } } = this;

    if ( Selection.isCollapsed() ) {
      Input.apply( { type: 'indent', insertion: space, offset: size } );
    } else {
      this.emit( EVENT_CHANGE );

      const { start, end } = Selection.get();
      this.Code.replaceLinesBy( start[ 0 ], end[ 0 ], line => space + line );
      this.Sync.sync( start[ 0 ], end[ 0 ] );
      Selection.set( [ start[ 0 ], start[ 1 ] + size ], [ end[ 0 ], end[ 1 ] + size ] );

      this.emit( EVENT_CHANGED );
    }
  }

  /**
   * Removes indents from all selected lines.
   */
  private unindent(): void {
    const { space } = this;
    const { start, end } = this.Selection.get();

    let startOffset = 0;
    let endOffset   = 0;
    let changed;

    this.Code.replaceLinesBy( start[ 0 ], end[ 0 ], ( line, index, array ) => {
      const match = line.match( new RegExp( `^(${ space }| {0,${ space.length }})` ) );

      if ( match ) {
        const [ indent ] = match;
        line = line.replace( indent, '' );

        if ( index === 0 ) {
          this.emit( EVENT_CHANGE );
          startOffset -= indent.length;
        }

        if ( index === array.length - 1 ) {
          endOffset -= indent.length;
        }

        changed = true;
      }

      return line;
    } );

    if ( changed ) {
      const startCol = max( start[ 1 ] + startOffset, 0 );
      const endCol   = max( end[ 1 ] + endOffset, 0 );

      this.Sync.sync( start[ 0 ], end[ 0 ] );
      this.Selection.set( [ start[ 0 ], startCol ], [ end[ 0 ], endCol ] );
      this.emit( EVENT_CHANGED );
    }
  }

  /**
   * Adds an indent to the newline when the enter key is pressed.
   */
  private indentNewline(): void {
    const { Input } = this;
    const indent = this.lines[ Input.row ].getIndent();

    if ( indent ) {
      Input.set( 'newline', {
        value   : Input.before + LINE_BREAK + indent + Input.after.replace( /^[ \t]+/, '' ),
        position: [ Input.row + 1, indent.length ],
      } );
    }
  }

  /**
   * Adds an indent after specific patterns.
   */
  private indentDeep(): void {
    const index = this.findConfigIndex();

    if ( index > -1 && this.shouldIndentDeep( index ) ) {
      const { Input, space } = this;
      const indent = this.lines[ Input.row ].getIndent();
      const string = LINE_BREAK + indent + space + ( this.isClosed( index ) ? LINE_BREAK + indent : '' );

      Input.set( 'indentDeep', {
        key      : 'Enter',
        insertion: string,
        position : [ Input.row + 1, indent.length + space.length ],
      } );
    }
  }

  /**
   * Returns an indent config index.
   *
   * @return A config index if found, or -1 if not.
   */
  private findConfigIndex(): number {
    const config = this.getConfig();

    for ( let i = 0; i < config.length; i++ ) {
      const settings = config[ i ];

      if ( isFunction( settings[ 0 ] ) ) {
        return settings[ 0 ]( this.Editor ) ? i : -1;
      }

      const { Input } = this;

      if ( settings[ 0 ].test( Input.before.trim() ) ) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Determines whether to increase the indent level or not.
   *
   * @param index - A config index.
   *
   * @return `true` if the level should be increased, or otherwise `false`.
   */
  private shouldIndentDeep( index: number ): boolean {
    const config    = this.getConfig()[ index ];
    const condition = config && config[ 2 ];

    if ( isFunction( condition ) ) {
      return condition( this.Editor );
    }

    return ! condition || this.Scope.isIn( condition );
  }

  /**
   * Checks if the position where the indentation is being added is enclosed by paired characters or not.
   *
   * @param index - A config index.
   *
   * @return `true` if the closing representation is found, or otherwise `false`.
   */
  private isClosed( index: number ): boolean {
    const config    = this.getConfig()[ index ];
    const condition = config && config[ 1 ];

    if ( ! condition ) {
      return false;
    }

    if ( isFunction( condition ) ) {
      return condition( this.Editor );
    }

    const { Input } = this;
    return condition.test( Input.after.trim() );
  }

  /**
   * When the backspace key is pressed,
   * removes indents of a line if they are same with the previous one's.
   *
   * @param e - A KeyboardEvent object.
   */
  private remove( e: KeyboardEvent ): void {
    const { Selection } = this;

    if ( e.key === 'Backspace' && Selection.isCollapsed() ) {
      const { lines } = this;
      const { start } = Selection.get();
      const prevRow  = start[ 0 ] - 1;
      const prevLine = lines[ prevRow ];

      if ( ! prevLine ) {
        return;
      }

      const prevIndent = prevLine.getIndent();
      const curIndent  = lines[ start[ 0 ] ].getIndent();

      if ( prevIndent && prevIndent === curIndent && start[ 1 ] === curIndent.length ) {
        this.emit( EVENT_CHANGE );

        const position = [ prevRow, prevLine.text.length ] as Position;

        this.Code.replaceRange( position, start, '' );
        this.Sync.sync( prevRow, start[ 0 ] );
        Selection.set( position );

        this.emit( EVENT_CHANGED );

        prevent( e );
      }
    }
  }

  /**
   * Returns a config for indentation.
   *
   * @return A config array.
   */
  private getConfig(): IndentConfig[] {
    return this.getLanguage().indent || [];
  }
}
