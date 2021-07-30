declare module '@ryusei/code' {
  import { BracketMatching } from './BracketMatching';

  interface Options {
    /**
     * Options for the BracketMatching component.
     */
    bracketMatching?: boolean | BracketMatchingOptions,
  }

  export interface BracketMatchingOptions {
    /**
     * Paris of brackets, such as [ [ '(', '{' ], [ ')', '}' ] ],
     */
    brackets?: [ string[], string[] ];

    /**
     * Limits the number of lines to match brackets.
     */
    maxScanLines?: number,
  }

  interface Extensions {
    BracketMatching: BracketMatching;
  }
}
