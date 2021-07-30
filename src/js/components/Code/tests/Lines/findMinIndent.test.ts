import { init } from '../../../../test';


describe( 'Lines#findMinIndent()', () => {
  const Editor = init();
  const { lines } = Editor.Components.Code;

  test( 'can return a min indent from the specified range.', () => {
    const code = '  \n'
      + '  \n'
      + '  \n'
      + '    \n'
      + '      ';

    lines.sync( 0, code );

    expect( lines.findMinIndent( 0, lines.length - 1 ) ).toBe( '  ' );
    expect( lines.findMinIndent( 3, 4 ) ).toBe( '    ' );
    expect( lines.findMinIndent( 4, 4 ) ).toBe( '      ' );
  } );

  test( 'should return an empty string if the min indent is not found.', () => {
    lines.sync( 0, '' );
    expect( lines.findMinIndent( 0, lines.length - 1 ) ).toBe( '' );
  } );
} );
