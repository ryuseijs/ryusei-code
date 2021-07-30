import { CODE_TRIPLE_NUMBERS, init, pressKey, refresh } from '../../../test';


describe( 'Comment', () => {
  const Editor = init();
  const { Code, Selection } = Editor.Components;
  const { editable } = Editor.elements;

  test( 'can comment out the selection range with a block comment notation.', () => {
    refresh( Editor, CODE_TRIPLE_NUMBERS );

    Selection.set( [ 0, 0 ], [ 1, 1 ] );
    pressKey( editable, Editor.options.keymap.blockComment, false );

    expect( Code.getLine( 0 ) ).toBe( '/*123\n' );
    expect( Code.getLine( 1 ) ).toBe( '4*/56\n' );
    expect( Code.getLine( 2 ) ).toBe( '789' );
  } );

  test( 'can uncomment a block comment at the anchor position.', () => {
    refresh( Editor, '/* comment */ outside' );

    Selection.set( [ 0, 3 ], [ 0, 15 ] );
    pressKey( editable, Editor.options.keymap.blockComment, false );

    expect( Code.getLine( 0 ) ).toBe( 'comment outside' );
  } );

  test( 'can uncomment a block comment at the focus position.', () => {
    refresh( Editor, 'outside /* comment */' );

    Selection.set( [ 0, 3 ], [ 0, 15 ] );
    pressKey( editable, Editor.options.keymap.blockComment, false );

    expect( Code.getLine( 0 ) ).toBe( 'outside comment' );
  } );
} );
