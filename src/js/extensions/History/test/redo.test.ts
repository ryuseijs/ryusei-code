import { init, pressKey, timer } from '../../../test';
import { DEFAULT_OPTIONS } from '../defaults';


describe( 'Gutter#redo()', () => {
  test( 'can restore the undone change.', async () => {
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

    await timer( () => {
      pressKey( editable, Editor.options.keymap.redo );

      expect( Editor.value ).toBe( 'abc123' );
      expect( Selection.get().start ).toEqual( [ 0, 3 ] );

    }, DEFAULT_OPTIONS.debounce );
  } );

  test( 'should emit the `history:restored` event.', async () => {
    const Editor = init( '123' );
    const { Selection } = Editor.Components;
    const { editable } = Editor.elements;

    Selection.set( [ 0, 0 ] );
    pressKey( editable, 'a' );

    await timer( () => {
      pressKey( editable, Editor.options.keymap.undo );

      const callback = jest.fn();
      Editor.event.on( 'history:restored', callback );

      pressKey( editable, Editor.options.keymap.redo );

      expect( callback ).toHaveBeenCalled();
    }, DEFAULT_OPTIONS.debounce );
  } );
} );
