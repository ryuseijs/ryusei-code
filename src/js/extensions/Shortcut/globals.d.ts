declare module '@ryusei/code' {
  import { Shortcut } from './Shortcut';

  interface Options {
    /**
     * Options for the Shortcut component.
     */
    shortcut?: boolean | ShortcutOptions,
  }

  interface ShortcutOptions {
  }

  interface Extensions {
    Shortcut: Shortcut;
  }
}
