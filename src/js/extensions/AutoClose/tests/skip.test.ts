import { init, pressKey, refresh } from '../../../test';


describe( 'AutoClose#skip()', () => {
  const Editor = init();
  const { Code, Selection } = Editor.Components;
  const { editable } = Editor.elements;

  beforeEach( () => {
    refresh( Editor, '' );
  } );

  test( 'can skip the closing bracket.', () => {
    refresh( Editor, '()' );
    Selection.set( [ 0, 1 ] );

    pressKey( editable, ')' );

    expect( Code.getLine( 0 ) ).toBe( '()' );
    expect( Selection.get().start ).toEqual( [ 0, 2 ] );
  } );

  test( 'can skip the closing quote.', () => {
    refresh( Editor, '""' );
    Selection.set( [ 0, 1 ] );

    pressKey( editable, '"' );

    expect( Code.getLine( 0 ) ).toBe( '""' );
    expect( Selection.get().start ).toEqual( [ 0, 2 ] );
  } );

  test( 'should not skip closing bracket inside a comment.', () => {
    refresh( Editor, '//()' );
    Selection.set( [ 0, 3 ] );
    pressKey( editable, ')' );
    expect( Code.getLine( 0 ) ).toBe( '//())' );
  } );

  test( 'should not skip closing bracket inside a string.', () => {
    refresh( Editor, '"()"' );
    Selection.set( [ 0, 2 ] );
    pressKey( editable, ')' );
    expect( Code.getLine( 0 ) ).toBe( '"())"' );
  } );
} );
