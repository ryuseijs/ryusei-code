import { div } from './div';


describe( 'create', () => {
  test( 'can create a div element.', () => {
    const elm = div();
    expect( elm instanceof HTMLDivElement ).toBe( true );
  } );

  test( 'can create an element with attributes and its parent.', () => {
    const elm = div( { contenteditable: true, id: 'test' }, document.body );

    expect( elm.getAttribute( 'contenteditable' ) ).toBe( 'true' );
    expect( elm.id ).toBe( 'test' );
    expect( document.body.firstElementChild ).toBe( elm );
  } );
} );
