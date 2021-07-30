import { Elements, Range, SearchOptions } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { MAX_RANGES } from '../../components/Range/Range';
import { CLASS_ACTIVE } from '../../constants/classes';
import { EVENT_CHANGE, EVENT_CHANGED, EVENT_KEYMAP, EVENT_READONLY, EVENT_SYNCED } from '../../constants/events';
import { Editor } from '../../core/Editor/Editor';
import {
  assign,
  attr,
  clamp,
  compare,
  create,
  div,
  includes,
  isUndefined,
  prevent,
  text,
  throttle,
  toggleClass,
} from '../../utils';
import { Throttle } from '../../utils/function/throttle/throttle';
import { Toolbar } from '../Toolbar/Toolbar';
import { REPLACE_BUTTONS, SEARCH_BUTTONS } from './buttons';
import {
  CLASS_MATCHES_COUNT,
  CLASS_REPLACE,
  CLASS_REPLACE_CONTROLS,
  CLASS_SEARCH,
  CLASS_SEARCH_CONTROLS,
} from './classes';
import {
  ACTIVE_MARKER_ID,
  JUMP_DELAY_AFTER_REPLACE,
  MARKER_ID,
  SEARCH_THROTTLE_DURATION,
  TOOLBAR_ID,
} from './constants';
import { DEFAULT_OPTIONS } from './defaults';
import { I18N } from './i18n';
import { ICONS } from './icons';
import { KEYMAP } from './keymap';


/**
 * The class for searching texts in the code.
 *
 * @since 0.1.0
 */
export class Search extends Component {
  /**
   * Holds the Toolbar component.
   */
  private Toolbar: Toolbar;

  /**
   * Holds the wrapper element.
   */
  private wrapper: HTMLDivElement;

  /**
   * Holds the element that wraps elements of the search interface.
   */
  private searchBar: HTMLDivElement;

  /**
   * Holds the element that wraps elements of the replace interface.
   */
  private replaceBar: HTMLDivElement;

  /**
   * Holds the element that displays matches count.
   */
  private counter: HTMLSpanElement;

  /**
   * Stores button elements.
   */
  private buttons: Record<string, HTMLButtonElement>;

  /**
   * The throttled search function.
   */
  private throttledSearch: Throttle<( search: string, index?: number ) => void>;

  /**
   * Holds matched ranges.
   */
  private ranges: Range[] = [];

  /**
   * The current range index.
   */
  private index = -1;

  /**
   * Indicates whether to ignore cases or not.
   */
  private matchCase: boolean;

  /**
   * Whether to search texts by the regular expression or not.
   */
  private regexp: boolean;

  /**
   * Whether to search texts by a whole word or not.
   */
  private wholeWord: boolean;

  /**
   * Holds search options.
   */
  private opts: SearchOptions;

  /**
   * Keeps the ID of the timer for the delay until jumping to the next match.
   */
  private jumpTimerAfterReplace: ReturnType<typeof setTimeout>;

  /**
   * Holds the search input element.
   */
  searchField: HTMLInputElement;

  /**
   * Holds the replace input element.
   */
  replaceField: HTMLInputElement;

  /**
   * The Search constructor.
   *
   * @param Editor - An Editor instance.
   */
  constructor( Editor: Editor ) {
    super( Editor );
    this.addIcons( ICONS );
    this.addI18n( I18N );
    this.addKeyBindings( KEYMAP );
  }

  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */
  mount( elements: Elements ): void {
    if ( ! ( this.Toolbar = this.require( 'Toolbar' ) ) ) {
      return;
    }

    super.mount( elements );

    this.opts            = this.getOptions( 'search', DEFAULT_OPTIONS );
    this.throttledSearch = throttle( this.search.bind( this ), SEARCH_THROTTLE_DURATION );

    this.create();
    this.Toolbar.register( TOOLBAR_ID, this.wrapper, this.i18n.searchToolbar );

    this.listen();
  }

  /**
   * Creates elements for the search interface.
   */
  private create(): void {
    const { Toolbar } = this;

    const wrapper    = div();
    const searchBar  = div( CLASS_SEARCH, wrapper );
    const replaceBar = div( CLASS_REPLACE, wrapper );

    this.searchField  = Toolbar.createField( { id: 'search', tabindex: 1 }, searchBar );
    this.replaceField = Toolbar.createField( { id: 'replace', tabindex: 1 }, replaceBar );

    const searchControls  = div( CLASS_SEARCH_CONTROLS, searchBar );
    const replaceControls = div( CLASS_REPLACE_CONTROLS, replaceBar );

    const searchButtons  = SEARCH_BUTTONS.filter( settings => ! includes( this.opts.hideButtons, settings.id ) );
    const replaceButtons = REPLACE_BUTTONS.filter( settings => ! includes( this.opts.hideButtons, settings.id ) );

    this.buttons = assign(
      Toolbar.createButtons<Search>( searchButtons, searchControls, this ),
      Toolbar.createButtons<Search>( replaceButtons, replaceControls, this )
    );

    if ( ! this.opts.hideMatchCount ) {
      this.counter = create( 'span', CLASS_MATCHES_COUNT, searchControls );
    }

    this.wrapper    = wrapper;
    this.searchBar  = searchBar;
    this.replaceBar = replaceBar;
  }

  /**
   * Listens to some events.
   */
  private listen(): void {
    const { searchField } = this;

    this.on( `${ EVENT_KEYMAP }:search`, ( e, ke ) => {
      this.show( ! this.options.keymap.replace );
      prevent( ke );
    } );

    this.on( `${ EVENT_KEYMAP }:replace`, ( e, ke ) => {
      this.show( true );
      prevent( ke );
    } );

    this.bind( searchField, 'input', this.onInput, this );
    this.bind( searchField, 'keydown', this.onSearchFieldKeydown, this );
    this.bind( this.replaceField, 'keydown', this.onReplaceFieldKeydown, this );

    this.on( 'toolbar:opened', ( e, toolbar, id ) => {
      if ( id !== TOOLBAR_ID ) {
        this.clear();
      }
    } );

    this.on( 'toolbar:closed', this.clear, this );

    this.on( [ EVENT_CHANGED, EVENT_SYNCED ], () => {
      const { value } = searchField;

      if ( this.isActive() && value ) {
        this.throttledSearch( value, this.index );
      }
    } );

    this.on( EVENT_READONLY, ( e, readOnly ) => {
      if ( this.isActive() ) {
        this.toggleReplace( ! readOnly );
      }
    } );
  }

  /**
   * Called when any key is pressed on the search field.
   *
   * @param e - A KeyboardEvent object.
   */
  private onSearchFieldKeydown( e: KeyboardEvent ): void {
    if ( e.key === 'Enter' ) {
      this.next();
      prevent( e );
      return;
    }

    this.onKeydown( e );
  }

  /**
   * Called when any key is pressed on the replace field.
   *
   * @param e - A KeyboardEvent object.
   */
  private onReplaceFieldKeydown( e: KeyboardEvent ): void {
    if ( e.key === 'Enter' ) {
      this.replace();
      prevent( e );
      return;
    }

    this.onKeydown( e );
  }

  /**
   * Called when any key is pressed on both the search and input fields.
   *
   * @param e - A KeyboardEvent object.
   */
  private onKeydown( e: KeyboardEvent ): void {
    const key = e.key.toUpperCase();
    const { Keymap } = this;
    const matches = Keymap.matches.bind( Keymap, e );
    const next    = matches( 'searchNext' );
    const prev    = matches( 'searchPrev' );

    if ( next || prev ) {
      this[ prev ? 'prev' : 'next' ]();
      prevent( e );
    } else if ( matches( 'search' ) ) {
      this.show( false );
      prevent( e );
    } else if ( matches( 'replace' ) ) {
      this.show( true );
      prevent( e );
    } else if ( e.ctrlKey ) {
      if ( key !== 'A' && key !== 'X' && key === 'C' ) {
        prevent( e );
      }
    } else if ( e.altKey ) {
      prevent( e );
    }
  }

  /**
   * Called when the field receives input.
   */
  private onInput(): void {
    const { value } = this.searchField;

    if ( value ) {
      this.throttledSearch( value );
    } else {
      this.clear();
      this.toggleDisabled();
    }
  }

  /**
   * Searches the provided string with current settings.
   *
   * @param search - Optional. A string to search.
   * @param index  - Optional. An index to activate.
   *
   * @return An array with tuples that contains `[ index, length ]`.
   */
  private search( search: string = this.searchField.value, index?: number ): void {
    const { Range } = this;

    let source: string | RegExp;

    try {
      source = this.regexp && search ? new RegExp( search ) : search;
    } catch ( e ) {
      return;
    }

    const ranges = this.Code.search( source, ! this.matchCase, this.wholeWord, MAX_RANGES );

    this.clear();
    Range.register( MARKER_ID, ranges );

    this.ranges = ranges;

    if ( isUndefined( index ) || index < 0 ) {
      this.index = -1;
      this.next();
    } else {
      this.index = clamp( index, 0, ranges.length - 1 );
      this.activate( this.index );
    }

    this.updateMatchesCount();
    this.toggleDisabled();
  }

  /**
   * Search again without changing the current index.
   *
   * @param index - Optional. An index to activate.
   */
  private rematch( index?: number ): void {
    this.search( undefined, index );
  }

  /**
   * Updates matches counter.
   */
  private updateMatchesCount(): void {
    if ( this.counter ) {
      const { length } = this.ranges;

      let string: string;

      if ( ! length ) {
        string = this.i18n.noResults;
      } else if ( length > MAX_RANGES ) {
        string = `${ MAX_RANGES }+`;
      } else {
        string = `${ this.index + 1 }/${ length }`;
      }

      text( this.counter, string );
    }
  }

  /**
   * Toggles `disabled` property of some buttons.
   */
  private toggleDisabled(): void {
    [ 'prevMatch', 'nextMatch', 'replace', 'replaceAll' ].forEach( name => {
      const button = this.buttons[ name ];

      if ( button ) {
        button.disabled = ! this.ranges.length;
      }
    } );
  }

  /**
   * Jumps to the start position of the range specified by the index.
   *
   * @param index - An index of the range to jump to.
   */
  private jump( index: number ): void {
    const range = this.ranges[ index ];

    if ( range ) {
      this.View.jump( range.start[ 0 ], true );
    }
  }

  /**
   * Highlights the prev or next matched text and jumps there.
   *
   * @param prev - Whether to highlight the previous or next match.
   */
  private move( prev: boolean ): void {
    const { length } = this.ranges;

    let index = this.index + ( prev ? -1 : 1 );

    if ( index >= length ) {
      index = 0;
    } else if ( index < 0 ) {
      index = length - 1;
    }

    this.activate( index );
    this.jump( index );

    this.index = index;
    this.updateMatchesCount();
  }

  /**
   * Toggles the active class and the `aria-checked` attribute.
   *
   * @param button  - A target button element.
   * @param checked - Determines whether to check or uncheck them.
   */
  private toggleChecked( button: HTMLButtonElement, checked: boolean ): void {
    toggleClass( button, CLASS_ACTIVE, checked );
    attr( button, { 'aria-checked': checked } );
  }

  /**
   * Toggles the replace UI.
   *
   * @param show - Determines whether to show the replace UI or not.
   */
  private toggleReplace( show: boolean ): void {
    toggleClass( this.replaceBar, CLASS_ACTIVE, show && ! this.Editor.readOnly && ! this.opts.hideReplace );
  }

  /**
   * Checks if the search toolbar is active or not.
   *
   * @return `true` if the search toolbar is active, or otherwise `false`.
   */
  private isActive(): boolean {
    return this.Toolbar.isActive( TOOLBAR_ID );
  }

  /**
   * Toggles the "Match Case" mode.
   *
   * @param activate - Optional. Whether to activate the "Match Case" mode or not.
   */
  toggleMatchCase( activate = ! this.matchCase ): void {
    this.toggleChecked( this.buttons.matchCase, ( this.matchCase = activate ) );
    this.search();
  }

  /**
   * Toggles the "RegExp" mode.
   *
   * @param activate - Optional. Whether to activate the "RegExp" mode or not.
   */
  toggleRegExp( activate = ! this.regexp ): void {
    this.toggleChecked( this.buttons.regexp, ( this.regexp = activate ) );
    this.search();
  }

  /**
   * Toggles the "Match Whole Word" mode.
   *
   * @param wholeWord - Optional. Whether to activate the "Match Whole Word" mode or not.
   */
  toggleWholeWord( wholeWord = ! this.wholeWord ): void {
    this.toggleChecked( this.buttons.wholeWord, ( this.wholeWord = wholeWord ) );
    this.search();
  }

  /**
   * Highlights the matched text at the index.
   *
   * @param index - An index of the range to highlight.
   */
  activate( index: number ): void {
    const activeRange = this.ranges[ index ];

    if ( activeRange ) {
      const { Range } = this;
      Range.clear( ACTIVE_MARKER_ID );
      Range.register( ACTIVE_MARKER_ID, [ activeRange ] );
    }
  }

  /**
   * Highlights the next matched text and jumps there.
   */
  next(): void {
    this.move( false );
  }

  /**
   * Highlights the previous matched text and jumps there.
   */
  prev(): void {
    this.move( true );
  }

  /**
   * Replaces the search result with the provided replacement string.
   * If the length of ranges does not change after replacing,
   * that means the replacement includes the original word itself.
   *
   * @param replacement - Optional. A replacement string.
   * @param index       - Optional. An index to replace.
   */
  replace( replacement = this.replaceField.value, index = this.index ): void {
    const { ranges } = this;
    const activeRange = ranges[ index ];

    if ( activeRange ) {
      const { Selection } = this;
      const { start, end } = activeRange;
      const nextRange = ranges[ index + 1 ];

      Selection.update( start, start, true );

      this.emit( EVENT_CHANGE, 'replace' );
      this.jump( index );

      this.Code.replaceRange( start, end, replacement );
      this.Sync.sync( start[ 0 ], end[ 0 ] );

      this.emit( EVENT_CHANGED, 'replace' );
      this.rematch( index );

      if ( nextRange ) {
        this.index = this.toIndex( nextRange );
        this.activate( this.index );
      }

      this.jumpTimerAfterReplace = setTimeout( () => {
        this.jump( this.index );
      }, JUMP_DELAY_AFTER_REPLACE );
    }
  }

  /**
   * Converts the provided range to the range index.
   *
   * @param range - A range to convert into a range index.
   *
   * @return A range index if available, or otherwise `-1`.
   */
  private toIndex( range: Range ): number {
    const { ranges } = this;

    for ( let i = 0; i < ranges.length; i++ ) {
      if ( ! compare( ranges[ i ].start, range.start ) && ! compare( ranges[ i ].end, range.end ) ) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Replaces all matched strings with the replacement.
   *
   * @param replacement - Optional. A replacement string.
   */
  replaceAll( replacement = this.replaceField.value ): void {
    const { ranges } = this;

    if ( ranges.length ) {
      this.emit( EVENT_CHANGE );

      ranges.forEach( range => {
        this.Code.replaceRange( range.start, range.end, replacement );
      } );

      const endRow = ranges[ ranges.length - 1 ].end[ 0 ];

      this.View.jump( endRow );
      this.Sync.sync( ranges[ 0 ].start[ 0 ], endRow );

      this.clear();

      this.emit( EVENT_CHANGED );
    }
  }

  /**
   * Shows the toolbar.
   *
   * @param replace - Whether to display the replace interface or not.
   */
  show( replace: boolean ): void {
    const { Selection, searchField } = this;

    this.toggleReplace( replace );

    if ( ! Selection.isCollapsed() ) {
      if ( ! Selection.isMultiline() ) {
        searchField.value = Selection.toString();
      }
    }

    this.Toolbar.show( TOOLBAR_ID );
    this.rematch();
  }

  /**
   * Clears all markers.
   */
  clear(): void {
    const { Range } = this;
    Range.clear( MARKER_ID );
    Range.clear( ACTIVE_MARKER_ID );

    this.ranges = [];
    this.updateMatchesCount();
    this.throttledSearch.cancel();
    clearTimeout( this.jumpTimerAfterReplace );
  }
}
