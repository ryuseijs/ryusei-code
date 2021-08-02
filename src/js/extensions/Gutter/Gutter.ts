import { Elements, GutterOptions } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { Lines } from '../../components/Code/Lines';
import { CLASS_ACTIVE } from '../../constants/classes';
import {
  EVENT_CHUNK_MOVED,
  EVENT_CHUNK_SUPPLIED,
  EVENT_INIT_STYLE,
  EVENT_RESIZE,
  EVENT_SCROLL_HEIGHT_CHANGED,
} from '../../constants/events';
import { Editor } from '../../core/Editor/Editor';
import {
  addClass,
  between,
  create,
  div,
  hasClass,
  isHTMLElement,
  min,
  prevent,
  query,
  remove,
  repeat,
  slice,
  styles,
  tag,
  text,
  toggleClass,
  unit,
} from '../../utils';
import {
  CLASS_GUTTER,
  CLASS_GUTTER_FLOAT,
  CLASS_GUTTER_ROW,
  CLASS_HAS_GUTTER,
  CLASS_LINE_NUMBER,
  CLASS_STICKY,
} from './classes';
import { DEFAULT_OPTIONS } from './defaults';


/**
 * The class for a gutter.
 *
 * @since 0.1.0
 */
export class Gutter extends Component {
  /**
   * Holds the gutter element.
   */
  private gutter: HTMLDivElement;

  /**
   * Holds the float element.
   */
  private float: HTMLDivElement;

  /**
   * Keeps the active row element.
   */
  private activeElm: Element;

  /**
   * Holds options.
   */
  private readonly opts: GutterOptions;

  /**
   * The number where the gutter starts.
   */
  private readonly start: number;

  /**
   * The Gutter constructor.
   *
   * @param Editor - An Editor instance.
   */
  constructor( Editor: Editor ) {
    super( Editor );

    this.opts  = this.getOptions<GutterOptions>( 'gutter', DEFAULT_OPTIONS );
    this.start = this.opts.start;

    this.on( EVENT_INIT_STYLE, ( e, add ) => {
      add( `.${ CLASS_GUTTER }`, 'fontFamily', this.options.monospaceFont );
    } );

    this.render();
  }

  /**
   * Renders a gutter element and rows.
   */
  private render(): void {
    this.on( 'root:open', ( e, append, classes ) => {
      classes.push( CLASS_HAS_GUTTER );
    } );

    this.on( 'editor:open', ( e, append, classes, lines ) => {
      append( tag( [ CLASS_GUTTER, this.opts.sticky ? CLASS_STICKY : '' ], { 'aria-hidden': true } ) );
      append( tag( CLASS_GUTTER_FLOAT ) );
      append( this.renderRows( lines, append ) );
      append( repeat( '</div>', 2 ) ); // float and gutter
    } );

    this.on( EVENT_INIT_STYLE, ( e, add ) => {
      const { lineHeight } = this.options;
      add( `.${ CLASS_GUTTER_ROW }`, { height: lineHeight ? `${ lineHeight }em` : undefined, lineHeight } );
    } );
  }

  /**
   * Renders rows of a gutter.
   * `+1` creates an extra row for measurement of the gutter width.
   *
   * @param lines  - An array containing lines.
   * @param append - The function that appends a HTML string.
   */
  private renderRows( lines: Lines, append: ( string: string ) => void ): string {
    const html: string[] = [];
    const max  = min( lines.length, this.options.maxInitialLines ) + 1;

    for ( let i = 0; i < max; i++ ) {
      const number = ( i === max - 1 ? lines.length - 1 : i ) + this.start;

      append( tag( CLASS_GUTTER_ROW ) );
      append( `<span class="${ CLASS_LINE_NUMBER }">${ number }</span>` );

      this.emit( 'gutter:row', html, i, number );

      append( `</div>` );
    }

    return html.join( '' );
  }

  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );

    this.gutter = query<HTMLDivElement>( elements.root, `.${ CLASS_GUTTER }` );
    this.float  = query<HTMLDivElement>( this.gutter, `.${ CLASS_GUTTER_FLOAT }` );

    if ( this.gutter ) {
      const { children } = this.float;
      const diff = this.Chunk.length - children.length;

      if ( diff > 0 ) {
        this.supply( diff );
      } else if ( diff < 0 ) {
        remove( slice( children, diff ) );
      }

      this.listen();
      this.update();
    }
  }

  /**
   * Supplies the specified number of row and line number elements.
   *
   * @param length - The number of elements to create.
   */
  private supply( length: number ): void {
    for ( let i = 0; i < length; i++ ) {
      create( 'span', CLASS_LINE_NUMBER, div( CLASS_GUTTER_ROW, this.float ) );
    }
  }

  /**
   * Listens to some events.
   */
  private listen(): void {
    this.on( EVENT_CHUNK_SUPPLIED, ( e, chunk, diff ) => { this.supply( diff ) } );
    this.on( [ EVENT_CHUNK_MOVED, EVENT_SCROLL_HEIGHT_CHANGED, EVENT_RESIZE ], this.update, this );
    this.on( 'activeLine:updated', this.activate, this );
    this.on( 'activeLine:deactivated', this.deactivate, this );

    if ( this.opts.selectLine ) {
      this.bind( this.gutter, 'pointerdown', this.onPointerDown, this );
    }
  }

  /**
   * Called when the gutter emits the `pointerdown` event.
   *
   * @param e - A PointerEvent object.
   */
  private onPointerDown( e: PointerEvent ): void {
    const { target } = e;

    if ( isHTMLElement( target ) && hasClass( target, CLASS_LINE_NUMBER ) ) {
      const number = +text( target );

      if ( ! isNaN( number ) ) {
        this.Selection.selectLine( number - this.start, true, true );
        prevent( e );
      }
    }
  }

  /**
   * Updates line numbers and offsets the float element to the Chunk position.
   */
  private update(): void {
    const { Chunk: { start: chunkStart }, start } = this;
    const { length } = this.lines;
    const { children: rows } = this.float;

    for ( let i = 0; i < rows.length; i++ ) {
      const elm    = rows[ i ];
      const number = ( i === rows.length - 1 ? length - 1 : chunkStart + i ) + start;
      text( elm.firstChild, between( number, start, length + start - 1 ) ? `${ number }` : '' );
    }

    this.offset();
    this.activate();
  }

  /**
   * Offsets the float element to the current Chunk position.
   */
  private offset(): void {
    const { Chunk, Chunk: { start } } = this;
    const offset = Chunk.offsetY + ( start < 0 ? start * this.Measure.lineHeight : 0 );
    styles( this.float, { top: unit( offset ) } );
  }

  /**
   * Activates the specified row.
   */
  private activate(): void {
    const row = this.Selection.focus[ 0 ];
    const elm = this.getElm( row );

    this.deactivate();

    if ( elm ) {
      addClass( elm, CLASS_ACTIVE );
      this.activeElm = elm;
      this.emit( 'gutter:activated', elm );
    }
  }

  /**
   * Deactivates the active row if there is.
   */
  private deactivate(): void {
    const { activeElm } = this;

    if ( activeElm ) {
      toggleClass( activeElm, CLASS_ACTIVE, false );
      this.emit( 'gutter:deactivated', activeElm );
      this.activeElm = null;
    }
  }

  /**
   * Returns the element at the row index.
   *
   * @param row - A row index.
   *
   * @return A row element if available, or otherwise `undefined`.
   */
  private getElm( row: number ): Element | undefined {
    return row > -1 ? this.float.children[ row - this.Chunk.start ] : undefined;
  }
}
