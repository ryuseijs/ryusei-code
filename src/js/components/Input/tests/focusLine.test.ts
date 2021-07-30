import { CODE_TRIPLE_NUMBERS, init } from '../../../test';


describe( 'Input', () => {
  const Editor = init( CODE_TRIPLE_NUMBERS );
  const { Input, Selection, Chunk } = Editor.Components;

  test( 'should have the latest focus line and row index.', () => {
    Selection.set( [ 0, 0 ] );
    expect( Input.line ).toBe( Chunk.getLine( 0 ) );
    expect( Input.row ).toBe( 0 );

    Selection.set( [ 1, 0 ] );
    expect( Input.line ).toBe( Chunk.getLine( 1 ) );
    expect( Input.row ).toBe( 1 );

    Selection.set( [ 2, 0 ] );
    expect( Input.line ).toBe( Chunk.getLine( 2 ) );
    expect( Input.row ).toBe( 2 );
  } );

  test( 'can return the value of the latest focus line.', () => {
    Selection.set( [ 0, 0 ] );
    expect( Input.value ).toBe( Chunk.getLine( 0 ).textContent );

    Selection.set( [ 1, 0 ] );
    expect( Input.value ).toBe( Chunk.getLine( 1 ).textContent );

    Selection.set( [ 2, 0 ] );
    expect( Input.value ).toBe( Chunk.getLine( 2 ).textContent );
  } );

  test( 'can set a new value to the latest focus line.', () => {
    Selection.set( [ 0, 0 ] );
    Input.value = 'a';
    expect( Chunk.getLine( 0 ).textContent ).toBe( 'a' );

    Selection.set( [ 1, 0 ] );
    Input.value = 'b';
    expect( Chunk.getLine( 1 ).textContent ).toBe( 'b' );

    Selection.set( [ 2, 0 ] );
    Input.value = 'c';
    expect( Chunk.getLine( 2 ).textContent ).toBe( 'c' );
  } );
} );
