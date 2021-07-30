import { COLLAPSED } from '../../../constants/selection-states';
import { CODE_TRIPLE_NUMBERS, init } from '../../../test';


describe( 'Selection#set()', () => {
  const Editor = init( CODE_TRIPLE_NUMBERS );
  const { Selection } = Editor.Components;
  const selection = window.getSelection();

  test( 'can set a new selection range.', () => {
    Selection.set( [ 0, 1 ], [ 0, 2 ] );

    const startLine = Editor.Components.Chunk.getBoundary( false ).line;
    const textNode  = startLine.firstElementChild.firstChild;

    expect( selection.anchorNode ).toBe( textNode );
    expect( selection.focusNode ).toBe( textNode );

    expect( selection.anchorOffset ).toBe( 1 );
    expect( selection.focusOffset ).toBe( 2 );
  } );

  test( 'can set a custom selection without changing the native selection.', () => {
    Selection.set( [ 0, 1 ], [ 0, 2 ] );
    Selection.update( [ 1, 0 ], [ 1, 1 ] );

    const startLine = Editor.Components.Chunk.getBoundary( false ).line;
    const textNode  = startLine.firstElementChild.firstChild;

    expect( selection.anchorNode ).toBe( textNode );
    expect( selection.focusNode ).toBe( textNode );

    expect( selection.anchorOffset ).toBe( 1 );
    expect( selection.focusOffset ).toBe( 2 );

    expect( Selection.get().start ).toEqual( [ 1, 0 ] );
    expect( Selection.get().end ).toEqual( [ 1, 1 ] );
  } );

  test( 'can set a custom selection without changing the state.', () => {
    Selection.set( [ 0, 0 ], [ 0, 0 ] );

    expect( Selection.is( COLLAPSED ) );

    Selection.set( [ 0, 1 ], [ 0, 2 ], false, false );

    expect( Selection.get().start ).toEqual( [ 0, 1 ] );
    expect( Selection.get().end ).toEqual( [ 0, 2 ] );

    expect( Selection.is( COLLAPSED ) );
  } );
} );
