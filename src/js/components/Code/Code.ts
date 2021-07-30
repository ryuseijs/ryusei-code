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
   * Holds the Lines instance.
   */
  Lines: Lines;

  /**
   * Sets a new value.
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
   * Returns a text at the row index.
   *
   * @param row - A row to search for.
   *
   * @return A line text.
   */
  getLine( row: number ): string {
    return row < this.size ? this.sliceLines( row, row ) : '';
  }

  /**
   * Slices a text by the specified row range.
   *
   * @param startRow - A start row index to start slicing a text.
   * @param endRow   - An end row index to start slicing a text.
   *
   * @return A sliced text.
   */
  sliceLines( startRow: number, endRow: number ): string {
    const { text } = this;
    const endIndex = endRow < this.size - 1 ? nthIndexOf( text, LINE_BREAK, endRow + 1 ) + 1 : this.text.length;
    return text.slice( nthIndexOf( text, LINE_BREAK, startRow ) + 1, endIndex );
  }

  /**
   * Slices a text by the specified position range.
   *
   * @param start - A start position to start slicing a text.
   * @param end   - Optional. An end position to start slicing a text.
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
   * Replaces a text in a specified range by the replacement text.
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
   * Searches the provided word or regexp.
   *
   * @param search     - A string or a regexp object.
   * @param ignoreCase - Optional. Whether to perform case-insensitive search or not.
   * @param wholeWord  - Optional. Whether to only match a whole word or not.
   * @param limit      - Optional. Limits the number of matched results.
   *
   * @return An array with tuples that contains `[ index, length ]`.
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
