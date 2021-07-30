import { CLASS_ACTIVE } from '../../../constants/classes';
import { generate, init, LINE_HEIGHT } from '../../../test';
import { CLASS_ACTIVE_LINE } from '../ActiveLine';


describe( 'ActiveLine', () => {
  const Editor = init( generate( 100 ) );
  const { Selection } = Editor.Components;
  const activeLine = document.querySelector<HTMLDivElement>( `.${ CLASS_ACTIVE_LINE }` );

  Editor.focus();

  beforeEach( () => {
    // Forces to deactivate the element.
    Selection.set( [ 0, 0 ] );
    activeLine.classList.remove( CLASS_ACTIVE );
  } );

  test( 'can highlight the current line.', () => {
    Selection.set( [ 5, 0 ] );
    expect( activeLine.classList.contains( CLASS_ACTIVE ) ).toBe( true );
    expect( activeLine.style.top ).toBe( `${ LINE_HEIGHT * 5 }px` );

    Selection.set( [ 99, 0 ] );
    expect( activeLine.style.top ).toBe( `${ LINE_HEIGHT * 99 }px` );
  } );

  test( 'should highlight the "focus" line instead of the anchor line.', () => {
    Selection.set( [ 5, 0 ], [ 6, 0 ] );
    expect( activeLine.style.top ).toBe( `${ LINE_HEIGHT * 6 }px` );

    Selection.set( [ 20, 0 ], [ 50, 0 ] );
    expect( activeLine.style.top ).toBe( `${ LINE_HEIGHT * 50 }px` );
  } );

  test( 'should be deactivated when the editor becomes read-only.', () => {
    Selection.set( [ 5, 0 ] );
    expect( activeLine.classList.contains( CLASS_ACTIVE ) ).toBe( true );

    Editor.readOnly = true;
    expect( activeLine.classList.contains( CLASS_ACTIVE ) ).toBe( false );

    // Even if the selection is changed, the active line should not be visible while the editor is read-only.
    Selection.set( [ 5, 0 ] );
    expect( activeLine.classList.contains( CLASS_ACTIVE ) ).toBe( false );

    Editor.readOnly = false;
    Selection.set( [ 5, 0 ] );
    expect( activeLine.classList.contains( CLASS_ACTIVE ) ).toBe( true );
  } );

  test( 'should emit the event when the active line is activated.', () => {
    const callback = jest.fn();

    Editor.event.on( 'activeLine:activated', callback );
    Selection.set( [ 5, 0 ] );

    expect( callback ).toHaveBeenCalledTimes( 1 );
  } );

  test( 'should emit the event when the active line is changed.', () => {
    const callback = jest.fn();

    Editor.event.on( 'activeLine:updated', callback );

    Selection.set( [ 5, 0 ] );
    Selection.set( [ 20, 0 ] );
    Selection.set( [ 40, 0 ] );

    expect( callback ).toHaveBeenCalledTimes( 3 );
  } );

  test( 'should emit the event when the active line is deactivated.', () => {
    const callback = jest.fn();

    Editor.event.on( 'activeLine:deactivated', callback );

    Selection.set( [ 5, 0 ] );
    Editor.readOnly = true;

    expect( callback ).toHaveBeenCalledTimes( 1 );
  } );
} );
