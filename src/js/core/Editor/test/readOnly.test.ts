import { CLASS_READONLY } from '../../../constants/classes';
import { init } from '../../../test';


describe( 'Editor#readOnly()', () => {
  test( 'can make the editor read-only.', () => {
    const Editor = init();
    Editor.readOnly = true;

    expect( Editor.elements.root.classList.contains( CLASS_READONLY ) ).toBe( true );
    expect( Editor.elements.editable.contentEditable ).toBe( 'false' );
  } );

  test( 'can indicate whether the editor is read-only or not.', () => {
    const Editor = init();

    // The value may be `undefined`.
    expect( Editor.readOnly ).toBeFalsy();

    Editor.readOnly = true;
    expect( Editor.readOnly ).toBe( true );

    Editor.readOnly = false;
    expect( Editor.readOnly ).toBe( false );
  } );
} );
