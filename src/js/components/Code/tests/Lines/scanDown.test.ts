import { CATEGORY_BRACKET } from '@ryusei/light';
import { CODE_BRACKETS, init } from '../../../../test';


describe( 'Lines#scanDown()', () => {
  const Editor = init( CODE_BRACKETS );
  const { lines } = Editor.Components.Code;

  test( 'can search for a token forwards from the specific position.', () => {
    const result = lines.scanDown( [ 4, 10 ], [ CATEGORY_BRACKET, /}/ ] );

    expect( result.row ).toBe( 4 );
    expect( result.info.code ).toBe( '}' );
    expect( result.info.from ).toBe( 15 );
    expect( result.info.to ).toBe( 16 );
  } );

  test( 'can search for a token forwards with initial depth.', () => {
    const result = lines.scanDown( [ 4, 10 ], [ CATEGORY_BRACKET, /}/ ], undefined, -2 );

    expect( result.row ).toBe( 7 );
    expect( result.info.code ).toBe( '}' );
    expect( result.info.from ).toBe( 15 );
    expect( result.info.to ).toBe( 16 );
  } );

  test( 'can search for a token forwards with matching pairs.', () => {
    // The first `{` will be treated as a counterpart.
    const result = lines.scanDown( [ 1, 0 ], [ CATEGORY_BRACKET, /}/ ], [ CATEGORY_BRACKET, /{/ ] );

    expect( result.row ).toBe( 14 );
    expect( result.info.code ).toBe( '}' );
    expect( result.info.from ).toBe( 0 );
    expect( result.info.to ).toBe( 1 );
  } );

  test( 'can search for a token forwards with depth and a counterpart.', () => {
    const result = lines.scanDown( [ 7, 10 ], [ CATEGORY_BRACKET, /}/ ], [ CATEGORY_BRACKET, /{/ ], -2 );

    expect( result.row ).toBe( 12 );
    expect( result.info.code ).toBe( '}' );
    expect( result.info.from ).toBe( 4 );
    expect( result.info.to ).toBe( 5 );
  } );

  test( 'should give up and return `undefined` when lines to scan exceed the specified limit.', () => {
    const result = lines.scanDown( [ 1, 0 ], [ CATEGORY_BRACKET, /}/ ], [ CATEGORY_BRACKET, /{/ ], 0, 3 );
    expect( result ).toBeUndefined();
  } );
} );
