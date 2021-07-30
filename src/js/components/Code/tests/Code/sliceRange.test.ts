import { CODE_TRIPLE_NUMBERS, init } from '../../../../test';


describe( 'Code#sliceRange()', () => {
  const Editor = init();
  const { Code } = Editor.Components;

  test( 'can slice a text by start and end positions.', () => {
    Editor.value = CODE_TRIPLE_NUMBERS;

    expect( Code.sliceRange( [ 0, 0 ], [ 0, 1 ] ) ).toBe( '1' );
    expect( Code.sliceRange( [ 0, 0 ], [ 0, 2 ] ) ).toBe( '12' );
    expect( Code.sliceRange( [ 0, 0 ], [ 0, 3 ] ) ).toBe( '123' );
    expect( Code.sliceRange( [ 0, 0 ], [ 0, 4 ] ) ).toBe( '123\n' );

    expect( Code.sliceRange( [ 0, 0 ], [ 1, 0 ] ) ).toBe( '123\n' );
    expect( Code.sliceRange( [ 0, 0 ], [ 1, 1 ] ) ).toBe( '123\n4' );
    expect( Code.sliceRange( [ 0, 0 ], [ 1, 2 ] ) ).toBe( '123\n45' );

    expect( Code.sliceRange( [ 1, 0 ], [ 1, 1 ] ) ).toBe( '4' );
    expect( Code.sliceRange( [ 1, 0 ], [ 2, 2 ] ) ).toBe( '456\n78' );
  } );

  test( 'should return an empty string if the end position is greater than the start or equal.', () => {
    Editor.value = CODE_TRIPLE_NUMBERS;

    expect( Code.sliceRange( [ 1, 0 ], [ 0, 0 ] ) ).toBe( '' );
    expect( Code.sliceRange( [ 1, 0 ], [ 1, 0 ] ) ).toBe( '' );
  } );

  test( 'should assert if the row index exceeds the text size.', () => {
    Editor.value = CODE_TRIPLE_NUMBERS;
    expect( () => Code.sliceRange( [ 99, 0 ], [ 0, 0 ] ) ).toThrowError();
  } );
} );
