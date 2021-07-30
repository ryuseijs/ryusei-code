import { CLASS_ACTIVE } from '../../../constants/classes';
import { generate, init } from '../../../test';
import { CLASS_GUTTER } from '../classes';


describe( 'Gutter#activate()', () => {
  const Editor = init( generate( 1000 ) );
  const { Selection } = Editor.Components;
  const gutter = document.querySelector( `.${ CLASS_GUTTER }` );
  const inner  = gutter.firstElementChild as HTMLElement;

  Editor.focus();

  test( 'can activate the row element when the active line is changed.', () => {
    Selection.set( [ 5, 0 ] );
    expect( inner.children[ 5 ].classList.contains( CLASS_ACTIVE ) ).toBe( true );

    Selection.set( [ 2, 0 ] );
    expect( inner.children[ 2 ].classList.contains( CLASS_ACTIVE ) ).toBe( true );
  } );

  test( 'should deactivate the previous active row when another is activated.', () => {
    Selection.set( [ 5, 0 ] );
    const prev = inner.children[ 5 ];
    expect( prev.classList.contains( CLASS_ACTIVE ) ).toBe( true );

    Selection.set( [ 2, 0 ] );
    expect( prev.classList.contains( CLASS_ACTIVE ) ).toBe( false );
  } );
} );
