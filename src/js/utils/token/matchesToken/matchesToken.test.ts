import { Token } from '@ryusei/code';
import { matchesToken } from './matchesToken';


describe( 'matchesToken', () => {
  test( 'can test if the token matches the provided matcher without depth.', () => {
    const token: Token = [ 'tag', 'div', null ];
    expect( matchesToken( token, [ 'tag', /div/ ] ) ).toBe( true );
    expect( matchesToken( token, [ 'tag', /^d/ ] ) ).toBe( true );
    expect( matchesToken( token, [ 'tag', /span/ ] ) ).toBe( false );
  } );

  test( 'can test if the token matches the provided matcher with a state.', () => {
    const info =   {
      category: 'tag',
      code    : 'div',
      html    : '',
      from    : 0,
      to      : 3,
      index   : 0,
      state   : '#tag',
      depth   : 0,
      head    : false,
      tail    : false,
      distance: 0,
      language: 'html',
      split   : false,
    };

    const token: Token = [ 'tag', 'div', info ];
    expect( matchesToken( token, [ 'tag', /div/, '#tag' ] ) ).toBe( true );
    expect( matchesToken( token, [ 'tag', /div/, '#main' ] ) ).toBe( false );
  } );

  test( 'should return true if the category matches the matcher and the regex is not provided.', () => {
    const token: Token = [ 'tag', 'div', null ];
    expect( matchesToken( token, [ 'tag' ] ) ).toBe( true );
  } );
} );
