import { init, LINE_HEIGHT, pressKey, timer } from '../../../test';
import { CLASS_SEARCH } from '../classes';
import { SEARCH_THROTTLE_DURATION } from '../constants';
import { getMarkers } from './fixtures/fixtures';


describe( 'Search#search()', () => {
  const code = 'aaa a AAA\n'
    + 'bbb b BBB\n'
    + 'ccc c CCC\n';

  const Editor = init( code );
  const { editable } = Editor.elements;

  pressKey( editable, Editor.options.keymap.search );

  const field = document.querySelector<HTMLInputElement>( `.${ CLASS_SEARCH } input` );

  test( 'can search a specified string.', async () => {
    field.value = '';
    pressKey( field, 'aaa' );

    await timer( () => {
      const markers = getMarkers();

      expect( markers.length ).toBe( 2 );
      expect( markers[ 0 ].style.top ).toBe( '0px' );
      expect( markers[ 1 ].style.top ).toBe( '0px' );
    }, SEARCH_THROTTLE_DURATION );

    field.value = '';
    pressKey( field, 'b' );

    await timer( () => {
      const markers = getMarkers();

      expect( markers.length ).toBe( 3 );
      expect( markers[ 0 ].style.top ).toBe( `${ LINE_HEIGHT }px` );
      expect( markers[ 1 ].style.top ).toBe( `${ LINE_HEIGHT }px` );
      expect( markers[ 2 ].style.top ).toBe( `${ LINE_HEIGHT }px` );
    }, SEARCH_THROTTLE_DURATION );
  } );

  test( 'can search a specified string in the `matchCase` mode.', async () => {
    field.value = '';
    pressKey( field, 'aaa' );
    Editor.invoke( 'Search', 'toggleMatchCase', true );

    await timer( () => {
      const markers = getMarkers();

      expect( markers.length ).toBe( 1 );
      expect( markers[ 0 ].style.top ).toBe( '0px' );
    }, SEARCH_THROTTLE_DURATION );

    field.value = '';
    pressKey( field, 'b' );

    await timer( () => {
      const markers = getMarkers();

      expect( markers.length ).toBe( 2 );
      expect( markers[ 0 ].style.top ).toBe( `${ LINE_HEIGHT }px` );
      expect( markers[ 1 ].style.top ).toBe( `${ LINE_HEIGHT }px` );
    }, SEARCH_THROTTLE_DURATION );

    Editor.invoke( 'Search', 'toggleMatchCase', false );
  } );

  test( 'can search a string by the regexp.', async () => {
    field.value = 'b+';
    Editor.invoke( 'Search', 'toggleMatchCase', true );
    Editor.invoke( 'Search', 'toggleRegExp', true );

    await timer( () => {
      const markers = getMarkers();

      expect( markers.length ).toBe( 2 );
      expect( markers[ 0 ].style.top ).toBe( `${ LINE_HEIGHT }px` );
      expect( markers[ 1 ].style.top ).toBe( `${ LINE_HEIGHT }px` );
    }, SEARCH_THROTTLE_DURATION );

    Editor.invoke( 'Search', 'toggleMatchCase', false );
    Editor.invoke( 'Search', 'toggleRegExp', false );
  } );

  test( 'can search a string in the `wholeWord` mode.', async () => {
    field.value = 'b';
    Editor.invoke( 'Search', 'toggleWholeWord', true );

    await timer( () => {
      const markers = getMarkers();

      expect( markers.length ).toBe( 1 );
      expect( markers[ 0 ].style.top ).toBe( `${ LINE_HEIGHT }px` );
    }, SEARCH_THROTTLE_DURATION );

    Editor.invoke( 'Search', 'toggleWholeWord', false );
  } );
} );
