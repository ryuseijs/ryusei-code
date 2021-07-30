import { create, isIE, repeat } from '../../utils';


/**
 * The utility class for measuring texts.
 *
 * @since 0.1.0
 */
export class MeasureText {
  /**
   * Holds the context object.
   */
  private context: CanvasRenderingContext2D;

  /**
   * Stores width of characters.
   */
  private chars: Record<string, number> = {};

  /**
   * The MeasureText constructor.
   *
   * @param font - A font string for the context.
   */
  constructor( font: string ) {
    this.context = create( 'canvas' ).getContext( '2d' );
    this.context.font = font;
  }

  /**
   * Returns the width of the provided character.
   * Note that IE rounds the width of the text.
   *
   * @param char - A character to measure.
   *
   * @return The width of the character in pixel.
   */
  private getCharWidth( char: string ): number {
    const { chars, context } = this;

    return chars[ char ] || ( chars[ char ] = isIE()
      ? context.measureText( repeat( char, 10 ) ).width / 10
      : context.measureText( char ).width );
  }

  /**
   * Returns the width of the provided text.
   *
   * @param text - A text to measure.
   */
  measure( text: string ): number {
    let width = 0;

    for ( let i = 0; i < text.length; i++ ) {
      width += this.getCharWidth( text.charAt( i ) );
    }

    return width;
  }
}
