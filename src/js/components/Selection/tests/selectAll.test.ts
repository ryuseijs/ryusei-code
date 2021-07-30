import { COLLAPSED } from '../../../constants/selection-states';
import { CODE_TRIPLE_NUMBERS, init } from '../../../test';


describe( 'Selection#selectAll()', () => {
  test( 'can select the whole code.', () => {
    const Editor = init( CODE_TRIPLE_NUMBERS );
    const { Selection } = Editor.Components;

    Editor.focus();
    Selection.selectAll();
    expect( Selection.get().start ).toEqual( [ 0, 0 ] );
    expect( Selection.get().end ).toEqual( [ 2, 3 ] );
  } );

  test( 'should do nothing when the editor is empty.', () => {
    const Editor = init();
    const { Selection } = Editor.Components;

    Editor.focus();
    Selection.selectAll();
    expect( Selection.is( COLLAPSED ) ).toBe( true );
  } );
} );
