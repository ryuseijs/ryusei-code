import { CODE_TRIPLE_NUMBERS, init, refresh } from '../../../test';


describe( 'Edit#cutLine()', () => {
  const Editor = init( CODE_TRIPLE_NUMBERS );
  const { Selection, Edit } = Editor.Components;
  const { lines } = Editor.Components.Code;

  // Suppresses the error dialog.
  Object.defineProperty( Editor.require( 'Dialog' ), 'message', { value: () => 0 } );

  beforeEach( () => {
    refresh( Editor, CODE_TRIPLE_NUMBERS );
  } );

  test( 'can cut the current line.', () => {
    Selection.set( [ 1, 1 ], [ 1, 1 ] );
    Edit.cutLine();

    expect( lines[ 0 ].text ).toBe( '123' );
    expect( lines[ 1 ].text ).toBe( '789' );
  } );

  test( 'should set the selection at the start of the line.', () => {
    Selection.set( [ 1, 1 ], [ 1, 1 ] );
    Edit.cutLine();
    expect( Selection.get().start ).toEqual( [ 1, 0 ] );
  } );
} );
