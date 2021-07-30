declare module '@ryusei/code' {
  import { Indentation } from './Indentation';

  interface Options {
    /**
     * Options for the Indentation component.
     */
    indentation?: boolean | IndentationOptions,
  }

  interface IndentationOptions {
    /**
     * The timing when the tab indentation is activated.
     *
     * - pointerdown or undefined: activates it when the editor is clicked
     * - load: activates it when the editor is loaded
     *
     * To satisfy the "No Keyboard Trap" criterion, this option should be `pointerdown`.
     *
     * @link https://www.w3.org/TR/WCAG21/#no-keyboard-trap
     */
    activation?: string;

    /**
     * Determines whether to display the help dialog that notifies how to toggle the tab mode.
     * The dialog will not be shown when the `activation` option is `load`.
     */
    help?: boolean;

    /**
     * Determines whether to insert additional indents into a newline inside brackets.
     */
    deepIndent?: boolean;
  }

  interface Extensions {
    Indentation: Indentation;
  }

  interface LanguageConfig {
    /**
     * A collection of configs for indentation.
     */
    indent?: IndentConfig[];
  }

  /**
   * The tuple for each config of the indentation.
   *
   * @since 0.1.0
   */
  type IndentConfig = [
    RegExp | ConfigPredicate,
    RegExp | ConfigPredicate,
    ( string[] | ConfigPredicate )?
  ];
}
