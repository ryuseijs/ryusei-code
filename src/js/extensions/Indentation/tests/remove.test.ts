import { init, pressKey } from '../../../test';


describe( 'Indentation#remove()', () => {
  test( 'can remove an indent on the top of the current line.', () => {
    const code = '    0\n'
      + '    1\n'
      + '    2\n';

    const Editor = init( code, { indentation: { activation: 'load' } } );
    const { Code, Selection } = Editor.Components;
    const { editable } = Editor.elements;

    Selection.set( [ 1, 4 ] );
    pressKey( editable, [ 'Backspace' ] );

    expect( Code.getLine( 0 ) ).toBe( '    01\n' );
    expect( Code.getLine( 1 ) ).toBe( '    2\n' );
  } );

  test( 'should do nothing if there is no previous line.', () => {
    const Editor = init( '    0\n', { indentation: { activation: 'load' } } );
    const { Code, Selection } = Editor.Components;
    const { editable } = Editor.elements;

    Selection.set( [ 0, 4 ] );
    pressKey( editable, [ 'Backspace' ] );

    expect( Code.getLine( 0 ) ).toBe( '    0\n' );
  } );
} );
