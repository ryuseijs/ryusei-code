import { matches } from './matches';


describe( 'matches', () => {
  test( 'can return true if a selector matches an element.', () => {
    const div = document.createElement( 'div' );
    div.id = 'container';
    div.classList.add( 'container' );

    expect( matches( div, '#container' ) ).toBe( true );
    expect( matches( div, '.container' ) ).toBe( true );
  } );

  test( 'can return false if a selector does not match an element.', () => {
    const div = document.createElement( 'div' );

    expect( matches( div, '#container' ) ).toBe( false );
    expect( matches( div, '.container' ) ).toBe( false );
  } );
} );
