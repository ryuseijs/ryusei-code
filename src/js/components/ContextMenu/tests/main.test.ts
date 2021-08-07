import { CLASS_ACTIVE, CLASS_CONTEXT_MENU, CLASS_CONTEXT_MENU_GROUP } from '../../../constants/classes';
import { CONTEXT_MENU_EDIT, CONTEXT_MENU_SELECTION, MAIN_CONTEXT_MENU_ID } from '../../../constants/context-menu';
import { EVENT_BLUR, EVENT_CONTEXT_MENU_CLICKED } from '../../../constants/events';
import { fire, init } from '../../../test';


describe( 'ContextMenu', () => {
  const Editor = init();
  const { ContextMenu } = Editor.Components;

  // Registers the test group.
  ContextMenu.register( 'test', 'list1', [
    {
      id  : 'test1',
      html: 'Test 1',
    },
    {
      id  : 'test2',
      html: 'Test 2',
    },
  ] );

  const contextMenu = document.querySelector( `.${ CLASS_CONTEXT_MENU }` );
  const { classList } = contextMenu;

  function show(): void {
    // Some action may open the error dialog by the Edit component.
    Editor.invoke( 'Dialog', 'hide' );
    Editor.focus();
    fire( Editor.elements.editor, 'mousedown', { button: 2 } );
  }

  test( 'can display the main context menu.', () => {
    show();

    const className = `${ CLASS_CONTEXT_MENU_GROUP }--${ MAIN_CONTEXT_MENU_ID }`;

    expect( classList.contains( CLASS_ACTIVE ) ).toBe( true );
    expect( contextMenu.firstElementChild.classList.contains( className ) ).toBe( true );

    [ ...CONTEXT_MENU_EDIT, ...CONTEXT_MENU_SELECTION ].forEach( settings => {
      expect( ContextMenu.buttons[ settings.id ] ).not.toBeUndefined();
    } );
  } );

  test( 'can display the registered custom context menu.', () => {
    Editor.focus();
    ContextMenu.show( 'test' );

    const className = `${ CLASS_CONTEXT_MENU_GROUP }--test`;
    expect( contextMenu.firstElementChild.classList.contains( className ) ).toBe( true );

    const buttons = contextMenu.getElementsByTagName( 'button' );

    expect( buttons[ 0 ].textContent ).toBe( 'Test 1' );
    expect( buttons[ 1 ].textContent ).toBe( 'Test 2' );
  } );

  test( 'should emit the event when the menu item is clicked.', done => {
    show();

    Editor.event.on( EVENT_CONTEXT_MENU_CLICKED, ( e, Editor, group, id ) => {
      expect( group ).toBe( MAIN_CONTEXT_MENU_ID );
      expect( id ).toBe( CONTEXT_MENU_EDIT[ 0 ].id );
      done();
    } );

    const buttons = contextMenu.getElementsByTagName( 'button' );
    fire( buttons[ 0 ], 'click' );
  } );

  test( 'should disable the button when the editor becomes read-only.', () => {
    show();

    const { cut, paste } = ContextMenu.buttons;

    expect( cut.disabled ).toBe( false );
    expect( paste.disabled ).toBe( false );

    Editor.readOnly = true;

    expect( cut.disabled ).toBe( true );
    expect( paste.disabled ).toBe( true );

    Editor.readOnly = false;

    expect( cut.disabled ).toBe( false );
    expect( paste.disabled ).toBe( false );
  } );

  test( 'should focus the button on hover.', () => {
    show();

    const { copy } = ContextMenu.buttons;
    expect( document.activeElement ).not.toBe( copy );

    fire( copy, 'mouseover' );
    expect( document.activeElement ).toBe( copy );
  } );

  test( 'should hide the menu when the scroller scrolls.', () => {
    show();

    expect( classList.contains( CLASS_ACTIVE ) ).toBe( true );

    fire( Editor.elements.scroller, 'scroll' );
    expect( classList.contains( CLASS_ACTIVE ) ).toBe( false );
  } );

  test( 'should hide the menu when the window scrolls.', () => {
    show();

    expect( classList.contains( CLASS_ACTIVE ) ).toBe( true );

    fire( window, 'scroll' );
    expect( classList.contains( CLASS_ACTIVE ) ).toBe( false );
  } );

  test( 'should hide the menu on blur.', () => {
    show();

    expect( classList.contains( CLASS_ACTIVE ) ).toBe( true );

    Editor.event.emit( EVENT_BLUR );
    expect( classList.contains( CLASS_ACTIVE ) ).toBe( false );
  } );
} );
