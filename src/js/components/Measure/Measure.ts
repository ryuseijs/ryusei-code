import { Elements, EventBusEvent, OffsetPosition, Position } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { CLASS_LINE } from '../../constants/classes';
import {
  EVENT_FONT_LOADED,
  EVENT_MOUNT,
  EVENT_RESIZE,
  EVENT_SCROLL_HEIGHT_CHANGED,
  EVENT_SCROLLED,
  EVENT_WINDOW_SCROLL,
} from '../../constants/events';
import { Editor } from '../../core/Editor/Editor';
import { clamp, div, rect, remove, round, styles } from '../../utils';
import { MeasureText } from './MeasureText';


/**
 * The class for measuring offset positions and caches some values.
 *
 * @since 0.1.0
 */
export class Measure extends Component {
  /**
   * Caches the lineHeight.
   */
  private lineHeightCache: number;

  /**
   * Caches the DOMRect objects of some elements.
   */
  private rectCaches: { editor?: DOMRect, scroller?: DOMRect, container?: DOMRect } = {};

  /**
   * Keeps the current CSS font settings.
   */
  private font: string;

  /**
   * Holds the MeasureText instance.
   */
  private measureText: MeasureText;

  /**
   * Caches the padding numbers.
   */
  padding: { top: number, right: number, bottom: number, left: number };

  /**
   * The Measure constructor.
   *
   * @param Editor - An Editor instance.
   */
  constructor( Editor: Editor ) {
    super( Editor );
    this.on( EVENT_MOUNT, this.onMount, this, 0 );
  }

  /**
   * Called just before components are mounted.
   * This component must be initialized earlier than other components.
   *
   * @param e        - An EventBusEvent object.
   * @param elements - A collection of essential editor elements.
   */
  private onMount( e: EventBusEvent, elements: Elements ): void {
    this.elements = elements;
    this.createMeasureText();
    this.updatePadding();
    this.listen();
  }

  /**
   * Listens to some events.
   * The resize handler must be executed after the Style update listener and before others.
   */
  private listen(): void {
    this.on( EVENT_RESIZE, () => {
      this.lineHeightCache = 0;
      this.updatePadding();
      this.createMeasureText();
      this.clearRectCaches();
    }, 1 );

    this.on( EVENT_FONT_LOADED, () => {
      this.measureText.clear();
    }, 1 );

    this.on( [ EVENT_SCROLL_HEIGHT_CHANGED, EVENT_SCROLLED, EVENT_WINDOW_SCROLL ], this.clearRectCaches, this, 1 );
  }

  /**
   * Updates the cache of the padding.
   */
  private updatePadding(): void {
    const { editor } = this.elements;
    const line = div( CLASS_LINE, editor );

    this.padding = {
      top   : parseFloat( styles( editor, 'paddingTop' ) ) || 0,
      bottom: parseFloat( styles( editor, 'paddingBottom' ) ) || 0,
      left  : parseFloat( styles( line, 'paddingLeft' ) ) || 0,
      right : parseFloat( styles( line, 'paddingRight' ) ) || 0,
    };

    remove( line );
  }

  /**
   * Creates a `MeasureText` instance only when the font settings are changed.
   */
  private createMeasureText() {
    const font = this.buildCSSFont();

    if ( this.font !== font ) {
      this.measureText = new MeasureText( font );
      this.font = font;
    }
  }

  /**
   * Returns the CSS font string of the current environment.
   *
   * @return A built string.
   */
  private buildCSSFont(): string {
    const { lines } = this.elements;
    return `${ styles( lines, 'fontSize' ) } ${ styles( lines, 'fontFamily' ) }`;
  }

  /**
   * Clears the all rect caches.
   */
  private clearRectCaches(): void {
    this.rectCaches = {};
  }

  /**
   * Returns a top position of the line at the provided row.
   *
   * @param row - A row index.
   *
   * @return A top position in px.
   */
  getTop( row: number ): number {
    return clamp( row, 0, this.lines.length - 1 ) * this.lineHeight;
  }

  /**
   * Returns a bottom position of the line at the provided row.
   *
   * @param row - A row index.
   *
   * @return A bottom position in px.
   */
  getBottom( row: number ): number {
    const { Code } = this;
    const isLast = row >= Code.size - 1;
    return this.getTop( row + 1 ) + ( isLast ? this.lineHeight : 0 );
  }

  /**
   * Finds the closest row index with the provided position.
   *
   * @param top - A top position to search for.
   *
   * @return The closest row index.
   */
  closest( top: number ): number {
    const row = round( ( top - this.padding.top ) / this.lineHeight );
    return clamp( row, 0, this.lines.length - 1 );
  }

  /**
   * Measures the provided string and returns the width.
   *
   * @param string   - A string to measure.
   * @param useCache - Optional. Determines whether to use the cached width or not..
   *
   * @return The width of the string.
   */
  measureWidth( string: string, useCache = true ): number {
    return this.measureText.measure( string, useCache );
  }

  /**
   * Converts the passed position to the BoundaryRect object.
   *
   * @param position - A position to convert.
   *
   * @return An object literal with top and left positions.
   */
  getOffset( position: Position ): OffsetPosition {
    const { padding } = this;
    const line = position[ 0 ] === this.Selection.focus[ 0 ] ? this.Input.value : this.Code.getLine( position[ 0 ] );

    return {
      top : this.getTop( position[ 0 ] ) + padding.top,
      left: this.measureWidth( line.slice( 0, position[ 1 ] ) ) + padding.left,
    };
  }

  /**
   * Returns a DOMRect object of the editor element.
   *
   * @return A DOMRect object.
   */
  get editorRect(): DOMRect {
    return ( this.rectCaches.editor = this.rectCaches.editor || rect( this.elements.editor ) );
  }

  /**
   * Returns a DOMRect object of the scroller element.
   *
   * @return A DOMRect object.
   */
  get scrollerRect(): DOMRect {
    return ( this.rectCaches.scroller = this.rectCaches.scroller || rect( this.elements.scroller ) );
  }

  /**
   * Returns a DOMRect object of the container element.
   *
   * @return A DOMRect object.
   */
  get containerRect(): DOMRect {
    return ( this.rectCaches.container = this.rectCaches.container || rect( this.elements.container ) );
  }

  /**
   * Returns the line height in px.
   *
   * @return Line height in px.
   */
  get lineHeight(): number {
    return ( this.lineHeightCache = this.lineHeightCache
      || parseFloat( styles( this.elements.editor, 'lineHeight' ) ) );
  }
}
