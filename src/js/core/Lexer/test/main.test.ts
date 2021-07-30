import {
  CATEGORY_BRACKET,
  CATEGORY_COMMENT,
  CATEGORY_DELIMITER,
  CATEGORY_FUNCTION,
  CATEGORY_IDENTIFIER,
  CATEGORY_NUMBER,
  CATEGORY_SPACE,
  javascript,
} from '@ryusei/light';
import { CLASS_TOKEN } from '../../../constants/classes';
import { PROJECT_CODE_SHORT } from '../../../constants/project';
import { Lexer } from '../Lexer';


describe( 'Lexer#run()', () => {
  test( 'can tokenize the provided code.', () => {
    const lexer = new Lexer( javascript() );
    const code  = 'console.log( 1 );';

    const lines  = lexer.run( code );
    const tokens = lines[ 0 ];

    expect( tokens[ 0 ][ 0 ] ).toBe( CATEGORY_IDENTIFIER );
    expect( tokens[ 1 ][ 0 ] ).toBe( CATEGORY_DELIMITER );
    expect( tokens[ 2 ][ 0 ] ).toBe( CATEGORY_FUNCTION );
    expect( tokens[ 3 ][ 0 ] ).toBe( CATEGORY_BRACKET );
    expect( tokens[ 4 ][ 0 ] ).toBe( CATEGORY_SPACE );
    expect( tokens[ 5 ][ 0 ] ).toBe( CATEGORY_NUMBER );
    expect( tokens[ 6 ][ 0 ] ).toBe( CATEGORY_SPACE );
    expect( tokens[ 7 ][ 0 ] ).toBe( CATEGORY_BRACKET );
    expect( tokens[ 1 ][ 0 ] ).toBe( CATEGORY_DELIMITER );
  } );

  test( 'can set TokeInfo to the 3rd parameter of each token.', () => {
    const lexer  = new Lexer( javascript() );
    const code   = 'console.log( 1 );';
    const lines  = lexer.run( code );
    const tokens = lines[ 0 ];

    expect( tokens[ 0 ][ 2 ] ).toStrictEqual( {
      category: CATEGORY_IDENTIFIER,
      code    : 'console',
      html    : `<code class="${ CLASS_TOKEN } ${ PROJECT_CODE_SHORT }__${ CATEGORY_IDENTIFIER }">console</code>`,
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
  } );

  test( 'can set TokeInfo with multiline data.', () => {
    const lexer  = new Lexer( javascript() );
    const code   = '/* comment1\ncomment2\ncomment3 */';
    const lines  = lexer.run( code );

    expect( lines.length ).toBe( 3 );

    expect( lines[ 0 ][ 0 ][ 2 ] ).toStrictEqual( {
      category: CATEGORY_COMMENT,
      code    : '/* comment1',
      html    : `<code class="${ CLASS_TOKEN } ${ PROJECT_CODE_SHORT }__${ CATEGORY_COMMENT }">/* comment1</code>`,
      from    : 0,
      to      : 11,
      index   : 0,
      state   : '#main',
      depth   : 0,
      head    : true,
      tail    : false,
      distance: 0,
      language: 'javascript',
      split   : true,
    } );

    expect( lines[ 1 ][ 0 ][ 2 ] ).toStrictEqual( {
      category: CATEGORY_COMMENT,
      code    : 'comment2',
      html    : `<code class="${ CLASS_TOKEN } ${ PROJECT_CODE_SHORT }__${ CATEGORY_COMMENT }">comment2</code>`,
      from    : 0,
      to      : 8,
      index   : 0,
      state   : '#main',
      depth   : 0,
      head    : false,
      tail    : false,
      distance: 1,
      language: 'javascript',
      split   : true,
    } );

    expect( lines[ 2 ][ 0 ][ 2 ] ).toStrictEqual( {
      category: CATEGORY_COMMENT,
      code    : 'comment3 */',
      html    : `<code class="${ CLASS_TOKEN } ${ PROJECT_CODE_SHORT }__${ CATEGORY_COMMENT }">comment3 */</code>`,
      from    : 0,
      to      : 11,
      index   : 0,
      state   : '#main',
      depth   : 0,
      head    : false,
      tail    : true,
      distance: 2,
      language: 'javascript',
      split   : true,
    } );
  } );
} );
