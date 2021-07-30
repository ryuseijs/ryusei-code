import { CLASS_EMPTY, CLASS_LINE } from '../../../constants/classes';
import { CODE_NUMBERS, EDITOR_HEIGHT, init, LINE_HEIGHT } from '../../../test';


describe( 'Chunk', () => {
  const Editor = init( CODE_NUMBERS );
  const { Chunk } = Editor.Components;

  test( 'can determine the number of lines to display, according to the editor height.', () => {
    expect( Chunk.visibleLines ).toBe( EDITOR_HEIGHT / LINE_HEIGHT );
  } );

  test( 'can supply line elements.', () => {
    const { margin, visibleLines } = Chunk;
    const lines = document.body.querySelectorAll<HTMLElement>( `.${ CLASS_LINE }` );

    expect( lines.length ).toBe( margin * 2 + visibleLines );
    expect( lines[ 0 ].textContent ).toBe( '1' );
    expect( Chunk.start ).toBe( 0 );
  } );

  test( 'should set the "empty" class if the line element has no corresponded code.', () => {
    const lines = document.body.querySelectorAll<HTMLElement>( `.${ CLASS_LINE }` );

    expect( lines[ 0 ].classList.contains( CLASS_EMPTY ) ).toBe( false );
    expect( lines[ lines.length - 1 ].classList.contains( CLASS_EMPTY ) ).toBe( true );
  } );

  test( 'can return the row index corresponding with the provided line element.', () => {
    const lines = document.body.querySelectorAll<HTMLElement>( `.${ CLASS_LINE }` );

    expect( Chunk.getRow( lines[ 0 ] ) ).toBe( 0 );
    expect( Chunk.getRow( lines[ 1 ] ) ).toBe( 1 );
    expect( Chunk.getRow( lines[ 2 ] ) ).toBe( 2 );
  } );

  test( 'can return the line element at the row index.', () => {
    expect( Chunk.getLine( 0 ).textContent ).toBe( '1' );
    expect( Chunk.getLine( 1 ).textContent ).toBe( '2' );
    expect( Chunk.getLine( 2 ).textContent ).toBe( '3' );
  } );

  test( 'can tell if the chunk has the provided row or not.', () => {
    expect( Chunk.includes( 0 ) ).toBe( true );
    expect( Chunk.includes( 1 ) ).toBe( true );
    expect( Chunk.includes( 2 ) ).toBe( true );

    expect( Chunk.includes( Chunk.length ) ).toBe( false );
    expect( Chunk.includes( Chunk.length + 1 ) ).toBe( false );
    expect( Chunk.includes( -1 ) ).toBe( false );
  } );

  test( 'can return all elements in the chunk.', () => {
    const { elms } = Chunk;
    expect( elms.length ).toBe( Chunk.margin * 2 + Chunk.visibleLines );
    expect( elms[ 0 ].classList.contains( CLASS_LINE ) ).toBe( true );
  } );

  test( 'can return the length of lines in the chunk.', () => {
    expect( Chunk.length ).toBe( Chunk.margin * 2 + Chunk.visibleLines );
  } );
} );
