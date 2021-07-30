import { isArray, isBr, isFunction, isHTMLElement, isObject, isString, isText, isUndefined } from './type';


describe( 'Type methods', () => {
  const div  = document.createElement( 'div' );
  const text = document.createTextNode( 'test' );

  describe( 'isObject', () => {
    test( 'can return `true` if a subject is an object.', () => {
      [ {}, { a: 1 }, new Date() ].forEach( subject => {
        expect( isObject( subject ) ).toBe( true );
      } );
    } );

    test( 'should return `false` for other subjects.', () => {
      [ 1, 'a', true, undefined, null, NaN ].forEach( subject => {
        expect( isObject( subject ) ).toBe( false );
      } );
    } );
  } );

  describe( 'isArray', () => {
    test( 'can return `true` if a subject is an array.', () => {
      [ [], [ 1 ], new Array( 1 ) ].forEach( subject => {
        expect( isArray( subject ) ).toBe( true );
      } );
    } );

    test( 'should return `false` for other subjects.', () => {
      [ 1, 'a', true, undefined, null, { length: 1 }, { a: 1 }, NaN ].forEach( subject => {
        expect( isArray( subject ) ).toBe( false );
      } );
    } );
  } );

  describe( 'isFunction', () => {
    test( 'can return `true` if a subject is a function.', () => {
      [ () => 1, isString, Date ].forEach( subject => {
        expect( isFunction( subject ) ).toBe( true );
      } );
    } );

    test( 'should return `false` for other subjects.', () => {
      [ 1, 'a', true, undefined, null, [ 1 ], { a: 1 }, NaN ].forEach( subject => {
        expect( isFunction( subject ) ).toBe( false );
      } );
    } );
  } );

  describe( 'isString', () => {
    test( 'can return `true` if a subject is a string.', () => {
      [ '1', String( 1 ) ].forEach( subject => {
        expect( isString( subject ) ).toBe( true );
      } );
    } );

    test( 'should return `false` for other subjects.', () => {
      [ 1, true, undefined, null, [ 1 ], { a: 1 }, NaN ].forEach( subject => {
        expect( isString( subject ) ).toBe( false );
      } );
    } );
  } );

  describe( 'isUndefined', () => {
    test( 'can return `true` if a subject is `undefined`.', () => {
      expect( isUndefined( undefined ) ).toBe( true );
    } );

    test( 'should return `false` for other subjects.', () => {
      [ 1, true, '1', null, [ 1 ], { a: 1 }, NaN ].forEach( subject => {
        expect( isUndefined( subject ) ).toBe( false );
      } );
    } );
  } );

  describe( 'isText', () => {
    test( 'can return `true` if a subject is a text node.', () => {
      expect( isText( text ) ).toBe( true );
    } );

    test( 'should return `false` for other subjects.', () => {
      [ document, window, div, 1, true, undefined, '1', null, [ 1 ], { a: 1 }, NaN ].forEach( subject => {
        expect( isText( subject ) ).toBe( false );
      } );
    } );
  } );

  describe( 'isHTMLElement', () => {
    test( 'can return `true` if a subject is a HTMLElement.', () => {
      expect( isHTMLElement( div ) ).toBe( true );
    } );

    test( 'should return `false` for other subjects.', () => {
      [ document, window, text, 1, true, undefined, '1', null, [ 1 ], { a: 1 }, NaN ].forEach( subject => {
        expect( isHTMLElement( subject ) ).toBe( false );
      } );
    } );
  } );

  describe( 'isBr', () => {
    test( 'can return `true` if a subject is a BR element.', () => {
      const br = document.createElement( 'br' );
      expect( isBr( br ) ).toBe( true );
    } );

    test( 'should return `false` for other subjects.', () => {
      [ document, window, text, 1, true, undefined, '1', null, [ 1 ], { a: 1 }, NaN ].forEach( subject => {
        expect( isBr( subject ) ).toBe( false );
      } );
    } );
  } );
} );
