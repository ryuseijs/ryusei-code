declare module '@ryusei/code' {
  import { Editor } from '../../core/Editor/Editor';
  import { AutoClose } from './AutoClose';

  interface Options {
    /**
     * Options for the Completion component.
     */
    completion?: boolean | AutoCloseOptions,
  }

  interface AutoCloseOptions {
  }

  interface Extensions {
    AutoClose: AutoClose;
  }

  interface LanguageConfig {
    autoClose?: AutoCloseConfig[];
  }

  /**
   * The tuple for each config of the AutoClose.
   *
   * @since 0.1.0
   */
  type AutoCloseConfig = [
    string,
    string | ( ( editor: Editor ) => string ),
    AutoCloseConfigData?,
  ];

  /**
   * A predicate function used in the AutoClose configuration.
   *
   * @since 0.1.0
   */
  type AutoClosePredicate = ( editor: Editor, config: AutoCloseConfig ) => boolean;

  /**
   * The interface for the additional config data.
   *
   * @since 0.1.0
   */
  interface AutoCloseConfigData {
    close?: ( string | string[] | boolean | AutoClosePredicate );
    skip?: ( string | string[] | boolean | AutoClosePredicate );
    remove?: ( string | string[] | boolean | AutoClosePredicate );
    offset?: number;
  }
}
