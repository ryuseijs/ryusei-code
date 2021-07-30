import { Language, LanguageConfig } from '@ryusei/code';
import { xml as _xml } from '@ryusei/light';
import { Lexer } from '../../core/Lexer/Lexer';
import { assign } from '../../utils';
import { htmlConfig } from '../html/html';


/**
 * Returns a XML Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */
export function xml(): Language {
  const language = _xml();
  return assign( { id: language.id, language, lexer: new Lexer( language ) }, xmlConfig() );
}

/**
 * Returns a XML LanguageConfig object.
 *
 * @private
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */
export function xmlConfig(): LanguageConfig {
  return htmlConfig();
}
