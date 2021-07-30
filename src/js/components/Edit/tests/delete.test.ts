import { CODE_TRIPLE_NUMBERS, init, refresh } from '../../../test';


describe( 'Edit#delete()', () => {
  const Editor = init( CODE_TRIPLE_NUMBERS );
  const { Selection, Edit, Code } = Editor.Components;
  const { lines } = Editor.Components.Code;

  beforeEach( () => {
    refresh( Editor, CODE_TRIPLE_NUMBERS );
  } );

  test( 'can delete the selected code.', () => {
    Selection.set( [ 1, 1 ], [ 1, 3 ] );
    Edit.delete();
    expect( lines[ 1 ].text ).toBe( '4' );
  } );

  test( 'can delete the whole code.', () => {
    Selection.selectAll();
    Edit.delete();
    expect( Code.value ).toBe( '' );
  } );

  test( 'should do nothing if there is no selection.', () => {
    Edit.delete();
    expect( Code.value ).toBe( CODE_TRIPLE_NUMBERS );
  } );

  test( 'should do nothing if the editor is read-only.', () => {
    Selection.set( [ 1, 1 ], [ 1, 3 ] );
    Editor.readOnly = true;
    Edit.delete();
    expect( lines[ 1 ].text ).toBe( '456' );
  } );
} );
