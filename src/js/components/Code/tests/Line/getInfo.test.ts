import { TOKEN_IDENTIFIER, TOKEN_NUMBER } from '../../../../test';
import { Line } from '../../Line';


describe( 'Line#getInfo()', () => {
  test( 'can return a TokenInfo object at the specified index.', () => {
    const line = new Line( {} );

    line.set( [ TOKEN_IDENTIFIER, TOKEN_NUMBER ] );

    expect( line.getInfo( 0 ) ).toStrictEqual( TOKEN_IDENTIFIER[ 2 ] );
    expect( line.getInfo( 1 ) ).toStrictEqual( TOKEN_NUMBER[ 2 ] );
  } );
} );
