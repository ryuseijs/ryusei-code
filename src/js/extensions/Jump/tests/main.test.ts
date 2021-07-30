import { JUMP_OFFSET } from '../../../components/View/constants';
import { EDITOR_HEIGHT, fire, generate, init, LINE_HEIGHT, pressKey, timer } from '../../../test';
import { CLASS_TOOLBAR } from '../../Toolbar/classes';
import { JUMP_DEBOUNCE_DURATION, TOOLBAR_ID } from '../Jump';


describe( 'Jump', () => {
  const linesPerView = EDITOR_HEIGHT / LINE_HEIGHT;

  test( 'can display the Jump toolbar.', () => {
    const Editor = init( generate( 1000 ) );
    const { editable } = Editor.elements;

    pressKey( editable, Editor.options.keymap.jumpToLine );
    const toolbar = document.querySelector( `.${ CLASS_TOOLBAR }--${ TOOLBAR_ID }` );

    expect( toolbar ).not.toBeNull();
  } );

  test( 'can jump to the specified line.', async () => {
    const Editor = init( generate( 1000 ) );
    const { Caret } = Editor.Components;
    const { editable, scroller } = Editor.elements;

    pressKey( editable, Editor.options.keymap.jumpToLine );

    const field = document.querySelector<HTMLInputElement>( `.${ CLASS_TOOLBAR }--${ TOOLBAR_ID } input` );

    // Forcibly disable to clip the caret position.
    Object.defineProperty( Caret, 'rect', { value: null } );

    field.value = '20';
    fire( field, 'input' );

    await timer( () => {
      expect( scroller.scrollTop ).toBe( LINE_HEIGHT * ( 20 - linesPerView / 2 + JUMP_OFFSET ) );
    }, JUMP_DEBOUNCE_DURATION );

    field.value = '200';
    fire( field, 'input' );

    await timer( () => {
      expect( scroller.scrollTop ).toBe( LINE_HEIGHT * ( 200 - linesPerView / 2 + JUMP_OFFSET ) );
    }, JUMP_DEBOUNCE_DURATION );
  } );
} );
