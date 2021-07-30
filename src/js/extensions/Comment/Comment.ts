import { Elements, Position, Range } from '@ryusei/code';
import { CATEGORY_COMMENT } from '@ryusei/light';
import { Component } from '../../classes/Component/Component';
import { EVENT_CHANGE, EVENT_CHANGED, EVENT_KEYMAP } from '../../constants/events';
import { Editor } from '../../core/Editor/Editor';
import { clamp, endsWith, escapeRegExp, min, startsWith } from '../../utils';
import { KEYMAP } from './keymap';


/**
 * The input type for comment or uncomment changes.
 *
 * @since 0.1.0
 */
const COMMENT_INPUT_TYPE = 'comment';

/**
 * The class for commenting out or uncommenting code.
 *
 * @since 0.1.0
 */
export class Comment extends Component {
  /**
   * The Comment constructor.
   *
   * @param Editor - An Editor instance.
   */
  constructor( Editor: Editor ) {
    super( Editor );
    this.addKeyBindings( KEYMAP );
  }

  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );

    const { language } = this;

    if ( language.blockComment ) {
      this.on( `${ EVENT_KEYMAP }:blockComment`, this.toggleBlock, this );
    }

    if ( language.lineComment ) {
      this.on( `${ EVENT_KEYMAP }:lineComment`, this.toggleLine, this );
    }
  }

  /**
   * Toggles block comments.
   * If the `start` or `end` position of the selection is inside a comment, unwraps the comment.
   * Otherwise, comments out the selection.
   */
  private toggleBlock(): void {
    let { start, end } = this.Selection.get();
    const range = this.detectBlockComment( start ) || this.detectBlockComment( end );

    this.emit( EVENT_CHANGE, COMMENT_INPUT_TYPE );

    if ( range ) {
      start = range.start;
      end   = range.end;
      this.uncomment( start, end, false );
    } else {
      this.commentOut( start, end, false );
    }

    this.sync( start, end, !! range, false );
    this.emit( EVENT_CHANGED, COMMENT_INPUT_TYPE );
  }

  /**
   * Toggles line comments.
   */
  private toggleLine(): void {
    const { start, end } = this.Selection.get();
    const { lines } = this;

    this.emit( EVENT_CHANGE, COMMENT_INPUT_TYPE );

    let endPosition: Position;
    let uncommented;

    for ( let i = start[ 0 ]; i <= end[ 0 ]; i++ ) {
      const range = this.detectLineComment( [ i, lines[ i ].text.length ] );

      if ( range ) {
        this.uncomment( range.start, range.end, true );
        endPosition = end;
        uncommented = true;
      }
    }

    if ( ! uncommented ) {
      const minIndent = lines.findMinIndent( start[ 0 ], end[ 0 ] );

      for ( let i = start[ 0 ]; i <= end[ 0 ]; i++ ) {
        this.commentOut( [ i, minIndent.length ], [ i, lines[ i ].text.length ], true );
      }
    }

    this.sync( start, endPosition || end, uncommented, true );
    this.emit( EVENT_CHANGED, COMMENT_INPUT_TYPE );
  }

  /**
   * Comments out code between the start and end positions.
   *
   * @param start - A start position.
   * @param end   - An end position.
   * @param line  - Whether to use a line comment or not.
   */
  private commentOut( start: Position, end: Position, line: boolean ): void {
    const { Code } = this;
    const comment = this.getConfig( line ? [ start[ 0 ], 0 ] : start, line );

    if ( comment ) {
      const commentStart = comment[ 0 ] + ( comment[ 1 ] ? '' : ' ' );
      Code.replaceRange( start, end, `${ commentStart }${ Code.sliceRange( start, end ) }${ comment[ 1 ] || '' }` );
    }
  }

  /**
   * Converts back the commented out code into the source code.
   *
   * @param start - A start position.
   * @param end   - An end position.
   * @param line  - Whether to use a line comment or not.
   */
  private uncomment( start: Position, end: Position, line: boolean ): void {
    const { Code } = this;
    const comment = this.getConfig( start, line );

    if ( comment ) {
      const replacement = Code.sliceRange( start, end );
      const source      = `^${ escapeRegExp( comment[ 0 ] ) }[ ]?|[ ]?${ escapeRegExp( comment[ 1 ] ) }$`;
      Code.replaceRange( start, end, replacement.replace( new RegExp( source, 'g' ), '' ) );
    }
  }

  /**
   * Syncs the code to the viewport.
   *
   * @param start       - A start position
   * @param end         - An end position.
   * @param uncommented - Determines whether to sync code for uncommented or commented out lines.
   * @param line        - Determines whether to sync code for line or block comments.
   */
  private sync( start: Position, end: Position, uncommented: boolean, line: boolean ): void {
    const { lines } = this;
    const range   = this.Selection.get();
    const comment = this.getConfig( start, line );

    if ( ! comment ) {
      return;
    }

    let row = uncommented && ! line ? range.start[ 0 ] : end[ 0 ];
    let col = range.end[ 1 ];

    if ( line ) {
      row = min( row + 1, lines.length - 1 );
    } else {
      const length = comment[ 0 ].length;

      if ( uncommented ) {
        if ( row === start[ 0 ] ) {
          col -= length;
        }
      } else {
        if ( row === start[ 0 ] ) {
          col += length;
        }
      }
    }

    this.View.jump( row );
    this.Sync.sync( start[ 0 ], end[ 0 ] );

    col = clamp( col, 0, this.lines[ row ].text.length );
    this.Selection.set( [ row, col ] );
  }

  /**
   * Returns the comment config object at the position.
   *
   * @param position - A position.
   * @param line     - Determines whether to get a line comment configuration or not.
   *
   * @return An object with `start` and `end` that represent a comment syntax.
   */
  private getConfig( position: Position, line: boolean ): [ string, string ] {
    return this.getLanguage( position )[ `${ line ? 'line' : 'block' }Comment` ];
  }

  /**
   * Detects the range of a block comment around the provided position.
   *
   * @param position - A position that may be inside a block comment.
   *
   * @return A Range object if the passed position is inside a block comment.
   *         Otherwise, `null`.
   */
  private detectBlockComment( position: Position ): Range | null {
    const { lines } = this;
    const info = lines.getInfoAt( position );

    if ( info && info.category === CATEGORY_COMMENT ) {
      const start = lines.findBlockStart( position );
      const end   = lines.findBlockEnd( position );

      if ( start && end ) {
        return { start, end };
      }
    }

    return null;
  }

  /**
   * Detects the range of a line comment at the provided position.
   * This method does not care that the code is actually categorized as a comment,
   * but only care about the representation of the line comment.
   *
   * @param position - A position that may be on the line containing a line comment.
   *
   * @return A Range object if the row contains a line comment. Otherwise, `null`.
   */
  private detectLineComment( position: Position ): Range | null {
    const [ head, tail ] = this.getConfig( position, true );
    const [ row ] = position;
    const line = this.lines[ row ].text;

    if ( line ) {
      const trimmed = line.trim();

      if ( startsWith( trimmed, head ) && ( ! tail || endsWith( trimmed, tail ) ) ) {
        const endCol = tail ? line.lastIndexOf( tail ) : line.length;

        return {
          start: [ row, line.indexOf( head ) ],
          end  : [ row, endCol ],
        };
      }
    }

    return null;
  }
}
