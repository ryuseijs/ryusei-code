import { Elements, Position } from '@ryusei/code';
import { CLASS_MARKERS } from '../../constants/classes';
import { Editor } from '../../core/Editor/Editor';
import { between, div, html, rect, remove } from '../../utils';
import { Marker } from './Marker';


/**
 * The class for highlighting arbitrary texts.
 *
 * @since 0.1.0
 */
export class StandaloneMarker extends Marker {
  /**
   * The element for wrapping marker fragments.
   */
  private readonly wrapper: HTMLDivElement;

  /**
   * The Marker constructor.
   *
   * @param Editor   - An Editor instance.
   * @param elements - A collection of editor elements.
   * @param classes  - Optional. Class names for the wrapper element.
   */
  constructor( Editor: Editor, elements: Elements, classes?: string | string[] ) {
    super( Editor, elements );
    this.wrapper = div( [ CLASS_MARKERS ].concat( classes ), elements.background );
  }

  /**
   * Draws the range for the anchor to the focus.
   *
   * @param anchor - An anchor position.
   * @param focus  - A focus position.
   */
  protected draw( anchor: Position, focus: Position ): void {
    html( this.wrapper, this.html( anchor, focus, false ) );
  }

  /**
   * Clears the marker.
   */
  protected clear(): void {
    html( this.wrapper, '' );
  }

  /**
   * Checks if the provided client position is inside the current range or not.
   *
   * @param clientX - X position that is relative to the client.
   * @param clientY - Y position that is relative to the client.
   *
   * @return `true` if the position is inside the range, or otherwise `false`.
   */
  isInside( clientX: number, clientY: number ): boolean {
    const { children } = this.wrapper;

    for ( let i = 0; i < children.length; i++ ) {
      const domRect = rect( children[ i ] );

      if( domRect.width
        && between( clientX, domRect.left, domRect.right )
        && between( clientY, domRect.top, domRect.bottom )
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Destroys the instance.
   */
  destroy(): void {
    remove( this.wrapper );
  }
}
