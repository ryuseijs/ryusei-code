import { LINE_BREAK } from '../../../../constants/characters';
import { CODE_BRACKETS, CODE_NUMBERS, init } from '../../../../test';


describe( 'Lines#syncSize()', () => {
  const Editor = init( CODE_BRACKETS );
  const { lines } = Editor.Components.Code;
  const size = CODE_NUMBERS.split( LINE_BREAK ).length;

  beforeEach( () => {
    lines.delete( 0, lines.length );
    lines.sync( 0, CODE_NUMBERS );
  } );

  test( 'can sync the number of inserted lines.', () => {
    lines.syncSize( 1, size + 2 );

    expect( lines.length ).toBe( size + 2 );
    expect( lines[ 0 ].text ).toBe( '1' );
    expect( lines[ 1 ].text ).toBe( '' );
    expect( lines[ 2 ].text ).toBe( '' );
    expect( lines[ 3 ].text ).toBe( '2' );
    expect( lines[ 4 ].text ).toBe( '3' );
  } );

  test( 'can sync the number of deleted lines.', () => {
    lines.syncSize( 1, size - 2 );

    expect( lines.length ).toBe( size - 2 );
    expect( lines[ 0 ].text ).toBe( '1' );
    expect( lines[ 1 ].text ).toBe( '4' );
    expect( lines[ 2 ].text ).toBe( '5' );
  } );

  test( 'can return the difference of numbers.', () => {
    expect( lines.syncSize( 1, size + 5 ) ).toBe( 5 );

    lines.syncSize( 1, size );

    expect( lines.syncSize( 1, size - 2 ) ).toBe( -2 );
  } );
} );
