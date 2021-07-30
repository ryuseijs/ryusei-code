import { UIButtonSettings } from '@ryusei/code';
import { Search } from './Search';


/**
 * Buttons settings for the search interface.
 */
export const SEARCH_BUTTONS: UIButtonSettings<Search>[] = [
  {
    id      : 'matchCase',
    icon    : 'matchCase',
    click   : 'toggleMatchCase',
    checkbox: true,
  },
  {
    id      : 'wholeWord',
    icon    : 'word',
    click   : 'toggleWholeWord',
    checkbox: true,
  },
  {
    id      : 'regexp',
    icon    : 'regexp',
    click   : 'toggleRegExp',
    checkbox: true,
  },
  {
    id   : 'prevMatch',
    icon : 'arrowUp',
    click: 'prev',
  },
  {
    id   : 'nextMatch',
    icon : 'arrowDown',
    click: 'next',
  },
];

/**
 * Buttons settings for the replace interface.
 */
export const REPLACE_BUTTONS: UIButtonSettings<Search>[] = [
  {
    id   : 'replace',
    click: 'replace',
  },
  {
    id   : 'replaceAll',
    click: 'replaceAll',
  },
];
