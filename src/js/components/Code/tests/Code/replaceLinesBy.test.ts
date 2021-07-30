import { CODE_TRIPLE_NUMBERS, init } from '../../../../test';


describe( 'Code#replaceLinesBy()', () => {
  const Editor = init( CODE_TRIPLE_NUMBERS );
  const { Code } = Editor.Components;

  test( 'can replace a text by the iteratee function.', () => {
    Code.replaceLinesBy( 0, 1, ( line: string ) => {
      return 'aaa' + line;
    } );

    expect( Editor.value ).toBe( 'aaa123\naaa456\n789' );
  } );

  test( 'should assert if the row index exceeds the text size.', () => {
    expect( () => Code.replaceLinesBy( 99, 0, jest.fn() ) ).toThrowError();
  } );
} );
