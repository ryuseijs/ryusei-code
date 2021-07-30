import { ICONS } from '../../../constants/icons';
import { icon, VIEW_BOX } from './icon';


describe( 'icon', () => {
  test( 'can return an icon as a SVG element.', () => {
    const arrowUp = icon( ICONS.arrowUp[ 0 ], ICONS.arrowUp[ 1 ], 'round' );
    document.body.appendChild( arrowUp );

    const svg = document.body.firstElementChild;

    expect( svg instanceof SVGSVGElement ).toBe( true );
    expect( svg.getAttribute( 'viewBox' ) ).toBe( VIEW_BOX );

    const settings = ICONS.arrowUp;
    const path     = svg.firstElementChild;
    expect( path.getAttribute( 'd' ) ).toBe( settings[ 0 ] );
  } );

  test( 'should set strokeWidth and strokeLinecap attributes if the `settings[ 1 ]` is `true`.', () => {
    const arrowUp = icon( ICONS.arrowUp[ 0 ], ICONS.arrowUp[ 1 ], 'round' );
    document.body.appendChild( arrowUp );

    const svg  = document.body.firstElementChild;
    const path = svg.firstElementChild;

    expect( path.getAttribute( 'stroke-width' ) ).toBe( String( ICONS.arrowUp[ 1 ] ) );
    expect( path.getAttribute( 'stroke-linecap' ) ).toBe( 'round' );
  } );
} );
