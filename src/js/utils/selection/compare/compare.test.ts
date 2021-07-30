import { compare } from './compare';


describe( 'compare', () => {
  test( 'can return a negative number if the position1 is preceding.', () => {
    expect( compare( [ 0, 0 ], [ 0, 1 ] ) ).toBeLessThan( 0 );
    expect( compare( [ 0, 0 ], [ 1, 0 ] ) ).toBeLessThan( 0 );
    expect( compare( [ 1, 1 ], [ 1, 2 ] ) ).toBeLessThan( 0 );
    expect( compare( [ 1, 1 ], [ 2, 0 ] ) ).toBeLessThan( 0 );
  } );

  test( 'can return a positive number if the position2 is preceding.', () => {
    expect( compare( [ 0, 1 ], [ 0, 0 ] ) ).toBeGreaterThan( 0 );
    expect( compare( [ 1, 0 ], [ 0, 0 ] ) ).toBeGreaterThan( 0 );
    expect( compare( [ 1, 2 ], [ 1, 1 ] ) ).toBeGreaterThan( 0 );
    expect( compare( [ 2, 1 ], [ 1, 1 ] ) ).toBeGreaterThan( 0 );
  } );

  test( 'can return 0 if 2 positions are same.', () => {
    expect( compare( [ 0, 0 ], [ 0, 0 ] ) ).toBe( 0 );
    expect( compare( [ 1, 1 ], [ 1, 1 ] ) ).toBe( 0 );
  } );
} );
