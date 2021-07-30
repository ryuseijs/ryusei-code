import { CODE_TRIPLE_NUMBERS, fire, init, refresh } from '../../../test';
import { format } from '../../../utils';


describe( 'Selection', () => {
  const Editor = init( CODE_TRIPLE_NUMBERS );
  const { Selection } = Editor.Components;

  test( 'can reselect the last selection.', () => {
    Selection.set( [ 1, 0 ] );

    Selection.reselect();
    Selection.reselect();

    expect( Selection.get().start ).toEqual( [ 1, 0 ] );
  } );

  test( 'can convert a selection into a string.', () => {
    Selection.set( [ 0, 0 ], [ 0, 2 ] );
    expect( Selection.toString() ).toBe( '12' );

    Selection.set( [ 0, 0 ], [ 1, 2 ] );
    expect( Selection.toString() ).toBe( '123\n45' );
  } );

  test( 'can convert a current location into a string.', () => {
    const { location } = Editor.options.i18n;

    Selection.set( [ 0, 0 ] );
    expect( Selection.getLocation() ).toBe( format( location, 1, 1 ) );

    Selection.set( [ 1, 1 ] );
    expect( Selection.getLocation() ).toBe( format( location, 2, 2 ) );
  } );

  test( 'can tell if a selection direction is backwards or not.', () => {
    Selection.update( [ 0, 0 ], [ 0, 1 ] );
    expect( Selection.isBackward() ).toBe( false );

    Selection.update( [ 0, 1 ], [ 0, 0 ] );
    expect( Selection.isBackward() ).toBe( true );
  } );

  test( 'can tell if a selection is collapsed or not.', () => {
    Selection.set( [ 0, 0 ] );
    expect( Selection.isCollapsed() ).toBe( true );

    Selection.set( [ 0, 0 ], [ 0, 1 ] );
    expect( Selection.isCollapsed() ).toBe( false );
  } );

  test( 'should select a word on double click.', () => {
    refresh( Editor, '"aaa word bbb"' );

    Editor.Components.Chunk.sync();
    Selection.set( [ 0, 6 ] );

    fire( Editor.elements.editable, 'mousedown', { detail: 2 } );

    expect( Selection.get().start ).toEqual( [ 0, 5 ] );
    expect( Selection.get().end ).toEqual( [ 0, 9 ] );
  } );
} );
