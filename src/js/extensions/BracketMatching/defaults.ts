import { BracketMatchingOptions } from '@ryusei/code';


/**
 * The default options for the BracketMatching component.
 *
 * @since 0.1.0
 */
export const DEFAULT_OPTIONS: BracketMatchingOptions = {
  brackets: [
    [ '(', '[', '{', '<' ],
    [ ')', ']', '}', '>' ],
  ],
  maxScanLines: 1000,
};
