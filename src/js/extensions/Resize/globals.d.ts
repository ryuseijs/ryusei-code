declare module '@ryusei/code' {
  import { Resize } from './Resize';

  interface Options {
    /**
     * Options for the Resize component.
     */
    resize?: boolean | ResizeOptions,
  }

  interface ResizeOptions {
    /**
     * Determines whether to enable or disable the horizontal resize.
     */
    horizontal: boolean;

    /**
     * Determines whether to enable or disable the vertical resize.
     */
    vertical: boolean;
  }

  interface Extensions {
    Resize: Resize;
  }
}
