declare module '@ryusei/code' {
  import { Gutter } from './Gutter';

  interface Options {
    /**
     * Options for the Gutter component.
     */
    gutter?: boolean | GutterOptions,
  }

  interface GutterOptions {
    /**
     * Determines whether to select a line when a line number is clicked.
     */
    selectLine?: boolean;

    /**
     * The start number of line numbers.
     */
    start?: number;

    /**
     * Determines whether to set the gutter position to `sticky` or not.
     */
    sticky?: boolean;
  }

  interface Extensions {
    Gutter: Gutter;
  }
}
