import { prepend } from './prepend';


describe( 'prepend', () => {
  test( 'can prepend a child element to a parent element.', () => {
    const div   = document.createElement( 'div' );
    const span1 = document.createElement( 'span' );
    const span2 = document.createElement( 'span' );

    prepend( div, span1 );
    expect( div.firstElementChild ).toBe( span1 );

    prepend( div, span2 );
    expect( div.firstElementChild ).toBe( span2 );
    expect( span2.nextElementSibling ).toBe( span1 );
  } );

  test( 'can prepend children to a parent element.', () => {
    const div   = document.createElement( 'div' );
    const span1 = document.createElement( 'span' );
    const span2 = document.createElement( 'span' );
    const span3 = document.createElement( 'span' );

    prepend( div, [ span1, span2, span3 ] );

    expect( div.children[ 0 ] ).toBe( span3 );
    expect( div.children[ 1 ] ).toBe( span2 );
    expect( div.children[ 2 ] ).toBe( span1 );
  } );
} );
