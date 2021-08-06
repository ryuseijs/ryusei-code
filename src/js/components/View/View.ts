import { Elements, EventBusEvent } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { CLASS_PLACEHOLDER, CLASS_SCROLLBARS } from '../../constants/classes';
import {
  EVENT_MOUNTED,
  EVENT_RESIZE,
  EVENT_SCROLL_HEIGHT_CHANGED,
  EVENT_SCROLL_WIDTH_CHANGED,
  EVENT_SCROLLED,
  EVENT_SELECTED,
  EVENT_SELECTING,
} from '../../constants/events';
import { CHANGED, EXTEND, SELECTED, SELECTING, START } from '../../constants/selection-states';
import { Editor } from '../../core/Editor/Editor';
import { div, isIE, isMobile, max, min, rafThrottle, rect, styles, text, unit } from '../../utils';
import { Throttle } from '../../utils/function/throttle/throttle';
import { Selection } from '../Selection/Selection';
import { JUMP_OFFSET } from './constants';
import { EditorScrollbar } from './EditorScrollbar';
import { Scrollbar } from './Scrollbar';


/**
 * The class for managing the viewport.
 *
 * @since 0.1.0
 */
export class View extends Component {
  /**
   * Emits the resize event with reducing frequency by the animation frame.
   *
   * @readonly
   */
  emitResize: Throttle<() => void>;

  /**
   * Keeps the previous width of the viewport.
   */
  private lastWidth = 0;

  /**
   * Keeps the number of lines when the height is adjusted.
   */
  private lastLength: number;

  /**
   * Holds Scrollbar elements.
   */
  private scrollbars: Scrollbar[] = [];

  /**
   * Initializes the instance.
   *
   * @internal
   *
   * @param elements - A collection of essential editor elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );

    this.emitResize = rafThrottle( this.emit.bind( this, 'resize' ) );
    elements.scroller.scrollTop = 0;

    this.create();
    this.autoHeight();
    this.listen();
  }

  /**
   * Listens to some events.
   */
  private listen(): void {
    this.bind( window, 'resize', this.emitResize );

    this.on( [ EVENT_MOUNTED, EVENT_RESIZE, EVENT_SCROLLED ], this.autoWidth, this );
    this.on( EVENT_RESIZE, this.autoHeight.bind( this, true ), null, 2 );
    this.on( EVENT_SELECTED, this.onSelected, this );
    this.on( EVENT_SELECTING, this.clipScrollOffset, this );
  }

  /**
   * Called when the selection state is changed.
   *
   * @param e         - An EventBusEvent object.
   * @param Selection - A Selection instance.
   */
  private onSelected( e: EventBusEvent<Editor>, Selection: Selection ): void {
    if ( Selection.is( START, EXTEND ) && Selection.state.device === 'keyboard' ) {
      this.jump( Selection.focus[ 0 ] );
    }

    if ( Selection.is( CHANGED, SELECTING, SELECTED ) ) {
      this.clipScrollOffset();
    }
  }

  /**
   * Creates the scrollbar elements.
   */
  private create(): void {
    const { elements, elements: { scroller }, Editor } = this;
    const wrapper = div( CLASS_SCROLLBARS, elements.body );

    if ( ! isMobile() ) {
      this.scrollbars = [
        new EditorScrollbar( Editor, wrapper, scroller, true ),
        new EditorScrollbar( Editor, wrapper, scroller, false, () => [ this.getWidthBeforeContainer(), 0 ] ),
      ];
    }

    const { placeholder } = this.options;

    if ( placeholder ) {
      const placeholderElm = div( CLASS_PLACEHOLDER, elements.background );
      text( placeholderElm, placeholder );
    }
  }

  /**
   * Clips the caret position by all sides of the editor.
   * Only the left border refers the editor rect so that it includes the width of the fixed gutter.
   */
  private clipScrollOffset(): void {
    const { rect: caretRect } = this.Caret;
    const { focus } = this.Selection;

    if ( ! caretRect || ! this.Chunk.includes( focus[ 0 ] ) ) {
      return;
    }

    const { Measure } = this;
    const { scroller } = this.elements;
    const { padding, scrollerRect, lineHeight } = Measure;
    const { top: caretTop, right: caretRight, bottom: caretBottom, left: caretLeft } = caretRect;
    const editorRect = rect( this.elements.editor );

    let { scrollTop, scrollLeft } = scroller;

    const top    = scrollerRect.top + lineHeight / 2 + padding.top;
    const bottom = scrollerRect.bottom - lineHeight / 2 - padding.bottom;
    const left   = ( isIE() ? scrollerRect.left : ( editorRect.left + scrollLeft ) ) + max( padding.left, lineHeight );
    const right  = scrollerRect.right - max( padding.right, lineHeight );

    if ( caretTop < top ) {
      scrollTop -= top - caretTop;
    }

    if ( caretBottom > bottom ) {
      scrollTop += caretBottom - bottom;
    }

    if ( caretLeft < left ) {
      scrollLeft -= left - caretLeft;
    }

    if ( caretRight > right ) {
      scrollLeft += caretRight - right;
    }

    if ( ! focus[ 1 ] ) {
      scrollLeft = 0;
    }

    scroller.scrollTop  = scrollTop;
    scroller.scrollLeft = scrollLeft;
  }

  /**
   * Returns the width before the container element.
   *
   * @return The width before the container.
   */
  private getWidthBeforeContainer(): number {
    const { Measure } = this;
    return Measure.editorRect.left - Measure.containerRect.left;
  }

  /**
   * Jumps to the specified row if it's not visible in the scroller.
   * If the `middle` is `true`, this method try to vertically center the target line.
   *
   * @param row        - A row index to jump to.
   * @param middle     - Optional. Determines whether to jump to the middle of the viewport or not.
   * @param lineOffset - Optional. A number of lines to offset.
   */
  jump( row: number, middle?: boolean, lineOffset = JUMP_OFFSET ): void {
    const { Measure, Chunk, Measure: { scrollerRect } } = this;

    if ( middle ) {
      Chunk.scroll( Measure.getBottom( row ) - scrollerRect.height / 2 + Measure.lineHeight * lineOffset );
      return;
    }

    if ( ! this.isVisible( row ) ) {
      const center = Chunk.start + ( Chunk.length - 1 ) / 2;

      let scrollTop;

      if ( row > center ) {
        row = min( row + lineOffset, this.lines.length - 1 );
        scrollTop = Measure.getBottom( row ) - scrollerRect.height + Measure.padding.top;
      } else {
        scrollTop = Measure.getTop( max( row - lineOffset, 0 ) );
      }

      Chunk.scroll( scrollTop );
    }
  }

  /**
   * Adjusts the width of the lines element so that it can contain the longest line in the chunk.
   */
  autoWidth(): void {
    const { Measure } = this;
    const { width } = Measure.editorRect;

    if ( width > Measure.scrollerRect.width - this.getWidthBeforeContainer() && width > this.lastWidth ) {
      styles( this.elements.lines, { minWidth: unit( width ) } );
      this.lastWidth = width;

      this.emit( EVENT_SCROLL_WIDTH_CHANGED );
    }
  }

  /**
   * Adjusts the height of the container element so that it can contain all lines.
   * It won't be smaller than the scroller element when the editor has explicit height.
   *
   * @param skipLengthCheck - Optional. Whether to skip checking the number of lines or not.
   */
  autoHeight( skipLengthCheck?: boolean ): void {
    const { elements } = this;
    const { length } = this.lines;

    if ( skipLengthCheck || length !== this.lastLength ) {
      const { Measure, Measure: { padding } } = this;
      let height = Measure.lineHeight * ( length || 1 ) + padding.top + padding.bottom;

      if ( elements.root.style.height || this.options.height ) {
        height = max( height, Measure.scrollerRect.height );
      }

      styles( this.elements.container, { height: unit( height ) } );
      this.lastLength = length;

      this.emit( EVENT_SCROLL_HEIGHT_CHANGED );
    }
  }

  /**
   * Checks if the specified row is visible in the scroller or not.
   *
   * @param row        - A row index to check.
   * @param lineOffset - Optional. A number of lines to offset top and bottom borders.
   *
   * @return `true` if the row is in the scroller viewport, or otherwise `false`.
   */
  isVisible( row: number, lineOffset = 0 ): boolean {
    const { Chunk, Measure } = this;

    if ( Chunk.includes( row ) ) {
      const line = Chunk.getLine( row );

      if ( line ) {
        const { scrollerRect } = Measure;
        const lineRect = rect( line );
        const offset   = Measure.lineHeight * lineOffset;
        return lineRect.top >= scrollerRect.top + offset && lineRect.bottom <= scrollerRect.bottom - offset;
      }
    }

    return false;
  }

  /**
   * Destroys the component.
   *
   * @internal
   */
  destroy(): void {
    this.scrollbars.forEach( bar => { bar.destroy() } );
    super.destroy();
  }
}
