import { Editor } from '../../../core/Editor/Editor';
import { CODE_TRIPLE_NUMBERS, init } from '../../../test';
import { Selection } from '../../Selection/Selection';
import { Input } from '../Input';


describe( 'Input', () => {
  let Editor: Editor;
  let Input: Input;
  let Selection: Selection;

  beforeEach( () => {
    Editor    = init( CODE_TRIPLE_NUMBERS );
    Input     = Editor.Components.Input;
    Selection = Editor.Components.Selection;
  } );

  test( 'can set a new value to the input.', () => {
    Selection.set( [ 0, 0 ] );
    Input.value = 'def';
    expect( Input.value ).toBe( 'def' );
  } );

  test( 'can return the text before the caret.', () => {
    Selection.set( [ 0, 2 ] );
    expect( Input.before ).toBe( '12' );
  } );

  test( 'can return the text after the caret.', () => {
    Selection.set( [ 0, 2 ] );
    expect( Input.after ).toBe( '3' );
  } );

  test( 'can return the character at the caret.', () => {
    Selection.set( [ 0, 0 ] );
    expect( Input.char() ).toBe( '1' );
    expect( Input.char( 1 ) ).toBe( '2' );
    expect( Input.char( 2 ) ).toBe( '3' );
    expect( Input.char( 3 ) ).toBe( '' );
    expect( Input.char( 4 ) ).toBe( '' );
  } );
} );
