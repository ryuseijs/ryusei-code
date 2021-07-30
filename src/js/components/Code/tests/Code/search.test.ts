import { CODE_TRIPLE_NUMBERS, generate, init } from '../../../../test';


describe( 'Code#search()', () => {
  const Editor = init();
  const { Code } = Editor.Components;

  test( 'can search a text and return ranges.', () => {
    Code.init( CODE_TRIPLE_NUMBERS );
    expect( Code.search( '1' ) ).toStrictEqual( [ { start: [ 0, 0 ], end: [ 0, 1 ] } ] );

    Code.init( CODE_TRIPLE_NUMBERS );
    expect( Code.search( '9' ) ).toStrictEqual( [ { start: [ 2, 2 ], end: [ 2, 3 ] } ] );
  } );

  test( 'can search texts with a limit number.', () => {
    Code.init( generate( 1000 ) );
    expect( Code.search( '1', false, false, 10 ).length ).toBe( 10 );
    expect( Code.search( '1', false, false, 100 ).length ).toBe( 100 );
  } );

  test( 'can search a text with a regexp.', () => {
    Code.init( CODE_TRIPLE_NUMBERS );
    expect( Code.search( /[147]/ ) ).toStrictEqual( [
      { start: [ 0, 0 ], end: [ 0, 1 ] },
      { start: [ 1, 0 ], end: [ 1, 1 ] },
      { start: [ 2, 0 ], end: [ 2, 1 ] },
    ] );

    Code.init( CODE_TRIPLE_NUMBERS );
    expect( Code.search( /[123]+/ ) ).toStrictEqual( [
      { start: [ 0, 0 ], end: [ 0, 3 ] },
    ] );
  } );

  test( 'can search a text with ignoring the case.', () => {
    Code.init( 'aaaAAAbbbBBB' );
    expect( Code.search( 'aaa', true ) ).toStrictEqual( [
      { start: [ 0, 0 ], end: [ 0, 3 ] },
      { start: [ 0, 3 ], end: [ 0, 6 ] },
    ] );
  } );

  test( 'can search a text with the `wholeWord` option.', () => {
    Code.init( 'wordword word word wordword' );

    expect( Code.search( 'word', false, true ) ).toStrictEqual( [
      { start: [ 0, 9 ], end: [ 0, 13 ] },
      { start: [ 0, 14 ], end: [ 0, 18 ] },
    ] );
  } );
} );
