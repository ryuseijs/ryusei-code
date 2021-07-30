import { init } from '../../../test';


describe( 'Chunk#syncDiff()', () => {
  const Editor = init( '' );
  const { Chunk } = Editor.Components;

  test( 'can move tail lines to the specified `row + 1`.', () => {
    const { elms } = Chunk;
    const tail = elms.slice( -2 );

    // Means 2 lines are inserted to the row 1.
    Chunk.syncDiff( 1, 2 );

    expect( Chunk.elms[ 2 ] === tail[ 0 ] ).toBe( true );
    expect( Chunk.elms[ 3 ] === tail[ 1 ] ).toBe( true );
  } );

  test( 'can move lines from the specified `row + 1` to the end.', () => {
    const { elms } = Chunk;
    const movedLines = elms.slice( 2, 4 );

    // Means 2 lines are removed from the row 1.
    Chunk.syncDiff( 1, -2 );

    const { length } = Chunk;

    expect( Chunk.elms[ length - 2 ] === movedLines[ 0 ] ).toBe( true );
    expect( Chunk.elms[ length - 1 ] === movedLines[ 1 ] ).toBe( true );
  } );

  test( 'should do nothing the number of lines to move is greater than the margin.', () => {
    const { elms } = Chunk;

    Chunk.syncDiff( 1, 100 );

    elms.forEach( ( elm: Element, index: number ) => {
      expect( Chunk.elms[ index ] === elm ).toBe( true );
    } );
  } );
} );
