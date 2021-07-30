import { DRAG_END_EVENTS, DRAG_START_EVENTS, DRAGGING_EVENTS } from '../../../classes/AbstractDraggableBar/AbstractDraggableBar';
import { EDITOR_HEIGHT, EDITOR_WIDTH, fire, init } from '../../../test';
import { CLASS_SIZER } from '../Resize';
import { CLASS_SIZER_BAR } from '../ResizeBar';


describe( 'Resize', () => {
  const Editor = init( '', { minWidth: 0, minHeight: 0, maxWidth: EDITOR_WIDTH, maxHeight: EDITOR_HEIGHT } );
  const { root } = Editor.elements;

  Object.defineProperties( root, {
    clientHeight: { value: EDITOR_HEIGHT },
    clientWidth : { value: EDITOR_WIDTH },
  } );

  test( 'can create resize bars.', () => {
    const sizer = document.querySelector( `.${ CLASS_SIZER }` );

    expect( sizer ).not.toBeNull();
    expect( sizer.children.length ).toBe( 2 );
  } );

  test( 'can resize the width of the editor.', () => {
    const bar = document.querySelector( `.${ CLASS_SIZER_BAR }--horizontal` );

    fire( bar, DRAG_START_EVENTS, { pageX: EDITOR_WIDTH } );
    fire( window, DRAGGING_EVENTS, { pageX: EDITOR_WIDTH - 100 } );
    fire( window, DRAG_END_EVENTS );

    expect( root.style.width ).toBe( `${ EDITOR_WIDTH - 100 }px` );
  } );

  test( 'can resize the height of the editor.', () => {
    const bar = document.querySelector( `.${ CLASS_SIZER_BAR }--vertical` );

    fire( bar, DRAG_START_EVENTS, { pageY: EDITOR_HEIGHT } );
    fire( window, DRAGGING_EVENTS, { pageY: EDITOR_HEIGHT - 100 } );
    fire( window, DRAG_END_EVENTS );

    expect( root.style.height ).toBe( `${ EDITOR_HEIGHT - 100 }px` );
  } );

  test( 'can reset the width when double-clicking the bar', () => {
    const bar = document.querySelector( `.${ CLASS_SIZER_BAR }--horizontal` );

    fire( bar, DRAG_START_EVENTS, { pageX: EDITOR_WIDTH } );
    fire( window, DRAGGING_EVENTS, { pageX: EDITOR_WIDTH - 100 } );
    fire( window, DRAG_END_EVENTS );

    expect( root.style.width ).toBe( `${ EDITOR_WIDTH - 100 }px` );

    fire( bar, 'dblclick' );

    expect( root.style.width ).toBe( '' );
  } );
} );
