import { html } from './html';


describe( 'html', () => {
  test( 'can get HTML of an element.', () => {
    const div = document.createElement( 'div' );
    div.innerHTML = '<span>hello!</span>';

    expect( html( div ) ).toBe( '<span>hello!</span>' );
  } );

  test( 'can set HTML to an element.', () => {
    const div = document.createElement( 'div' );
    html( div, '<span>hello!</span>' );

    expect( div.innerHTML ).toBe( '<span>hello!</span>' );
  } );
} );
