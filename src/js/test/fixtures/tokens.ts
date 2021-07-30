import { Token } from '@ryusei/code';


/**
 * The identifier token.
 *
 * @since 0.1.0
 */
export const TOKEN_IDENTIFIER: Token = [
  'identifier',
  'console',
  {
    category: 'identifier',
    code    : 'console',
    html    : '<code class="ryuseicode__token rc__identifier">console</code>',
    from    : 0,
    to      : 7,
    index   : 0,
    state   : '#main',
    depth   : 0,
    head    : false,
    tail    : false,
    distance: 0,
    language: 'javascript',
    split   : false,
  },
];

/**
 * The number token.
 *
 * @since 0.1.0
 */
export const TOKEN_NUMBER: Token = [
  'number',
  '1',
  {
    category: 'number',
    code    : '1',
    html    : '<code class="ryuseicode__token rc__number">1</code>',
    from    : 0,
    to      : 1,
    index   : 0,
    state   : '#main',
    depth   : 0,
    head    : false,
    tail    : false,
    distance: 0,
    language: 'javascript',
    split   : false,
  },
];

/**
 * The line break token.
 *
 * @since 0.1.0
 */
export const TOKEN_LINEBREAK: Token = [
  'lb',
  '\n',
  {
    category: 'lb',
    code    : '1',
    html    : '<code class="ryuseicode__token rc__lb">\n</code>',
    from    : 0,
    to      : 1,
    index   : 0,
    state   : '#main',
    depth   : 0,
    head    : false,
    tail    : false,
    distance: 0,
    language: 'javascript',
    split   : false,
  },
];

/**
 * The space token.
 *
 * @since 0.1.0
 */
export const TOKEN_SPACE: Token = [
  'space',
  '    ',
  {
    category: 'space',
    code    : '1',
    html    : '<code class="ryuseicode__token rc__space">    </code>',
    from    : 0,
    to      : 1,
    index   : 0,
    state   : '#main',
    depth   : 0,
    head    : false,
    tail    : false,
    distance: 0,
    language: 'javascript',
    split   : false,
  },
];
