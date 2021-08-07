import { Position, Range } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { LINE_BREAK } from '../../constants/characters';
import { assert, count, escapeRegExp, isString, nthIndexOf } from '../../utils';
import { Lines } from './Lines';


/**
 * The class for handling the raw text and syncing it to lines.
 *
 * @since 0.1.0
 */
export class Code extends Component {
  /**
   * Holds the text data.
   */
  protected text: string;

  /**
   * Holds the minimum row for asynchronous syncing.
   */
  protected minStart = Infinity;

  /**
   * Holds the maximum row for asynchronous syncing.
   */
  protected maxEnd = 0;

  /**
   * Caches the number of lines.
   */
  protected sizeCache: number;

  /**
   * The Lines instance.
   */
  Lines: Lines;

  /**
   * Sets a new value.
   *
   * @internal
   *
   * @param value - A new value.
   */
  init( value: string ): void {
    if ( ! this.Lines ) {
      this.Lines = new Lines( this.event, this.Editor.language, this.options );
    } else {
      this.Lines.clear();
    }

    this.value = value;
    this.Lines.sync( 0, value );
  }

  /**
   * Returns a text before the specified row index, including the row itself.
   *
   * @param row - A row index.
   *
   * @return A sliced text.
   */
  before( row: number ): string {
    const { text } = this;

    if ( row < 0 ) {
      return '';
    }

    return text.slice( 0, row < this.size - 1 ? nthIndexOf( text, LINE_BREAK, row + 1 ) + 1 : text.length );
  }

  /**
   * Returns a text after the specified row index, including the row itself.
   *
   * @param row - A row index.
   *
   * @return A sliced text.
   */
  after( row: number ): string {
    const { text } = this;

    if ( row <= 0 ) {
      return text;
    }

    return text.slice( row < this.size ? nthIndexOf( text, LINE_BREAK, row ) + 1 : text.length );
  }

  /**
   * Returns the code at the row index.
   * Although the `Lines[ row ]` also returns the code at the row,
   * which is much faster than this method,
   * it may not be the latest before the `Sync` finishes syncing process.
   *
   * @param row - A row index.
   *
   * @return The text of the line at the specified row.
   */
  getLine( row: number ): string {
    return row < this.size ? this.sliceLines( row, row ) : '';
  }

  /**
   * Slices the code by the specified row range.
   *
   * @example
   * ```ts
   * // Gets lines from 1 to 9:
   * const code = Code.sliceLines( 2, 10 );
   * ```
   *
   * @param startRow - A start row index to start slicing a text.
   * @param endRow   - An end row index to end slicing a text.
   *
   * @return A sliced text.
   */
  sliceLines( startRow: number, endRow: number ): string {
    const { text } = this;
    const endIndex = endRow < this.size - 1 ? nthIndexOf( text, LINE_BREAK, endRow + 1 ) + 1 : this.text.length;
    return text.slice( nthIndexOf( text, LINE_BREAK, startRow ) + 1, endIndex );
  }

  /**
   * Slices the code by the specified position range.
   *
   * @example
   * ```ts
   * const code = Code.sliceLines( [ 0, 1 ], [ 2, 9 ] );
   * ```
   *
   * @param start - A start position to start slicing a text.
   * @param end   - Optional. An end position to end slicing a text.
   *
   * @return A sliced text.
   */
  sliceRange( start: Position, end?: Position ): string {
    const startIndex = this.positionToIndex( start );
    const endIndex   = end ? this.positionToIndex( end ) : this.text.length;
    return startIndex < endIndex ? this.text.slice( startIndex, endIndex ) : '';
  }

  /**
   * Replaces lines by the replacement text.
   *
   * @example
   * Consider the following HTML as an example:
   * ```html
   * <pre>
   * function message() {
   *   console.log( 'Hi!' );
   * }
   * </pre>
   * ```
   *
   * Let's modify the line 2 (row index is `1`):
   *
   * ```ts
   * const ryuseiCode = new RyuseiCode();
   * ryuseiCode.apply( 'pre' );
   *
   * const { Code, Sync } = ryuseiCode.Editor.Components;
   *
   * setTimeout( () => {
   *   Code.replaceLines( 1, 1, `  console.log( 'Bye!' );\n` );
   *   Sync.sync( 1, 1 );
   * }, 2000 );
   * ```
   *
   * @param startRow    - A start row index.
   * @param endRow      - An end row index.
   * @param replacement - A replacement text.
   */
  replaceLines( startRow: number, endRow: number, replacement: string ): void {
    assert( startRow <= endRow );
    this.text      = this.before( startRow - 1 ) + this.normalize( replacement ) + this.after( endRow + 1 );
    this.sizeCache = 0;
  }

  /**
   * Replaces the code in a specified range by the replacement text.
   *
   * @param start       - A start position.
   * @param end         - An end position.
   * @param replacement - A replacement text.
   */
  replaceRange( start: Position, end: Position, replacement: string ): void {
    const startIndex = this.positionToIndex( start );
    const endIndex   = this.positionToIndex( end );
    const { value } = this;

    if ( startIndex <= endIndex ) {
      this.text      = value.slice( 0, startIndex ) + this.normalize( replacement ) + value.slice( endIndex );
      this.sizeCache = 0;
    }
  }

  /**
   * Replaces lines by the iteratee function invoked for each line.
   * The returning string of the function will be used as a new line.
   *
   * @example
   * Consider the following HTML as an example:
   *
   * ```html
   * <pre>
   * 1
   * 2
   * 3
   * </pre>
   * ```
   *
   * Let's modify lines by an iteratee function:
   *
   * ```ts
   * const ryuseiCode = new RyuseiCode();
   * ryuseiCode.apply( 'pre' );
   *
   * const { Code, Sync } = ryuseiCode.Editor.Components;
   *
   * setTimeout( () => {
   *   Code.replaceLinesBy( 0, 2, line => `Line: ${ line }` );
   *   Sync.sync( 0, 2 );
   * }, 2000 );
   * ```
   *
   * The result will be:
   * ```none
   * Line: 1
   * Line: 2
   * Line: 3
   * ```
   *
   * @param startRow - A start row index.
   * @param endRow   - An end row index.
   * @param iteratee - An iteratee function invoked for each line.
   */
  replaceLinesBy(
    startRow: number,
    endRow: number,
    iteratee: ( line: string, index: number, array: string[] ) => string
  ): void {
    const { size } = this;
    assert( endRow < size );

    const isLast = endRow === size - 1;
    const lines  = this.sliceLines( startRow, endRow ).split( LINE_BREAK, endRow - startRow + 1 );

    this.replaceLines( startRow, endRow, lines.reduce( ( acc, line, index, array ) => {
      const lineBreak = isLast && index === array.length - 1 ? '' : LINE_BREAK;
      return acc + iteratee( line, index, array ) + lineBreak;
    }, '' ) );
  }

  /**
   * Searches the provided word or regexp and returns matched ranges.
   *
   * @example
   * ```html
   * <pre>
   * foo
   * bar
   * foo
   * </pre>
   * ```
   *
   * ```ts
   * const ryuseiCode = new RyuseiCode();
   * ryuseiCode.apply( 'pre' );
   *
   * const { Code } = ryuseiCode.Editor.Components;
   * const ranges = Code.search( 'foo' );
   *
   * // The ranges will contain 2 results:
   * // { start: [ 0, 0 ], end: [ 0, 3 ] }
   * // { start: [ 2, 0 ], end: [ 2, 3 ] }
   * ```
   *
   * @param search     - A string or a regexp object.
   * @param ignoreCase - Optional. Whether to perform case-insensitive search or not.
   * @param wholeWord  - Optional. Whether to only match a whole word or not.
   * @param limit      - Optional. Limits the number of matched results.
   *
   * @return An array with Range objects.
   */
  search( search: string | RegExp, ignoreCase?: boolean, wholeWord?: boolean, limit?: number ): Range[] {
    const source = isString( search ) ? escapeRegExp( search ) : search.source;
    const ranges: Range[] = [];

    if ( source ) {
      const regexp = new RegExp( wholeWord ? `\\b${ source }\\b` : source, ignoreCase ? 'gi' : 'g' );

      lines:
      for ( let i = 0; i < this.Lines.length; i++ ) {
        const line = this.Lines[ i ];

        let match: RegExpExecArray;

        while ( ( match = regexp.exec( line.text ) ) ) {
          if ( ! match[ 0 ] ) {
            regexp.lastIndex++;
          }

          ranges.push( {
            start: [ i, match.index ],
            end  : [ i, match.index + match[ 0 ].length ],
          } );

          if ( limit && ranges.length >= limit ) {
            break lines;
          }
        }
      }
    }

    return ranges;
  }

  /**
   * Destroys the component.
   *
   * @internal
   */
  destroy(): void {
    if ( this.Lines ) {
      this.Lines.destroy();
    }

    super.destroy();
  }

  /**
   * Converts the provided position to the text index.
   *
   * @param position - A position to convert.
   *
   * @return A converted index.
   */
  private positionToIndex( position: Position ): number {
    const [ row ] = position;
    assert( row < this.size );
    return nthIndexOf( this.text, LINE_BREAK, row ) + 1 + position[ 1 ];
  }

  /**
   * Normalizes characters of line breaks.
   *
   * @param value - A value to normalize.
   *
   * @return A normalized text.
   */
  protected normalize( value: string ): string {
    return value.replace( /\r\n?/g, '\n' );
  }

  /**
   * Sets a new value.
   *
   * @param value - A value to set.
   */
  set value( value: string ) {
    this.text      = this.normalize( value );
    this.sizeCache = 0;
  }

  /**
   * Returns the current code.
   *
   * @return The current code.
   */
  get value(): string {
    return this.text;
  }

  /**
   * Returns the number of lines by counting line breaks.
   *
   * @return The number of lines.
   */
  get size(): number {
    this.sizeCache = this.sizeCache || count( this.text, LINE_BREAK ) + 1;
    return this.sizeCache;
  }
}
