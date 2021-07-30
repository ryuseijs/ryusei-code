import { CODE_TRIPLE_NUMBERS, fire, init, pressKey, refresh } from '../../../test';


describe( 'Input', () => {
  const Editor = init( CODE_TRIPLE_NUMBERS );
  const { Selection, Code } = Editor.Components;
  const { editable } = Editor.elements;

  beforeEach( () => {
    refresh( Editor, CODE_TRIPLE_NUMBERS );
  } );

  test( 'can insert a newline when detecting the enter key.', () => {
    Selection.set( [ 0, 1 ] );
    pressKey( editable, [ 'Enter' ] );

    expect( Code.getLine( 0 ) ).toBe( '1\n' );
    expect( Code.getLine( 1 ) ).toBe( '23\n' );
    expect( Code.getLine( 2 ) ).toBe( '456\n' );
  } );

  test( 'should not insert a new line while composing.', () => {
    Selection.set( [ 0, 1 ] );
    fire( editable, 'compositionstart' );
    pressKey( editable, [ 'Enter' ] );

    expect( Code.getLine( 0 ) ).toBe( '123\n' );
    expect( Code.getLine( 1 ) ).toBe( '456\n' );
  } );

  test( 'can delete a line break when detecting the delete key at the end of the line.', () => {
    Selection.set( [ 0, 3 ] );
    pressKey( editable, [ 'Delete' ] );

    expect( Code.getLine( 0 ) ).toBe( '123456\n' );
    expect( Code.getLine( 1 ) ).toBe( '789' );
  } );

  test( 'should do nothing by the delete key if there is no next line.', () => {
    Selection.set( [ 2, 3 ] );
    pressKey( editable, [ 'Delete' ] );

    expect( Code.getLine( 0 ) ).toBe( '123\n' );
    expect( Code.getLine( 1 ) ).toBe( '456\n' );
    expect( Code.getLine( 2 ) ).toBe( '789' );
  } );

  test( 'can remove a line break when detecting the backspace key at the start of the line.', () => {
    Selection.set( [ 1, 0 ] );
    pressKey( editable, [ 'Backspace' ] );

    expect( Code.getLine( 0 ) ).toBe( '123456\n' );
    expect( Code.getLine( 1 ) ).toBe( '789' );
  } );

  test( 'should do nothing by the backspace key if there is no previous line.', () => {
    Selection.set( [ 0, 0 ] );
    pressKey( editable, [ 'Backspace' ] );

    expect( Code.getLine( 0 ) ).toBe( '123\n' );
    expect( Code.getLine( 1 ) ).toBe( '456\n' );
    expect( Code.getLine( 2 ) ).toBe( '789' );
  } );
} );
