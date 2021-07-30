import { debounce } from './debounce';


describe( 'debounce', () => {
  test( 'can debounce the callback by the specified duration.', done => {
    const callback  = jest.fn();
    const duration  = 1000;
    const debounced = debounce( callback, duration );

    debounced();
    debounced();
    debounced();
    debounced();

    expect( callback ).toHaveBeenCalledTimes( 0 );

    // In the half way of the interval.
    setTimeout( () => {
      debounced();
      debounced();
      debounced();
      debounced();

      expect( callback ).toHaveBeenCalledTimes( 0 );
    }, duration / 2 );

    // After the interval duration.
    setTimeout( () => {
      debounced();
      debounced();
      debounced();
      debounced();

      expect( callback ).toHaveBeenCalledTimes( 0 );

      // And wait for the duration.
      setTimeout( () => {
        debounced();
        debounced();
        debounced();
        debounced();

        expect( callback ).toHaveBeenCalledTimes( 1 );

        done();
      }, duration + 100 );
    }, duration );
  } );
} );
