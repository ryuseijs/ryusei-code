import { EDITOR_HEIGHT, generate, init, LINE_HEIGHT } from '../../../test';


describe( 'View#jump()', () => {
  const Editor = init( generate( 1000 ) );
  const { View } = Editor.Components;
  const { scroller } = Editor.elements;
  const linesPerView = EDITOR_HEIGHT / LINE_HEIGHT;

  // Mocks the View#isVisible method because it uses the boundingClientRect which does not work in the jsdom.
  function mockIsVisible( visible: boolean ): void {
    Editor.Components.View.isVisible = () => visible;
  }

  beforeEach( () => {
    View.jump( 0 );
    scroller.scrollTop = 0;
  } );

  test( 'can jump to the specified row.', () => {
    mockIsVisible( false );

    View.jump( 99, false, 0 );
    expect( scroller.scrollTop ).toBe( LINE_HEIGHT * ( 100 - linesPerView ) );
  } );

  test( 'can jump to the specified row with vertically centering the line.', () => {
    View.jump( 99, true, 0 );
    expect( scroller.scrollTop ).toBe( LINE_HEIGHT * ( 100 - linesPerView / 2 ) );

    View.jump( 99, true, 1 );
    expect( scroller.scrollTop ).toBe( LINE_HEIGHT * ( 100 - linesPerView / 2 + 1 ) );
  } );

  test( 'can jump to the specified row with offset.', () => {
    mockIsVisible( false );

    View.jump( 99, false );
    // The default number of lines for offset is 1
    expect( scroller.scrollTop ).toBe( LINE_HEIGHT * ( 100 - linesPerView + 1 ) );

    View.jump( 99, false, 2 );
    expect( scroller.scrollTop ).toBe( LINE_HEIGHT * ( 100 - linesPerView + 2 ) );

    View.jump( 99, false, 3 );
    expect( scroller.scrollTop ).toBe( LINE_HEIGHT * ( 100 - linesPerView + 3 ) );
  } );

  test( 'should do nothing when the `isVisible()` returns `true`.', () => {
    mockIsVisible( true );

    View.jump( 99, false, 0 );
    expect( scroller.scrollTop ).toBe( 0 );
  } );
} );
