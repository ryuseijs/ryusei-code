import { CLASS_LINE, CLASS_ROOT } from '../../../constants/classes';
import { RyuseiCode } from '../../../core/RyuseiCode/RyuseiCode';
import { generate } from '../../../test';
import { CLASS_GUTTER, CLASS_GUTTER_ROW, CLASS_HAS_GUTTER, CLASS_STICKY } from '../classes';


describe( 'Gutter#render()', () => {
  test( 'can render the gutter by Editor#html().', () => {
    const ryuseiCode = new RyuseiCode();
    document.body.innerHTML = ryuseiCode.html( generate( 10 ) );

    const root   = document.querySelector( `.${ CLASS_ROOT }` );
    const gutter = root.querySelector( `.${ CLASS_GUTTER }` );
    const rows   = gutter.getElementsByClassName( CLASS_GUTTER_ROW );
    const lines  = root.getElementsByClassName( CLASS_LINE );

    expect( gutter ).not.toBeNull();

    for ( let i = 0; i < rows.length - 1; i++ ) {
      expect( rows[ i ].textContent ).toBe( `${ i + 1 }` );
    }

    // The last hidden row has the length of gutter rows.
    expect( rows[ rows.length - 1 ].textContent ).toBe( `${ lines.length }` );

    expect( root.classList.contains( CLASS_HAS_GUTTER ) ).toBe( true );
  } );

  test( 'should add a sticky class if required.', () => {
    const ryuseiCode = new RyuseiCode( { gutter: { sticky: true } } );
    document.body.innerHTML = ryuseiCode.html( generate( 10 ) );

    const gutter = document.querySelector( `.${ CLASS_GUTTER }` );
    expect( gutter.classList.contains( CLASS_STICKY ) ).toBe( true );
  } );

  test( 'can specify the start number.', () => {
    const ryuseiCode = new RyuseiCode( { gutter: { start: 5 } } );
    document.body.innerHTML = ryuseiCode.html( generate( 10 ) );

    const rows  = document.getElementsByClassName( CLASS_GUTTER_ROW );
    const lines = document.getElementsByClassName( CLASS_LINE );

    for ( let i = 0; i < rows.length - 1; i++ ) {
      expect( rows[ i ].textContent ).toBe( `${ i + 5 }` );
    }

    expect( rows[ rows.length - 1 ].textContent ).toBe( `${ lines.length + 5 - 1 }` );
  } );

  test( 'can respect the maxInitialLines.', () => {
    const ryuseiCode = new RyuseiCode( { maxInitialLines: 50 } );
    document.body.innerHTML = ryuseiCode.html( generate( 100 ) );

    const rows = document.getElementsByClassName( CLASS_GUTTER_ROW );
    expect( rows.length ).toBe( 50 + 1 );

    // The last row always describes the total length of lines.
    expect( rows[ rows.length - 1 ].textContent ).toBe( '100' );
  } );
} );
