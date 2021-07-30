import { Elements, EventBusEvent, Position, Range, SelectionBoundary } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { CLASS_EMPTY, CLASS_LINE } from '../../constants/classes';
import {
  EVENT_SCROLLED,
  EVENT_SCROLLER_SCROLL,
  EVENT_SELECTED,
  EVENT_SELECTING,
  EVENT_SELECTION_CHANGE,
  EVENT_WINDOW_SCROLL,
} from '../../constants/events';
import {
  CHANGED,
  CLICKED_RIGHT,
  COLLAPSED,
  EXTEND,
  SELECTED,
  SELECTING,
  START,
  UPDATE,
} from '../../constants/selection-states';
import {
  activeElement,
  attr,
  closest,
  compare,
  createRange,
  findSelectionBoundary,
  format,
  getSelection,
  hasClass,
  isBr,
  isGecko,
  isHTMLElement,
  isIE,
  isMobile,
  isText,
  nextTick,
  prevent, rect,
  setSelection,
  slice,
} from '../../utils';
import { toggleEditable } from '../../utils/dom/toggleEditable/toggleEditable';
import { DELAY_FOR_RESELECTION, ORIGIN } from './constants';
import { State } from './State';


/**
 * The class for handing both a native and custom selection.
 *
 * @since 0.1.0
 */
export class Selection extends Component {
  /**
   * Holds the State instance.
   */
  state: State;

  /**
   * Keeps the position where the selection starts.
   */
  anchor: Position = ORIGIN;

  /**
   * Keeps the position where the selection ends.
   */
  focus: Position = ORIGIN;

  /**
   * Keeps the latest scrollTop amount.
   */
  private scrollTop: number;

  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );
    this.state = new State( this.Editor );
    this.listen();
  }

  /**
   * Listens to some events.
   */
  private listen(): void {
    const { editable } = this.elements;

    this.bind( document, 'selectionchange', this.onSelectionChange, this );

    if ( isIE() ) {
      this.bind( editable, 'dblclick', this.onDblClick, this );
    } else {
      this.bind( editable, 'mousedown', this.onMouseDown, this );
    }

    this.state.on( 'changed', this.onStateChanged.bind( this ) );

    this.on( [ EVENT_SCROLLER_SCROLL, EVENT_WINDOW_SCROLL ], this.onScroll, this );
    this.on( EVENT_SCROLLED, this.ensureSelection, this );
  }

  /**
   * Called whenever the selection is changed.
   * Be aware that this is fired even when the editor is not focused.
   */
  private onSelectionChange(): void {
    if ( this.isFocused() ) {
      if ( this.is( SELECTING, EXTEND ) ) {
        const focus = this.getNativeSelection( true );

        if ( focus ) {
          this.focus = focus;
          this.emit( EVENT_SELECTING );
        }
      }

      this.emit( EVENT_SELECTION_CHANGE );
    }
  }

  /**
   * Called when the mouse button is pressed.
   * Detects the double-click earlier than the `dblclick` to prevent the native smart selection.
   *
   * @param e - A MouseEvent object.
   */
  private onMouseDown( e: MouseEvent ): void {
    if ( e.detail > 1 ) {
      this.onDblClick();
      prevent( e );
    }
  }

  /**
   * Called when the code element is double-clicked.
   * If a word is clicked, selects it. Otherwise, selects a clicked node.
   */
  private onDblClick(): void {
    const range = this.getWordRangeAt( this.anchor );

    if ( range ) {
      this.set( range.start, range.end );
    } else {
      const boundary = this.getNativeSelectionBoundary( false );

      if ( boundary ) {
        const { node } = boundary;
        const selection = getSelection();
        const range     = createRange();

        range.selectNode( node );
        selection.removeAllRanges();
        selection.addRange( range );

        const anchor = this.getNativeSelection();
        const focus  = this.getNativeSelection( true );

        if ( anchor && focus ) {
          this.set( anchor, focus );
        }
      }
    }
  }

  /**
   * Called whenever the selection state is changed.
   *
   * - Updating positions at the `START` state is too early
   *   because the native selection has not been updated yet.
   * - Jumps to the focus position just before extending the existing selection by a keyboard
   *   so that the native selection is able to be updated.
   * - The `EVENT_SELECTING` event must be emitted after `EVENT_SELECTED` event
   *   for listeners to prepare something at the `SELECTING` state.
   * - When the state goes into `SELECTED` state, the custom selection may be collapsed,
   *   e.g. single backward selection -> shift + arrow. To make sure the state becomes `COLLAPSED`,
   *   sets the native selection.
   *
   * @param e     - An EventBusEvent object.
   * @param state - A state number.
   * @param prev  - A previous state number.
   */
  private onStateChanged( e: EventBusEvent, state: number, prev: number ): void {
    if ( prev !== UPDATE && prev !== CLICKED_RIGHT ) {
      if ( state === COLLAPSED || state === CHANGED || state === SELECTED ) {
        this.anchor = this.getNativeSelection() || this.anchor;
        this.focus  = this.getNativeSelection( true ) || this.focus;
      }

      if ( prev !== START && state === SELECTED ) {
        if ( this.detectSelectAll() ) {
          const { lines, lines: { length } } = this;
          const lastLineLength = lines[ length - 1 ].text.length;

          if ( compare( this.anchor, [ 0, 0 ] ) !== 0
            || compare( this.focus, [ length - 1, lastLineLength ] ) !== 0 )
          {
            this.selectAll();
            return;
          }
        }
      }
    }

    this.emit( EVENT_SELECTED, this, state, prev );

    if ( state === SELECTING ) {
      this.emit( EVENT_SELECTING );
    }
  }

  /**
   * Called when the window or scroller scrolls.
   */
  private onScroll(): void {
    const { Input } = this;
    const top = window.pageYOffset + this.elements.scroller.scrollTop;

    if ( this.isMultiline() && ! Input.disabled && top !== this.scrollTop ) {
      this.Input.disabled = true;
      this.scrollTop = top;
    }
  }

  /**
   * Sets the custom selection by changing the native selection.
   *
   * @param anchor - An anchor position.
   * @param focus  - Optional. A focus position.
   */
  set( anchor: Position, focus?: Position ): void {
    this.setNativeSelection( anchor, focus ) || this.update( anchor, focus );
  }

  /**
   * Returns positions of the current selection.
   * If the `normalize` is `true`, the `start` will be always preceding position.
   *
   * @param normalize - Optional. Whether to normalize the position or not.
   *
   * @return An object literal with anchor and focus positions.
   */
  get( normalize = true ): Range {
    const { anchor, focus } = this;
    const isBackward = this.isBackward();

    return {
      start: isBackward && normalize ? focus : anchor,
      end  : isBackward && normalize ? anchor : focus,
    };
  }

  /**
   * Updates the custom selection range without using the native selection.
   *
   * @param anchor   - An anchor position.
   * @param focus    - Optional. A focus position.
   * @param silently - Optional. Whether to change the state or not.
   */
  update( anchor: Position, focus?: Position, silently?: boolean ): void {
    this.anchor = anchor;
    this.focus  = focus || anchor;

    if ( ! silently ) {
      this.state.update( this.isCollapsed() );
    }
  }

  /**
   * Selects the current or specified line.
   * This method sets the range twice for the backward selection.
   *
   * @param row       - Optional. A row index where to select.
   * @param refresh   - Optional. Whether to refresh the current selection or not.
   * @param backwards - Optional. Selects a line backwards.
   */
  selectLine( row = this.focus[ 0 ], refresh = true, backwards?: boolean ): void {
    const { lines } = this;
    const line = lines[ row ];

    if ( line ) {
      const start: Position = [ row, 0 ];
      const end: Position   = row < lines.length - 1 ? [ row + 1, 0 ] : [ row, line.text.length ];

      const anchor = backwards ? end : start;
      const focus  = backwards ? start : end;

      if ( refresh ) {
        this.set( anchor, focus );
      } else {
        this.update( anchor, focus, true );
      }
    }
  }

  /**
   * Selects again the current selection.
   */
  reselect(): void {
    this.set( this.anchor, this.focus );
  }

  /**
   * Selects the whole code.
   */
  selectAll(): void {
    const { lines } = this;
    const endRow = lines.length - 1;
    this.set( [ 0, 0 ], [ endRow, lines[ endRow ].text.length ] );
  }

  /**
   * Holds the current state so that it won't change.
   */
  hold(): void {
    this.state.hold();
  }

  /**
   * Disables to hold the state.
   */
  release(): void {
    this.state.release();
  }

  /**
   * Converts the selection to a string.
   * An empty string will be returned when the selection is collapsed.
   *
   * @return A string representing the current selection.
   */
  toString(): string {
    const range = this.get();
    return this.Code.sliceRange( range.start, range.end );
  }

  /**
   * Returns the DOMRect node of the native selection boundary.
   * Note that the boundary node is usually a Text node,
   * but sometimes the line or the editable element.
   *
   * @param focus - Determines whether to get the DOMRect of the focus or anchor node.
   *
   * @return A DOMRect object if available, or otherwise `null`.
   */
  getRect( focus: boolean ): DOMRect | null {
    const boundary = this.getNativeSelectionBoundary( focus );

    if ( boundary ) {
      let { node, offset } = boundary;

      while ( isHTMLElement( node ) ) {
        node   = node.firstChild;
        offset = 0;

        if ( isBr( node ) ) {
          return rect( node );
        }
      }

      if ( node ) {
        const range = createRange();
        range.setStart( node, offset );
        range.collapse( true );

        return rect( range );
      }
    }

    return null;
  }

  /**
   * Returns the current location as a string formatted by the i18n definition.
   *
   * @return A string that describes the current location.
   */
  getLocation(): string {
    const { focus } = this;
    return format( this.i18n.location, focus[ 0 ] + 1, focus[ 1 ] + 1 );
  }

  /**
   * Checks if the selection state is one of the provided states or not.
   * This is just an alias of the `state.is()` method.
   *
   * @param states - A state or states to check.
   *
   * @return `true` if the current state is one of the provided states, or otherwise `false`.
   */
  is( ...states: number[] ): boolean {
    return this.state.is( ...states );
  }

  /**
   * Collapses the selection to anchor or focus position.
   *
   * @param toFocus - Optional. Collapses the selection to the focus position.
   */
  collapse( toFocus?: boolean ): void {
    this.set( toFocus ? this.focus : this.anchor );
  }

  /**
   * Checks is the selection is backward or not.
   *
   * @return `true` if the selection is backward, or otherwise `false`.
   */
  isBackward(): boolean {
    return compare( this.anchor, this.focus ) > 0;
  }

  /**
   * Checks if the selection is collapsed or not.
   *
   * @return `true` if the selection is collapsed, or otherwise `false`.
   */
  isCollapsed(): boolean {
    return compare( this.anchor, this.focus ) === 0;
  }

  /**
   * Checks if more than one line is selected or not.
   *
   * @return `true` if more than one line is selected or otherwise `false`.
   */
  isMultiline(): boolean {
    return this.anchor[ 0 ] !== this.focus[ 0 ];
  }

  /**
   * Checks if the editor is focused or not.
   *
   * @return `true` if the editor is focused, or otherwise `false`.
   */
  isFocused(): boolean {
    return this.Editor && this.Editor.isFocused();
  }

  /**
   * Checks if the provided client position is inside the current selection range or not.
   *
   * @param clientX - X position that is relative to the client.
   * @param clientY - Y position that is relative to the client.
   *
   * @return `true` if the position is inside the range, or otherwise `false`.
   */
  isInside( clientX: number, clientY: number ): boolean {
    return this.Range.selection.isInside( clientX, clientY );
  }

  /**
   * Destroys the instance.
   */
  destroy(): void {
    this.state.destroy();
    super.destroy();
  }

  /**
   * Sets a native selection range.
   * Be aware that calling `setSelection` emits `selectionchange` only in IE, but does not in others.
   *
   * @param start - A start position.
   * @param end   - Optional. An end position. If omitted, the start position is used alternatively.
   *
   * @return `true` if the selection is successfully changed, or otherwise `undefined`.
   */
  private setNativeSelection( start: Position, end = start ): boolean {
    const { Chunk } = this;
    const isSingle  = start[ 0 ] === end[ 0 ];
    const startLine = Chunk.getLine( start[ 0 ] ) || Chunk.addPreservedLine( false, start[ 0 ] );
    const endLine   = isSingle ? startLine : Chunk.getLine( end[ 0 ] ) || Chunk.addPreservedLine( true, end[ 0 ] );
    const collapsed = compare( start, end ) === 0;
    const anchor    = findSelectionBoundary( startLine, start[ 1 ] );
    const focus     = collapsed ? anchor : findSelectionBoundary( endLine, end[ 1 ] );

    if ( anchor && focus ) {
      const anchorNode = anchor.node;
      const focusNode  = focus.node;

      anchor.node = isBr( anchorNode ) ? anchorNode.parentNode : anchorNode;
      focus.node  = isBr( focusNode ) ? focusNode.parentNode : focusNode;

      this.hold();
      setSelection( anchor, focus );
      this.release();

      this.state.refresh( collapsed );
    }

    return true;
  }

  /**
   * Converts the native selection boundary to a position represented as [ row, col ].
   * In FF, the selection
   *
   * @param focus - Optional. Whether to returns a position on the focus boundary or not.
   *
   * @return A converted position. If the position is not found, always returns [ 0, 0 ].
   */
  private getNativeSelection( focus?: boolean ): Position | null {
    const line     = this.findActiveLine( focus );
    const boundary = this.getNativeSelectionBoundary( focus );

    if ( line && boundary ) {
      const { Chunk } = this;
      const range = createRange();

      range.setStart( line, 0 );
      range.setEnd( boundary.node, boundary.offset );

      let row = Chunk.getRow( line );

      if ( row < 0 ) {
        const anchor = Chunk.getBoundary( false );
        const focus  = Chunk.getBoundary( true );

        if ( anchor.line === line ) {
          row = anchor.row;
        } else if ( focus.line === line ) {
          row = focus.row;
        }
      }

      if ( row > -1 ) {
        return [ row, range.toString().length ];
      }
    }

    return null;
  }

  /**
   * Finds a line where the native anchor node belongs.
   * If the `focus` is set to `true`, finds a line where the native focus node belongs.
   *
   * @param focus - Determines whether to find a line that has focus node or not.
   *
   * @return A line where an anchor or a focus node belongs.
   */
  private findActiveLine( focus?: boolean ): HTMLElement | null {
    const boundary = this.getNativeSelectionBoundary( focus );

    if ( boundary ) {
      const { node } = boundary;
      const elm = isText( node ) ? node.parentNode : node;

      if ( isHTMLElement( elm ) ) {
        return closest( elm, `.${ CLASS_LINE }` );
      }
    }

    return null;
  }

  /**
   * Converts the provided position to the range for wrapping the word at the position.
   * If the text at the position is not a word, such as `/` or `-`, this returns `null`.
   *
   * @param row - A row index.
   * @param col - A col index.
   *
   * @return An object that describes the range of the word at the position.
   *         If the text is not a word, returns `null`.
   */
  private getWordRangeAt( [ row, col ]: Position ): Range {
    const line = this.lines[ row ];

    if ( line ) {
      const string = line.text;
      const words  = string.split( /[^\w]/ );

      let index = 0;

      for ( let i = 0; i < words.length; i++ ) {
        const from = i > 0 ? index + 1 : 0;
        const to   = from + words[ i ].length;

        if ( from <= col && col < to ) {
          return { start: [ row, from ], end: [ row, to ] };
        }

        index = to;
      }
    }

    return null;
  }

  /**
   * Returns a boundary node and offset of the native selection.
   * Be aware that the target node must be in the chunk,
   * or otherwise this method returns `null`.
   * Besides, IE returns a parent node as a boundary node, and child index as a offset
   * if the boundary is `<br>`(an empty line).
   *
   * @param focus - Whether to get the focus boundary or not.
   *
   * @return An object literal with a node and offset.
   */
  private getNativeSelectionBoundary( focus: boolean ): SelectionBoundary {
    const { editable } = this.elements;
    const selection = getSelection();
    const prefix    = focus ? 'focus' : 'anchor';

    let node   = selection[ `${ prefix }Node` ];
    let offset = selection[ `${ prefix }Offset` ];

    if ( node === editable ) {
      node   = editable.children[ offset ];
      offset = 0;
    }

    return node ? { node, offset } : null;
  }

  /**
   * Detects selection of all contents in a immediate way, such as the `Select All` iOS context menu.
   *
   * @return `true` if all contents are selected, or otherwise `false`.
   */
  private detectSelectAll(): boolean {
    const { lines } = this.elements;
    const anchorLine = this.findActiveLine( false );
    const focusLine  = this.findActiveLine( true );
    const elms       = slice( lines.children ).filter( elm => ! hasClass( elm, CLASS_EMPTY ) );

    return anchorLine === elms[ 0 ]
      && focusLine === elms[ elms.length - 1 ]
      && compare( this.anchor, this.focus )
      && this.anchor[ 1 ] === 0
      && this.focus[ 1 ] === focusLine.textContent.length;
  }

  /**
   * The dirty code to ensure the selection contains the latest nodes.
   */
  private ensureSelection(): void {
    const { Input } = this;
    const { editable } = this.elements;
    const selection = getSelection();

    if ( ! isMobile() && this.isMultiline() && activeElement() === editable && selection.setBaseAndExtent ) {
      const { editable } = this.elements;
      const { anchorOffset, focusOffset } = selection;
      let { anchorNode, focusNode } = selection;
      attr( editable, { 'aria-hidden': true } );

      this.hold();
      selection.removeAllRanges();

      if ( isGecko() ) {
        const anchorClone = anchorNode.cloneNode( true );
        const focusClone  = focusNode.cloneNode( true );

        anchorNode.parentNode.replaceChild( anchorClone, anchorNode );
        focusNode.parentNode.replaceChild( focusClone, focusNode );

        anchorNode = anchorClone;
        focusNode  = focusClone;
      } else {
        toggleEditable( editable, false );
      }

      setTimeout( () => {
        selection.setBaseAndExtent( anchorNode, anchorOffset, focusNode, focusOffset );

        nextTick( () => {
          this.Editor.focus();
          Input.disabled = false;
          toggleEditable( editable, true );
          attr( editable, { 'aria-hidden': null } );
          this.release();
        } );
      }, DELAY_FOR_RESELECTION );
    } else {
      Input.disabled = false;
    }
  }
}
