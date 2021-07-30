import { COLLAPSED } from '../../../constants/selection-states';
import { CODE_TRIPLE_NUMBERS, init } from '../../../test';


describe( 'Selection#selectLine()', () => {
  const Editor = init( CODE_TRIPLE_NUMBERS );
  const { Selection } = Editor.Components;

  test( 'can select a line at the specified row.', () => {
    Selection.selectLine( 1 );

    expect( Selection.get().start ).toEqual( [ 1, 0 ] );
    expect( Selection.get().end ).toEqual( [ 2, 0 ] );

    Selection.selectLine( 2 );

    // The last line:
    expect( Selection.get().start ).toEqual( [ 2, 0 ] );
    expect( Selection.get().end ).toEqual( [ 2, 3 ] );
  } );

  test( 'can select a line without changing the native selection.', () => {
    Selection.set( [ 0, 0 ] );
    expect( Selection.is( COLLAPSED ) );

    Selection.selectLine( 1, false );

    expect( Selection.is( COLLAPSED ) );
  } );

  test( 'can select a line backwards.', () => {
    Selection.selectLine( 1, true, true );

    expect( Selection.get( false ).start ).toEqual( [ 2, 0 ] );
    expect( Selection.get( false ).end ).toEqual( [ 1, 0 ] );
  } );
} );
