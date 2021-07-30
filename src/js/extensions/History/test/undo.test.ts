import { init, pressKey, timer } from '../../../test';
import { DEFAULT_OPTIONS } from '../defaults';


describe( 'Gutter#undo()', () => {
  test( 'can undo the change.', async () => {
    const Editor = init( '123' );
    const { Selection } = Editor.Components;
    const { editable } = Editor.elements;

    Selection.set( [ 0, 0 ] );

    pressKey( editable, 'a' );
    pressKey( editable, 'b' );
    pressKey( editable, 'c' );

    await timer( () => {
      expect( Editor.value ).toBe( 'abc123' );
      expect( Selection.get().start ).toEqual( [ 0, 3 ] );

      pressKey( editable, Editor.options.keymap.undo );

      expect( Editor.value ).toBe( '123' );
      expect( Selection.get().start ).toEqual( [ 0, 0 ] );

    }, DEFAULT_OPTIONS.debounce );
  } );

  test( 'should emit the `history:restored` event.', async () => {
    const Editor = init( '123' );
    const { Selection } = Editor.Components;
    const { editable } = Editor.elements;

    Selection.set( [ 0, 0 ] );
    pressKey( editable, 'a' );

    await timer( () => {
      const callback = jest.fn();
      Editor.event.on( 'history:restored', callback );

      pressKey( editable, Editor.options.keymap.undo );
      expect( callback ).toHaveBeenCalled();
    }, DEFAULT_OPTIONS.debounce );
  } );

  test( 'should debounce the recording history.', async () => {
    const Editor = init( '123' );
    const { Selection } = Editor.Components;
    const { editable } = Editor.elements;

    Selection.set( [ 0, 0 ] );
    pressKey( editable, 'a' );
    pressKey( editable, 'b' );
    pressKey( editable, 'c' );

    await timer( () => {
      expect( Editor.value ).toBe( 'abc123' );

      pressKey( editable, 'd' );
      pressKey( editable, 'e' );
      pressKey( editable, 'f' );
    }, DEFAULT_OPTIONS.debounce );

    await timer( () => {
      expect( Editor.value ).toBe( 'abcdef123' );

      pressKey( editable, 'g' );
      pressKey( editable, 'h' );
      pressKey( editable, 'i' );
    }, DEFAULT_OPTIONS.debounce );

    await timer( () => {
      pressKey( editable, Editor.options.keymap.undo );
      expect( Editor.value ).toBe( 'abcdef123' );

      pressKey( editable, Editor.options.keymap.undo );
      expect( Editor.value ).toBe( 'abc123' );

      pressKey( editable, Editor.options.keymap.undo );
      expect( Editor.value ).toBe( '123' );

    }, DEFAULT_OPTIONS.debounce );
  } );
} );
