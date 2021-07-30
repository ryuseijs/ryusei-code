import { CODE_BLOCK_COMMENTS, init } from '../../../../test';


describe( 'Lines#findBlockEnd()', () => {
  const Editor = init( CODE_BLOCK_COMMENTS );
  const { lines } = Editor.Components.Code;

  test( 'can find an end position of a block.', () => {
    expect( lines.findBlockEnd( [ 2, 0 ] ) ).toEqual( [ 4, 2 ] );
    expect( lines.findBlockEnd( [ 8, 0 ] ) ).toEqual( [ 9, 2 ] );
  } );

  test( 'can find an end position of a token.', () => {
    lines.sync( 0, 'console.log( 1 );' );
    expect( lines.findBlockEnd( [ 0, 2 ] ) ).toEqual( [ 0, 7 ] );
    expect( lines.findBlockEnd( [ 0, 10 ] ) ).toEqual( [ 0, 11 ] );
  } );

  test( 'should return `undefined` if nothing is found.', () => {
    expect( lines.findBlockEnd( [ 100, 0 ] ) ).toBeUndefined();
  } );
} );
