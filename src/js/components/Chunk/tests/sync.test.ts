import { CODE_NUMBERS, init } from '../../../test';


describe( 'Chunk#sync()', () => {
  const Editor = init( '' );
  const { Chunk, Code: { lines } } = Editor.Components;

  test( 'can sync the code to lines in the chunk.', () => {
    lines.sync( 0, CODE_NUMBERS );
    Chunk.sync();

    const { elms } = Chunk;

    expect( elms[ 0 ].textContent ).toBe( '1' );
    expect( elms[ 1 ].textContent ).toBe( '2' );
  } );

  test( 'can sync the code to lines with specifying the start index.', () => {
    lines.delete( 0, lines.length );
    lines.sync( 0, CODE_NUMBERS );
    Chunk.sync( undefined, 2 );

    const { elms } = Chunk;

    expect( elms[ 0 ].textContent ).toBe( '3' );
    expect( elms[ 1 ].textContent ).toBe( '4' );
    expect( elms[ 2 ].textContent ).toBe( '5' );
    expect( elms[ 3 ].textContent ).toBe( '6' );
  } );
} );
