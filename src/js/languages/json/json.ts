import { Language, LanguageConfig } from '@ryusei/code';
import { json as _json } from '@ryusei/light';
import { Lexer } from '../../core/Lexer/Lexer';
import { assign } from '../../utils';


/**
 * Returns a JSON Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */
export function json(): Language {
  const language = _json();
  return assign( { id: language.id, language, lexer: new Lexer( language ) }, jsonConfig() );
}

/**
 * Returns a JSON LanguageConfig object.
 *
 * @private
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */
export function jsonConfig(): LanguageConfig {
  const scope = [ '!string' ];

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
    indent: [
      [ /{$/, /^}/, scope ],
      [ /\[$/, /^]/, scope ],
    ],

    autoClose: [
      [ '[', ']', bracketsCompletionData ],
      [ '{', '}', bracketsCompletionData ],
      [ '"', '"', quotesCompletionData ],
    ],
  };
}
