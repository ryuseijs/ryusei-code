import { CLICKED_RIGHT, COLLAPSED, EXTEND, IDLE, START } from '../../../constants/selection-states';
import { CODE_NUMBERS, fire, init, pressKey } from '../../../test';


describe( 'Selection#state()', () => {
  const Editor = init( CODE_NUMBERS );
  const { Selection } = Editor.Components;
  const { editable } = Editor.elements;

  test( 'should be IDLE after initialization.', () => {
    expect( Selection.is( IDLE ) ).toBe( true );
  } );

  test( 'should be COLLAPSED after getting focused.', () => {
    Editor.focus();
    expect( Selection.is( COLLAPSED ) ).toBe( true );
  } );

  test( 'should be START on pointerdown.', () => {
    fire( editable, 'pointerdown' );
    expect( Selection.is( START ) ).toBe( true );
  } );

  test( 'should be START on keydown by arrow keys.', () => {
    pressKey( editable, 'ArrowRight' );
    expect( Selection.is( START ) ).toBe( true );
  } );

  test( 'should be EXTEND on pointerdown if a shift key is pressed.', () => {
    fire( editable, 'pointerdown', { shiftKey: true } );
    expect( Selection.is( EXTEND ) ).toBe( true );
  } );

  test( 'should be EXTEND on keydown by arrow keys with pressing a shift key.', () => {
    pressKey( editable, [ 'ArrowRight', false, true ] );
    expect( Selection.is( EXTEND ) ).toBe( true );
  } );

  test( 'should be CLICKED_RIGHT on pointerdown if the button index is 2.', () => {
    // Forcibly returns `true` because there is no boundingClientRect of the selection.
    Selection.isInside = () => true;

    fire( editable, 'pointerdown', { button: 2 } );
    expect( Selection.is( CLICKED_RIGHT ) ).toBe( true );
  } );

  test( 'should be COLLAPSED after pointerup.', done => {
    fire( editable, 'pointerdown' );
    fire( window, 'pointerup' );

    setTimeout( () => {
      expect( Selection.is( COLLAPSED ) ).toBe( true );
      done();
    } );
  } );
} );
