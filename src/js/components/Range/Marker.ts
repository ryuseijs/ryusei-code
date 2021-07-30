import { OffsetPosition, Elements, Position } from '@ryusei/code';
import { CLASS_MARKER } from '../../constants/classes';
import { Editor } from '../../core/Editor/Editor';
import { compare, max, unit } from '../../utils';


/**
 * The class for highlighting arbitrary texts.
 *
 * @since 0.1.0
 */
export class Marker {
  /**
   * Holds the Editor instance.
   */
  protected Editor: Editor;

  /**
   * Holds the editor elements.
   */
  protected elements: Elements;

  /**
   * Holds the scroller element.
   */
  protected scroller: HTMLElement;

  /**
   * Caches the generated HTML string.
   */
  protected cache: string;

  /**
   * Holds the marker content.
   */
  protected content: string;

  /**
   * The Marker constructor.
   *
   * @param Editor   - An Editor instance.
   * @param elements - A collection of editor elements.
   */
  constructor( Editor: Editor, elements: Elements ) {
    this.Editor   = Editor;
    this.elements = elements;
    this.scroller = elements.scroller;
  }

  /**
   * Calculates boundaries for drawing the marker.
   *
   * @param anchor - An anchor position.
   * @param focus  - A focus position.
   *
   * @return An object with start and end boundaries.
   */
  protected calcBoundaries( anchor: Position, focus: Position ): { start: OffsetPosition, end: OffsetPosition } {
    const { Measure } = this.Editor.Components;
    const isBackward = compare( anchor, focus ) > 0;

    return {
      start: Measure.getOffset( isBackward ? focus : anchor ),
      end  : Measure.getOffset( isBackward ? anchor : focus ),
    };
  }

  /**
   * Generates HTML of the marker.
   *
   * @param anchor   - An anchor position.
   * @param focus    - A focus position.
   * @param useCache - A focus position.
   *
   * @return The generated HTML string of the marker.
   */
  html( anchor: Position, focus: Position, useCache = true ): string {
    if ( useCache && this.cache ) {
      return this.cache;
    }

    const { Measure: { lineHeight, padding } } = this.Editor.Components;
    const { start, end } = this.calcBoundaries( anchor, focus );
    const diff       = end.top - start.top;
    const fillHeight = diff - lineHeight;
    const startLeft  = max( start.left, padding.left );

    let html = '';

    if ( diff ) {
      html += this.buildLine( start.top, startLeft, '100%' );
      html += this.buildLine( end.top, padding.left, max( end.left - padding.left, 0 ) );

      if ( fillHeight > 0 ) {
        html += this.buildLine( start.top + lineHeight, padding.left, '100%', fillHeight );
      }
    } else {
      html += this.buildLine( start.top, startLeft, max( end.left - startLeft, 0 ) );
    }

    this.cache = html;

    return html;
  }

  /**
   * Builds HTML of each line.
   *
   * @param top    - A top position.
   * @param left   - A left position.
   * @param width  - Width.
   * @param height - Optional. Height.
   *
   * @return A generated HTML string.
   */
  protected buildLine( top: number, left: number, width: number | string, height?: number | string ): string {
    let styles = `top: ${ unit( top ) }; left: ${ unit( left ) }; width: ${ unit( width ) };`;

    if ( height ) {
      styles += ` height: ${ unit( height ) };`;
    }

    return `<div class="${ CLASS_MARKER }" style="${ styles }"></div>`;
  }
}
