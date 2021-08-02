declare module '@ryusei/code' {
  import { KEYMAP } from '../constants/keymap';
  import { KeyMatcher } from './definition/general';

  /**
   * The interface for options.
   */
  interface Options {
    /**
     * The editor ID.
     */
    id?: string;

    /**
     * A language ID.
     */
    language?: string;

    /**
     * Classes for the root element.
     */
    rootClasses?: string | string[]

    /**
     * A placeholder to display when the editor is empty.
     */
    placeholder?: string;

    /**
     * Determines the width of the editor.
     */
    width?: number | string;

    /**
     * Determines the height of the editor.
     */
    height?: number | string;

    /**
     * Determines the minimum width of the editor.
     */
    minWidth?: number | string;

    /**
     * Determines the maximum width of the editor.
     */
    maxWidth?: number | string;

    /**
     * Determines the minimum height of the editor
     */
    minHeight?: number | string;

    /**
     * Determines the maximum height of the editor.
     */
    maxHeight?: number | string;

    /**
     * Overwrites the CSS font family.
     */
    monospaceFont?: string;

    /**
     * Overwrites the CSS font size.
     */
    fontSize?: number | string;

    /**
     * Determines the line height as number.
     */
    lineHeight?: number;

    /**
     * The string for indents.
     */
    indent?: string;

    /**
     * The tab size. This option does not work for IE.
     */
    tabSize?: number;

    /**
     * The tab index of the editor. This should be 0 for accessibility.
     */
    tabIndex?: number;

    /**
     * Sets focus on the editor after initialization.
     */
    autofocus?: boolean;

    /**
     * Makes the editor read-only.
     */
    readOnly?: boolean;

    /**
     * The maximum number of lines rendered by `html()`.
     * IE crashes when attempting to render around 1000 lines at the same time.
     */
    maxInitialLines?: number;

    /**
     * The map for binding actions to keyboards.
     */
    keymap?: Record<keyof typeof KEYMAP | string, KeyMatcher | KeyMatcher[] | null | false>;

    /**
     * The collection of icon settings.
     */
    icons?: Record<string, IconSettings>;

    /**
     * The collection of i18n strings.
     */
    i18n?: Record<string, string>;
  }
}
