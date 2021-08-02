import { Elements, Range as PositionRange, RangeData } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { CLASS_MARKERS } from '../../constants/classes';
import { EVENT_CHUNK_MOVED, EVENT_FONT_LOADED, EVENT_RESIZE, EVENT_SCROLLED } from '../../constants/events';
import { between, compare, div, forOwn, text, throttle } from '../../utils';
import { Marker } from './Marker';
import { SelectionMarker } from './SelectionMarker';


/**
 * The throttle duration for calling the `observe` method while scrolling.
 *
 * @since 0.1.0
 */
export const OBSERVE_THROTTLE_DURATION = 200;

/**
 * Limits the number of ranges to register.
 *
 * @since 0.1.0
 */
export const MAX_RANGES = 10000;

/**
 * The class for highlighting the selection and arbitrary ranges.
 *
 * @since 0.1.0
 */
export class Range extends Component {
  /**
   * Holds the SelectionMarker instance.
   */
  selection: SelectionMarker;

  /**
   * Stores ranges with categorizing them into arbitrary groups.
   */
  readonly ranges: Record<string, RangeData[]>= {};

  /**
   * Stores wrapper elements of markers.
   */
  readonly groups: Record<string, HTMLDivElement> = {};

  /**
   * Initializes the component.
   *
   * @param elements - A collection of editor elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );
    this.selection = new SelectionMarker( this.Editor, elements );

    const observe = this.observe.bind( this, false );
    this.on( EVENT_CHUNK_MOVED, throttle( observe, OBSERVE_THROTTLE_DURATION ) );
    this.on( EVENT_SCROLLED, observe );
    this.on( [ EVENT_FONT_LOADED, EVENT_RESIZE ], this.observe.bind( this, true ) );
  }

  /**
   * Observes ranges and draw/hide them.
   *
   * @param refresh - Optional. If `true`, redraws markers without their caches.
   */
  private observe( refresh?: boolean ): void {
    if ( this.Editor ) {
      forOwn( this.ranges, ( ranges, group ) => {
        if ( this.groups[ group ] ) {
          this.draw( group, refresh );
        }
      } );
    }
  }

  /**
   * Draws visible markers.
   *
   * @param group   - A group to draw.
   * @param refresh - Optional. If `true`, redraws markers without their caches.
   */
  private draw( group: string, refresh?: boolean ): void {
    const ranges = this.ranges[ group ];

    let html = '';

    ranges.forEach( data => {
      const { range } = data;

      if ( this.isVisible( range ) ) {
        html += data.marker.html( range.start, range.end, ! refresh );
      }
    } );

    this.groups[ group ].innerHTML = html;
  }

  /**
   * Checks if the range should be drawn or not.
   * This returns `true` when the range boundary is inside the viewport, or the range contains it.
   *
   * @param range - A range to check.
   *
   * @return `true` if the range should be drawn or otherwise `false`.
   */
  private isVisible( range: PositionRange ): boolean {
    const { Chunk } = this;
    const [ startRow ] = range.start;
    const [ endRow ] = range.end;
    return Chunk.includes( startRow ) || Chunk.includes( endRow ) || between( Chunk.start, startRow, endRow );
  }

  /**
   * Registers ranges to the group and draw them as markers if they are inside viewport.
   * If `concat` is `true`, sequential ranges will be concatenated as a single range.
   *
   * @param group       - A group name.
   * @param ranges      - A range or ranges to draw.
   * @param concat      - Optional. Determines whether to concat sequential ranges into the single one or not.
   * @param constructor - Optional. Specifies the Marker constructor.
   */
  register( group: string, ranges: PositionRange[], concat = true, constructor: typeof Marker = Marker ): void {
    const { ranges: info } = this;
    let lastRange: PositionRange;

    info[ group ] = info[ group ] || [];
    ranges = ranges.slice( 0, MAX_RANGES );

    for ( let i = 0; i < ranges.length; i++ ) {
      const range = ranges[ i ];

      if ( concat && lastRange && compare( lastRange.end, range.start ) === 0 ) {
        lastRange.end = range.end;
      } else {
        lastRange = { start: range.start, end: range.end };
        info[ group ].push( { range: lastRange, marker: new constructor( this.Editor, this.elements ) } );
      }
    }

    if ( ! this.groups[ group ] ) {
      const classes = [ CLASS_MARKERS, `${ CLASS_MARKERS }--${ group }` ];
      this.groups[ group ] = div( classes, this.elements.background );
    }

    this.observe();
  }

  /**
   * Clears ranges and rendered markers in the specified group.
   * If the group name is omitted, all ranges will be cleared.
   *
   * @param group - Optional. A group name to clear.
   */
  clear( group?: string ): void {
    if ( group ) {
      const ranges = this.ranges[ group ];

      if ( ranges ) {
        text( this.groups[ group ], '' );
        this.clearRanges( group );
      }
    } else {
      forOwn( this.ranges, ( markers, key ) => { this.clear( key ) } );
    }
  }

  /**
   * Clears ranges in the specified group.
   * Rendered markers are not cleared.
   *
   * @param group - A group name to clear.
   */
  clearRanges( group: string ): void {
    this.ranges[ group ] = [];
  }
}
