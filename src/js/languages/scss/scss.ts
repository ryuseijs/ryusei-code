import { Language, LanguageConfig } from '@ryusei/code';
import { scss as _scss } from '@ryusei/light';
import { Lexer } from '../../core/Lexer/Lexer';
import { assign } from '../../utils';
import { cssConfig } from '../css/css';


/**
 * Returns a SCSS Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */
export function scss(): Language {
  const language = _scss();
  return assign( { id: language.id, language, lexer: new Lexer( language ) }, scssConfig() );
}

/**
 * Returns a SCSS LanguageConfig object.
 *
 * @private
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */
export function scssConfig(): LanguageConfig {
  return assign( cssConfig(), {
    lineComment : [ '//', '' ],
  } );
}
