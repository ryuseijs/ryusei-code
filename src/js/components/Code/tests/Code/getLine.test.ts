import { CODE_NUMBERS, init } from '../../../../test';


describe( 'Code#getLine()', () => {
  const Editor = init( CODE_NUMBERS );
  const { Code } = Editor.Components;

  test( 'can slice a line at the provided row index.', () => {
    expect( Code.getLine( 0 ) ).toBe( '1\n' );
    expect( Code.getLine( 2 ) ).toBe( '3\n' );
    expect( Code.getLine( 8 ) ).toBe( '9' );
  } );

  test( 'should return an empty string if the row index exceeds the size.', () => {
    expect( Code.getLine( 99 ) ).toBe( '' );
  } );

  test( 'should return an empty string if the row index is negative.', () => {
    expect( Code.getLine( -1 ) ).toBe( '' );
  } );
} );
