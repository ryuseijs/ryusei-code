import { AbstractDraggableBar } from '../../classes/AbstractDraggableBar/AbstractDraggableBar';
import { CLASS_ACTIVE, CLASS_SCROLLBAR } from '../../constants/classes';
import { EVENT_MOUNTED, EVENT_RESIZE } from '../../constants/events';
import { Editor } from '../../core/Editor/Editor';
import { attr, isArray, off, on, rafThrottle, round, toggleClass, unit } from '../../utils';


/**
 * The class for creating a scrollbar.
 *
 * @since 0.1.0
 */
export class Scrollbar extends AbstractDraggableBar {
  /**
   * Holds the Editor element.
   */
  protected readonly Editor: Editor;

  /**
   * The target element to scroll.
   */
  protected readonly scroller: HTMLElement;

  /**
   * Holds the margin settings.
   */
  private readonly margin: () => [ number, number ];

  /**
   * Keeps the scrollbar height.
   */
  private lastHeight: number;

  /**
   * The conversion ratio from the scroll offset to the bar offset.
   * - top = scrollTop * ratio
   * - scrollTop = top / ratio
   */
  private ratio = 1;

  /**
   * The Scrollbar constructor.
   *
   * @param Editor   - An EventBus instance.
   * @param parent   - A parent element.
   * @param scroller - A target element to scroll.
   * @param vertical - Determines whether to create a vertical or horizontal scroll bar.
   * @param margin   - Optional. Margins in pixel as `[ top, bottom ]` ( or `[ left, right ]` ).
   */
  constructor(
    Editor: Editor,
    parent: HTMLElement,
    scroller: HTMLElement,
    vertical: boolean,
    margin: [ number, number ] | ( () => [ number, number ] ) = [ 0, 0 ]
  ) {
    super( [ CLASS_SCROLLBAR, `${ CLASS_SCROLLBAR }--${ vertical ? 'vertical' : 'horizontal' }` ], parent, vertical );

    this.Editor   = Editor;
    this.scroller = scroller;
    this.margin   = isArray( margin ) ? () => margin : margin;

    this.init();
    this.listen();
  }

  /**
   * Initializes the instance.
   * Note that `aria-valuemin` and `aria-valuemax` is not necessary because their default values are `0` and `100`.
   *
   * @link https://www.w3.org/TR/wai-aria-1.2/#scrollbar
   */
  private init(): void {
    const { Editor, scroller } = this;

    attr( this.elm, {
      role              : 'scrollbar',
      'aria-controls'   : scroller.id,
      'aria-orientation': this.names.vertical,
      'aria-valuenow'   : 0,
      'aria-label'      : Editor.options.i18n.scrollbar,
    } );

    this.update = this.update.bind( this );
  }

  /**
   * Listens to some events.
   */
  protected listen(): void {
    const update = rafThrottle( this.update );
    on( this.scroller, 'scroll', update, this );
    this.Editor.event.on( [ EVENT_MOUNTED, EVENT_RESIZE ], update );
  }

  /**
   * Called while the bar is dragged.
   *
   * @param e - A PointerEvent object.
   */
  protected onDragging( e: PointerEvent ): void {
    super.onDragging( e );

    const coord = this.getCoord( e );
    const diff  = coord - this.lastCoord;

    this.scroller[ this.names.scrollTop ] += diff / this.ratio;
    this.lastCoord = coord;
  }

  /**
   * Updates the scrollbar height and offset according to the current scroll offset.
   */
  protected update(): void {
    const { scroller, names, elm } = this;
    const { style } = elm;
    const sh          = scroller[ names.scrollHeight ];
    const ch          = scroller[ names.clientHeight ];
    const st          = scroller[ names.scrollTop ];
    const active      = sh > ch;
    const margin      = this.margin();
    const heightRatio = 1 - ( ( margin[ 0 ] + margin[ 1 ] ) / ch );
    const height      = ( ch * ch / sh ) * heightRatio;

    if ( this.lastHeight !== height ) {
      style[ names.height ] = unit( height );
      this.lastHeight = height;
    }

    if ( active ) {
      const offsetRatio = ( ch * heightRatio - elm[ names.clientHeight ] ) / ( sh - ch );
      style.transform = `${ names.translateY }(${ unit( st * offsetRatio + margin[ 0 ] ) })`;
      attr( elm, { 'aria-valuenow': round( 100 * 100 * st / ( sh - ch ) ) / 100 } );

      this.ratio = offsetRatio;
    }

    toggleClass( elm, CLASS_ACTIVE, active );
  }

  /**
   * Destroys the instance.
   */
  destroy(): void {
    off( null, '', this );
    super.destroy();
  }
}
