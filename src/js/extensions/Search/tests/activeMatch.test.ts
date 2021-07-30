import { init, LINE_HEIGHT, pressKey, timer } from '../../../test';
import { CLASS_REPLACE, CLASS_SEARCH } from '../classes';
import { ACTIVE_MARKER_ID, SEARCH_THROTTLE_DURATION } from '../constants';
import { getMarkers } from './fixtures/fixtures';


describe( 'Search', () => {
  const code = 'aaa\n'
    + 'aaa\n'
    + 'aaa\n';

  test( 'can highlight the current match.', async () => {
    const Editor = init( code );
    const { editable } = Editor.elements;
    const { keymap } = Editor.options;

    pressKey( editable, keymap.search );
    const field = document.querySelector<HTMLInputElement>( `.${ CLASS_SEARCH } input` );

    pressKey( field, 'aaa' );
    let markers;

    await timer( () => {
      markers = getMarkers( ACTIVE_MARKER_ID );

      expect( markers.length ).toBe( 1 );
      expect( markers[ 0 ].style.top ).toBe( '0px' );
    }, SEARCH_THROTTLE_DURATION );

    pressKey( field, keymap.searchNext );
    markers = getMarkers( ACTIVE_MARKER_ID );
    expect( markers[ 0 ].style.top ).toBe( `${ LINE_HEIGHT }px` );

    pressKey( field, keymap.searchNext );
    markers = getMarkers( ACTIVE_MARKER_ID );
    expect( markers[ 0 ].style.top ).toBe( `${ LINE_HEIGHT * 2 }px` );

    pressKey( field, keymap.searchNext );
    markers = getMarkers( ACTIVE_MARKER_ID );
    expect( markers[ 0 ].style.top ).toBe( '0px' );

    pressKey( field, keymap.searchPrev );
    markers = getMarkers( ACTIVE_MARKER_ID );
    expect( markers[ 0 ].style.top ).toBe( `${ LINE_HEIGHT * 2 }px` );

    pressKey( field, keymap.searchPrev );
    markers = getMarkers( ACTIVE_MARKER_ID );
    expect( markers[ 0 ].style.top ).toBe( `${ LINE_HEIGHT }px` );
  } );

  test( 'can replace the current match.', async () => {
    const Editor = init( code );
    const { Code } = Editor.Components;
    const { editable } = Editor.elements;
    const { keymap } = Editor.options;

    pressKey( editable, keymap.replace );
    const searchField  = document.querySelector<HTMLInputElement>( `.${ CLASS_SEARCH } input` );
    const replaceField = document.querySelector<HTMLInputElement>( `.${ CLASS_REPLACE } input` );

    pressKey( searchField, 'aaa' );
    replaceField.value = 'xxx';

    let markers;

    await timer( () => {
      markers = getMarkers( ACTIVE_MARKER_ID );
      expect( markers.length ).toBe( 1 );
    }, SEARCH_THROTTLE_DURATION );

    pressKey( searchField, keymap.searchNext );
    pressKey( replaceField, [ 'Enter' ] );

    expect( Code.getLine( 0 ) ).toBe( 'aaa\n' );
    expect( Code.getLine( 1 ) ).toBe( 'xxx\n' );
    expect( Code.getLine( 2 ) ).toBe( 'aaa\n' );

    pressKey( replaceField, [ 'Enter' ] );

    expect( Code.getLine( 0 ) ).toBe( 'aaa\n' );
    expect( Code.getLine( 1 ) ).toBe( 'xxx\n' );
    expect( Code.getLine( 2 ) ).toBe( 'xxx\n' );
  } );
} );
