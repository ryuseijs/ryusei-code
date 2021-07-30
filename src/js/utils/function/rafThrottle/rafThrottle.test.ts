import { rafThrottle } from './rafThrottle';


describe( 'rafThrottle', () => {
  test( 'can throttle the function via requestAnimationFrame.', done => {
    const callback  = jest.fn();
    const throttled = rafThrottle( callback );

    throttled();
    throttled();
    throttled();
    throttled();

    expect( callback ).toHaveBeenCalledTimes( 0 );

    requestAnimationFrame( () => {
      throttled();
      throttled();
      throttled();
      throttled();

      expect( callback ).toHaveBeenCalledTimes( 1 );

      done();
    } );
  } );
} );
