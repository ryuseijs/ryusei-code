import { javascript } from '@ryusei/light';
import { Lexer } from '../../../../core/Lexer/Lexer';
import { TOKEN_IDENTIFIER } from '../../../../test';
import { Line } from '../../Line';


describe( 'Line#getIndent()', () => {
  const lexer = new Lexer( javascript() );

  test( 'can return the indent of the line.', () => {
    const lines = lexer.run( '    a' );

    const line = new Line( { indent: '  ' } );
    line.set( lines[ 0 ] );

    expect( line.getIndent() ).toBe( '    ' );
  } );

  test( 'can return the indent inside a block comment.', () => {
    const lines = lexer.run( '/*\n    a\n    b\n    c\n */' );
    const line = new Line( { indent: '  ' } );

    line.set( lines[ 1 ] );
    expect( line.getIndent() ).toBe( '    ' );

    line.set( lines[ 2 ] );
    expect( line.getIndent() ).toBe( '    ' );
  } );

  test( 'can return the indent by tab characters.', () => {
    const lines = lexer.run( '\t\t\ta' );

    const line = new Line( { indent: '\t' } );
    line.set( lines[ 0 ] );

    expect( line.getIndent() ).toBe( '\t\t\t' );
  } );

  test( 'should return an empty string if the line has no indent.', () => {
    const line = new Line( {} );
    line.set( [ TOKEN_IDENTIFIER ] );

    expect( line.getIndent() ).toBe( '' );
  } );
} );
