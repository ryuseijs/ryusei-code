import { Options } from '@ryusei/code';
import { I18N } from './i18n';
import { ICONS } from './icons';
import { KEYMAP } from './keymap';


/**
 * Default values for the editor options.
 *
 * @since 0.1.0
 */
export const DEFAULT_OPTIONS: Options = {
  language       : 'javascript',
  placeholder    : 'Enter code here…',
  minWidth       : '200px',
  maxWidth       : '100%',
  minHeight      : '16em',
  maxHeight      : '40em',
  indent         : '  ',
  tabSize        : 2,
  tabIndex       : 0,
  keymap         : KEYMAP,
  maxInitialLines: 200,
  icons          : ICONS,
  i18n           : I18N,
};
