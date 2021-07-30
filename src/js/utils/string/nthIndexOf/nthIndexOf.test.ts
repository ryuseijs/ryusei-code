import { nthIndexOf } from './nthIndexOf';


describe( 'nthIndexOf', () => {
  test( 'can search for the nth occurrence of the search string and return the index.', () => {
    expect( nthIndexOf( 'aaaaa', 'a', 1 ) ).toBe( 0 );
    expect( nthIndexOf( 'aaaaa', 'a', 2 ) ).toBe( 1 );
    expect( nthIndexOf( 'aaaaa', 'a', 3 ) ).toBe( 2 );
    expect( nthIndexOf( 'aaaaa', 'a', 4 ) ).toBe( 3 );
    expect( nthIndexOf( 'aaaaa', 'a', 5 ) ).toBe( 4 );

    expect( nthIndexOf( 'ababab', 'b', 1 ) ).toBe( 1 );
    expect( nthIndexOf( 'ababab', 'b', 2 ) ).toBe( 3 );
    expect( nthIndexOf( 'ababab', 'b', 3 ) ).toBe( 5 );

    expect( nthIndexOf( 'ababab', 'ab', 1 ) ).toBe( 0 );
    expect( nthIndexOf( 'ababab', 'ab', 2 ) ).toBe( 2 );
    expect( nthIndexOf( 'ababab', 'ab', 3 ) ).toBe( 4 );

    expect( nthIndexOf( 'The quick brown fox jumps over the lazy dog', 'o', 3 ) ).toBe( 26 );
  } );

  test( 'can accept the position to start searching from.', () => {
    expect( nthIndexOf( 'ababab', 'ab', 1, 0 ) ).toBe( 0 );
    expect( nthIndexOf( 'ababab', 'ab', 1, 1 ) ).toBe( 2 );
    expect( nthIndexOf( 'ababab', 'ab', 1, 2 ) ).toBe( 2 );
    expect( nthIndexOf( 'ababab', 'ab', 1, 3 ) ).toBe( 4 );
    expect( nthIndexOf( 'ababab', 'ab', 1, 4 ) ).toBe( 4 );
    expect( nthIndexOf( 'ababab', 'ab', 1, 5 ) ).toBe( -1 );

    expect( nthIndexOf( 'ababab', 'ab', 2, 0 ) ).toBe( 2 );
    expect( nthIndexOf( 'ababab', 'ab', 2, 1 ) ).toBe( 4 );
    expect( nthIndexOf( 'ababab', 'ab', 2, 2 ) ).toBe( 4 );
    expect( nthIndexOf( 'ababab', 'ab', 2, 3 ) ).toBe( -1 );
    expect( nthIndexOf( 'ababab', 'ab', 2, 4 ) ).toBe( -1 );
    expect( nthIndexOf( 'ababab', 'ab', 2, 5 ) ).toBe( -1 );

    expect( nthIndexOf( 'ababab', 'ab', 3, 0 ) ).toBe( 4 );
    expect( nthIndexOf( 'ababab', 'ab', 3, 1 ) ).toBe( -1 );
    expect( nthIndexOf( 'ababab', 'ab', 3, 2 ) ).toBe( -1 );
  } );

  test( 'should return -1 if the nth occurrence is not found.', () => {
    expect( nthIndexOf( 'aaaaa', 'a', 6 ) ).toBe( -1 );
    expect( nthIndexOf( 'aaaaa', 'a', 100 ) ).toBe( -1 );

    expect( nthIndexOf( 'ababab', 'b', 4 ) ).toBe( -1 );
    expect( nthIndexOf( 'ababab', 'b', 100 ) ).toBe( -1 );

    expect( nthIndexOf( 'ababab', 'ab', 4 ) ).toBe( -1 );
    expect( nthIndexOf( 'ababab', 'ab', 100 ) ).toBe( -1 );
  } );

  test( 'should always return -1 when the input string is empty, excepting that a search target is also empty.', () => {
    expect( nthIndexOf( '', 'a', 0 ) ).toBe( -1 );
    expect( nthIndexOf( '', 'a', 1 ) ).toBe( -1 );
    expect( nthIndexOf( '', 'a', 2 ) ).toBe( -1 );

    // An empty string is always found.
    expect( nthIndexOf( '', '', 1 ) ).toBe( 0 );
    expect( nthIndexOf( '', '', 2 ) ).toBe( 0 );
    expect( nthIndexOf( '', '', 3 ) ).toBe( 0 );
  } );

  test( 'should always find an empty string like the native `indexOf()`.', () => {
    expect( nthIndexOf( 'aaaaa', '', 0 ) ).toBe( -1 );
    expect( nthIndexOf( 'aaaaa', '', 1 ) ).toBe( 0 );
    expect( nthIndexOf( 'aaaaa', '', 2 ) ).toBe( 1 );
    expect( nthIndexOf( 'aaaaa', '', 3 ) ).toBe( 2 );
    expect( nthIndexOf( 'aaaaa', '', 4 ) ).toBe( 3 );
    expect( nthIndexOf( 'aaaaa', '', 5 ) ).toBe( 4 );

    // Always returns the length of the string.
    expect( nthIndexOf( 'aaaaa', '', 6 ) ).toBe( 5 );
    expect( nthIndexOf( 'aaaaa', '', 10 ) ).toBe( 5 );
  } );

  test( 'should always return -1 if the `from` number is greater than the string length.', () => {
    expect( nthIndexOf( 'ababab', 'ab', 1, 6 ) ).toBe( -1 );
    expect( nthIndexOf( 'ababab', 'ab', 1, 7 ) ).toBe( -1 );
  } );
} );
