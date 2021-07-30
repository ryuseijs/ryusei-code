import { closest } from './closest';


describe( 'closest', () => {
  test( 'can return the closest element that matches a selector.', () => {
    const div1 = document.createElement( 'div' );
    const div2 = document.createElement( 'div' );
    const div3 = document.createElement( 'div' );

    div1.id = 'root';
    div2.classList.add( 'inner' );

    div1.appendChild( div2 );
    div2.appendChild( div3 );

    expect( closest( div3, '.inner' ) ).toBe( div2 );
    expect( closest( div3, '#root' ) ).toBe( div1 );
  } );

  test( 'should return null if nothing is found.', () => {
    const div1 = document.createElement( 'div' );
    expect( closest( div1, '.inner' ) ).toBeNull();
  } );
} );
