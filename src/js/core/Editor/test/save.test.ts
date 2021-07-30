import { CODE_SHORT, init } from '../../../test';


describe( 'Editor#save()', () => {
  test( 'can save the content to the source element.', () => {
    const Editor = init( CODE_SHORT );
    const code   = 'a = 1;';

    Editor.value = code;

    const pre = document.querySelector( 'pre' );
    expect( pre.textContent ).toBe( CODE_SHORT );

    Editor.save();
    expect( pre.textContent ).toBe( code );
  } );

  test( 'can save the content to the source textarea element.', () => {
    const Editor = init( CODE_SHORT, {}, 'textarea' );
    const code   = 'a = 1;';

    Editor.value = code;

    const textarea = document.querySelector( 'textarea' );
    expect( textarea.value ).toBe( CODE_SHORT );

    Editor.save();
    expect( textarea.value ).toBe( code );
  } );
} );
