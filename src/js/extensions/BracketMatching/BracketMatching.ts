import { BracketMatchingOptions, Elements, EventBusEvent, Position, Range, ScanResult, TokenInfo } from '@ryusei/code';
import { CATEGORY_BRACKET } from '@ryusei/light';
import { Component } from '../../classes/Component/Component';
import { Selection } from '../../components';
import { EVENT_READONLY, EVENT_SELECTED } from '../../constants/events';
import { CHANGED, EXTEND, SELECTING, START } from '../../constants/selection-states';
import { debounce, escapeRegExp, rafThrottle } from '../../utils';
import { Throttle } from '../../utils/function/throttle/throttle';
import { DEFAULT_OPTIONS } from './defaults';


/**
 * The group ID for markers.
 *
 * @since 0.1.0
 */
export const MARKER_ID = 'brackets';

/**
 * The debounce duration for the clear method.
 *
 * @since 0.1.0
 */
export const CLEAR_DEBOUNCE_DURATION = 50;

/**
 * The component for highlighting matched brackets.
 *
 * @since 0.1.0
 */
export class BracketMatching extends Component {
  /**
   * The debounced clear function.
   */
  private clear: Throttle<() => void>;

  /**
   * The collection of brackets.
   */
  private brackets: BracketMatchingOptions[ 'brackets' ];

  /**
   * Limits the number of lines to match brackets.
   */
  private maxScanLines: number;

  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */
  mount( elements: Elements ): void {
    const options = this.getOptions( 'bracketMatching', DEFAULT_OPTIONS );

    this.brackets     = options.brackets;
    this.maxScanLines = options.maxScanLines;

    super.mount( elements );

    this.clear  = debounce( () => { this.Range.clear( MARKER_ID ) }, CLEAR_DEBOUNCE_DURATION );
    this.update = rafThrottle( this.update.bind( this ) );

    this.on( EVENT_SELECTED, this.onSelected, this );
    this.on( EVENT_READONLY, ( e, readOnly ) => {
      if ( readOnly ) {
        this.clear();
      }
    } );
  }

  /**
   * Called when the selection state is changed.
   *
   * @param e         - An EventBusEvent object.
   * @param Selection - A Selection instance.
   */
  private onSelected( e: EventBusEvent, Selection: Selection ): void {
    if ( Selection.is( START, SELECTING, EXTEND ) ) {
      this.clear();
    } else if ( Selection.is( CHANGED ) ) {
      if ( ! this.Editor.readOnly && Selection.isCollapsed() ) {
        this.update();
      }
    }
  }

  /**
   * Checks the current location and renders markers.
   */
  private update(): void {
    const { focus } = this.Selection;
    const before: Position = focus[ 1 ] > 0 ? [ focus[ 0 ], focus[ 1 ] - 1 ] : null;

    this.clear.invoke();

    [ before, focus ].some( position => {
      if ( position && this.Scope.inCategory( CATEGORY_BRACKET, position ) ) {
        this.draw( position[ 0 ], this.lines.getInfoAt( position ) );
        return true;
      }
    } );
  }

  /**
   * Draws the provided bracket token and its counterpart.
   *
   * @param row  - A row index.
   * @param info - A TokenInfo object.
   */
  private draw( row: number, info: TokenInfo ): void {
    const match = this.find( false, row, info ) || this.find( true, row, info );

    if ( match ) {
      const { Range } = this;
      Range.clear( MARKER_ID );
      Range.register( MARKER_ID, [ this.infoToRange( row, info ), this.infoToRange( match.row, match.info ) ] );
    }
  }

  /**
   * Finds the counterpart of the provided token.
   *
   * @param findClosing - Determines whether to find closing part or not.
   * @param row         - A row index.
   * @param info        - A TokenInfo object.
   *
   * @return A counter token of the passed info if found, or otherwise `undefined`.
   */
  private find( findClosing: boolean, row: number, info: TokenInfo ): ScanResult | undefined {
    const { brackets } = this;
    const index = brackets[ Number( ! findClosing ) ].indexOf( info.code );

    if ( index > -1 ) {
      const counterpart = brackets[ Number( findClosing ) ][ index ];

      return this.lines[ `scan${ findClosing ? 'Down' : 'Up' }` ](
        [ row, info.from ],
        [ CATEGORY_BRACKET, new RegExp( escapeRegExp( counterpart ) ) ],
        [ CATEGORY_BRACKET, new RegExp( escapeRegExp( info.code ) ) ],
        1,
        this.maxScanLines
      );
    }
  }

  /**
   * Converts the provided TokeInfo object to the range.
   *
   * @param row  - A row index.
   * @param info - A TokenInfo object to convert.
   *
   * @return A Range object.
   */
  private infoToRange( row: number, info: TokenInfo ): Range {
    return { start: [ row, info.from ], end: [ row, info.to ] };
  }
}
