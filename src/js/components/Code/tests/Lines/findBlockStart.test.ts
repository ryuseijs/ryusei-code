import { CODE_BLOCK_COMMENTS, init } from '../../../../test';


describe( 'Lines#findBlockStart()', () => {
  const Editor = init( CODE_BLOCK_COMMENTS );
  const { lines } = Editor.Components.Code;

  test( 'can find a start position of a block.', () => {
    expect( lines.findBlockStart( [ 2, 0 ] ) ).toEqual( [ 0, 0 ] );
    expect( lines.findBlockStart( [ 8, 0 ] ) ).toEqual( [ 5, 0 ] );
  } );

  test( 'can find a start position of a token.', () => {
    lines.sync( 0, 'console.log( 1 );' );
    expect( lines.findBlockStart( [ 0, 2 ] ) ).toEqual( [ 0, 0 ] );
    expect( lines.findBlockStart( [ 0, 10 ] ) ).toEqual( [ 0, 8 ] );
  } );

  test( 'should return `undefined` if nothing is found.', () => {
    expect( lines.findBlockStart( [ 100, 0 ] ) ).toBeUndefined();
  } );
} );
