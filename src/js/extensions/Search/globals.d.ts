declare module '@ryusei/code' {
  import { Search } from './Search';

  interface Options {
    /**
     * Options for the Search component.
     */
    search?: boolean | SearchOptions,
  }

  interface SearchOptions {
    /**
     * Buttons to remove from the search toolbar.
     * Accepted values are:
     * - 'matchCase'
     * - 'wholeWord'
     * - 'regexp'
     * - 'prevMatch'
     * - 'nextMatch'
     * - 'replace'
     * - 'replaceAll'
     */
    hideButtons?: string[];

    /**
     * Determines whether to display match count or not.
     */
    hideMatchCount?: boolean;

    /**
     * Enables/disables the "replace" toolbar.
     */
    hideReplace?: boolean;
  }

  interface Extensions {
    Search: Search;
  }
}
