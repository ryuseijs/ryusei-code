import { Language, Options, Position, ScanResult, Token, TokenInfo, TokenMatcher } from '@ryusei/code';
import { AbstractArrayLike } from '../../classes/AbstractArrayLike/AbstractArrayLike';
import { LINE_BREAK } from '../../constants/characters';
import { EventBus } from '../../event/EventBus';
import { forOwn, isUndefined, max, min } from '../../utils';
import { matchesToken } from '../../utils/token';
import { Line } from './Line';


/**
 * The max number of lines to be inserted at once.
 * Inserting many lines harms the performance.
 *
 * @since 0.1.0
 */
const MAX_INSERTION_LENGTH = 100;

/**
 * Delay for the asynchronous tokenization.
 *
 * @since 0.1.0
 */
const ASYNC_SYNC_DELAY = 10;

/**
 * The class for managing data of all lines.
 *
 * @since 0.1.0
 */
export class Lines extends AbstractArrayLike<Line> {
  /**
   * Holds the setTimeout ids.
   */
  private readonly timers: Record<string, ReturnType<typeof setTimeout>> = {};

  /**
   * Holds the language object.
   */
  private readonly language: Language;

  /**
   * Holds options.
   */
  private readonly options: Options;

  /**
   * Holds the EventBus object.
   */
  private readonly event: EventBus;

  /**
   * The Lines constructor.
   *
   * @param event    - An EventBus instance.
   * @param language - A Language object.
   * @param options  - Options.
   */
  constructor( event: EventBus, language: Language, options: Options ) {
    super();

    this.language = language;
    this.event    = event;
    this.options  = options;
  }

  /**
   * Inserts a new line at the specified row index.
   * Be aware that inserting a lot of lines causes the fatal performance issue.
   *
   * @param row   - A row index.
   * @param count - A number of lines to insert.
   */
  insert( row: number, count?: number ): void {
    count = count || 1;

    while ( count-- > 0 ) {
      this.splice( row, 0, new Line( this.options ) );
    }
  }

  /**
   * Deletes a line or lines from the specified row.
   *
   * @param row   - A row index.
   * @param count - A number of lines to delete.
   */
  delete( row: number, count: number ): void {
    this.splice( row, count );
  }

  /**
   * Syncs lines with the provided code.
   *
   * @param row    - A row index where sync starts.
   * @param code   - Code to sync.
   * @param limit  - Optional. Limits the number of lines to sync.
   * @param before - Optional. A pseudo line prepended to the code.
   * @param time   - Optional. A timestamp when the sync starts.
   *
   * @return `true` if the last line is changed, or otherwise `false`.
   */
  sync( row: number, code: string, limit?: number, before = '', time?: number ): boolean {
    if ( before ) {
      code = before + LINE_BREAK + code;

      if ( limit ) {
        limit++;
      }
    }

    const lines = this.language.lexer.run( code, limit );

    if ( before ) {
      lines.shift();
    }

    let changed;

    for ( let i = 0; i < lines.length; i++ ) {
      const rowIndex = row + i;
      const tokens   = lines[ i ];

      if ( ! this[ rowIndex ] ) {
        this.insert( rowIndex );
      }

      if ( this[ rowIndex ] ) {
        if ( i === lines.length - 1 ) {
          changed = ! this.isSame( this[ rowIndex ].tokens, tokens );
        }

        this[ rowIndex ].set( tokens, time );
      }
    }

    return changed;
  }

  /**
   * Starts an asynchronous sync process.
   *
   * @param id       - A worker ID.
   * @param row      - A row index where sync starts.
   * @param code     - Code to sync.
   * @param limit    - Optional. Limits the number of lines to sync.
   * @param before   - Optional. A pseudo line prepended to the code.
   * @param callback - Optional. A function called after syncing.
   */
  asyncSync(
    id: string,
    row: number,
    code: string,
    limit?: number,
    before = '',
    callback?: () => void
  ): void {
    const { timers } = this;

    if ( timers[ id ] ) {
      clearTimeout( timers[ id ] );
    }

    const time = Date.now();

    timers[ id ] = setTimeout( () => {
      this.sync( row, code, limit, before, time );

      if ( callback ) {
        callback();
      }
    }, ASYNC_SYNC_DELAY );
  }

  /**
   * Finds the minimum indent string between the `startRow` and the `endRow`.
   *
   * @param startRow - A start row index to search from.
   * @param endRow   - An end row index to search to.
   *
   * @return A minimum indent string.
   */
  findMinIndent( startRow: number, endRow: number ): string {
    let minIndent = undefined;

    for ( let i = startRow; i <= endRow; i++ ) {
      const indent = this[ i ].getIndent();
      minIndent = isUndefined( minIndent ) || minIndent.length > indent.length ? indent : minIndent;
    }

    return minIndent || '';
  }

  /**
   * Returns a token info at the specified position.
   *
   * @param position - A position to search at.
   *
   * @return A TokenInfo if available, or otherwise `undefined`.
   */
  getInfoAt( position: Position ): TokenInfo | undefined {
    const line = this[ position[ 0 ] ];
    return line ? line.getInfoAt( position[ 1 ] ) : undefined;
  }

  /**
   * Searches backwards for a token that matches the matcher.
   * If the `counterpart` matcher is provided,
   * this method attempts to match the target and counterpart, such as `{` and `}`.
   *
   * @param position    - A position to start searching.
   * @param matcher     - A matcher.
   * @param counterpart - Optional. A matcher of the counter part.
   * @param depth       - Optional. Determines the initial depth.
   * @param limit       - Optional. Limits the number of lines to scan.
   *
   * @return A TokenInfo object if found, or `undefined` if not.
   */
  scanUp(
    position: Position,
    matcher: TokenMatcher,
    counterpart?: TokenMatcher,
    depth = 0,
    limit?: number
  ): ScanResult | undefined {
    const info = this.getInfoAt( position );

    if ( info ) {
      const [ row ] = position;
      const min = limit ? max( 0, row - limit ) : 0;

      for ( let i = row; i >= min; i-- ) {
        const tokens = this[ i ].tokens;

        for ( let j = i === row ? info.index : tokens.length - 1; j >= 0; j-- ) {
          if ( matchesToken( tokens[ j ], matcher ) ) {
            if ( ! depth ) {
              return { row: i, info: this[ i ].getInfo( j ) };
            }

            depth++;
          }

          if ( counterpart && matchesToken( tokens[ j ], counterpart ) ) {
            depth--;
          }
        }
      }
    }
  }

  /**
   * Searches forwards for a token that matches the matcher.
   * If the `counterpart` matcher is provided,
   * this method attempts to match the target and counterpart, such as `{` and `}`.
   *
   * @param position    - A position to start searching.
   * @param matcher     - A matcher.
   * @param counterpart - Optional. A matcher of the counter part.
   * @param depth       - Optional. Determines the initial depth.
   * @param limit       - Optional. Limits the number of lines to scan.
   *
   * @return A TokenInfo object if found, or `undefined` if not.
   */
  scanDown(
    position: Position,
    matcher: TokenMatcher,
    counterpart?: TokenMatcher,
    depth = 0,
    limit?: number
  ): ScanResult | undefined {
    const info = this.getInfoAt( position );

    if ( info ) {
      const [ row ] = position;
      const { length } = this;
      const max = limit ? min( length, row + limit ) : length;

      for ( let i = row; i < max; i++ ) {
        const tokens = this[ i ].tokens;

        for ( let j = i === row ? info.index : 0; j < tokens.length; j++ ) {
          if ( matchesToken( tokens[ j ], matcher ) ) {
            if ( ! depth ) {
              return { row: i, info: this[ i ].getInfo( j ) };
            }

            depth++;
          }

          if ( counterpart && matchesToken( tokens[ j ], counterpart ) ) {
            depth--;
          }
        }
      }
    }
  }

  /**
   * Searches for a start position where the split token actually starts.
   * If the token at the position is not split, this returns `undefined`.
   *
   * @param position - A position.
   *
   * @return A position where the split token starts if available.
   */
  findBlockStart( position: Position ): Position | undefined {
    const info = this.getInfoAt( position );

    if ( info ) {
      if ( info.split ) {
        const startRow = position[ 0 ] - info.distance;
        const line     = this[ startRow ];
        const lastInfo = line.getInfo( line.tokens.length - 1 );
        return [ startRow, lastInfo.from ];
      }

      return [ position[ 0 ], info.from ];
    }
  }

  /**
   * Searches for an end position where the split token actually ends.
   * If the token at the position is not split, this returns `undefined`.
   *
   * @param position - A position.
   *
   * @return A position where the split token ends if available.
   */
  findBlockEnd( position: Position ): Position | undefined {
    const info = this.getInfoAt( position );

    if ( info ) {
      if ( info.split && ! info.tail ) {
        for ( let i = position[ 0 ] + 1; i < this.length; i++ ) {
          const info = this[ i ].getInfo( 0 );

          if ( info && info.tail ) {
            return [ i, info.to ];
          }
        }
      }

      return [ position[ 0 ], info.to ];
    }
  }

  /**
   * Syncs the number of lines.
   *
   * @param row   - A row index.
   * @param value - A new size.
   *
   * @return Increased or decreased number of lines.
   */
  syncSize( row: number, value: number ): number {
    const diff = value - this.length;

    if ( diff > 0 ) {
      if ( diff < MAX_INSERTION_LENGTH ) {
        this.insert( row, diff );
      } else {
        this.setLength( value );
      }
    } else if ( diff < 0 ) {
      this.delete( row, -diff );
    }

    return diff;
  }

  /**
   * Destroys the instance.
   */
  destroy(): void {
    forOwn( this.timers, clearTimeout );
  }

  /**
   * Sets the length of this Lines.
   * All overflown items will be removed from the end, or all missing items are added to the end as empty lines.
   *
   * @param value - A new length.
   */
  private setLength( value: number ): void {
    const { length } = this;

    if ( length > value ) {
      this.splice( value, length - value );
    } else if ( length < value ) {
      while ( value-- > length ) {
        this.push( new Line( this.options ) );
      }
    }
  }

  /**
   * Checks if the passed 2 arrays with tokens are same or not.
   *
   * @param tokens1 - An array with tokens.
   * @param tokens2 - Another array with tokens.
   *
   * @return `true` if they are considered as same, or otherwise `false`.
   */
  private isSame( tokens1: readonly Token[], tokens2: readonly Token[] ): boolean {
    return tokens1.length === tokens2.length && tokens1.every( ( token1, index ) => {
      const token2 = tokens2[ index ];
      return token1[ 0 ] === token2[ 0 ] && token1[ 1 ] === token2[ 1 ] && token1[ 2 ].depth === token2[ 2 ].depth;
    } );
  }
}
