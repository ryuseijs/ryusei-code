import { TOKEN_IDENTIFIER, TOKEN_LINEBREAK, TOKEN_SPACE } from '../../../../test';
import { Line } from '../../Line';


describe( 'Line#isEmpty()', () => {
  test( 'should return true if the line has only a line break.', () => {
    const line = new Line( {} );
    line.set( [ TOKEN_LINEBREAK ] );
    expect( line.isEmpty() ).toBe( true );
  } );

  test( 'should return true if the line has only spaces.', () => {
    const line = new Line( {} );
    line.set( [ TOKEN_SPACE ] );
    expect( line.isEmpty() ).toBe( true );
  } );

  test( 'should return false if the line is not empty.', () => {
    const line = new Line( {} );
    line.set( [ TOKEN_SPACE, TOKEN_IDENTIFIER ] );
    expect( line.isEmpty() ).toBe( false );
  } );
} );
