import { Elements, EventBusEvent } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { CLASS_ANCHOR, CLASS_EMPTY, CLASS_FOCUS, CLASS_LINE, CLASS_PRESERVED } from '../../constants/classes';
import {
  EVENT_ANCHOR_LINE_CHANGED,
  EVENT_CHUNK_MOVED,
  EVENT_CHUNK_SUPPLIED,
  EVENT_FOCUS_LINE_CHANGED,
  EVENT_RESIZE,
  EVENT_SCROLL,
  EVENT_SCROLL_HEIGHT_CHANGED,
  EVENT_SCROLLED,
  EVENT_SCROLLER_SCROLL,
  EVENT_SELECTED,
  EVENT_SELECTING,
  EVENT_WINDOW_SCROLL,
} from '../../constants/events';
import { CHANGED, COLLAPSED } from '../../constants/selection-states';
import { Editor } from '../../core/Editor/Editor';
import {
  abs,
  addClass,
  append,
  assert,
  assign,
  attr,
  before,
  between,
  ceil,
  clamp,
  debounce,
  div,
  floor,
  hasClass,
  html,
  max,
  min,
  prepend,
  queryAll,
  rafThrottle,
  rect,
  remove,
  removeClass,
  slice,
  tag,
  text,
} from '../../utils';
import { Selection } from '../Selection/Selection';
import { MARGIN_LINES, SCROLL_END_DEBOUNCE_DURATION } from './constants';


/**
 * The type for the data of the anchor or focus line.
 *
 * @since 0.1.0
 */
type LineBoundaryData = { line?: Element, row?: number };

/**
 * The class for handling line elements.
 *
 * @since 0.1.0
 */
export class Chunk extends Component {
  /**
   * Indicates what row corresponds with the first line element.
   * The number can be negative.
   *
   * @readonly
   */
  start = 0;

  /**
   * The number of margin lines before and after visible lines.
   * The total number of lines will be `margin * 2 + visibleLines`.
   *
   * @readonly
   */
  margin = MARGIN_LINES;

  /**
   * The number of visible lines calculated by the editor height and the line height.
   *
   * @readonly
   */
  visibleLines: number;

  /**
   * The current offset amount from the top of the scroller element in pixel.
   *
   * @readonly
   */
  offsetY = 0;

  /**
   * The anchor line data.
   */
  private anchor: LineBoundaryData = {};

  /**
   * The focus line data.
   */
  private focus: LineBoundaryData  = {};

  /**
   * Indicates whether the anchor line is changed or not.
   */
  private anchorChanged: boolean;

  /**
   * Indicates whether the focus line is changed or not.
   */
  private focusChanged: boolean;

  /**
   * Holds the previous scroll position.
   */
  private scrollTop = 0;

  /**
   * Holds the scroller element.
   */
  private scroller: HTMLElement;

  /**
   * Holds the parent element of lines.
   */
  private parent: HTMLElement;

  /**
   * Indicates the chunk is active or not.
   */
  private active: boolean;

  /**
   * Caches the border positions.
   */
  private borderCache: [ number, number ];

  /**
   * Initializes the component.
   *
   * @internal
   *
   * @param elements - A collection of essential editor elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );

    const { scroller } = elements;

    this.scroller   = scroller;
    this.parent     = elements.lines;
    this.scrollTop  = window.pageYOffset + scroller.scrollTop;
    this.active     = this.isVisible();
    this.onScrolled = debounce( this.onScrolled.bind( this ), SCROLL_END_DEBOUNCE_DURATION );

    this.supply();
    this.remove();
    this.listen();
  }

  /**
   * Listens to some events.
   */
  private listen(): void {
    const onScroll = rafThrottle( this.onScroll.bind( this ) );

    this.bind( this.scroller, 'scroll', () => {
      onScroll( true );
      this.emit( EVENT_SCROLLER_SCROLL );
    } );

    this.bind( window, 'scroll', () => {
      onScroll( false );
      this.emit( EVENT_WINDOW_SCROLL );
    } );

    this.bind( window, 'scroll', rafThrottle( () => {
      this.active      = this.isVisible();
      this.borderCache = null;
    } ) );

    this.on( EVENT_RESIZE, () => {
      this.borderCache = null;
      this.reposition();
    } );

    this.on( EVENT_SCROLL_HEIGHT_CHANGED, () => {
      this.supply();
      this.borderCache = null;
    } );

    this.on( EVENT_SELECTED, this.onSelected, this, 0 );
    this.on( EVENT_SELECTING, () => {
      this.activate( true );

      if ( this.focusChanged ) {
        this.emitChangedEvent( true );
      }
    } );
  }

  /**
   * Called whenever the selection state changes.
   *
   * @param e         - An EventBusEvent object.
   * @param Selection - A Selection instance.
   */
  private onSelected( e: EventBusEvent<Editor>, Selection: Selection ): void {
    if ( Selection.is( COLLAPSED, CHANGED ) ) {
      this.activate( true );
      this.activate( false );

      if ( this.anchorChanged ) {
        this.emitChangedEvent( false );
      }

      if ( this.focusChanged ) {
        this.emitChangedEvent( true );
      }
    }
  }

  /**
   * Called whenever the editor scrolls.
   * Be aware that the `scrollY` property is not supported in IE.
   *
   * @return byScroller - Indicates whether the editor is scrolled by the editor element itself or the window.
   */
  private onScroll( byScroller: boolean ): void {
    const top = window.pageYOffset + this.scroller.scrollTop;

    if ( this.active ) {
      const { scrollTop } = this;

      if ( scrollTop < top ) {
        this.moveDown();
      } else if ( scrollTop > top ) {
        this.moveUp();
      }

      this.emit( EVENT_SCROLL, true );
      this.onScrolled( byScroller );
    }

    this.scrollTop = top;
  }

  /**
   * Called the scroll likely ends.
   *
   * @return byScroller - Indicates whether the editor is scrolled by the editor element itself or the window.
   */
  private onScrolled( byScroller: boolean ): void {
    this.emit( EVENT_SCROLLED, byScroller );
  }

  /**
   * Activates the anchor or focus line.
   * - If the selection is collapsed outside of the view,
   *   the anchor and focus lines are merged into a single boundary line.
   * - If the line is not available but there is a boundary,
   *   that means the boundary has been added manually by the Selection component.
   *
   * @param focus - Determines whether to activate focus or anchor line.
   */
  private activate( focus: boolean ): void {
    const className = focus ? CLASS_FOCUS : CLASS_ANCHOR;
    const row       = this.Selection.get( false )[ focus ? 'end' : 'start' ][ 0 ];
    const boundary  = this.getBoundary( focus );

    let line = this.getLine( row );

    if ( ! line ) {
      const anotherBoundary = this.getBoundary( ! focus );

      if ( anotherBoundary.row === row ) {
        line = anotherBoundary.line;
      }
    }

    if ( line ) {
      if ( boundary.row !== row ) {
        this.deactivate( focus );

        addClass( line, className );
        assign( boundary, { line, row } );

        this.setBoundaryChanged( focus, true );
      }
    }
  }

  /**
   * Deactivates the anchor or focus line if it is changed.
   *
   * @param focus - Determines whether to deactivate focus or anchor line.
   */
  private deactivate( focus: boolean ): void {
    const boundary = this.getBoundary( focus );
    const { line } = boundary;

    if ( line ) {
      if ( hasClass( line, CLASS_PRESERVED ) && ! hasClass( line, focus ? CLASS_ANCHOR : CLASS_FOCUS ) ) {
        remove( line );
      } else {
        removeClass( line, focus ? CLASS_FOCUS : CLASS_ANCHOR );
      }

      boundary.line = null;
      boundary.row  = null;
    }
  }

  /**
   * Emits the `changed` event for an anchor or focus line.
   *
   * @param focus - Determines whether to emit the event for the focus or anchor line.
   */
  private emitChangedEvent( focus: boolean ): void {
    const boundary = this.getBoundary( focus );
    assert( boundary.line );
    this.emit( focus ? EVENT_FOCUS_LINE_CHANGED : EVENT_ANCHOR_LINE_CHANGED, boundary.line, boundary.row );

    if ( focus ) {
      this.focusChanged = false;
    } else {
      this.anchorChanged = false;
    }
  }

  /**
   * Sets the `anchorChanged` or `focusChanged` property.
   *
   * @param focus   - Determines which property should be changed.
   * @param changed - The value for the property.
   */
  private setBoundaryChanged( focus: boolean, changed: boolean ): void {
    if ( focus ) {
      this.focusChanged = changed;
    } else {
      this.anchorChanged = changed;
    }
  }

  /**
   * Supplies line elements so that they can fill the viewport.
   */
  private supply(): void {
    const { lineHeight, scrollerRect } = this.Measure;

    const maxHeight    = min( scrollerRect.height, window.innerHeight );
    const visibleLines = ceil( maxHeight / lineHeight );
    const totalLength  = visibleLines + this.margin * 2;

    if ( visibleLines !== this.visibleLines ) {
      const { elms } = this;
      const { length } = elms;
      const diff = totalLength - length;

      if ( diff > 0 ) {
        this.html( this.start + length, diff, 'beforeend' );
        this.emit( EVENT_CHUNK_SUPPLIED, this, diff );
      }

      this.visibleLines = visibleLines;
    }
  }

  /**
   * Removes unnecessary lines.
   */
  private remove(): void {
    const { elms, length } = this;

    if ( elms.length > length ) {
      remove( elms.slice( length - elms.length ) );
    }
  }

  /**
   * Returns a HTML string of lines.
   *
   * @param start  - A start row index.
   * @param length - A number of lines.
   * @param where  - Optional. If provided, built HTML will be inserted to the parent by the `insertAdjacentHTML`.
   *
   * @return A built HTML.
   */
  private html( start: number, length: number, where?: InsertPosition ): string {
    let html = '';

    for ( let i = 0; i < length; i++ ) {
      const row  = start + i;
      const line = this.lines[ row ];

      html += tag( [ CLASS_LINE, line ? '' : CLASS_EMPTY ] );
      html += line ? line.html : '';
      html += '</div>';
    }

    if ( where ) {
      this.parent.insertAdjacentHTML( where, html );
    }

    return html;
  }

  /**
   * Moves down elements which are outside of the border.
   */
  private moveDown(): void {
    const lengthToMove = this.computeLengthToMoveDown();

    if ( lengthToMove >= this.length ) {
      this.jumpIntoView();
    } else if ( lengthToMove > 0 ) {
      const { lineHeight } = this.Measure;

      this.offsetY += lineHeight * lengthToMove;

      if ( this.start < 0 ) {
        this.offsetY = max( this.offsetY + this.start * lineHeight, 0 );
      }

      const { elms } = this;
      const html = this.html( this.start + elms.length, lengthToMove );
      elms[ elms.length - 1 ].insertAdjacentHTML( 'afterend', html );

      remove( this.detach( 0, lengthToMove ) );

      this.start += lengthToMove;

      this.attach();
      this.offset();

      this.emit( EVENT_CHUNK_MOVED, this );
    }
  }

  /**
   * Moves up elements which are outside of the border.
   */
  private moveUp(): void {
    const lengthToMove = this.computeLengthToMoveUp();

    if ( lengthToMove >= this.length ) {
      this.jumpIntoView();
    } else if ( lengthToMove > 0 ) {
      const { lineHeight } = this.Measure;

      remove( this.detach( - lengthToMove ) );

      const { elms } = this;
      const html = this.html( this.start - lengthToMove, lengthToMove );
      elms[ 0 ].insertAdjacentHTML( 'beforebegin', html );

      this.start -= lengthToMove;
      this.offsetY = max( this.offsetY - lineHeight * lengthToMove, 0 );

      this.attach();
      this.offset();

      this.emit( EVENT_CHUNK_MOVED, this );
    }
  }

  /**
   * Computes the number of lines to move down.
   *
   * @return A number of lines to move down.
   */
  private computeLengthToMoveDown(): number {
    if ( this.end < this.lines.length ) {
      const { Measure: { lineHeight }, margin } = this;
      const { top } = rect( this.parent );
      const border = this.border[ 0 ];

      if ( top + lineHeight * margin < border ) {
        return floor( ( border - top ) / lineHeight );
      }
    }

    return 0;
  }

  /**
   * Computes the number of lines to move up.
   *
   * @return A number of lines to move up.
   */
  private computeLengthToMoveUp(): number  {
    if ( this.start > 0 ) {
      const { Measure: { lineHeight, padding: { bottom: paddingBottom } }, margin } = this;
      const { top, bottom } = rect( this.parent );
      const [ topBorder, bottomBorder ] = this.border;

      if ( top > topBorder ) {
        return margin + floor( ( top - topBorder ) / lineHeight );
      }

      if ( bottom - lineHeight * margin - paddingBottom > bottomBorder ) {
        return floor( ( bottom - paddingBottom - bottomBorder ) / lineHeight );
      }
    }

    return 0;
  }

  /**
   * Detaches lines in the specified lines from the chunk.
   * Both anchor and focus lines will be preserved, and others will be returned.
   *
   * @param start - A start index.
   * @param end   - An end index.
   *
   * @return An array with detached elements.
   */
  private detach( start: number, end?: number ): HTMLElement[] {
    return this.elms.slice( start, end ).reduce( ( detached: HTMLElement[], elm: HTMLElement ) => {
      const isAnchor = hasClass( elm, CLASS_ANCHOR );
      const isFocus  = hasClass( elm, CLASS_FOCUS );

      if ( isAnchor || isFocus ) {
        addClass( elm, CLASS_PRESERVED );
        attr( elm, { 'aria-hidden': true } );
      } else {
        detached.push( elm );
      }

      return detached;
    }, [] );
  }

  /**
   * Attaches detached anchor and focus lines to the chunk.
   * Do not move the anchor and focus lines to keep the native selection.
   */
  private attach(): void {
    const { Selection, anchor: { line: anchorLine }, focus: { line: focusLine } } = this;
    const { anchor, focus } = Selection;
    const includesAnchor          = this.includes( anchor[ 0 ] );
    const includesFocus           = this.includes( focus[ 0 ] );
    const includesPreservedAnchor = includesAnchor && hasClass( anchorLine, CLASS_PRESERVED );
    const includesPreservedFocus  = includesFocus && hasClass( focusLine, CLASS_PRESERVED );

    if ( includesPreservedAnchor || includesPreservedFocus ) {
      const anchorIndex = includesAnchor ? anchor[ 0 ] - this.start : -1;
      const focusIndex  = includesFocus ? focus[ 0 ] - this.start : -1;
      const firstIndex  = min( anchorIndex, focusIndex );
      const secondIndex = max( anchorIndex, focusIndex );
      const backward    = Selection.isBackward();

      let firstElm: Element, secondElm: Element;

      if ( firstIndex > -1 ) {
        firstElm  = backward ? focusLine : anchorLine;
        secondElm = backward ? anchorLine : focusLine;
      } else {
        secondElm = includesAnchor ? anchorLine : focusLine;
      }

      const { elms } = this;
      const topElms    = firstElm ? elms.slice( 0, firstIndex ) : elms.slice( 0, secondIndex );
      const middleElms = firstElm ? elms.slice( firstIndex + 1, secondIndex ) : [];
      const bottomElms = elms.slice( secondIndex + 1 );

      if ( includesPreservedAnchor ) {
        removeClass( anchorLine, CLASS_PRESERVED );
        attr( anchorLine, { 'aria-hidden': null } );
        remove( elms[ anchorIndex ] );
      }

      if ( includesPreservedFocus && anchorIndex !== focusIndex ) {
        removeClass( focusLine, CLASS_PRESERVED );
        attr( focusLine, { 'aria-hidden': null } );
        remove( elms[ focusIndex ] );
      }

      before( topElms, firstElm || secondElm );
      before( middleElms, secondElm );

      const { nextElementSibling } = secondElm;

      if ( bottomElms.length && bottomElms[ 0 ] !== nextElementSibling ) {
        before( bottomElms, nextElementSibling );
      }
    }
  }

  /**
   * Offsets the parent element to make it visible inside the viewport.
   *
   * @param offsetY - Optional. Amount of the offset. If empty, the current `offsetY` will be used.
   */
  private offset( offsetY = this.offsetY ): void {
    this.parent.style.top = `${ offsetY }px`;
  }

  /**
   * Makes the chunk jump so that it is visible in the view.
   */
  private jumpIntoView(): void {
    this.jump( this.Measure.closest( this.scroller.scrollTop ) );
  }

  /**
   * Repositions the chunk to the current scroll top position.
   */
  private reposition(): void {
    const top = this.Measure.getTop( this.start );

    if ( top !== this.offsetY ) {
      const focusRow      = this.focus.row;
      const includesFocus = this.includes( focusRow );

      this.jumpIntoView();

      if ( includesFocus ) {
        this.View.jump( focusRow );
      }
    }
  }

  /**
   * Checks if the part of the scroller element is vertically visible or not.
   * This method does not care the horizontal visibility.
   *
   * @return `true` if the scroller is visible, or otherwise `false`.
   */
  private isVisible(): boolean {
    const { top, bottom } = rect( this.scroller );
    const { innerHeight } = window;
    return between( top, 0, innerHeight ) || between( bottom, 0, innerHeight ) || top < 0 && bottom > innerHeight;
  }

  /**
   * Jumps to the specified row index.
   * Use `View#jump()` instead if you want to scroll to the specific line.
   *
   * @param row - A row to jump to.
   */
  private jump( row: number ): void {
    const { Measure, length } = this;
    const { padding: { top: paddingTop }, lineHeight } = Measure;
    const offsetRows = ceil( paddingTop / lineHeight );

    this.start   = clamp( row - offsetRows, 0, max( this.lines.length - length + this.margin, 0 ) );
    this.offsetY = Measure.getTop( this.start );

    const elms = this.detach( 0 );

    elms[ 0 ].insertAdjacentHTML( 'afterend', this.html( this.start, length ) );
    remove( elms );

    this.offset();
    this.attach();

    this.emit( EVENT_CHUNK_MOVED, this );
  }

  /**
   * Returns the focus or anchor boundary data object which contains the line element and the row index.
   *
   * @param focus - Determines whether to return the focus or anchor boundary data.
   *
   * @return The boundary data object.
   */
  getBoundary( focus: boolean ): LineBoundaryData {
    return focus ? this.focus : this.anchor;
  }

  /**
   * Manually adds preserved line.
   * This method should be only used by the Selection component.
   * Note that the `changed` event will be emitted by the `activate` method.
   *
   * @internal
   *
   * @param focus - Determines whether to add a focus or anchor line.
   * @param row   - A row index.
   *
   * @return A created preserved line element.
   */
  addPreservedLine( focus: boolean, row: number ): Element {
    const { parent } = this;
    const classes = `${ CLASS_LINE } ${ focus ? CLASS_FOCUS : CLASS_ANCHOR } ${ CLASS_PRESERVED }`;
    const line    = div( { class: classes, 'aria-hidden': true } );

    this.deactivate( focus );

    html( line, this.lines[ row ].html );

    if ( row < this.start ) {
      prepend( parent, line );
    } else {
      append( parent, line );
    }

    assign( this.getBoundary( focus ), { line, row } );
    this.setBoundaryChanged( focus, true );

    return line;
  }

  /**
   * Updates HTML of elements with the latest HTML of lines.
   * If omitting elements, updates all elements in the chunk.
   *
   * @param elms  - Optional. Elements to update.
   * @param start - Optional. A start index that corresponds with the first element.
   */
  sync( elms = this.elms, start = this.start ): void {
    for ( let i = 0; i < elms.length; i++ ) {
      const line = this.lines[ i + start ];
      const elm  = elms[ i ];

      if ( line ) {
        html( elm, line.html );
        removeClass( elm, CLASS_EMPTY );
      } else {
        text( elm, '' );
        addClass( elm, CLASS_EMPTY );
      }
    }
  }

  /**
   * Syncs difference of the number of lines before syncing each HTML for performance.
   * If the `diff` length is greater than the `margin`, this method does nothing.
   *
   * @param row  - A row index.
   * @param diff - Difference of the number of lines before and after editing.
   */
  syncDiff( row: number, diff: number ): void {
    if ( abs( diff ) < MARGIN_LINES ) {
      const index = row - this.start;
      const { elms } = this;

      if ( diff > 0 ) {
        before( elms.slice( - diff ), elms[ index ].nextElementSibling );
      } else if ( diff < 0 ) {
        append( this.parent, elms.slice( index + 1, index + 1 - diff ) );
      }
    }
  }

  /**
   * Refreshes the chunk.
   */
  refresh(): void {
    this.moveDown();
    this.moveUp();
  }

  /**
   * Scrolls to the specified top position
   * and manually calls the `onScroll` handler for succeeding synchronous processes.
   *
   * @internal
   *
   * @param scrollTop - A scroll position.
   */
  scroll( scrollTop: number ): void {
    this.scroller.scrollTop = scrollTop;
    this.onScroll( true );
  }

  /**
   * Returns the row index which the provided line element corresponds with.
   *
   * @param elm - A line element.
   *
   * @return The row index of the line element if available, or otherwise `-1`.
   */
  getRow( elm: HTMLElement ): number {
    const row = this.elms.indexOf( elm );
    return row > -1 ? row + this.start : -1;
  }

  /**
   * Returns the line at the specified row if available.
   *
   * @param row - A row index.
   *
   * @return A line element if available, or `undefined` if not.
   */
  getLine( row: number ): Element | undefined {
    return this.elms[ row - this.start ];
  }

  /**
   * Checks if the chunk includes the specified row or not.
   *
   * @param row - A row index.
   *
   * @return `true` if the chunk includes the row, or otherwise `false`.
   */
  includes( row: number ): boolean {
    return between( row, this.start, this.end );
  }

  /**
   * Returns the end index of the chunk lines.
   * This may be greater than the actual total number of lines.
   *
   * @return An end index of the chunk.
   */
  get end(): number {
    return this.start + this.length - 1;
  }

  /**
   * Returns the number of chunk lines without preserved ones.
   *
   * @return A number of line elements in the chunk.
   */
  get length(): number {
    return this.visibleLines + this.margin * 2;
  }

  /**
   * Returns chunk lines without preserved ones.
   *
   * @return An array containing line elements in the chunk.
   */
  get elms(): Element[] {
    return slice( queryAll( this.parent, `.${ CLASS_LINE }:not(.${ CLASS_PRESERVED })` ) );
  }

  /**
   * Returns borders to move elements up or down.
   *
   * @return A tuple containing top and bottom borders.
   */
  protected get border(): [ number, number ] {
    if ( ! this.borderCache ) {
      const domRect = rect( this.scroller );
      const top     = max( domRect.top, 0 );
      const bottom  = min( domRect.bottom, window.innerHeight );

      this.borderCache = [ top, bottom ];
    }

    return this.borderCache;
  }
}
