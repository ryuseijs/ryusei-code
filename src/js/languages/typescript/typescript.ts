import { Language } from '@ryusei/code';
import { typescript as _typescript } from '@ryusei/light';
import { Lexer } from '../../core/Lexer/Lexer';
import { assign } from '../../utils';
import { javascriptConfig } from '../javascript/javascript';


/**
 * Returns a TypeScript Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */
export function typescript(): Language {
  const language = _typescript();
  return assign( { id: language.id, language, lexer: new Lexer( language ) }, javascriptConfig() );
}
