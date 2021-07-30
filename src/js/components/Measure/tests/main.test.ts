import { CODE_NUMBERS, init, LINE_HEIGHT } from '../../../test';


describe( 'Measure', () => {
  const Editor = init( CODE_NUMBERS );
  const { Measure } = Editor.Components;

  test( 'can return the top offset of the specified row.', () => {
    expect( Measure.getTop( 0 ) ).toBe( 0 );
    expect( Measure.getTop( 1 ) ).toBe( LINE_HEIGHT );
    expect( Measure.getTop( 2 ) ).toBe( LINE_HEIGHT * 2 );
    expect( Measure.getTop( 3 ) ).toBe( LINE_HEIGHT * 3 );
  } );

  test( 'can return the bottom offset of the specified row.', () => {
    expect( Measure.getBottom( 0 ) ).toBe( LINE_HEIGHT );
    expect( Measure.getBottom( 1 ) ).toBe( LINE_HEIGHT * 2 );
    expect( Measure.getBottom( 2 ) ).toBe( LINE_HEIGHT * 3 );
    expect( Measure.getBottom( 3 ) ).toBe( LINE_HEIGHT * 4 );
  } );

  test( 'can return the closest row index to the specified top offset.', () => {
    expect( Measure.closest( 0 ) ).toBe( 0 );
    expect( Measure.closest( ( LINE_HEIGHT / 2 ) - 1 ) ).toBe( 0 );
    expect( Measure.closest( LINE_HEIGHT / 2 ) ).toBe( 1 );

    expect( Measure.closest( LINE_HEIGHT ) ).toBe( 1 );
    expect( Measure.closest( LINE_HEIGHT + ( LINE_HEIGHT / 2 ) - 1 ) ).toBe( 1 );
    expect( Measure.closest( LINE_HEIGHT + ( LINE_HEIGHT / 2 ) ) ).toBe( 2 );
  } );
} );
