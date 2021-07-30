import { startsWith } from './startsWith';


describe( 'startsWidth', () => {
  const string = '0123456789';

  test( 'can check if the string starts with the search string or not.', () => {
    expect( startsWith( string, '012' ) ).toBe( true );
    expect( startsWith( string, '345' ) ).toBe( false );

    expect( startsWith( string, string ) ).toBe( true );
    expect( startsWith( string, string + 'a' ) ).toBe( false );
  } );
} );
