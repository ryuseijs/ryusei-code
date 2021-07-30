import { init, pressKey } from '../../../test';
import { CLASS_TOOLBAR, CLASS_TOOLBAR_BODY } from '../classes';


describe( 'Toolbar', () => {
  const Editor = init();
  const invoke  = Editor.invoke.bind( Editor, 'Toolbar' );
  const content = document.createElement( 'div' );

  content.textContent = 'Toolbar content';
  invoke( 'register', 'test', content, 'Test label' );

  test( 'can register the toolbar group.', () => {
    invoke( 'show', 'test' );

    const toolbar = document.querySelector( `.${ CLASS_TOOLBAR }--test` );

    expect( toolbar ).not.toBeNull();
    expect( toolbar.getAttribute( 'aria-label' ) ).toBe( 'Test label' );

    const body  = document.querySelector( `.${ CLASS_TOOLBAR_BODY }` );
    const child = body.firstElementChild;

    expect( child ).toBe( content );
  } );

  test( 'can hide the toolbar group.', () => {
    invoke( 'show', 'test' );
    invoke( 'hide' );

    const toolbar = document.querySelector( `.${ CLASS_TOOLBAR }--test` );
    expect( toolbar ).toBeNull();
    expect( Editor.elements.scroller.style.maxHeight ).toBe( '' );
  } );

  test( 'can emit events when the toolbar is shown or hidden.', () => {
    const onOpened = jest.fn();
    const onClosed = jest.fn();

    Editor.event.on( 'toolbar:opened', onOpened );
    Editor.event.on( 'toolbar:closed', onClosed );

    invoke( 'show', 'test' );
    expect( onOpened ).toHaveBeenCalledTimes( 1 );

    invoke( 'hide' );
    expect( onClosed ).toHaveBeenCalledTimes( 1 );

    invoke( 'show', 'test' );
    expect( onOpened ).toHaveBeenCalledTimes( 2 );

    invoke( 'hide' );
    expect( onClosed ).toHaveBeenCalledTimes( 2 );
  } );

  test( 'can hide the toolbar via the Esc key.', () => {
    const onClosed = jest.fn();
    Editor.event.on( 'toolbar:closed', onClosed );

    invoke( 'show', 'test' );
    pressKey( window, [ 'Escape' ] );

    expect( onClosed ).toHaveBeenCalledTimes( 1 );
  } );
} );
