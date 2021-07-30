import { EDITOR_HEIGHT, EDITOR_WIDTH, init } from '../../../test';


describe( 'Editor', () => {
  const Editor = init();

  Object.defineProperties( Editor.elements.root, {
    clientWidth: { value: EDITOR_WIDTH },
    clientHeight: { value: EDITOR_HEIGHT },
  } );

  describe( '#width', () => {
    test( 'can set the width of the editor.', () => {
      Editor.width = '50%';

      expect( Editor.elements.root.style.width ).toBe( '50%' );
    } );

    test( 'can return the width of the editor.', () => {
      expect( Editor.width ).toBe( EDITOR_WIDTH );
    } );
  } );

  describe( '#height', () => {
    test( 'can set the height of the editor.', () => {
      Editor.height = '30em';

      expect( Editor.elements.root.style.height ).toBe( '30em' );
    } );

    test( 'can return the height of the editor.', () => {
      expect( Editor.height ).toBe( EDITOR_HEIGHT );
    } );
  } );
} );
