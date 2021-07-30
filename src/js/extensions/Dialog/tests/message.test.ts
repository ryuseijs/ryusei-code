import { init } from '../../../test';
import { CLASS_DIALOG, CLASS_DIALOG_BODY, CLASS_DIALOG_TITLE } from '../classes';


describe( 'Dialog#message()', () => {
  const Editor = init();
  const invoke = Editor.invoke.bind( Editor, 'Dialog' );

  test( 'can display a message.', () => {
    invoke( 'message', 'dialog message', 'Dialog Title' );

    const dialog = document.querySelector( `.${ CLASS_DIALOG }` );
    const title  = dialog.querySelector( `.${ CLASS_DIALOG_TITLE }` );
    const body   = dialog.querySelector( `.${ CLASS_DIALOG_BODY }` );

    expect( Editor.readOnly ).toBe( true );
    expect( title.textContent ).toBe( 'Dialog Title' );
    expect( body.textContent ).toBe( 'dialog message' );
  } );
} );
