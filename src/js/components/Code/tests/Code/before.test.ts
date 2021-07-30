import { CODE_NUMBERS, init } from '../../../../test';


describe( 'Code#before()', () => {
  const Editor = init( CODE_NUMBERS );
  const { Code } = Editor.Components;

  test( 'can return a partial text before the designated row.', () => {
    expect( Code.before( 0 ) ).toBe( '1\n' );
    expect( Code.before( 1 ) ).toBe( '1\n2\n' );
    expect( Code.before( 2 ) ).toBe( '1\n2\n3\n' );
    expect( Code.before( 3 ) ).toBe( '1\n2\n3\n4\n' );
    expect( Code.before( 8 ) ).toBe( CODE_NUMBERS );
  } );

  test( 'should return a whole text if the row index exceeds its size.', () => {
    expect( Code.before( 10 ) ).toBe( CODE_NUMBERS );
    expect( Code.before( Infinity ) ).toBe( CODE_NUMBERS );
  } );

  test( 'should return an empty string if the row is negative.', () => {
    expect( Code.before( -1 ) ).toBe( '' );
    expect( Code.before( -10 ) ).toBe( '' );
  } );
} );
