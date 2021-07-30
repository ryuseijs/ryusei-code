import { RowRange } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { EVENT_SYNCED } from '../../constants/events';
import { between, isUndefined, max, min } from '../../utils';
import { ASYNC_SYNC_LINES, ASYNC_SYNC_LINES_BACKWARDS, SYNC_LINES_BACKWARDS } from './constants';


/**
 * The type for an object with the number to start syncing the code and a prefix.
 *
 * @since 0.1.0
 */
type SyncStartInfo = { startRow: number, before: string };

/**
 * The class for syncing changes to Lines and View components.
 *
 * @since 0.1.0
 */
export class Sync extends Component {
  /**
   * Holds the minimum row for asynchronous syncing.
   */
  private minStart = Infinity;

  /**
   * Holds the maximum row for asynchronous syncing.
   */
  private maxEnd = 0;

  /**
   * Indicates whether the asynchronous syncing is on going or not.
   */
  private syncing: boolean;

  /**
   * Syncs the changes between the start and end rows to the Lines and View components.
   * Since the `startRow` can be very far from the `row` when pasting huge code,
   * syncs lines inaccurately by setting the `strict` to `false` at first,
   * and then starts strict synchronization.
   *
   * @param startRow  - A start row index.
   * @param endRow    - An end row index.
   * @param jumpTo    - Optional. Jumps to the specified row before starting synchronization.
   */
  sync( startRow: number, endRow: number, jumpTo?: number ): void {
    const { Chunk, View } = this;
    const diff = this.lines.syncSize( startRow, this.Code.size );

    View.autoHeight();
    View.autoWidth();

    if ( ! isUndefined( jumpTo ) ) {
      View.jump( jumpTo );
    }

    if ( Chunk.includes( startRow ) ) {
      this.run( startRow, Chunk.end - startRow + 1 );
    } else {
      const { start, end } = Chunk;
      this.run( start, end - start + 1, false );
      this.syncLines( startRow, endRow );
    }

    Chunk.syncDiff( startRow, diff );
    Chunk.sync();
  }

  /**
   * Starts the sync sequence.
   *
   * @param row    - A row index.
   * @param limit  - Limits the number of synchronously syncing.
   * @param strict - Optional. Determines whether the synchronization must be strict or not.
   */
  private run( row: number, limit: number, strict = true ): void {
    const result = this.find( row, SYNC_LINES_BACKWARDS );

    let { startRow } = result;

    if ( ! strict && row - startRow > SYNC_LINES_BACKWARDS ) {
      startRow = row - SYNC_LINES_BACKWARDS;
    }

    limit = row - startRow + limit;

    const changed = this.lines.sync( startRow, this.Code.after( startRow ), limit, result.before );

    if ( changed || this.syncing ) {
      const { size } = this.Code;

      startRow = startRow + limit;

      if ( startRow < size ) {
        this.syncLines( startRow, size - 1 );
      }
    }
  }

  /**
   * Asynchronously syncs lines between the provided range.
   * If the range is wider than the current running process, cancels it and starts a new process.
   *
   * @param startRow - A start row index.
   * @param endRow   - An end row index.
   */
  private syncLines( startRow: number, endRow: number ): void {
    this.minStart = min( startRow, this.minStart );
    this.maxEnd   = max( endRow, this.maxEnd );
    this.syncing  = true;

    const ranges = this.splitRows( this.minStart, this.maxEnd );

    this.syncRanges( ranges, () => {
      this.minStart = Infinity;
      this.maxEnd   = 0;
      this.syncing  = false;
      this.Chunk.sync();
    } );
  }

  /**
   * Syncs provided ranges step by step.
   *
   * @param ranges   - An array with row ranges.
   * @param callback - Optional. A callback fired after the sync is completed.
   */
  private syncRanges( ranges: RowRange[], callback?: () => void ): void {
    const range = ranges.shift();
    const { startRow, before } = this.find( range[ 0 ], ASYNC_SYNC_LINES_BACKWARDS );
    const limit = range[ 1 ] - startRow + 1;

    this.lines.asyncSync( 'syncRanges', startRow, this.Code.after( startRow ), limit, before, () => {
      if ( ranges.length ) {
        this.syncRanges( ranges, callback );
        this.emit( EVENT_SYNCED, this, false );
      } else {
        if ( callback ) {
          callback();
        }

        this.emit( EVENT_SYNCED, this, true );
      }
    } );
  }

  /**
   * Splits the provided row range into small fragments.
   *
   * @param startRow - A start row index.
   * @param endRow   - An end row index.
   *
   * @return An array with row ranges.
   */
  private splitRows( startRow: number, endRow: number ): RowRange[] {
    const ranges: RowRange[] = [];

    while ( startRow <= endRow ) {
      ranges.push( [ startRow, min( startRow + ASYNC_SYNC_LINES - 1, endRow ) ] );
      startRow += ASYNC_SYNC_LINES;
    }

    return ranges;
  }

  /**
   * Returns an info object to start syncing.
   *
   * @param row   - A row index.
   * @param limit - Limits the number of lines.
   *
   * @return An object with a start row index and code to prepend.
   */
  private find( row: number, limit: number ): SyncStartInfo {
    if ( this.isEmbedded( row ) ) {
      return this.findStartInLanguageBlock( row, limit );
    }

    const startRow = this.findRoot( row );

    if ( row - startRow > limit ) {
      if ( this.isEmbedded( row - limit ) ) {
        return this.findStartInLanguageBlock( row - limit, limit / 2 );
      }

      return this.compress( startRow, row, '', limit );
    }

    return { startRow, before: '' };
  }

  /**
   * If the distance from the `row` to `startRow` is greater than the `limit`,
   * attempt to shorten the distance by generating pseudo code.
   *
   * @param startRow - A start row index.
   * @param row      - An original row index.
   * @param before   - A pseudo line to prepend.
   * @param limit    - A limit number of lines.
   *
   * @return An object with a start row index and code to prepend.
   */
  private compress( startRow: number, row: number, before: string, limit: number ): SyncStartInfo {
    if ( row - startRow > limit ) {
      const start = this.lines.findBlockStart( [ row - 1, 0 ] );

      if ( start ) {
        const { multiline } = this.getLanguage( start );
        const info = this.lines.getInfoAt( start );

        if ( info && multiline ) {
          for ( let i = 0; i < multiline.length; i++ ) {
            const item = multiline[ i ];

            if ( info.category === item[ 2 ] && ( ! item[ 3 ] || info.state === item[ 3 ] ) ) {
              startRow = start[ 0 ] + 1;
              before   += item[ 0 ];
              break;
            }
          }
        }
      }
    }

    return { startRow, before };
  }

  /**
   * Finds the likely appropriate index where tokenization should start.
   *
   * @param row   - A row index.
   * @param depth - Optional. Minimum depth of a line that can be a candidate.
   *
   * @return A better index for starting tokenization.
   */
  private findRoot( row: number, depth = 0 ): number {
    const { lines } = this;

    if ( between( row, 0, lines.length, true ) ) {
      for ( let i = row - 1; i >= 0; i-- ) {
        const line = lines[ i ];

        if ( line.depth <= depth && line.tokens.length && ! line.isEmpty() ) {
          if ( line.split ) {
            i -= line.first[ 2 ].distance + 1;
          } else {
            return i;
          }
        }
      }
    }

    return 0;
  }

  /**
   * Finds a sync start info in an embedded language block.
   *
   * @param row   - A row index.
   * @param limit - A limit number of lines.
   *
   * @return An object with a start row index and code to prepend.
   */
  private findStartInLanguageBlock( row: number, limit: number ): SyncStartInfo {
    const { lines } = this;
    const lang      = lines[ row ].language;
    const config    = this.language.use[ lang ];
    const startRow  = this.findRoot( row, config.depth );
    const startLang = lines[ startRow ].language;

    if ( startLang === lang ) {
      return this.compress( startRow, row, config.code, limit );
    }

    return { startRow, before: '' };
  }

  /**
   * Checks if the line at the specified row is inside an embedded block or not.
   *
   * @param row - A row index.
   *
   * @return `true` if the row is inside an embedded block, or otherwise `false`.
   */
  private isEmbedded( row: number ): boolean {
    const line = this.lines[ row ];

    if ( line ) {
      const { language } = line;
      return language && this.language.language.id !== language;
    }
  }
}
