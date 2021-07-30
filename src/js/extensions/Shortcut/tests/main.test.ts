import { CODE_TRIPLE_NUMBERS, generate, init, LINE_HEIGHT, pressKey, refresh } from '../../../test';


describe( 'Shortcut', () => {
  const Editor = init();
  const { Code, Selection } = Editor.Components;
  const { editable, scroller } = Editor.elements;
  const { keymap } = Editor.options;

  test( 'can cut a current line.', () => {
    refresh( Editor, CODE_TRIPLE_NUMBERS );

    Selection.set( [ 1, 0 ] );
    pressKey( editable, keymap.cutLine );

    // The copy error message has been shown under the jsdom environment, which makes the editor read-only.
    Editor.invoke( 'Dialog', 'hide' );

    expect( Code.getLine( 0 ) ).toBe( '123\n' );
    expect( Code.getLine( 1 ) ).toBe( '789' );
  } );

  test( 'can scroll down the scroller.', () => {
    refresh( Editor, generate( 1000 ) );
    scroller.scrollTop = 0;

    pressKey( editable, keymap.moveDown );
    expect( scroller.scrollTop ).toBe( LINE_HEIGHT );

    pressKey( editable, keymap.moveDown );
    pressKey( editable, keymap.moveDown );
    expect( scroller.scrollTop ).toBe( LINE_HEIGHT * 3 );
  } );

  test( 'can scroll up the scroller.', () => {
    refresh( Editor, generate( 1000 ) );

    scroller.scrollTop = 200;
    pressKey( editable, keymap.moveUp );
    expect( scroller.scrollTop ).toBe( 200 - LINE_HEIGHT );

    pressKey( editable, keymap.moveUp );
    pressKey( editable, keymap.moveUp );
    expect( scroller.scrollTop ).toBe( 200 - LINE_HEIGHT * 3 );
  } );
} );
