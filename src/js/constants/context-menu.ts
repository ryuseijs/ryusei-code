import { ContextMenuButtonSettings } from '@ryusei/code';


/**
 * The ID for the main context menu.
 */
export const MAIN_CONTEXT_MENU_ID = 'main';

/**
 * The collection of "edit" items for the context menu.
 *
 * @since 0.1.0
 */
export const CONTEXT_MENU_EDIT: ContextMenuButtonSettings[] = [
  {
    id      : 'copy',
    shortcut: [ 'C', true ],
  },
  {
    id               : 'cut',
    shortcut         : [ 'X', true ],
    disableOnReadOnly: true,
  },
  {
    id               : 'paste',
    shortcut         : [ 'V', true ],
    disableOnReadOnly: true,
  },
];

/**
 * The collection of "selection" items for the context menu.
 *
 * @since 0.1.0
 */
export const CONTEXT_MENU_SELECTION: ContextMenuButtonSettings[] = [
  {
    id      : 'selectAll',
    shortcut: [ 'A', true ],
  },
];
