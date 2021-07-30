import { EVENT_DESTROYED } from '../../../constants/events';
import { CODE_SHORT, init } from '../../../test';


describe( 'Editor#destroy()', () => {
  test( 'can destroy the editor and activate the source element.', () => {
    const Editor   = init( CODE_SHORT );
    const callback = jest.fn();

    Editor.event.on( EVENT_DESTROYED, callback );
    Editor.destroy();

    expect( Editor.Components ).toBeUndefined();
    expect( callback ).toHaveBeenCalled();
  } );

  test( 'can save the content to the source element before destruction.', () => {
    const Editor = init( CODE_SHORT, {}, 'textarea' );
    const code   = 'a = 1;';

    Editor.value = code;

    const textarea = document.querySelector( 'textarea' );
    expect( textarea.value ).toBe( CODE_SHORT );

    Editor.destroy();
    expect( textarea.value ).toBe( code );
  } );
} );
