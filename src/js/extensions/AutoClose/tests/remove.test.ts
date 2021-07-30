import { init, refresh, pressKey } from '../../../test';


// The opening characters are removed in the real environment.
describe( 'AutoClose#remove()', () => {
  const Editor = init();
  const { Code, Selection } = Editor.Components;
  const { editable } = Editor.elements;

  test( 'can remove the closing bracket when the opening one is deleted via the backspace key.', () => {
    refresh( Editor, '()' );
    Selection.set( [ 0, 1 ] );
    pressKey( editable, [ 'Backspace' ] );

    expect( Code.getLine( 0 ) ).toBe( '(' );
  } );

  test( 'can remove the closing quote when the opening one is deleted via the backspace key.', () => {
    refresh( Editor, '""' );
    Selection.set( [ 0, 1 ] );
    pressKey( editable, [ 'Backspace' ] );
    expect( Code.getLine( 0 ) ).toBe( '"' );
  } );

  test( 'should not remove the closing bracket if it is not at the next of the caret.', () => {
    refresh( Editor, '( )' );
    Selection.set( [ 0, 1 ] );
    pressKey( editable, [ 'Backspace' ] );
    expect( Code.getLine( 0 ) ).toBe( '( )' );
  } );

  test( 'should not remove the closing bracket inside a comment.', () => {
    refresh( Editor, '//()' );
    Selection.set( [ 0, 3 ] );
    pressKey( editable, [ 'Backspace' ] );
    expect( Code.getLine( 0 ) ).toBe( '//()' );
  } );

  test( 'should not skip closing bracket inside a string.', () => {
    refresh( Editor, '"( )"' );
    Selection.set( [ 0, 2 ] );
    pressKey( editable, [ 'Backspace' ] );
    expect( Code.getLine( 0 ) ).toBe( '"( )"' );
  } );
} );
