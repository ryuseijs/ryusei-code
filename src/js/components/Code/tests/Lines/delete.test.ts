import { init } from '../../../../test';


describe( 'Lines#delete()', () => {
  const Editor = init();
  const { lines } = Editor.Components.Code;

  test( 'can delete a line at the specified row.', () => {
    lines.sync( 0, `1\n2\n3` );
    lines.delete( 1, 1 );

    expect( lines[ 0 ].text ).toBe( '1' );
    expect( lines[ 1 ].text ).toBe( '3' );
  } );

  test( 'can delete lines from the specified row.', () => {
    lines.sync( 0, `1\n2\n3\n4\n5` );
    lines.delete( 2, 2 );

    expect( lines[ 0 ].text ).toBe( '1' );
    expect( lines[ 1 ].text ).toBe( '2' );
    expect( lines[ 2 ].text ).toBe( '5' );
  } );
} );
