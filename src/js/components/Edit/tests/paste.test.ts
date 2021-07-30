import { CODE_TRIPLE_NUMBERS, init, refresh } from '../../../test';


describe( 'Edit#paste()', () => {
  const Editor = init( CODE_TRIPLE_NUMBERS );
  const { Selection, Edit } = Editor.Components;
  const { lines } = Editor.Components.Code;

  beforeEach( () => {
    refresh( Editor, CODE_TRIPLE_NUMBERS );
  } );

  test( 'can insert a string at the current position.', () => {
    Selection.set( [ 1, 0 ], [ 1, 0 ] );
    Edit.paste( 'abc' );
    expect( lines[ 1 ].text ).toBe( 'abc456' );
  } );

  test( 'can replace the selected code with the passed string.', () => {
    Selection.set( [ 1, 0 ], [ 1, 3 ] );
    Edit.paste( 'abc' );
    expect( lines[ 1 ].text ).toBe( 'abc' );
  } );

  test( 'can remove the selected code with an empty string.', () => {
    Selection.set( [ 1, 0 ], [ 1, 3 ] );
    Edit.paste( '' );
    expect( lines[ 1 ].text ).toBe( '' );
  } );

  test( 'should set the selection after the pasted code.', () => {
    Selection.set( [ 1, 0 ], [ 1, 0 ] );
    Edit.paste( 'abc' );
    expect( Selection.get().start ).toEqual( [ 1, 3 ] );
    expect( Selection.get().end ).toEqual( [ 1, 3 ] );
  } );

  test( 'should do nothing if the editor is read-only.', () => {
    Selection.set( [ 1, 0 ], [ 1, 0 ] );
    Editor.readOnly = true;
    Edit.paste( 'abc' );
    expect( lines[ 1 ].text ).toBe( '456' );
  } );
} );
