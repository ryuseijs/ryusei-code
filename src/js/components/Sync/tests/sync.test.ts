import { CODE_TRIPLE_NUMBERS, generate, init, LINE_HEIGHT, refresh } from '../../../test';


describe( 'Sync#sync()', () => {
  const Editor = init();
  const { Code, Chunk, Sync, Code: { lines } } = Editor.Components;

  beforeEach( () => {
    refresh( Editor, '' );
    Sync.sync( 0, lines.length );
  } );

  test( 'can sync the latest code to lines.', () => {
    Code.value = CODE_TRIPLE_NUMBERS;
    expect( lines[ 0 ].text ).toBe( '' );

    Sync.sync( 0, 2 );

    expect( lines[ 0 ].text ).toBe( '123' );
    expect( lines[ 1 ].text ).toBe( '456' );
    expect( lines[ 2 ].text ).toBe( '789' );
  } );

  test( 'can sync the latest code to the Chunk component.', () => {
    Code.value = CODE_TRIPLE_NUMBERS;
    expect( Chunk.getLine( 0 ).textContent ).toBe( '' );

    Sync.sync( 0, 2 );

    expect( Chunk.getLine( 0 ).textContent ).toBe( '123' );
    expect( Chunk.getLine( 1 ).textContent ).toBe( '456' );
    expect( Chunk.getLine( 2 ).textContent ).toBe( '789' );
  } );

  test( 'can sync the height.', () => {
    const { container } = Editor.elements;

    Code.value = generate( 20 );
    Sync.sync( 0, 19 );
    expect( container.style.height ).toBe( `${ LINE_HEIGHT * 20 }px` );
  } );
} );
