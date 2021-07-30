import { escapeHtml } from './escapeHtml';


describe( 'escapeHtml', () => {
  test( 'can escape HTML special characters.', () => {
    expect( escapeHtml( '&<>&<>' ) ).toBe( '&amp;&lt;&gt;&amp;&lt;&gt;' );
  } );

  test( 'can escape a HTML tag.', () => {
    expect( escapeHtml( '<span></span>' ) ).toBe( '&lt;span&gt;&lt;/span&gt;' );
  } );
} );
