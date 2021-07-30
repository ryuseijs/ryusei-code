import { CODE_NUMBERS, init } from '../../../../test';


describe( 'Text#sliceLines()', () => {
  const Editor = init();
  const { Code } = Editor.Components;

  test( 'can slice lines between `startRow` and `endRow` indices.', () => {
    Editor.value = CODE_NUMBERS;

    expect( Code.sliceLines( 0, 0 ) ).toBe( '1\n' );
    expect( Code.sliceLines( 0, 1 ) ).toBe( '1\n2\n' );
    expect( Code.sliceLines( 0, 8 ) ).toBe( CODE_NUMBERS );
    expect( Code.sliceLines( 1, 1 ) ).toBe( '2\n' );
    expect( Code.sliceLines( 1, 2 ) ).toBe( '2\n3\n' );
    expect( Code.sliceLines( 1, 3 ) ).toBe( '2\n3\n4\n' );
    expect( Code.sliceLines( 4, 5 ) ).toBe( '5\n6\n' );
  } );

  test( 'should return lines until the end if the `endRow` exceeds the size.', () => {
    Editor.value = CODE_NUMBERS;

    expect( Code.sliceLines( 0, 99 ) ).toBe( CODE_NUMBERS );
  } );

  test( 'should return an empty string if the `endRow` is less than the `startRow`.', () => {
    Editor.value = CODE_NUMBERS;

    expect( Code.sliceLines( 2, 0 ) ).toBe( '' );
  } );
} );
