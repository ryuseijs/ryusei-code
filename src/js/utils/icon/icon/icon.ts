import { CLASS_ICON } from '../../../constants/classes';
import { attr } from '../../dom';


/**
 * The SVG view box settings.
 *
 * @since 0.1.0
 */
export const VIEW_BOX = '0 0 24 24';

/**
 * Returns an icon SVG element specified by the name.
 *
 * @param d       - The path of the icon element.
 * @param stroke  - Stroke width.
 * @param linecap - Linecap.
 *
 * @return The SVG element of the icon.
 */
export function icon( d: string, stroke: number, linecap: string ): SVGElement {
  const svg  = createSvg( 'svg', { viewBox: VIEW_BOX, class: CLASS_ICON } );
  const path = createSvg( 'path', { d, fill: 'currentColor' } );

  if ( stroke ) {
    attr( path, { 'stroke-width': stroke, 'stroke-linecap': linecap, stroke: 'currentColor' } );
  }

  attr( svg, { viewBox: VIEW_BOX } );
  svg.appendChild( path );

  return svg;
}

/**
 * The helper function to create a SVG element.
 *
 * @param tag   - A tag name in the SVG namespace.
 * @param attrs - An object literal with attributes.
 *
 * @return An created element.
 */
function createSvg( tag: string, attrs: Record<string, string | number | boolean> ): SVGElement {
  const elm = document.createElementNS( 'http://www.w3.org/2000/svg', tag );
  attr( elm, attrs );
  return elm;
}
