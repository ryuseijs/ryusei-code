import { CLASS_MARKER } from '../../../../constants/classes';
import { CODE_TRIPLE_NUMBERS, init } from '../../../../test';
import { CLASS_MARKER_SELECTION } from '../../SelectionMarker';


describe( 'SelectionMarker', () => {
  const Editor = init( CODE_TRIPLE_NUMBERS );
  const { Selection } = Editor.Components;
  const { root } = Editor.elements;

  test( 'can draw a single line selection.', () => {
    Selection.set( [ 0, 0 ], [ 0, 2 ] );

    const markers = root.getElementsByClassName( CLASS_MARKER );
    expect( markers.length ).toBe( 1 );
    expect( markers[ 0 ].parentElement.classList.contains( CLASS_MARKER_SELECTION ) ).toBe( true );
  } );

  test( 'can draw a multiline line selection.', () => {
    Selection.set( [ 0, 0 ], [ 2, 3 ] );

    const markers = root.getElementsByClassName( CLASS_MARKER );
    expect( markers.length ).toBe( 3 );
    expect( markers[ 0 ].parentElement.classList.contains( CLASS_MARKER_SELECTION ) ).toBe( true );
  } );

  test( 'should clear the selection.', () => {
    Selection.set( [ 0, 0 ], [ 2, 3 ] );

    expect( root.getElementsByClassName( CLASS_MARKER ).length ).toBe( 3 );

    // Collapses the selection.
    Selection.set( [ 0, 0 ], [ 0, 0 ] );

    expect( root.getElementsByClassName( CLASS_MARKER ).length ).toBe( 0 );
  } );
} );
