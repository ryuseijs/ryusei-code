import { nextTick } from './nextTick';


describe( 'nextTick', () => {
  test( 'can call the function on the next tick.', () => {
    const func = jest.fn();

    nextTick( func );
    expect( func ).not.toHaveBeenCalled();

    setTimeout( () => {
      expect( func ).toHaveBeenCalledTimes( 1 );
    } );
  } );
} );
