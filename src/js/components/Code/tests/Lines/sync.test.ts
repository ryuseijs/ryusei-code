import { CODE_NUMBERS, init } from '../../../../test';
import { CLASS_TOKEN } from '../../../../constants/classes';


describe( 'Lines#sync()', () => {
  const Editor = init();
  const { lines } = Editor.Components.Code;

  beforeEach( () => {
    lines.delete( 0, lines.length );
  } );

  test( 'can create lines by the provided code.', () => {
    lines.sync( 0, CODE_NUMBERS );
    expect( lines.length ).toBe( 9 );

    for ( let i = 0; i < lines.length; i++ ) {
      expect( lines[ i ].html ).toBe( `<code class="${ CLASS_TOKEN } rc__number">${ i + 1 }</code>` );
    }
  } );

  test( 'can sync lines from the specified row.', () => {
    lines.sync( 0, CODE_NUMBERS );

    lines.sync( 2, 'aaa\nbbb' );

    for ( let i = 0; i < lines.length; i++ ) {
      if ( i === 2 || i === 3 ) {
        const string = i === 2 ? 'aaa' : 'bbb';
        expect( lines[ i ].html ).toBe( `<code class="${ CLASS_TOKEN } rc__identifier">${ string }</code>` );
      } else {
        expect( lines[ i ].html ).toBe( `<code class="${ CLASS_TOKEN } rc__number">${ i + 1 }</code>` );
      }
    }
  } );

  test( 'can sync lines with a limit number.', () => {
    lines.sync( 0, CODE_NUMBERS, 3 );

    for ( let i = 0; i < 3; i++ ) {
      expect( lines[ i ].html ).toBe( `<code class="${ CLASS_TOKEN } rc__number">${ i + 1 }</code>` );
    }

    expect( lines.length ).toBe( 3 );
  } );

  test( 'can accept a pseudo line.', () => {
    lines.sync( 0, CODE_NUMBERS, undefined, '`' );

    for ( let i = 0; i < lines.length; i++ ) {
      expect( lines[ i ].html ).toBe( `<code class="${ CLASS_TOKEN } rc__string">${ i + 1 }</code>` );
    }

    lines.sync( 0, CODE_NUMBERS, undefined, '/*' );

    for ( let i = 0; i < lines.length; i++ ) {
      expect( lines[ i ].html ).toBe( `<code class="${ CLASS_TOKEN } rc__comment">${ i + 1 }</code>` );
    }
  } );

  test( 'should return `true` if the last line of synced lines is changed.', () => {
    lines.sync( 0, CODE_NUMBERS );

    // The last line will not be changed.
    expect( lines.sync( 0, 'a\nb\n3' ) ).toBe( false );

    // The last line will be changed.
    expect( lines.sync( 0, 'a\nb\nc' ) ).toBe( true );
  } );
} );
