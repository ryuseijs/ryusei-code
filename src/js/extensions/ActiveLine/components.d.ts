declare module '@ryusei/code' {
  import { ActiveLine } from './ActiveLine';

  interface Options {
    /**
     * Options for the ActiveLine component.
     */
    activeLine?: boolean | ActiveLineOptions,
  }

  interface ActiveLineOptions {}

  interface Extensions {
    ActiveLine: ActiveLine;
  }
}
