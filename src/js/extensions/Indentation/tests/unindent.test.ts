import { init, pressKey } from '../../../test';


describe( 'Indentation#unindent()', () => {
  test( 'can unindent selected lines.', () => {
    const code = '    0\n'
      + '    1\n'
      + '    2\n'
      + '    3\n'
      + '    4\n'
      + '    5\n';

    const Editor = init( code, { indentation: { activation: 'load', help: false } } );
    const { Code, Selection } = Editor.Components;
    const { editable } = Editor.elements;
    const matcher = Editor.options.keymap.unindent;

    Selection.set( [ 1, 4 ], [ 4, 4 ] );
    pressKey( editable, matcher );

    expect( Code.getLine( 0 ) ).toBe( '    0\n' );
    expect( Code.getLine( 1 ) ).toBe( '  1\n' );
    expect( Code.getLine( 2 ) ).toBe( '  2\n' );
    expect( Code.getLine( 3 ) ).toBe( '  3\n' );
    expect( Code.getLine( 4 ) ).toBe( '  4\n' );
    expect( Code.getLine( 5 ) ).toBe( '    5\n' );

    Selection.set( [ 1, 0 ], [ 4, 0 ] );
    pressKey( editable, matcher );

    expect( Code.getLine( 0 ) ).toBe( '    0\n' );
    expect( Code.getLine( 1 ) ).toBe( '1\n' );
    expect( Code.getLine( 2 ) ).toBe( '2\n' );
    expect( Code.getLine( 3 ) ).toBe( '3\n' );
    expect( Code.getLine( 4 ) ).toBe( '4\n' );
    expect( Code.getLine( 5 ) ).toBe( '    5\n' );
  } );
} );
