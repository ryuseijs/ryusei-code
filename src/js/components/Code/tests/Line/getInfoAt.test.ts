import { TOKEN_IDENTIFIER } from '../../../../test';
import { Line } from '../../Line';


describe( 'Line#getInfoAt()', () => {
  test( 'can return a TokenInfo object at the specified col index.', () => {
    const line = new Line( {} );

    line.set( [ TOKEN_IDENTIFIER ] );

    expect( line.getInfoAt( 0 ) ).toStrictEqual( TOKEN_IDENTIFIER[ 2 ] );
    expect( line.getInfoAt( 1 ) ).toStrictEqual( TOKEN_IDENTIFIER[ 2 ] );
    expect( line.getInfoAt( 2 ) ).toStrictEqual( TOKEN_IDENTIFIER[ 2 ] );
    expect( line.getInfoAt( 6 ) ).toStrictEqual( TOKEN_IDENTIFIER[ 2 ] );
  } );

  test( 'should return undefined there is no TokenInfo at the index.', () => {
    const line = new Line( {} );

    line.set( [ TOKEN_IDENTIFIER ] );
    expect( line.getInfoAt( 10 ) ).toBeUndefined();
  } );
} );
