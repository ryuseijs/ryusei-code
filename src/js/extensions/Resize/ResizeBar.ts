import { AbstractDraggableBar } from '../../classes/AbstractDraggableBar/AbstractDraggableBar';
import { EVENT_RESIZE } from '../../constants/events';
import { PROJECT_CODE } from '../../constants/project';
import { Editor } from '../../core/Editor/Editor';
import { attr, endsWith, off, on, round, styles, unit } from '../../utils';


/**
 * The class name for the resize bar.
 *
 * @since 0.1.0
 */
export const CLASS_SIZER_BAR = `${ PROJECT_CODE }__sizer__bar`;

/**
 * The class for creating a resize bar.
 *
 * @since 0.1.0
 */
export class ResizeBar extends AbstractDraggableBar {
  /**
   * Holds the Editor instance.
   */
  private readonly Editor: Editor;

  /**
   * Keeps the initial width/height of the target element.
   */
  private startSize: number;

  /**
   * The ResizeBar constructor.
   *
   * @param Editor   - An Editor instance.
   * @param parent   - A parent element where the bar will be appended.
   * @param vertical - Determines whether to create a vertical or horizontal sizer.
   */
  constructor( Editor: Editor, parent: HTMLElement, vertical: boolean ) {
    super( [ CLASS_SIZER_BAR, `${ CLASS_SIZER_BAR }--${ vertical ? 'vertical' : 'horizontal' }` ], parent, vertical );
    this.Editor = Editor;
    this.init();
  }

  /**
   * Initializes the instance.
   * Note that `aria-valuemin` and `aria-valuemax` is not necessary because their default values are `0` and `100`.
   *
   * @link https://www.w3.org/TR/wai-aria-1.2/#separator
   */
  private init(): void {
    const { Editor } = this;
    const { resizeBar } = Editor.options.i18n;

    attr( this.elm, {
      role              : 'separator',
      'aria-controls'   : Editor.elements.root.id,
      'aria-orientation': this.vertical ? 'horizontal' : 'vertical',
      'aria-valuenow'   : 0,
      'aria-label'      : resizeBar,
      title             : resizeBar,
    } );

    Editor.event.on( EVENT_RESIZE, this.updateAria.bind( this ) );

    on( this.elm, 'dblclick', () => {
      Editor[ this.names.height ] = '';
    } );
  }

  /**
   * Called when the bar starts being dragged.
   *
   * @param e - A PointerEvent object.
   */
  protected onDrag( e: PointerEvent ): void {
    super.onDrag( e );
    this.startSize = this.Editor[ this.names.height ];
  }

  /**
   * Called while the bar is dragged.
   *
   * @param e - A PointerEvent object.
   */
  protected onDragging( e: PointerEvent ): void {
    super.onDragging( e );

    const diff = this.getCoord( e ) - this.startCoord;
    this.Editor[ this.names.height ] = unit( this.startSize + diff );
  }

  /**
   * Updates aria attributes related with the separator role.
   * This method will be called through the event bus.
   */
  private updateAria(): void {
    const { names } = this;
    const min = this.convertValueToPixel( names.minHeight ) || 0;
    const max = this.convertValueToPixel( names.maxHeight );
    const now = this.Editor[ names.height ] - min;

    if ( max > min ) {
      attr( this.elm, { 'aria-valuenow': round( 100 * 100 * now / ( max - min ) ) / 100 } );
    }
  }

  /**
   * Converts the CSS value to pixel.
   *
   * @param prop - A CSS prop name.
   *
   * @return A value in pixel.
   */
  private convertValueToPixel( prop: string ): number {
    const { names } = this;
    const { root } = this.Editor.elements;
    const value = styles( root, prop );

    if ( endsWith( value, '%' ) ) {
      return parseFloat( value ) * root.parentElement[ names.scrollHeight ] / 100;
    }

    return parseFloat( value );
  }

  /**
   * Destroys the instance.
   */
  destroy(): void {
    off( null, '', this );
    super.destroy();
  }
}
