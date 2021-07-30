import { EVENT_CHUNK_MOVED } from '../../../constants/events';
import { generate, init } from '../../../test';
import { CLASS_GUTTER } from '../classes';


describe( 'Gutter#update()', () => {
  const Editor = init( generate( 1000 ) );
  const { Chunk } = Editor.Components;
  const gutter = document.querySelector( `.${ CLASS_GUTTER }` );
  const inner  = gutter.firstElementChild as HTMLElement;

  test( 'can update offset and numbers on scroll.', () => {
    Chunk.start   = 5;
    Chunk.offsetY = 100;

    Editor.event.emit( EVENT_CHUNK_MOVED );

    expect( inner.style.top ).toBe( '100px' );
    expect( inner.firstElementChild.textContent ).toBe( '6' );
  } );

  test( 'should set the number of the last row to the length of lines.', () => {
    Chunk.start   = 5;
    Chunk.offsetY = 100;

    Editor.event.emit( EVENT_CHUNK_MOVED );

    expect( inner.lastElementChild.textContent ).toBe( '1000' );
  } );
} );
