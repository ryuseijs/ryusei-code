import { toggleEditable } from './toggleEditable';


describe( 'toggleClass', () => {
  test( 'can set the contentEditable to `true` of the specified element.', () => {
    const container = document.createElement( 'div' );
    toggleEditable( container, true );
    expect( container.contentEditable ).toBe( 'true' );
  } );

  test( 'can set the contentEditable to `false` of the specified element.', () => {
    const container = document.createElement( 'div' );
    container.contentEditable = 'true';
    toggleEditable( container, false );
    expect( container.contentEditable ).toBe( 'false' );
  } );
} );
