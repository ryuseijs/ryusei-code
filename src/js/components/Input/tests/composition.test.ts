import { Editor } from '../../../core/Editor/Editor';
import { CODE_TRIPLE_NUMBERS, fire, init, pressKey } from '../../../test';
import { Selection } from '../../Selection/Selection';
import { Input } from '../Input';


describe( 'Input', () => {
  let Editor: Editor;
  let Input: Input;
  let Selection: Selection;
  let editable: HTMLElement;

  beforeEach( () => {
    Editor    = init( CODE_TRIPLE_NUMBERS );
    Input     = Editor.Components.Input;
    Selection = Editor.Components.Selection;
    editable  = Editor.elements.editable;
  } );

  test( 'should set `composing` to `true` when composition starts.', () => {
    expect( Input.composing ).toBeFalsy();
    fire( editable, 'compositionstart' );
    expect( Input.composing ).toBe( true );
  } );

  test( 'should set `composing` to `false` when composition ends.', () => {
    fire( editable, 'compositionstart' );
    expect( Input.composing ).toBe( true );

    fire( editable, 'compositionend' );
    expect( Input.composing ).toBe( false );
  } );

  test( 'should not apply the value while composing.', () => {
    const { Code } = Editor.Components;

    Selection.set( [ 0, 0 ] );
    fire( editable, 'compositionstart' );

    pressKey( editable, 'a' );
    pressKey( editable, 'b' );
    pressKey( editable, 'c' );
    expect( Code.getLine( 0 ) ).toBe( '123\n' );
  } );

  test( 'should apply the value after composition ends.', () => {
    const { Code } = Editor.Components;

    Selection.set( [ 0, 0 ] );
    fire( editable, 'compositionstart' );

    pressKey( editable, 'a' );
    pressKey( editable, 'b' );
    pressKey( editable, 'c' );

    fire( editable, 'compositionend' );
    expect( Code.getLine( 0 ) ).toBe( 'abc123\n' );
  } );
} );
