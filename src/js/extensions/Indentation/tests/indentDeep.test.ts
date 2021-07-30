import { init, pressKey, refresh } from '../../../test';


describe( 'Indentation#indentDeep()', () => {
  const Editor = init( '', { indentation: { activation: 'load' } } );
  const { Selection, Code } = Editor.Components;
  const { editable } = Editor.elements;

  test( 'can insert an additional indent when inserting a line break after an opening bracket.', () => {
    refresh( Editor, '{' );

    Selection.set( [ 0, 1 ] );
    pressKey( editable, [ 'Enter' ], true );

    expect( Code.getLine( 0 ) ).toBe( '{\n' );
    expect( Code.getLine( 1 ) ).toBe( '  ' );
    expect( Selection.get().start ).toEqual( [ 1, 2 ] );
  } );

  test( 'can insert an additional indent when inserting a line break inside brackets.', () => {
    refresh( Editor, '{}' );

    Selection.set( [ 0, 1 ] );
    pressKey( editable, [ 'Enter' ], true );

    expect( Code.getLine( 0 ) ).toBe( '{\n' );
    expect( Code.getLine( 1 ) ).toBe( '  \n' );
    expect( Code.getLine( 2 ) ).toBe( '}' );

    expect( Selection.get().start ).toEqual( [ 1, 2 ] );
  } );

  test( 'should not insert indent inside a comment.', () => {
    refresh( Editor, '/* {' );

    Selection.set( [ 0, 4 ] );
    pressKey( editable, [ 'Enter' ], true );

    expect( Code.getLine( 0 ) ).toBe( '/* {\n' );
    expect( Code.getLine( 1 ) ).toBe( '' );
  } );
} );
