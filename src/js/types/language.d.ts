declare module '@ryusei/code' {
  import { Language as _Language } from '@ryusei/light';
  import { Editor } from '../core/Editor/Editor';
  import { Lexer } from '../core/Lexer/Lexer';

  /**
   * The interface of the Language configuration.
   *
   * @since 0.1.0
   */
  interface LanguageConfig {
    /**
     * A collection of multiline syntax for tokenization as [ start, end, category, state? ];
     */
    multiline?: Array<[ string, string, string, string? ]>;
  }

  /**
   * The interface of the Language object.
   *
   * @since 0.1.0
   */
  interface Language extends LanguageConfig {
    /**
     * The Language ID.
     */
    id: string,

    /**
     * The Language object of RyuseiLight.
     */
    language: _Language;

    /**
     * The Lexer instance.
     */
    lexer: Lexer;

    /**
     * A collection of configs for other languages.
     */
    use?: Record<string, UseConfig>;
  }

  /**
   * The interface for the config of `use` in the language.
   *
   * @since 0.1.0
   */
  interface UseConfig {
    config: LanguageConfig,
    depth: number,
    code: string,
  }

  /**
   * A general predicate function for language configuration.
   *
   * @since 0.1.0
   */
  type ConfigPredicate = ( editor: Editor ) => boolean;
}
