import { CLASS_MARKER } from '../../../../constants/classes';
import { CODE_NUMBERS, init } from '../../../../test';
import { Marker } from '../../Marker';


describe( 'Marker', () => {
  const { getComputedStyle } = window;

  window.getComputedStyle = elm => {
    const declaration = getComputedStyle( elm );

    declaration.paddingTop    = '12px';
    declaration.paddingRight  = '12px';
    declaration.paddingBottom = '12px';
    declaration.paddingLeft   = '12px';

    return declaration;
  };

  const Editor = init( CODE_NUMBERS );

  test( 'can return HTML for the single line marker.', () => {
    const marker = new Marker( Editor, Editor.elements );
    const html   = marker.html( [ 0, 1 ], [ 0, 3 ] );
    expect( html ).toBe( `<div class="${ CLASS_MARKER }" style="top: 12px; left: 12px; width: 0px;"></div>` );
  } );

  test( 'can return HTML for the multiline marker.', () => {
    const marker = new Marker( Editor, Editor.elements );
    const html   = marker.html( [ 0, 0 ], [ 2, 3 ] );

    /**
     * - top: paddingTop + lineHeight
     * - left: paddingLeft
     */
    const expected = `<div class="${ CLASS_MARKER }" style="top: 12px; left: 12px; width: 100%;"></div>` // start
      + `<div class="${ CLASS_MARKER }" style="top: 60px; left: 12px; width: 0px;"></div>` // end
      + `<div class="${ CLASS_MARKER }" style="top: 36px; left: 12px; width: 100%; height: 24px;"></div>`; // fill

    expect( html ).toBe( expected );
  } );
} );
