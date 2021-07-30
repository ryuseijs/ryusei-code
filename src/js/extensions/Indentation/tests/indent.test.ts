import { generate, init, pressKey } from '../../../test';


describe( 'Indentation#indent()', () => {
  test( 'can insert an indent at the caret.', () => {
    const Editor = init( '123', { indentation: { activation: 'load' } } );
    const { Selection } = Editor.Components;
    const { editable } = Editor.elements;
    const matcher = Editor.options.keymap.indent;

    Selection.set( [ 0, 1 ] );

    pressKey( editable, matcher );
    expect( Editor.value ).toBe( '1  23' );
  } );

  test( 'can insert indents on the top of selected lines.', () => {
    const Editor = init( generate( 10 ), { indentation: { activation: 'load' } } );
    const { Code, Selection } = Editor.Components;
    const { editable } = Editor.elements;
    const matcher = Editor.options.keymap.indent;

    Selection.set( [ 1, 0 ], [ 4, 0 ] );
    pressKey( editable, matcher );

    expect( Code.getLine( 0 ) ).toBe( '0\n' );
    expect( Code.getLine( 1 ) ).toBe( '  1\n' );
    expect( Code.getLine( 2 ) ).toBe( '  2\n' );
    expect( Code.getLine( 3 ) ).toBe( '  3\n' );
    expect( Code.getLine( 4 ) ).toBe( '  4\n' );
    expect( Code.getLine( 5 ) ).toBe( '5\n' );

    Selection.set( [ 1, 0 ], [ 4, 0 ] );
    pressKey( editable, matcher );

    expect( Code.getLine( 0 ) ).toBe( '0\n' );
    expect( Code.getLine( 1 ) ).toBe( '    1\n' );
    expect( Code.getLine( 2 ) ).toBe( '    2\n' );
    expect( Code.getLine( 3 ) ).toBe( '    3\n' );
    expect( Code.getLine( 4 ) ).toBe( '    4\n' );
    expect( Code.getLine( 5 ) ).toBe( '5\n' );
  } );

  test( 'should respect the indent option.', () => {
    const Editor = init( generate( 10 ), { indent: '\t', indentation: { activation: 'load' } } );
    const { Code, Selection } = Editor.Components;
    const { editable } = Editor.elements;
    const matcher = Editor.options.keymap.indent;

    Selection.set( [ 1, 0 ], [ 4, 0 ] );
    pressKey( editable, matcher );

    expect( Code.getLine( 0 ) ).toBe( '0\n' );
    expect( Code.getLine( 1 ) ).toBe( '\t1\n' );
    expect( Code.getLine( 2 ) ).toBe( '\t2\n' );
    expect( Code.getLine( 3 ) ).toBe( '\t3\n' );
    expect( Code.getLine( 4 ) ).toBe( '\t4\n' );
    expect( Code.getLine( 5 ) ).toBe( '5\n' );

    Selection.set( [ 1, 0 ], [ 4, 0 ] );
    pressKey( editable, matcher );

    expect( Code.getLine( 0 ) ).toBe( '0\n' );
    expect( Code.getLine( 1 ) ).toBe( '\t\t1\n' );
    expect( Code.getLine( 2 ) ).toBe( '\t\t2\n' );
    expect( Code.getLine( 3 ) ).toBe( '\t\t3\n' );
    expect( Code.getLine( 4 ) ).toBe( '\t\t4\n' );
    expect( Code.getLine( 5 ) ).toBe( '5\n' );
  } );
} );
