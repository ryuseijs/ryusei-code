import { joinAttrs } from './joinAttrs';


describe( 'joinAttrs', () => {
  test( 'can join an object as a single string for attributes.', () => {
    expect( joinAttrs( {
      id: 'attr-id',
      name: 'attr-name',
      contenteditable: true,
    } ) ).toBe( 'id="attr-id" name="attr-name" contenteditable="true"' );
  } );

  test( 'should ignore falsy values except for `false` and `0`.', () => {
    expect( joinAttrs( {
      id: '',
      name: null,
      width: 0,
      'aria-label': undefined,
      contenteditable: false,
    } ) ).toBe( 'width="0" contenteditable="false"' );
  } );
} );
