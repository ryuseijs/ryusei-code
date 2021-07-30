import { repeat } from './repeat';


describe( 'repeat', () => {
  test( 'can create a new string containing copies of the provided string without the native method', () => {
    String.prototype.repeat = null;

    expect( repeat( 'abc', 4 ) ).toBe( 'abcabcabcabc' );
    expect( repeat( 'abc', 3 ) ).toBe( 'abcabcabc' );
    expect( repeat( 'abc', 2 ) ).toBe( 'abcabc' );
    expect( repeat( 'abc', 1 ) ).toBe( 'abc' );
    expect( repeat( 'abc', 0 ) ).toBe( '' );
  } );

  test( 'can create a new string containing copies of the provided string.', () => {
    expect( repeat( 'abc', 4 ) ).toBe( 'abcabcabcabc' );
    expect( repeat( 'abc', 3 ) ).toBe( 'abcabcabc' );
    expect( repeat( 'abc', 2 ) ).toBe( 'abcabc' );
    expect( repeat( 'abc', 1 ) ).toBe( 'abc' );
    expect( repeat( 'abc', 0 ) ).toBe( '' );
  } );
} );
