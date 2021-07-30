import { init } from '../../../../test';


describe( 'Lines#insert()', () => {
  const Editor = init();
  const { lines } = Editor.Components.Code;

  test( 'can insert a line at the specified row.', () => {
    lines.sync( 0, `1\n2\n3` );
    lines.insert( 1 );

    expect( lines[ 0 ].text ).toBe( '1' );
    expect( lines[ 1 ].text ).toBe( '' );
    expect( lines[ 2 ].text ).toBe( '2' );
    expect( lines[ 3 ].text ).toBe( '3' );
  } );

  test( 'can insert lines at the specified row.', () => {
    lines.sync( 0, `1\n2\n3` );
    lines.insert( 1, 3 );

    expect( lines[ 0 ].text ).toBe( '1' );
    expect( lines[ 1 ].text ).toBe( '' );
    expect( lines[ 2 ].text ).toBe( '' );
    expect( lines[ 3 ].text ).toBe( '' );
    expect( lines[ 4 ].text ).toBe( '2' );
    expect( lines[ 5 ].text ).toBe( '3' );
  } );
} );
