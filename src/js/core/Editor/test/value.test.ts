import { CODE_SHORT, init } from '../../../test';


describe( 'Editor#value()', () => {
  test( 'can return the current value of the editor.', () => {
    const Editor = init( CODE_SHORT );
    expect( Editor.value ).toBe( CODE_SHORT );
  } );

  test( 'can set a new value to the editor.', () => {
    const Editor = init( CODE_SHORT );
    expect( Editor.value ).toBe( CODE_SHORT );

    const code = 'const a = 1;';
    Editor.value = code;

    expect( Editor.value ).toBe( code );
  } );
} );
