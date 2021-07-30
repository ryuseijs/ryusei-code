import { createRange } from './createRange';


describe( 'createRange', () => {
  test( 'can create a Range instance.', () => {
    const range = createRange();
    expect( range instanceof Range ).toBe( true );
  } );
} );
