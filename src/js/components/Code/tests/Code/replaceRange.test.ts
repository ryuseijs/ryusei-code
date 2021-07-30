import { CODE_TRIPLE_NUMBERS, init } from '../../../../test';


describe( 'Code#replaceRange()', () => {
  const Editor = init();
  const { Code } = Editor.Components;

  test( 'can replace a text by the provided replacement.', () => {
    Editor.value = CODE_TRIPLE_NUMBERS;
    Code.replaceRange( [ 0, 0 ], [ 0, 1 ], 'a' );

    expect( Editor.value ).toBe( 'a23\n456\n789' );

    Editor.value = CODE_TRIPLE_NUMBERS;
    Code.replaceRange( [ 0, 0 ], [ 1, 1 ], 'a' );

    expect( Editor.value ).toBe( 'a56\n789' );

    Editor.value = CODE_TRIPLE_NUMBERS;
    Code.replaceRange( [ 0, 1 ], [ 2, 1 ], 'a' );

    expect( Editor.value ).toBe( '1a89' );
  } );

  test( 'should do nothing if the end position is greater than the start.', () => {
    Editor.value = CODE_TRIPLE_NUMBERS;
    Code.replaceRange( [ 1, 0 ], [ 0, 0 ], 'a' );

    expect( Editor.value ).toBe( CODE_TRIPLE_NUMBERS );
  } );

  test( 'should assert if the row index exceeds the text size.', () => {
    expect( () => Code.replaceRange( [ 99, 0 ], [ 0, 0 ], 'a' ) ).toThrowError();
  } );
} );
