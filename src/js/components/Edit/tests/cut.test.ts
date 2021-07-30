import { CODE_TRIPLE_NUMBERS, init, refresh } from '../../../test';


describe( 'Edit#cut()', () => {
  const Editor = init( CODE_TRIPLE_NUMBERS );
  const { Selection, Edit } = Editor.Components;
  const { lines } = Editor.Components.Code;

  // Suppresses the error dialog.
  Object.defineProperty( Editor.require( 'Dialog' ), 'message', { value: () => 0 } );

  beforeEach( () => {
    refresh( Editor, CODE_TRIPLE_NUMBERS );
  } );

  test( 'can cut the selected code.', () => {
    Selection.set( [ 1, 1 ], [ 1, 3 ], false );
    Edit.cut();
    expect( lines[ 1 ].text ).toBe( '4' );
  } );

  test( 'should collapse the selection to the start.', () => {
    Selection.set( [ 1, 1 ], [ 1, 3 ], false );
    Edit.cut();
    expect( Selection.get().start ).toEqual( [ 1, 1 ] );
    expect( Selection.get().end ).toEqual( [ 1, 1 ] );
  } );
} );
