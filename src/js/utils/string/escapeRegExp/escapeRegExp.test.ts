import { escapeRegExp } from './escapeRegExp';


describe( 'escapeRegExp', () => {
  test( 'can escape RegExp special characters.', () => {
    const chars   = '.*+-?^${}()|[]\\';
    const escaped = '\\.\\*\\+\\-\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\';

    expect( escapeRegExp( chars ) ).toBe( escaped );
  } );
} );
