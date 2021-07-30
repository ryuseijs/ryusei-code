import { on } from '../on/on';
import { off } from './off';


describe( 'off', () => {
  test( 'can detach a handler from the specific event of the window object.', () => {
    const callback = jest.fn();

    window.addEventListener( 'resize', callback );

    window.dispatchEvent( new Event( 'resize' ) );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    off( window, 'resize', callback );

    window.dispatchEvent( new Event( 'resize' ) );
    window.dispatchEvent( new Event( 'resize' ) );
    expect( callback ).toHaveBeenCalledTimes( 1 );
  } );

  test( 'can detach a handler from the specific event of an element.', () => {
    const callback = jest.fn();
    const div      = document.createElement( 'div' );

    div.addEventListener( 'click', callback );

    div.dispatchEvent( new Event( 'click' ) );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    off( div, 'click', callback );

    div.dispatchEvent( new Event( 'click' ) );
    div.dispatchEvent( new Event( 'click' ) );
    expect( callback ).toHaveBeenCalledTimes( 1 );
  } );

  test( 'can detach handlers specified by a key.', () => {
    const key1      = {};
    const onClick1  = jest.fn();
    const onScroll1 = jest.fn();

    const key2      = {};
    const onClick2  = jest.fn();
    const onScroll2 = jest.fn();

    const div = document.createElement( 'div' );

    on( div, 'click', onClick1, key1 );
    on( div, 'scroll', onScroll1, key1 );
    on( div, 'click', onClick2, key2 );
    on( div, 'scroll', onScroll2, key2 );

    div.dispatchEvent( new Event( 'click' ) );
    div.dispatchEvent( new Event( 'scroll' ) );

    expect( onClick1 ).toHaveBeenCalledTimes( 1 );
    expect( onScroll1 ).toHaveBeenCalledTimes( 1 );
    expect( onClick2 ).toHaveBeenCalledTimes( 1 );
    expect( onScroll2 ).toHaveBeenCalledTimes( 1 );

    // Detaches handlers associated with the key1. Still handlers of key2 are alive.
    off( null, null, key1 );

    div.dispatchEvent( new Event( 'click' ) );
    div.dispatchEvent( new Event( 'scroll' ) );

    expect( onClick1 ).toHaveBeenCalledTimes( 1 );
    expect( onScroll1 ).toHaveBeenCalledTimes( 1 );
    expect( onClick2 ).toHaveBeenCalledTimes( 2 );
    expect( onScroll2 ).toHaveBeenCalledTimes( 2 );

    // Detaches handlers associated with the key2.
    off( null, null, key2 );

    div.dispatchEvent( new Event( 'click' ) );
    div.dispatchEvent( new Event( 'scroll' ) );

    expect( onClick1 ).toHaveBeenCalledTimes( 1 );
    expect( onScroll1 ).toHaveBeenCalledTimes( 1 );
    expect( onClick2 ).toHaveBeenCalledTimes( 2 );
    expect( onScroll2 ).toHaveBeenCalledTimes( 2 );
  } );
} );
