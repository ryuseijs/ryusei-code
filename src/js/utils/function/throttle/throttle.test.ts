import { throttle } from './throttle';


describe( 'throttle', () => {
  test( 'can control how often the callback function should be executed by the specified interval.', done => {
    const callback  = jest.fn();
    const interval  = 1000;
    const throttled = throttle( callback, interval );

    throttled();
    throttled();
    throttled();
    throttled();

    expect( callback ).toHaveBeenCalledTimes( 0 );

    // In the half way of the interval.
    setTimeout( () => {
      throttled();
      throttled();
      throttled();
      throttled();

      expect( callback ).toHaveBeenCalledTimes( 0 );
    }, interval / 2 );

    // After the interval duration.
    setTimeout( () => {
      throttled();
      throttled();
      throttled();
      throttled();

      expect( callback ).toHaveBeenCalledTimes( 1 );

      done();
    }, interval + 100 );
  } );

  test( 'should call the function immediately if `initialCall` is true.', done => {
    const callback  = jest.fn();
    const interval  = 1000;
    const throttled = throttle( callback, interval, true );

    throttled();
    throttled();

    expect( callback ).toHaveBeenCalledTimes( 1 );

    // In the half way of the interval.
    setTimeout( () => {
      throttled();
      throttled();

      expect( callback ).toHaveBeenCalledTimes( 1 );
    }, interval / 2 );

    // After the interval duration.
    setTimeout( () => {
      throttled();
      throttled();

      expect( callback ).toHaveBeenCalledTimes( 2 );

      done();
    }, interval + 100 );
  } );
} );
