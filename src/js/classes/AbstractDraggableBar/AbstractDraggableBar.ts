import { CLASS_DRAGGING } from '../../constants/classes';
import { div, forOwn, off, on, prevent, toggleClass } from '../../utils';


/**
 * Event names for the beginning of dragging.
 *
 * @since 0.1.0
 */
export const DRAG_START_EVENTS = 'pointerdown';

/**
 * Event names for the end of dragging.
 *
 * @since 0.1.0
 */
export const DRAG_END_EVENTS = 'pointerup';

/**
 * Event names on dragging.
 *
 * @since 0.1.0
 */
export const DRAGGING_EVENTS = 'pointermove';

/**
 * The conversion map for vertical/horizontal props.
 *
 * @since 0.1.0
 */
const ORIENTATION_MAP = {
  vertical    : 'horizontal',
  scrollHeight: 'scrollWidth',
  clientHeight: 'clientWidth',
  scrollTop   : 'scrollLeft',
  minHeight   : 'minWidth',
  maxHeight   : 'maxWidth',
  height      : 'width',
  top         : 'left',
  pageY       : 'pageX',
  translateY  : 'translateX',
};

/**
 * The abstract class for creating a draggable bar.
 *
 * @since 0.1.0
 */
export abstract class AbstractDraggableBar {
  /**
   * Indicates whether the bar is a vertical or horizontal sizer or not.
   */
  protected readonly vertical: boolean;

  /**
   * Holds the parent element.
   */
  protected readonly parent: HTMLElement;

  /**
   * The bar element.
   */
  protected readonly elm: HTMLDivElement;

  /**
   * Holds the prop names determined by the bar direction.
   */
  protected readonly names: Record<string, string> = {};

  /**
   * Keeps the coordinate at the drag start.
   */
  protected startCoord: number;

  /**
   * Keeps the last coordinate.
   */
  protected lastCoord: number;

  /**
   * The AbstractDraggableBar constructor.
   *
   * @param classes  - A class or classes of the bar.
   * @param parent   - A parent element of the bar.
   * @param vertical - Determines whether to create a vertical or horizontal bar.
   */
  protected constructor( classes: string | string[], parent: HTMLElement, vertical: boolean ) {
    this.elm      = div( classes, parent );
    this.parent   = parent;
    this.vertical = vertical;

    forOwn( ORIENTATION_MAP, ( prop, key ) => {
      this.names[ key ] = vertical ? key : prop;
    } );

    this.bind();
  }

  /**
   * Listens to some events.
   */
  protected bind(): void {
    this.onDrag     = this.onDrag.bind( this );
    this.onDragging = this.onDragging.bind( this );
    this.onDragged  = this.onDragged.bind( this );

    on( this.elm, DRAG_START_EVENTS, this.onDrag );
  }

  /**
   * Called when the element starts being dragged.
   *
   * @param e - A PointerEvent object.
   */
  protected onDrag( e: PointerEvent ): void {
    on( window, DRAG_END_EVENTS, this.onDragged );
    on( window, DRAGGING_EVENTS, this.onDragging );

    this.startCoord = this.getCoord( e );
    this.lastCoord  = this.startCoord;
    this.toggleClass( true );

    prevent( e );
  }

  /**
   * Called while the element is dragged.
   *
   * @param e - A PointerEvent object.
   */
  protected onDragging( e: PointerEvent ): void {
    prevent( e );
  }

  /**
   * Called when the element is released.
   */
  protected onDragged(): void {
    off( window, DRAG_END_EVENTS, this.onDragged );
    off( window, DRAGGING_EVENTS, this.onDragging );
    this.toggleClass( false );
  }

  /**
   * Returns the `pageX` and `pageY` coordinates provided by the event.
   *
   * @param e - A PointerEvent object.
   *
   * @return A pageX or pageY coordinate.
   */
  protected getCoord( e: PointerEvent ): number {
    return e[ this.names.pageY ];
  }

  /**
   * Toggles "dragging" classes of the element and parent element.
   *
   * @param add - Determines whether to add or remove classes.
   */
  protected toggleClass( add: boolean ): void {
    toggleClass( this.elm, CLASS_DRAGGING, add );
    toggleClass(
      this.parent,
      [ CLASS_DRAGGING, `${ CLASS_DRAGGING }--${ this.names.vertical }` ],
      add
    );
  }

  /**
   * Destroys the bar.
   */
  destroy(): void {
    off( this.elm, DRAG_START_EVENTS, this.onDrag );
    off( window, DRAG_END_EVENTS, this.onDragged );
    off( window, DRAGGING_EVENTS, this.onDragging );
  }
}
