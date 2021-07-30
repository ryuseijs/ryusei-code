import { CATEGORY_BRACKET } from '@ryusei/light';
import { CODE_BRACKETS, init } from '../../../../test';


describe( 'Lines#scanUp()', () => {
  const Editor = init( CODE_BRACKETS );
  const { lines } = Editor.Components.Code;

  test( 'can search for a token backwards from the specific position.', () => {
    const result = lines.scanUp( [ 4, 10 ], [ CATEGORY_BRACKET, /{/ ] );

    expect( result.row ).toBe( 4 );
    expect( result.info.code ).toBe( '{' );
    expect( result.info.from ).toBe( 8 );
    expect( result.info.to ).toBe( 9 );
  } );

  test( 'can search for a token backwards with initial depth.', () => {
    const result = lines.scanUp( [ 4, 10 ], [ CATEGORY_BRACKET, /{/ ], undefined, -2 );

    expect( result.row ).toBe( 2 );
    expect( result.info.code ).toBe( '{' );
    expect( result.info.from ).toBe( 4 );
    expect( result.info.to ).toBe( 5 );
  } );

  test( 'can search for a token backwards with matching pairs.', () => {
    const result = lines.scanUp( [ 13, 0 ], [ CATEGORY_BRACKET, /{/ ], [ CATEGORY_BRACKET, /}/ ] );

    expect( result.row ).toBe( 1 );
    expect( result.info.code ).toBe( '{' );
    expect( result.info.from ).toBe( 2 );
    expect( result.info.to ).toBe( 3 );
  } );

  test( 'can search for a token backwards with depth and a counterpart.', () => {
    const result = lines.scanUp( [ 7, 10 ], [ CATEGORY_BRACKET, /{/ ], [ CATEGORY_BRACKET, /}/ ], -2 );

    expect( result.row ).toBe( 2 );
    expect( result.info.code ).toBe( '{' );
    expect( result.info.from ).toBe( 4 );
    expect( result.info.to ).toBe( 5 );
  } );

  test( 'should give up and return `undefined` when lines to scan exceed the specified limit.', () => {
    const result = lines.scanUp( [ 13, 0 ], [ CATEGORY_BRACKET, /{/ ], [ CATEGORY_BRACKET, /}/ ], 0, 3 );
    expect( result ).toBeUndefined();
  } );
} );
