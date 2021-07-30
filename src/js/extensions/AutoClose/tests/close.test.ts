import { init, pressKey, refresh } from '../../../test';


describe( 'AutoClose#close()', () => {
  const Editor = init();
  const { Code, Selection } = Editor.Components;
  const { editable } = Editor.elements;

  beforeEach( () => {
    refresh( Editor, '' );
    Selection.set( [ 0, 0 ] );
  } );

  test( 'can close `(`.', () => {
    pressKey( editable, '(' );
    expect( Code.getLine( 0 ) ).toBe( '()' );
  } );

  test( 'can close `{`.', () => {
    pressKey( editable, '{' );
    expect( Code.getLine( 0 ) ).toBe( '{}' );
  } );

  test( 'can close `[`.', () => {
    pressKey( editable, '[' );
    expect( Code.getLine( 0 ) ).toBe( '[]' );
  } );

  test( 'can close `\'`.', () => {
    pressKey( editable, '\'' );
    expect( Code.getLine( 0 ) ).toBe( '\'\'' );
  } );

  test( 'can close `"`.', () => {
    pressKey( editable, '"' );
    expect( Code.getLine( 0 ) ).toBe( '""' );
  } );

  test( 'can close ```.', () => {
    pressKey( editable, '`' );
    expect( Code.getLine( 0 ) ).toBe( '``' );
  } );

  test( 'should not close brackets inside a comment.', () => {
    refresh( Editor, '//' );
    Selection.set( [ 0, 2 ] );
    pressKey( editable, '(' );
    expect( Code.getLine( 0 ) ).toBe( '//(' );
  } );

  test( 'should not close brackets inside a string.', () => {
    refresh( Editor, '"aaa"' );
    Selection.set( [ 0, 2 ] );
    pressKey( editable, '(' );
    expect( Code.getLine( 0 ) ).toBe( '"a(aa"' );
  } );
} );
