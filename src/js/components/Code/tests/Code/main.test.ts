import { init } from '../../../../test';


describe( 'Code', () => {
  const Editor = init();
  const { Code } = Editor.Components;

  test( 'should normalize CRLF as "\n".', () => {
    Code.value = '1\r\n2\r\n3';
    expect( Code.value ).toBe( '1\n2\n3' );

    Code.value = '1\r2\r3';
    expect( Code.value ).toBe( '1\n2\n3' );

    Code.value = '1\n2\n3';
    expect( Code.value ).toBe( '1\n2\n3' );

    Code.value = '1\r\n2\n3\r4';
    expect( Code.value ).toBe( '1\n2\n3\n4' );
  } );

  test( '`size` should return the length of lines.', () => {
    Code.value = '1\n2\n3';
    expect( Code.size ).toBe( 3 );

    Code.value = '';
    expect( Code.size ).toBe( 1 );
  } );
} );
