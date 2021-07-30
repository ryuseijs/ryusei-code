import { CATEGORY_NUMBER, CATEGORY_STRING } from '@ryusei/light';
import { EVENT_SYNCED } from '../../../constants/events';
import { generate, init } from '../../../test';
import { ASYNC_SYNC_LINES } from '../constants';


describe( 'Sync#syncLines()', () => {
  const TEST_LINES = ASYNC_SYNC_LINES * 3;

  test( 'can sync lines asynchronously.', done => {
    const Editor = init( generate( TEST_LINES, 'a' ) );
    const { Code, Chunk, Sync, Code: { lines } } = Editor.Components;
    const startRow = 100;

    Code.value = generate( TEST_LINES );

    // Forcibly sets the current row to startRow.
    Chunk.start = startRow;

    // Sync all lines.
    Sync.sync( 0, TEST_LINES );

    expect( lines[ 0 ].text ).toBe( 'a' );
    expect( lines[ 1 ].text ).toBe( 'a' );

    // Lines in chunk should be synced at first.
    expect( lines[ startRow ].text ).toBe( '100' );
    expect( lines[ startRow + 1 ].text ).toBe( '101' );

    // Synchronously syncing stops the end lines of the chunk.
    expect( lines[ startRow + Chunk.end + 1 ].text ).toBe( 'a' );
    expect( lines[ startRow + Chunk.end + 2 ].text ).toBe( 'a' );

    let first = true;

    Editor.event.on( EVENT_SYNCED, ( e, Sync, completed ) => {
      if ( ! completed ) {
        if ( first ) {
          expect( lines[ startRow + Chunk.end + 1 ].text ).toBe( `${ startRow + Chunk.end + 1 }` );
          expect( lines[ startRow + Chunk.end + 2 ].text ).toBe( `${ startRow + Chunk.end + 2 }` );
        }

        first = false;
      }

      // syncLines has completed.
      else {
        expect( lines[ 0 ].text ).toBe( '0' );
        expect( lines[ 1 ].text ).toBe( '1' );

        expect( lines[ startRow + Chunk.end + ASYNC_SYNC_LINES + 1 ].text )
          .toBe( `${ startRow + Chunk.end + ASYNC_SYNC_LINES + 1 }` );
        expect( lines[ startRow + Chunk.end + ASYNC_SYNC_LINES + 2 ].text )
          .toBe( `${ startRow + Chunk.end + ASYNC_SYNC_LINES + 2 }` );

        done();
      }
    } );
  } );

  test( 'can tokenize lines asynchronously.', done => {
    const Editor = init( generate( TEST_LINES ) );
    const { Code, Chunk, Sync, Code: { lines } } = Editor.Components;

    // Change all lines into strings by the backtick.
    Code.replaceLines( 0, 0, '`\n' );
    Sync.sync( 0, TEST_LINES );

    expect( lines[ 0 ].first[ 0 ] ).toBe( CATEGORY_STRING );
    expect( lines[ 1 ].first[ 0 ] ).toBe( CATEGORY_STRING );

    // Lines after the chunk should be still numbers.
    expect( lines[ Chunk.end + 1 ].first[ 0 ] ).toBe( CATEGORY_NUMBER );
    expect( lines[ Chunk.end + 2 ].first[ 0 ] ).toBe( CATEGORY_NUMBER );

    let first = true;

    Editor.event.on( EVENT_SYNCED, ( e, Sync, completed ) => {
      if ( ! completed ) {
        if ( first ) {
          expect( lines[ Chunk.end + 1 ].first[ 0 ] ).toBe( CATEGORY_STRING );
          expect( lines[ Chunk.end + 2 ].first[ 0 ] ).toBe( CATEGORY_STRING );

          expect( lines[ Chunk.end + ASYNC_SYNC_LINES + 1 ].first[ 0 ] ).toBe( CATEGORY_NUMBER );
          expect( lines[ Chunk.end + ASYNC_SYNC_LINES + 2 ].first[ 0 ] ).toBe( CATEGORY_NUMBER );

          first = false;
        }
      } else {
        expect( lines[ Chunk.end + ASYNC_SYNC_LINES + 1 ].first[ 0 ] ).toBe( CATEGORY_STRING );
        expect( lines[ Chunk.end + ASYNC_SYNC_LINES + 2 ].first[ 0 ] ).toBe( CATEGORY_STRING );

        done();
      }
    } );
  } );
} );
