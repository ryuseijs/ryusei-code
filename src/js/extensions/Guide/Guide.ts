import { Elements, Range } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { EVENT_CHANGED, EVENT_CHUNK_MOVED, EVENT_MOUNTED } from '../../constants/events';
import { max, rafThrottle } from '../../utils';
import { IndentMarker } from './IndentMarker';


/**
 * The group ID for markers of indent guides.
 *
 * @since 0.1.0
 */
export const MARKER_ID = 'indent';

/**
 * The component for drawing guide lines.
 *
 * @since 0.1.0
 */
export class Guide extends Component {
  /**
   * Initializes the component.
   *
   * @param elements - A collection of editor elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );
    this.listen();
  }

  /**
   * Listens some events.
   */
  private listen(): void {
    const draw = this.draw.bind( this );
    this.on( EVENT_CHANGED, rafThrottle( draw ) );
    this.on( [ EVENT_MOUNTED, EVENT_CHUNK_MOVED ], draw );
  }

  /**
   * Clears current guides and draw new ranges for guides.
   */
  private draw(): void {
    const { Range } = this;
    const ranges = this.parse();
    Range.clearRanges( MARKER_ID );
    Range.register( MARKER_ID, ranges, false, IndentMarker );
  }

  /**
   * Parses chunk lines and returns ranges for guides.
   *
   * @return An array with ranges.
   */
  private parse(): Range[] {
    const { start, end } = this.Chunk;
    const ranges: Range[] = [];

    let prev = 0;

    for ( let i = max( start, 0 ); i <= end; i++ ) {
      const line = this.lines[ i ];

      if ( ! line ) {
        break;
      }

      let depth = line.indentDepth - 1;

      if ( line.isEmpty() && prev > 0 ) {
        depth = prev;
      }

      if ( depth > 0 ) {
        for ( let j = 0; j < depth; j++ ) {
          const { length } = this.options.indent;
          ranges.push( { start: [ i, j * length ], end: [ i, ( j + 1 ) * length ] } );
        }

        prev = depth;
      } else {
        prev = 0;
      }
    }

    return ranges;
  }
}
