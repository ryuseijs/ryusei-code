import { Language, LanguageConfig } from '@ryusei/code';
import { CATEGORY_COMMENT, css as _css } from '@ryusei/light';
import { Lexer } from '../../core/Lexer/Lexer';
import { assign } from '../../utils';


/**
 * Returns a CSS Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */
export function css(): Language {
  const language = _css();
  return assign( { id: language.id, language, lexer: new Lexer( language ) }, cssConfig() );
}

/**
 * Returns a CSS LanguageConfig object.
 *
 * @private
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */
export function cssConfig(): LanguageConfig {
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
    lineComment : [ '/*', '*/' ],
    blockComment: [ '/*', '*/' ],

    multiline: [
      [ '/*', '*/', CATEGORY_COMMENT ],
    ],

    indent: [
      [ /{$/, /^}/, scope ],
    ],

    autoClose: [
      [ '(', ')', bracketsCompletionData ],
      [ '[', ']', bracketsCompletionData ],
      [ '{', '}', bracketsCompletionData ],
      [ "'", "'", quotesCompletionData ],
      [ '"', '"', quotesCompletionData ],
    ],
  };
}
