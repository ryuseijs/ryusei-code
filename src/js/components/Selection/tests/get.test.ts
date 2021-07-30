import { CODE_TRIPLE_NUMBERS, init } from '../../../test';


describe( 'Selection#get()', () => {
  const Editor = init( CODE_TRIPLE_NUMBERS );
  const { Selection } = Editor.Components;

  test( 'can return the current custom selection range.', () => {
    Selection.set( [ 0, 1 ], [ 0, 2 ] );

    expect( Selection.get().start ).toEqual( [ 0, 1 ] );
    expect( Selection.get().end ).toEqual( [ 0, 2 ] );
  } );

  test( 'can normalize the selection.', () => {
    Selection.set( [ 0, 2 ], [ 0, 0 ], false );

    expect( Selection.get().start ).toEqual( [ 0, 0 ] );
    expect( Selection.get().end ).toEqual( [ 0, 2 ] );
  } );

  test( 'can return the selection without normalization.', () => {
    Selection.set( [ 0, 2 ], [ 0, 0 ], false );

    expect( Selection.get( false ).start ).toEqual( [ 0, 2 ] );
    expect( Selection.get( false ).end ).toEqual( [ 0, 0 ] );
  } );
} );
