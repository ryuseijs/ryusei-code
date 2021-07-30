import { CODE_NUMBERS, init } from '../../../../test';


describe( 'Code#after()', () => {
  const Editor = init( CODE_NUMBERS );
  const { Code } = Editor.Components;

  test( 'can return a partial text after the designated row.', () => {
    expect( Code.after( 0 ) ).toBe( CODE_NUMBERS );
    expect( Code.after( 1 ) ).toBe( '2\n3\n4\n5\n6\n7\n8\n9' );
    expect( Code.after( 2 ) ).toBe( '3\n4\n5\n6\n7\n8\n9' );
    expect( Code.after( 8 ) ).toBe( '9' );
  } );

  test( 'should return an empty string if the row index exceeds its size.', () => {
    expect( Code.after( 10 ) ).toBe( '' );
    expect( Code.after( Infinity ) ).toBe( '' );
  } );

  test( 'should return a whole text if the row is 0 or negative.', () => {
    expect( Code.after( 0 ) ).toBe( CODE_NUMBERS );
    expect( Code.after( -10 ) ).toBe( CODE_NUMBERS );
  } );
} );
