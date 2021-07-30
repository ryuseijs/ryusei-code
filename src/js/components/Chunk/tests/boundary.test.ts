import { CLASS_ANCHOR, CLASS_FOCUS } from '../../../constants/classes';
import { EVENT_ANCHOR_LINE_CHANGED, EVENT_FOCUS_LINE_CHANGED } from '../../../constants/events';
import { CODE_NUMBERS, init } from '../../../test';


describe( 'Chunk', () => {
  const Editor = init( CODE_NUMBERS );
  const { Selection, Chunk } = Editor.Components;

  Editor.focus();

  test( 'can activate the anchor and focus line', () => {
    Selection.set( [ 1, 0 ], [ 2, 0 ] );

    const anchor = Chunk.getBoundary( false );
    const focus  = Chunk.getBoundary( true );

    expect( anchor.line.classList.contains( CLASS_ANCHOR ) ).toBe( true );
    expect( anchor.row ).toBe( 1 );

    expect( focus.line.classList.contains( CLASS_FOCUS ) ).toBe( true );
    expect( focus.row ).toBe( 2 );
  } );

  test( 'can deactivate the old boundary line.', () => {
    Selection.set( [ 1, 0 ] );

    const anchor     = Chunk.getBoundary( false );
    const anchorLine = anchor.line;

    expect( anchor.line.classList.contains( CLASS_ANCHOR ) ).toBe( true );
    expect( anchor.row ).toBe( 1 );

    Selection.set( [ 2, 0 ] );
    expect( anchor.line !== anchorLine ).toBe( true );
    expect( anchorLine.classList.contains( CLASS_ANCHOR ) ).toBe( false );
  } );

  test( 'can emit the `changed` event when the boundary lines are changed.', done => {
    const onAnchorLineChanged = jest.fn();

    Editor.event.on( EVENT_ANCHOR_LINE_CHANGED, ( e, line, row ) => {
      expect( row ).toBe( 5 );
      onAnchorLineChanged();
    } );

    Editor.event.on( EVENT_FOCUS_LINE_CHANGED, ( e, line, row ) => {
      expect( row ).toBe( 6 );
      expect( onAnchorLineChanged ).toHaveBeenCalled();
      done();
    } );

    Selection.set( [ 5, 0 ], [ 6, 0 ] );
  } );
} );
