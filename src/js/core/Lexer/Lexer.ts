import { Token } from '@ryusei/code';
import { Lexer as Base } from '@ryusei/light';
import { CLASS_TOKEN } from '../../constants/classes';
import { PROJECT_CODE_SHORT } from '../../constants/project';


/**
 * Extends the original Lexer class to add custom data to the 3rd parameter of each token.
 *
 * @since 0.1.0
 */
export class Lexer extends Base {
  /**
   * Runs the tokenization and adds custom data to each token.
   *
   * @param text  - A text to tokenize.
   * @param limit - Optional. Limits the number of lines.
   *
   * @return An array with arrays of tokens.
   */
  run( text: string, limit?: number ): Token[][] {
    const lines = this.tokenize( text, limit );

    for ( let i = 0; i < lines.length; i++ ) {
      const tokens = lines[ i ];
      let offset = 0;

      for ( let j = 0; j < tokens.length; j++ ) {
        const token   = tokens[ j ];
        const length  = token[ 1 ].length;
        const info    = token[ 2 ];
        const classes = `${ CLASS_TOKEN } ${ PROJECT_CODE_SHORT }__${ token[ 0 ].split( '.' )[ 0 ] }`;
        const escaped =  token[ 1 ].replace( /&/g, '&amp;' ).replace( /</g, '&lt;' ).replace( />/g, '&gt;' );
        const html    = `<code class="${ classes }">${ escaped }</code>`;

        token[ 2 ] = {
          category: token[ 0 ],
          code    : token[ 1 ],
          html,
          from    : offset,
          to      : offset + length,
          index   : j,
          state   : info.state,
          depth   : info.depth,
          head    : info.head,
          tail    : info.tail,
          distance: info.distance,
          language: info.language,
          split   : info.split,
        } as any;

        offset += length;
      }
    }

    return lines as Token[][];
  }
}
