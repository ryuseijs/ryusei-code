import { activeElement } from './activeElement';


describe( 'activeElement', () => {
  test( 'can return an active element.', () => {
    expect( document.activeElement ).toBe( activeElement() );
  } );

  test( 'can return an element that is currently focused.', () => {
    const textarea = document.createElement( 'textarea' );
    document.body.appendChild( textarea );

    textarea.focus();
    expect( activeElement() ).toBe( textarea );
  } );
} );
