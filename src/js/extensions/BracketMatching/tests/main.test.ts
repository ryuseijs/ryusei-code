import { CLASS_MARKER, CLASS_MARKERS } from '../../../constants/classes';
import { CODE_BRACKETS, LINE_HEIGHT, init, raf, waitForAnimationFrame } from '../../../test';
import { CLEAR_DEBOUNCE_DURATION, MARKER_ID } from '../BracketMatching';


describe( 'BracketMatching', () => {
  const Editor = init( CODE_BRACKETS );
  const { Selection } = Editor.Components;
  const selector = `.${ CLASS_MARKERS }--${ MARKER_ID } .${ CLASS_MARKER }`;

  test( 'can highlight paired brackets.', async () => {
    await waitForAnimationFrame();

    Selection.set( [ 0, 0 ] );

    await raf( () => {
      const markers = document.querySelectorAll<HTMLElement>( selector );

      expect( markers.length ).toBe( 2 );
      expect( markers[ 0 ].style.top ).toBe( '0px' );
      expect( markers[ 1 ].style.top ).toBe( `${ LINE_HEIGHT * 14 }px` );
    } );
  } );

  test( 'can highlight nested paired brackets.', async () => {
    await waitForAnimationFrame();

    Selection.set( [ 1, 2 ] );

    await raf( () => {
      const markers = document.querySelectorAll<HTMLElement>( selector );

      expect( markers.length ).toBe( 2 );
      expect( markers[ 0 ].style.top ).toBe( `${ LINE_HEIGHT }px` );
      expect( markers[ 1 ].style.top ).toBe( `${ LINE_HEIGHT * 13 }px` );
    } );
  } );

  test( 'should remove markers if there is no paired brackets.', async () => {
    await waitForAnimationFrame();

    Selection.set( [ 1, 0 ] );

    await new Promise( resolve => {
      setTimeout( () => {
        const markers = document.querySelectorAll<HTMLElement>( selector );
        expect( markers.length ).toBe( 0 );
        resolve( true );
      }, CLEAR_DEBOUNCE_DURATION + 100 );
    } );
  } );
} );
