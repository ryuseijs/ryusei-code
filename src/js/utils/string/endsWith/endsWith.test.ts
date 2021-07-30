import { endsWith } from './endsWith';


describe( 'endsWith', () => {
  const string = '0123456789';

  test( 'can check if the string ends with the search string or not.', () => {
    expect( endsWith( string, '789' ) ).toBe( true );
    expect( endsWith( string, '345' ) ).toBe( false );

    expect( endsWith( string, string ) ).toBe( true );
    expect( endsWith( string, string + 'a' ) ).toBe( false );
  } );
} );
