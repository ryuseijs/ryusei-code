import { Token } from '@ryusei/code';
import { Lexer as Base } from '@ryusei/light';
/**
 * Extends the original Lexer class to add custom data to the 3rd parameter of each token.
 *
 * @since 0.1.0
 */
export declare class Lexer extends Base {
    /**
     * Runs the tokenization and adds custom data to each token.
     *
     * @param text  - A text to tokenize.
     * @param limit - Optional. Limits the number of lines.
     *
     * @return An array with arrays of tokens.
     */
    run(text: string, limit?: number): Token[][];
}
//# sourceMappingURL=../../../../src/js/core/Lexer/Lexer.d.ts.map