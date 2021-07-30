import { TOKEN_IDENTIFIER, TOKEN_LINEBREAK, TOKEN_NUMBER, TOKEN_SPACE } from '../../../../test';
import { Line } from '../../Line';


describe( 'Line', () => {
  test( '`html` can return a HTML string of the line.', () => {
    const line = new Line( {} );
    line.set( [ TOKEN_IDENTIFIER, TOKEN_NUMBER ] );

    const html = '<code class="ryuseicode__token rc__identifier">console</code>'
     + '<code class="ryuseicode__token rc__number">1</code>';

    expect( line.html ).toBe( html );
  } );

  test( '`html` should return <br> if the line has only a line break.', () => {
    const line = new Line( {} );
    line.set( [ TOKEN_LINEBREAK ] );
    expect( line.html ).toBe( '<br>' );
  } );

  test( '`text` can return a text of the line.', () => {
    const line = new Line( {} );
    line.set( [ TOKEN_IDENTIFIER, TOKEN_NUMBER ] );
    expect( line.text ).toBe( 'console1' );
  } );

  test( '`first` can return the first token.', () => {
    const line = new Line( {} );
    line.set( [ TOKEN_IDENTIFIER, TOKEN_NUMBER, TOKEN_SPACE ] );
    expect( line.first ).toStrictEqual( TOKEN_IDENTIFIER );
  } );
} );
