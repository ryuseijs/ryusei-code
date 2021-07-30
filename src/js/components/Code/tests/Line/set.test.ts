import { TOKEN_IDENTIFIER, TOKEN_NUMBER } from '../../../../test';
import { Line } from '../../Line';


describe( 'Line#set()', () => {
  test( 'can set tokens.', () => {
    const line = new Line( {} );
    line.set( [ TOKEN_IDENTIFIER ] );
    expect( line.tokens ).toStrictEqual( [ TOKEN_IDENTIFIER ] );
  } );

  test( 'should not set tokens if there is newer tokens.', () => {
    const line = new Line( {} );

    line.set( [ TOKEN_IDENTIFIER ], 100 );

    // Attempts to set an old token.
    line.set( [ TOKEN_NUMBER ], 1 );

    expect( line.tokens ).toStrictEqual( [ TOKEN_IDENTIFIER ] );
  } );
} );
