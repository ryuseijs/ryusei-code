import { Elements, InputState, Position, TokenInfo } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { LINE_BREAK } from '../../constants/characters';
import {
  EVENT_CHANGE,
  EVENT_CHANGED,
  EVENT_COMPOSITION_END,
  EVENT_COMPOSITION_START,
  EVENT_COMPOSITION_UPDATE,
  EVENT_FOCUS_LINE_CHANGED,
  EVENT_INPUT,
  EVENT_KEYDOWN,
  EVENT_NEWLINE,
} from '../../constants/events';
import { ARROW_KEYS } from '../../constants/keys';
import {
  assign,
  getSelection,
  isIE,
  isPrevented,
  isUndefined,
  nextTick,
  normalizeKey,
  prevent,
  text,
} from '../../utils';


/**
 * The input type for composition.
 *
 * @since 0.1.0
 */
const COMPOSITION_INPUT_TYPE = 'composition';

/**
 * The class for handling the user input.
 *
 * @since 0.1.0
 */
export class Input extends Component {
  /**
   * Holds the TokenInfo object when any key is pressed.
   */
  info: TokenInfo | null;

  /**
   * Indicates whether the input is in composition session or not.
   */
  composing: boolean;

  /**
   * Keeps the latest focus line.
   */
  line: Element;

  /**
   * Keeps the latest focus row index.
   */
  row: number;

  /**
   * Holds the current state.
   */
  private state: InputState;

  /**
   * Indicates whether the input is currently disabled or not.
   */
  private _disabled: boolean;

  /**
   * Initialized the component.
   *
   * @param elements - A collection of essential editor elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );
    this.listen();
  }

  /**
   * Listen to some events.
   */
  private listen(): void {
    const { editable } = this.elements;

    this.bind( editable, 'keydown', this.onKeydown, this );
    this.bind( editable, isIE() ? 'textinput' : 'input', this.onInput, this );
    this.bind( editable, 'compositionstart', this.onCompositionStart, this );
    this.bind( editable, 'compositionupdate', this.onCompositionUpdate, this );
    this.bind( editable, 'compositionend', this.onCompositionEnd, this );

    this.on( EVENT_FOCUS_LINE_CHANGED, ( e, line, row ) => {
      this.line = line;
      this.row  = row;
    } );
  }

  /**
   * Called when the composition starts.
   * Needs to emit the `change` event at this timing to save the start position.
   * Note that some browsers do not support a CompositionEvent object.
   *
   * @param e - A CompositionEvent object or a regular Event object.
   */
  private onCompositionStart( e: CompositionEvent ): void {
    if ( this.disabled ) {
      const { Editor, Selection } = this;
      const range = Selection.get( false );
      getSelection().removeAllRanges();
      Editor.blur();

      nextTick( () => {
        Editor.focus();
        Selection.set( range.start, range.end );
      } );

      return;
    }

    this.composing = true;
    this.set( COMPOSITION_INPUT_TYPE );
    this.emit( EVENT_COMPOSITION_START, e );
    this.emit( EVENT_CHANGE, COMPOSITION_INPUT_TYPE );
  }

  /**
   * Called whenever the composing content is updated.
   *
   * @param e - A CompositionEvent object or a regular Event object.
   */
  private onCompositionUpdate( e: CompositionEvent ): void {
    nextTick( () => {
      this.Selection.update( this.getCaretPosition() );
      this.emit( EVENT_COMPOSITION_UPDATE, e );
    } );
  }

  /**
   * Called when the composition ends.
   *
   * @param e - A CompositionEvent object or a regular Event object.
   */
  private onCompositionEnd( e: CompositionEvent ): void {
    this.composing = false;
    this.apply();
    this.emit( EVENT_COMPOSITION_END, e );
  }

  /**
   * Called whenever any key is pressed.
   *
   * @param e - A KeyboardEvent object.
   */
  private onKeydown( e: KeyboardEvent ): void {
    const key = normalizeKey( e.key );
    const { altKey, shiftKey } = e;

    if ( this.disabled && ! ARROW_KEYS.includes( key ) ) {
      return prevent( e, true );
    }

    this.emit( EVENT_KEYDOWN, e );

    if ( isPrevented( e ) ) {
      return;
    }

    this.info = this.lines.getInfoAt( this.getCaretPosition() );
    this.set( 'input', { key } );

    if ( key === 'Enter' ) {
      this.handleEnter( e );
      return;
    }

    if ( this.Selection.isCollapsed() ) {
      if ( key === 'Delete' && ! shiftKey && ! altKey ) {
        this.handleDelete( e );
      } else if ( key === 'Backspace' && ! altKey ) {
        this.handleBackspace( e );
      }
    }
  }

  /**
   * Called whenever any input is received.
   * Need to wait for the `compositionend` before calling `apply()`.
   */
  private onInput( e: InputEvent ): void {
    this.emit( EVENT_INPUT, this, e );

    if ( ! this.composing ) {
      this.apply();
    }
  }

  /**
   * Handles the Enter key.
   *
   * @param e - A KeyboardEvent object.
   */
  private handleEnter( e: KeyboardEvent ): void {
    if ( ! this.composing ) {
      this.set( 'newline', {
        key     : 'Enter',
        value   : this.before + LINE_BREAK + this.after,
        position: [ this.row + 1, 0 ],
      } );

      this.emit( EVENT_NEWLINE, this );
      this.apply();
      prevent( e );
    }
  }

  /**
   * Handles the delete key.
   *
   * @param e - A KeyboardEvent object.
   */
  private handleDelete( e: KeyboardEvent ): void {
    const { row, lines } = this;

    if ( this.col === this.value.length && row < lines.length - 1 ) {
      this.apply( {
        type    : 'deleteNext',
        key     : 'Delete',
        value   : this.value + lines[ row + 1 ].text,
        startRow: row,
        endRow  : row + 1,
      } );

      prevent( e );
    }
  }

  /**
   * Handles the backspace key.
   */
  private handleBackspace( e: KeyboardEvent ): void {
    const { row, col } = this;

    if ( col === 0 ) {
      if ( row > 0 ) {
        const prev = this.lines[ row - 1 ].text;

        this.apply( {
          type    : 'removePrev',
          key     : 'Backspace',
          value   : prev + this.value,
          startRow: row - 1,
          position: [ row - 1, prev.length ],
        } );
      }

      prevent( e );
    }
  }

  /**
   * Appends a line break if the provided row is not the end of the document.
   *
   * @param value - A value where the line break will be appended.
   * @param row   - Optional. A row index.
   *
   * @return The value with the line break, or the provided value itself.
   */
  private appendLineBreak( value: string, row = this.row ): string {
    return value + ( row < this.lines.length - 1 ? LINE_BREAK : '' );
  }

  /**
   * Settles the final value to apply.
   *
   * @param value  - A value to settle.
   * @param endRow - An end row index.
   */
  private settleValue( value: string, endRow: number ): string {
    const { state } = this;

    if ( state ) {
      if ( state.insertion ) {
        value = this.before + state.insertion + this.after;
      } else if ( ! isUndefined( state.value ) ) {
        value = state.value;
      }
    }

    return this.appendLineBreak( value, endRow );
  }

  /**
   * Settles the final position to apply.
   *
   * @param position - A position to settle.
   */
  private settlePosition( position: Position ): Position {
    const { state } = this;

    if ( state ) {
      if ( state.position ) {
        return state.position;
      }

      position[ 1 ] += state.offset || 0;
    }

    return position;
  }

  /**
   * Returns the current caret position.
   *
   * @return A position of the caret.
   */
  private getCaretPosition(): Position {
    return [ this.row, this.col ];
  }

  /**
   * Sets the input state.
   * If the state with the provided type exists, new props will be assigned to it.
   *
   * @param type  - The type of the state.
   * @param props - Optional. An object with state values.
   */
  set( type: string, props: Omit<InputState, 'type'> = {} ): void {
    const { state } = this;

    if ( state && state.type === type ) {
      this.state = assign( state, props );
    } else {
      this.state = assign( { type }, props );
    }
  }

  /**
   * Returns the current state object.
   */
  get(): InputState | null {
    return this.state;
  }

  /**
   * Applies the current input state to the editor.
   *
   * @param state - Optional. A new state to apply.
   */
  apply( state?: InputState ): void {
    this.state = state || this.state;

    if ( ! this.state || ! this.line ) {
      return;
    }

    const { Selection, row } = this;
    const { type, startRow = row, endRow = row } = this.state;
    const position = this.getCaretPosition();

    if ( type !== COMPOSITION_INPUT_TYPE ) {
      this.emit( EVENT_CHANGE, type );
    }

    this.View.jump( endRow );
    this.Code.replaceLines( startRow, endRow, this.settleValue( this.value, endRow ) );
    this.Sync.sync( startRow, endRow );

    Selection.set( this.settlePosition( position ) );

    this.emit( EVENT_CHANGED, type );

    this.state = null;
    this.info  = null;
  }

  /**
   * Inserts a text at the current or specified index.
   *
   * @param text  - A text to insert.
   * @param index - Optional. An index where the text is inserted.
   */
  insert( text: string, index = this.col ): void {
    const { value } = this;
    this.value = value.slice( 0, index ) + text + value.slice( index );
  }

  /**
   * Returns a character at the current caret position or specified col index.
   *
   * @param col - Optional. A col index of the desired character.
   *
   * @return A character at the specified position.
   */
  char( col = this.col ): string {
    return this.value.charAt( col );
  }

  /**
   * Returns the value of the current line.
   *
   * @return A text of the current line.
   */
  get value(): string {
    return text( this.line ) || '';
  }

  /**
   * Sets a new value to the current line.
   *
   * @param value - A new value to set.
   */
  set value( value: string ) {
    text( this.line, value );
  }

  /**
   * Returns the string of the current line before the caret position.
   *
   * @return The string before the caret.
   */
  get before(): string {
    return this.value.slice( 0, this.col );
  }

  /**
   * Returns the string of the current line after the caret position.
   *
   * @return The string after the caret.
   */
  get after(): string {
    return this.value.slice( this.col );
  }

  /**
   * Returns the length of the current line.
   *
   * @return The length of the current line.
   */
  get length(): number {
    return this.value.length;
  }

  /**
   * Returns the current col index.
   *
   * @return The col index of the caret.
   */
  get col(): number {
    const { line } = this;
    const selection = getSelection();

    if ( line && selection.rangeCount > 0 ) {
      const range = selection.getRangeAt( 0 ).cloneRange();
      range.setStart( line, 0 );
      return range.toString().length;
    }

    return 0;
  }

  /**
   * Returns `true` if the input is disabled.
   *
   * @return `true` if the input is disabled.
   */
  get disabled(): boolean {
    return this._disabled;
  }

  /**
   * Makes the input disabled.
   * All keys are ignored while it is disabled.
   */
  set disabled( disabled: boolean ) {
    this._disabled = disabled;
  }
}
