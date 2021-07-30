import { Options, Token, TokenInfo } from '@ryusei/code';
import { CATEGORY_COMMENT, CATEGORY_LINEBREAK, CATEGORY_SPACE } from '@ryusei/light';
import { LINE_BREAK } from '../../constants/characters';
import { count, includes, isUndefined } from '../../utils';


/**
 * Determines what HTML should be inserted to empty lines.
 * Be aware that changing this character may break the selection.
 *
 * @since 0.1.0
 */
const EMPTY_LINE_HTML = '<br>';

/**
 * The class for managing data of each line.
 *
 * @since 0.1.0
 */
export class Line {
  /**
   * Holds options.
   */
  private readonly options: Options;

  /**
   * Holds the last update time.
   */
  private time = 0;

  /**
   * Keeps the built HTML string.
   */
  private htmlCache: string;

  /**
   * Keeps the built text.
   */
  private textCache: string;

  /**
   * Holds the depth of the first token.
   */
  depth = 0;

  /**
   * Holds tokens.
   */
  tokens: readonly Token[] = [];

  /**
   * A language of the first token.
   */
  language: string;

  /**
   * Indicates whether the first token is split into multilines or not.
   */
  split: boolean;

  /**
   * Depth of tabs.
   */
  indentDepth = 0;

  /**
   * The Line constructor.
   *
   * @param options - Options.
   */
  constructor( options: Options ) {
    this.options = options;
  }

  /**
   * Initializes some properties.
   */
  protected init(): void {
    const { first } = this;
    const info = ( first && first[ 2 ] ) || {} as TokenInfo;

    this.depth       = info.depth || 0;
    this.language    = info.language || '';
    this.split       = info.split;
    this.indentDepth = count( this.getIndent(), this.options.indent );
    this.htmlCache   = undefined;
    this.textCache   = undefined;
  }

  /**
   * Sets new tokens and initializes properties.
   * To avoid updating tokens by the old value made by async processes,
   * pass the update time with `Date.now()`.
   *
   * @param tokens - An array with tokens.
   * @param time   - Optional. If this time is older than the current time, tokens will not be updated.
   */
  set( tokens: readonly Token[], time?: number ): void {
    if ( ! time || time > this.time ) {
      this.tokens = tokens;
      this.time   = time || Date.now();

      this.init();
    }
  }

  /**
   * Returns the indent of the line if available.
   *
   * @return An indent string if available, or an empty string if not.
   */
  getIndent(): string {
    const { first } = this;

    if ( first ) {
      if ( first[ 0 ] === CATEGORY_SPACE ) {
        return first[ 1 ];
      }

      if ( first[ 0 ] === CATEGORY_COMMENT ) {
        const match = this.text.match( new RegExp( `^${ this.options.indent }+` ) );
        return match ? match[ 0 ] : '';
      }
    }

    return '';
  }

  /**
   * Returns the TokenInfo object at the index.
   *
   * @param index - A token index.
   *
   * @return A TokenInfo object if available, or `undefined` if not.
   */
  getInfo( index: number ): TokenInfo | undefined {
    const token = this.tokens[ index ];
    return token && token[ 2 ];
  }

  /**
   * Returns the TokenInfo object at the col index.
   *
   * @param col - A col index.
   *
   * @return A TokenInfo object if available, or `undefined` if not.
   */
  getInfoAt( col: number ): TokenInfo | undefined {
    const { tokens, tokens: { length } } = this;

    if ( tokens.length ) {
      if ( col === this.text.length ) {
        return tokens[ length - 1 ][ 2 ];
      }

      for ( let i = 0; i < length; i++ ) {
        const info = tokens[ i ][ 2 ];

        if ( info.from <= col && col < info.to ) {
          return info;
        }
      }
    }
  }

  /**
   * Checks if the line contains only a line break/spaces or not.
   *
   * @return `true` if the line contains only a line break or spaces. Otherwise, `false`.
   */
  isEmpty(): boolean {
    const { tokens } = this;
    return tokens.length === 1 && includes( [ CATEGORY_LINEBREAK, CATEGORY_SPACE ], tokens[ 0 ][ 0 ] );
  }

  /**
   * Builds the HTML by tokens.
   * This should not be pre-built in the init function for better performance.
   *
   * @return The HTML string of the line.
   */
  get html(): string {
    if ( ! this.htmlCache ) {
      let html = '';

      for ( let i = 0; i < this.tokens.length; i++ ) {
        const token = this.tokens[ i ];

        if ( i === 0 && token[ 1 ] === LINE_BREAK ) {
          html += EMPTY_LINE_HTML;
          break;
        } else {
          html += token[ 2 ].html;
        }
      }

      this.htmlCache = html || EMPTY_LINE_HTML;
    }

    return this.htmlCache;
  }

  /**
   * Builds the text by tokens.
   *
   * @return The text of the line.
   */
  get text(): string {
    if ( isUndefined( this.textCache ) ) {
      this.textCache = this.tokens.reduce( ( text, token ) => {
        if ( token[ 0 ] !== CATEGORY_LINEBREAK ) {
          text += token[ 1 ];
        }

        return text;
      }, '' );
    }

    return this.textCache;
  }

  /**
   * Returns the first token.
   *
   * @return The first token.
   */
  get first(): Token {
    return this.tokens[ 0 ];
  }
}
