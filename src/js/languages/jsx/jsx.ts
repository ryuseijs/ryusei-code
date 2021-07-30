import { Language, LanguageConfig } from '@ryusei/code';
import { jsx as _jsx } from '@ryusei/light';
import { Lexer } from '../../core/Lexer/Lexer';
import { assign } from '../../utils';
import { htmlConfig } from '../html/html';
import { javascriptConfig } from '../javascript/javascript';


/**
 * Returns a JSX Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */
export function jsx(): Language {
  const language = _jsx();
  return assign( { id: language.id, language, lexer: new Lexer( language ) }, jsxConfig() );
}

/**
 * Returns a JSX LanguageConfig object.
 *
 * @private
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */
export function jsxConfig(): LanguageConfig {
  const js   = javascriptConfig();
  const html = htmlConfig();

  js.indent.push( ...html.indent );

  const { autoClose } = html;
  const config = autoClose.filter( config => config[ 0 ] === '=' )[ 0 ];

  if ( config ) {
    config[ 1 ] = '{}';
  }

  js.autoClose.push( ...html.autoClose );

  return js;
}
