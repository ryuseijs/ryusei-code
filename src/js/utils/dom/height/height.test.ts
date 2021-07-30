import { height } from './height';


describe( 'height', () => {
  test( 'can return height of an element', () => {
    const div = document.createElement( 'div' );
    Object.defineProperty( div, 'clientHeight', { value: 100 } );

    expect( height( div ) ).toBe( 100 );
  } );
} );
