import { CLASS_BUTTON } from '../../../constants/classes';
import { init } from '../../../test';
import { CLASS_DIALOG } from '../classes';


describe( 'Dialog#register()', () => {
  const Editor = init();
  const invoke = Editor.invoke.bind( Editor, 'Dialog' );

  test( 'can register a custom dialog.', () => {
    const onClick1 = jest.fn();
    const onClick2 = jest.fn();
    const onOpened = jest.fn();
    const onClosed = jest.fn();
    const elm      = document.createElement( 'div' );

    elm.id          = 'test-dialog-content';
    elm.textContent = 'dialog message';

    invoke( 'register', 'test', elm, 'Dialog Title', [
      {
        id  : 'button1',
        html: 'button 1',
        click: onClick1,
      },
      {
        id  : 'button2',
        html: 'button 2',
        click: onClick2,
      },
    ] );

    Editor.event.on( 'dialog:opened', ( e, Dialog, group ) => {
      expect( group ).toBe( 'test' );
      onOpened();
    } );

    Editor.event.on( 'dialog:closed', ( e, Dialog, group ) => {
      expect( group ).toBe( 'test' );
      onClosed();
    } );

    invoke( 'show', 'test' );
    expect( onOpened ).toHaveBeenCalled();

    const dialog  = document.querySelector( `.${ CLASS_DIALOG }` );
    const content = document.getElementById( elm.id );
    const buttons = dialog.getElementsByClassName( CLASS_BUTTON );

    expect( Editor.readOnly ).toBe( true );
    expect( dialog ).not.toBeNull();
    expect( content.textContent ).toBe( 'dialog message' );
    expect( buttons[ 0 ].textContent ).toBe( 'button 1' );
    expect( buttons[ 1 ].textContent ).toBe( 'button 2' );

    buttons[ 0 ].dispatchEvent( new Event( 'click' ) );
    buttons[ 1 ].dispatchEvent( new Event( 'click' ) );

    expect( onClick1 ).toHaveBeenCalled();
    expect( onClick2 ).toHaveBeenCalled();

    invoke( 'hide', 'test' );
    expect( onClosed ).toHaveBeenCalled();
    expect( Editor.readOnly ).toBe( false );

    expect( dialog.innerHTML ).toBe( '' );
  } );

  test( 'can register a custom dialog with a general button.', () => {
    const elm         = document.createElement( 'div' );
    const onConfirmed = jest.fn();

    elm.id          = 'test-dialog-content';
    elm.textContent = 'dialog message';

    invoke( 'register', 'test', elm, 'Dialog Title', [ 'confirm' ] );
    invoke( 'show', 'test' );

    const dialog  = document.querySelector( `.${ CLASS_DIALOG }` );
    const buttons = dialog.getElementsByClassName( CLASS_BUTTON );

    Editor.event.on( 'dialog:test:confirmed', onConfirmed );

    expect( buttons[ 0 ].textContent ).toBe( Editor.options.i18n.confirm );

    buttons[ 0 ].dispatchEvent( new Event( 'click' ) );

    expect( onConfirmed ).toHaveBeenCalled();
    expect( dialog.innerHTML ).toBe( '' );
  } );
} );
