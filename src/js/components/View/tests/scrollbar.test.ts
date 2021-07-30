import { CLASS_ACTIVE, CLASS_SCROLLBAR } from '../../../constants/classes';
import { EVENT_RESIZE } from '../../../constants/events';
import { EDITOR_HEIGHT, EDITOR_WIDTH, init } from '../../../test';


describe( 'Scrollbar', () => {
  const Editor = init();
  const { scroller } = Editor.elements;
  const scrollbars = Editor.elements.body.getElementsByClassName( CLASS_SCROLLBAR );

  function setHeight( clientHeight: number, scrollHeight: number ): void {
    Object.defineProperties( scroller, {
      clientHeight: { value: clientHeight, writable: true },
      scrollHeight: { value: scrollHeight, writable: true },
    } );

    Editor.event.emit( EVENT_RESIZE );
  }

  function setWidth( clientWidth: number, scrollWidth: number ): void {
    Object.defineProperties( scroller, {
      clientWidth: { value: clientWidth, writable: true },
      scrollWidth: { value: scrollWidth, writable: true },
    } );

    Editor.event.emit( EVENT_RESIZE );
  }

  beforeEach( () => {
    setHeight( EDITOR_HEIGHT, EDITOR_HEIGHT * 2 );
    setWidth( EDITOR_WIDTH, EDITOR_WIDTH * 2 );
  } );

  test( 'should be active when the clientWidth/Height is greater than the scrollWidth/Height.', done => {
    expect( scrollbars.length ).toBe( 2 );

    // The update function is throttled by RAF.
    requestAnimationFrame( () => {
      expect( scrollbars[ 0 ].classList.contains( CLASS_ACTIVE ) ).toBe( true );
      expect( scrollbars[ 1 ].classList.contains( CLASS_ACTIVE ) ).toBe( true );
      done();
    } );
  } );

  test( 'should be inactive when the clientWidth/Height is greater than the scrollWidth/Height.', done => {
    setHeight( EDITOR_HEIGHT, EDITOR_HEIGHT );
    setWidth( EDITOR_WIDTH, EDITOR_WIDTH );

    // The update function is throttled by RAF.
    requestAnimationFrame( () => {
      expect( scrollbars[ 0 ].classList.contains( CLASS_ACTIVE ) ).toBe( false );
      expect( scrollbars[ 1 ].classList.contains( CLASS_ACTIVE ) ).toBe( false );
      done();
    } );
  } );

  test( 'should have aria attributes.', () => {
    expect( scrollbars[ 0 ].getAttribute( 'role' ) ).toBe( 'scrollbar' );
    expect( scrollbars[ 0 ].getAttribute( 'aria-controls' ) ).toBe( scroller.id );
    expect( scrollbars[ 0 ].getAttribute( 'aria-orientation' ) ).toBe( 'vertical' );
    expect( scrollbars[ 0 ].getAttribute( 'aria-label' ) ).toBe( Editor.options.i18n.scrollbar );

    expect( scrollbars[ 1 ].getAttribute( 'role' ) ).toBe( 'scrollbar' );
    expect( scrollbars[ 1 ].getAttribute( 'aria-controls' ) ).toBe( scroller.id );
    expect( scrollbars[ 1 ].getAttribute( 'aria-orientation' ) ).toBe( 'horizontal' );
    expect( scrollbars[ 1 ].getAttribute( 'aria-label' ) ).toBe( Editor.options.i18n.scrollbar );
  } );

  test( 'should move by the value of scrollTop/Left.', done => {
    scroller.scrollTop  = EDITOR_HEIGHT / 2;
    scroller.scrollLeft = EDITOR_WIDTH / 2;

    // The update function is throttled by RAF.
    requestAnimationFrame( () => {
      expect( ( scrollbars[ 0 ] as HTMLElement ).style.transform ).toBe( `translateY(${ 0.5 * EDITOR_HEIGHT }px)` );
      expect( ( scrollbars[ 1 ] as HTMLElement ).style.transform ).toBe( `translateX(${ 0.5 * EDITOR_WIDTH }px)` );

      expect( scrollbars[ 0 ].getAttribute( 'aria-valuenow' ) ).toBe( '50' );
      expect( scrollbars[ 1 ].getAttribute( 'aria-valuenow' ) ).toBe( '50' );

      done();
    } );
  } );
} );
