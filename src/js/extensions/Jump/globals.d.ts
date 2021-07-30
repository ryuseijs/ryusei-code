declare module '@ryusei/code' {
  import { Jump } from './Jump';

  interface Options {
    /**
     * Options for the Jump component.
     */
    jump?: boolean | JumpOptions,
  }

  interface JumpOptions {
    /**
     * Determines whether to display the current location on the toolbar or not.
     */
    hideLocation?: boolean;
  }

  interface Extensions {
    Jump: Jump;
  }
}
