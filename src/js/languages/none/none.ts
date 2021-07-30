import { Language } from '@ryusei/code';
import { none as _none } from '@ryusei/light';
import { Lexer } from '../../core/Lexer/Lexer';


/**
 * Returns a `none` Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */
export function none(): Language {
  const language = _none();
  return { id: language.id, language, lexer: new Lexer( language ) };
}
