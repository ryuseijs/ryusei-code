import { count } from './count';


describe( 'count', () => {
  test( 'can count search string occurrence in a string.', () => {
    expect( count( 'abcabca', 'a' ) ).toBe( 3 );
    expect( count( 'abcabca', 'ab' ) ).toBe( 2 );
    expect( count( 'abcabca', 'cab' ) ).toBe( 1 );
  } );

  test( 'can count search string occurrence from the specified index.', () => {
    expect( count( 'abcabca', 'a', 1 ) ).toBe( 2 );
    expect( count( 'abcabca', 'a', 3 ) ).toBe( 2 );
    expect( count( 'abcabca', 'a', 4 ) ).toBe( 1 );
  } );

  test( 'can count search string occurrence to the specified index.', () => {
    expect( count( 'abcabca', 'a', 0, 1 ) ).toBe( 1 );
    expect( count( 'abcabca', 'a', 0, 3 ) ).toBe( 1 );
    expect( count( 'abcabca', 'a', 0, 4 ) ).toBe( 2 );
  } );

  test( 'should return 0 for no occurrence.', () => {
    expect( count( 'abcabca', 'x' ) ).toBe( 0 );
  } );
} );
