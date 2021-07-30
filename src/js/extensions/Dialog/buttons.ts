import { UIButtonSettings } from '@ryusei/code';
import { Dialog } from './Dialog';


/**
 * A collection of settings for general UI buttons.
 *
 * @since 0.1.0
 */
export const GENERAL_UI_BUTTONS: Record<string, UIButtonSettings<Dialog>> = {
  confirm: {
    id   : 'confirm',
    click: 'confirm',
  },
  cancel : {
    id      : 'cancel',
    click   : 'hide',
    tabindex: 0,
  },
};
