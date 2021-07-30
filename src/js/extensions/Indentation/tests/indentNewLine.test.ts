import { init, pressKey, refresh } from '../../../test';


describe( 'Indentation#indentNewline()', () => {
  const Editor = init( '', { indentation: { activation: 'load' } } );
  const { Selection, Code } = Editor.Components;
  const { editable } = Editor.elements;

  test( 'can insert an indent on the top of the newline if the previous line has indents.', () => {
    refresh( Editor, '  a' );

    Selection.set( [ 0, 3 ] );
    pressKey( editable, [ 'Enter' ], true );

    expect( Code.getLine( 0 ) ).toBe( '  a\n' );
    expect( Selection.get().start ).toEqual( [ 1, 2 ] );
  } );

  test( 'should remove unnecessary spaces.', () => {
    refresh( Editor, '  a\t\t  ' );

    Selection.set( [ 0, 3 ] );
    pressKey( editable, [ 'Enter' ], true );

    expect( Code.getLine( 0 ) ).toBe( '  a\n' );
    expect( Selection.get().start ).toEqual( [ 1, 2 ] );
  } );
} );
