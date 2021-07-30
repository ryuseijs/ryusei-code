import { init } from '../../../test';


describe( 'Editor', () => {
  const Editor = init();

  describe( '#focus()', () => {
    test( 'can make the editor focused.', () => {
      expect( Editor.isFocused() ).toBe( false );

      Editor.focus();

      expect( Editor.isFocused() ).toBe( true );
    } );
  } );

  describe( '#blur()', () => {
    test( 'can remove the focus from the editor.', () => {
      Editor.focus();
      expect( Editor.isFocused() ).toBe( true );

      Editor.blur();
      expect( Editor.isFocused() ).toBe( false );
    } );
  } );
} );
