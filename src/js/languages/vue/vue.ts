import { Language, LanguageConfig } from '@ryusei/code';
import { vue as _vue } from '@ryusei/light';
import { Lexer } from '../../core/Lexer/Lexer';
import { assign } from '../../utils';
import { css } from '../css/css';
import { htmlConfig, HtmlOptions } from '../html/html';
import { javascript } from '../javascript/javascript';


/**
 * The Vue language options.
 *
 * @since 0.0.12
 */
export interface VueOptions extends HtmlOptions {}

/**
 * Returns a Vue Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */
export function vue( options: VueOptions = {} ): Language {
  const script = options.script || {
    language: javascript(),
    use: {
      config: javascript(),
      code  : '<script>',
      depth : 2,
    },
  };

  const style = options.style || {
    language: css(),
    use: {
      config: css(),
      code  : '<style>',
      depth : 2,
    },
  };

  const language = _vue( { script: () => script.language.language, style: () => style.language.language } );

  return assign( {
    id: language.id,
    language,
    lexer: new Lexer( language ),
    use: {
      [ script.language.id ]: script.use,
      [ style.language.id ] : style.use,
    },
  }, vueConfig() );
}

/**
 * Returns a Vue LanguageConfig object.
 *
 * @private
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */
export function vueConfig(): LanguageConfig {
  return htmlConfig();
}
