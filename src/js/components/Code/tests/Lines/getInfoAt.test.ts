import { CLASS_TOKEN } from '../../../../constants/classes';
import { init } from '../../../../test';


describe( 'Lines#getInfoAt()', () => {
  const Editor = init( 'console.log( 1 );\nconst a = 1' );
  const { lines } = Editor.Components.Code;

  test( 'can return a TokenInfo object at the specified position.', () => {
    expect( lines.getInfoAt( [ 0, 0 ] ) ).toStrictEqual( {
      category: 'identifier',
      code    : 'console',
      html    : `<code class="${ CLASS_TOKEN } rc__identifier">console</code>`,
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
    } );

    expect( lines.getInfoAt( [ 0, 8 ] ) ).toStrictEqual( {
      category: 'function',
      code    : 'log',
      html    : `<code class="${ CLASS_TOKEN } rc__function">log</code>`,
      from    : 8,
      to      : 11,
      index   : 2,
      state   : '#main',
      depth   : 0,
      head    : false,
      tail    : false,
      distance: 0,
      language: 'javascript',
      split   : false,
    } );

    expect( lines.getInfoAt( [ 1, 0 ] ) ).toStrictEqual( {
      category: 'keyword',
      code    : 'const',
      html    : `<code class="${ CLASS_TOKEN } rc__keyword">const</code>`,
      from    : 0,
      to      : 5,
      index   : 0,
      state   : '#main',
      depth   : 0,
      head    : false,
      tail    : false,
      distance: 0,
      language: 'javascript',
      split   : false,
    } );
  } );

  test( 'should return an empty string if the min indent is not found.', () => {
    expect( lines.getInfoAt( [ 10, 0 ] ) ).toBeUndefined();
  } );
} );
