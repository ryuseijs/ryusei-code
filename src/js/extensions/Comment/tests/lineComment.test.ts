import { generate, init, pressKey, refresh } from '../../../test';


describe( 'Comment', () => {
  const Editor = init();
  const { Code, Selection } = Editor.Components;
  const { editable } = Editor.elements;

  test( 'can comment out the current line.', () => {
    refresh( Editor, generate( 10 ) );
    Selection.set( [ 1, 0 ] );
    pressKey( editable, Editor.options.keymap.lineComment, false );
    expect( Code.getLine( 1 ) ).toBe( '// 1\n' );
  } );

  test( 'can uncomment the current line.', () => {
    refresh( Editor, '// comment' );
    Selection.set( [ 0, 0 ] );
    pressKey( editable, Editor.options.keymap.lineComment, false );
    expect( Code.getLine( 0 ) ).toBe( 'comment' );
  } );

  test( 'can uncomment the current line event if it is not categorized as a comment.', () => {
    // The line comment representation appears in a block comment.
    refresh( Editor, '/* 0\n// 1\n2 */' );
    Selection.set( [ 1, 0 ] );
    pressKey( editable, Editor.options.keymap.lineComment, false );

    expect( Code.getLine( 0 ) ).toBe( '/* 0\n' );
    expect( Code.getLine( 1 ) ).toBe( '1\n' );
    expect( Code.getLine( 2 ) ).toBe( '2 */' );
  } );

  test( 'should not uncomment if the trimmed line does not start with the line comment representation.', () => {
    // The line comment representation appears in a string.
    refresh( Editor, '"// comment"' );
    Selection.set( [ 0, 0 ] );
    pressKey( editable, Editor.options.keymap.lineComment, false );

    expect( Code.getLine( 0 ) ).toBe( '// "// comment"' );
  } );

  test( 'can comment out selected lines.', () => {
    refresh( Editor, generate( 10 ) );
    Selection.set( [ 0, 0 ], [ 3, 1 ] );
    pressKey( editable, Editor.options.keymap.lineComment, false );

    expect( Code.getLine( 0 ) ).toBe( '// 0\n' );
    expect( Code.getLine( 1 ) ).toBe( '// 1\n' );
    expect( Code.getLine( 2 ) ).toBe( '// 2\n' );
    expect( Code.getLine( 3 ) ).toBe( '// 3\n' );
    expect( Code.getLine( 4 ) ).toBe( '4\n' );
  } );

  test( 'can uncomment selected lines.', () => {
    refresh( Editor, generate( 10 ) );

    Selection.set( [ 0, 0 ], [ 3, 0 ] );
    pressKey( editable, Editor.options.keymap.lineComment, false );

    expect( Code.getLine( 0 ) ).toBe( '// 0\n' );
    expect( Code.getLine( 1 ) ).toBe( '// 1\n' );
    expect( Code.getLine( 2 ) ).toBe( '// 2\n' );
    expect( Code.getLine( 3 ) ).toBe( '// 3\n' );
    expect( Code.getLine( 4 ) ).toBe( '4\n' );

    Selection.set( [ 1, 0 ], [ 2, 0 ] );
    pressKey( editable, Editor.options.keymap.lineComment, false );

    expect( Code.getLine( 0 ) ).toBe( '// 0\n' );
    expect( Code.getLine( 1 ) ).toBe( '1\n' );
    expect( Code.getLine( 2 ) ).toBe( '2\n' );
    expect( Code.getLine( 3 ) ).toBe( '// 3\n' );
    expect( Code.getLine( 4 ) ).toBe( '4\n' );
  } );

  test( 'should respect the minimum indent.', () => {
    const code = '  aaa\n'
      + '    bbb\n'
      + '  ccc\n'
      + '      ddd';

    refresh( Editor, code );

    Selection.set( [ 0, 0 ], [ 3, 0 ] );
    pressKey( editable, Editor.options.keymap.lineComment, false );

    expect( Code.getLine( 0 ) ).toBe( '  // aaa\n' );
    expect( Code.getLine( 1 ) ).toBe( '  //   bbb\n' );
    expect( Code.getLine( 2 ) ).toBe( '  // ccc\n' );
    expect( Code.getLine( 3 ) ).toBe( '  //     ddd' );
  } );
} );
