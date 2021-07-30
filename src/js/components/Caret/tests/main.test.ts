import { CLASS_ACTIVE, CLASS_CARET } from '../../../constants/classes';
import { CODE_NUMBERS, init, LINE_HEIGHT, waitForAnimationFrame } from '../../../test';
import { CustomCaret } from '../CustomCaret';
import { PRIMARY_CARET_ID } from '../Caret';


describe( 'Caret', () => {
  const Editor = init( CODE_NUMBERS );
  const { Caret, Selection } = Editor.Components;

  test( 'can create a primary caret.', () => {
    const primary = Caret.get( PRIMARY_CARET_ID );
    expect( primary instanceof CustomCaret ).toBe( true );

    const elm = document.querySelector( `.${ CLASS_CARET }` );
    expect( primary.caret === elm ).toBe( true );
  } );

  test( 'can move the primary caret to the current location.', async () => {
    const primary = Caret.get( PRIMARY_CARET_ID );

    Selection.set( [ 1, 0 ] );
    await waitForAnimationFrame();

    expect( primary.caret.style.top ).toBe( `${ LINE_HEIGHT }px` );

    Selection.set( [ 2, 0 ] );
    await waitForAnimationFrame();

    expect( primary.caret.style.top ).toBe( `${ LINE_HEIGHT * 2 }px` );
  } );

  test( 'can show or hide the caret.', () => {
    const primary = Caret.get();
    const { classList } = primary.caret;

    primary.show();
    expect( classList.contains( CLASS_ACTIVE ) ).toBe( true );

    primary.hide();
    expect( classList.contains( CLASS_ACTIVE ) ).toBe( false );

    primary.show();
    expect( classList.contains( CLASS_ACTIVE ) ).toBe( true );
  } );

  test( 'should hide the primary caret when the editor becomes read-only.', () => {
    const primary = Caret.get();
    const { classList } = primary.caret;

    Editor.focus();
    primary.show();
    expect( classList.contains( CLASS_ACTIVE ) ).toBe( true );

    Editor.readOnly = true;
    expect( classList.contains( CLASS_ACTIVE ) ).toBe( false );

    Editor.readOnly = false;
    expect( classList.contains( CLASS_ACTIVE ) ).toBe( true );
  } );

  test( 'should not show the primary caret when the editor is not focused.', () => {
    const primary = Caret.get();
    const { classList } = primary.caret;

    Editor.blur();
    expect( classList.contains( CLASS_ACTIVE ) ).toBe( false );

    Editor.readOnly = true;
    expect( classList.contains( CLASS_ACTIVE ) ).toBe( false );

    Editor.readOnly = false;
    expect( classList.contains( CLASS_ACTIVE ) ).toBe( false );
  } );

  test( 'can register and return a new caret.', () => {
    const secondary = Caret.register( 'secondary' );

    expect( secondary instanceof CustomCaret ).toBe( true );
    expect( secondary === Caret.get( 'secondary' ) ).toBe( true );
    expect( secondary.caret.classList.contains( `${ CLASS_CARET }--secondary` ) );
  } );
} );
