import { Language, LanguageConfig } from '@ryusei/code';
import { CATEGORY_COMMENT, CATEGORY_STRING, javascript as _javascript } from '@ryusei/light';
import { Editor } from '../../core/Editor/Editor';
import { Lexer } from '../../core/Lexer/Lexer';
import { assign, compare } from '../../utils';


/**
 * Returns a JavaScript Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */
export function javascript(): Language {
  const language = _javascript();
  return assign( { id: language.id, language, lexer: new Lexer( language ) }, javascriptConfig() );
}

/**
 * Returns a JavaScript LanguageConfig object.
 *
 * @private
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */
export function javascriptConfig(): LanguageConfig {
  const scope = [ '!comment', '!string' ];

  const bracketsCompletionData = {
    close : scope,
    skip  : scope,
    remove: scope,
  };

  const quotesCompletionData = {
    close : '@quotes',
    skip  : '@quotes',
    remove: '@quotes',
  };

  return {
    lineComment : [ '//', '' ],
    blockComment: [ '/*', '*/' ],

    multiline: [
      [ '`', '`', CATEGORY_STRING, '#backtick' ],
      [ '/*', '*/', CATEGORY_COMMENT ],
    ],

    indent: [
      [ /\($/, /^\)/, scope ],
      [ /\[$/, /^]/, scope ],
      [ /{$/, /^}/, scope ],
    ],

    autoClose: [
      [ '(', ')', bracketsCompletionData ],
      [ '[', ']', bracketsCompletionData ],
      [ '{', '}', bracketsCompletionData ],
      [ "'", "'", quotesCompletionData ],
      [ '"', '"', quotesCompletionData ],
      [
        '`',
        '`',
        {
          close : shouldCloseBacktick,
          skip  : shouldSkipOrRemoveBacktick,
          remove: shouldSkipOrRemoveBacktick,
        },
      ],
    ],
  };
}

/**
 * Determines whether to close the backtick or not.
 * A backtick should not be completed when:
 * - the entered backtick is closing a string (`aaa[`]).
 * - the next character of the entered backtick is not empty ([`]aaa).
 *
 * @param Editor - An editor instance.
 *
 * @return `true` if the backtick should be closed.
 */
function shouldCloseBacktick( Editor: Editor ): boolean {
  const { Components } = Editor;
  const { Input } = Components;
  const prevInfo = Input.info;

  if ( prevInfo && prevInfo.category === CATEGORY_STRING ) {
    return false;
  }

  const { after } = Input;
  return ! Components.Scope.isIn( 'comment' ) && ( ! after || /^\s/.test( after ) );
}

/**
 * Determines whether to skip/remove the backtick or not.
 *
 * @param Editor - An editor instance.
 *
 * @return `true` if the backtick should be skipped or removed.
 */
function shouldSkipOrRemoveBacktick( Editor: Editor ): boolean {
  const { Components } = Editor;
  const { start } = Components.Selection.get();
  const info = Components.Code.lines.getInfoAt( start );

  if ( info && info.category === CATEGORY_STRING ) {
    return compare( start, [ start[ 0 ], info.to - 1 ] ) === 0;
  }

  return false;
}
