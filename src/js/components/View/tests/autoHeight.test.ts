import { EVENT_SCROLL_HEIGHT_CHANGED } from '../../../constants/events';
import { EDITOR_HEIGHT, generate, init, LINE_HEIGHT, refresh } from '../../../test';


describe( 'View#autoHeight()', () => {
  const Editor = init();
  const { View } = Editor.Components;
  const { container } = Editor.elements;

  beforeEach( () => {
    refresh( Editor, '' );
  } );

  test( 'can determines the editor height according to the number of lines.', () => {
    refresh( Editor, generate( 20 ) );
    View.autoHeight();

    expect( container.style.height ).toBe( `${ LINE_HEIGHT * 20 }px` );

    refresh( Editor, generate( 999 ) );
    View.autoHeight();

    expect( container.style.height ).toBe( `${ LINE_HEIGHT * 999 }px` );
  } );


  test( 'should not make the editor height smaller than the scroller element.', () => {
    refresh( Editor, generate( 1 ) );
    View.autoHeight();

    expect( container.style.height ).toBe( `${ EDITOR_HEIGHT }px` );
  } );

  test( 'should emit the event when the height is changed.', done => {
    setTimeout( () => {
      const callback = jest.fn();

      Editor.event.on( EVENT_SCROLL_HEIGHT_CHANGED, callback );

      refresh( Editor, generate( 5 ) );
      View.autoHeight(); // 1
      View.autoHeight();
      View.autoHeight();

      refresh( Editor, generate( 999 ) );
      View.autoHeight(); // 2
      View.autoHeight();
      View.autoHeight();

      setTimeout( () => {
        expect( callback ).toHaveBeenCalledTimes( 2 );
        done();
      }, 100 );
    }, 10 );
  } );
} );
