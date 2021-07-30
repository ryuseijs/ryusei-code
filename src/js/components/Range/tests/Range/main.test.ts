import { Range } from '@ryusei/code';
import { CLASS_MARKER } from '../../../../constants/classes';
import { CODE_NUMBERS, init } from '../../../../test';


describe( 'Range', () => {
  const Editor = init( CODE_NUMBERS );
  const { Range } = Editor.Components;
  const range: Range = { start: [ 0, 1 ], end: [ 0, 2 ] };

  beforeEach( () => {
    Range.clear();
  } );

  test( 'can clear ranges by ID.', () => {
    Range.register( 'test1', [ range ] );
    Range.register( 'test2', [ range ] );

    expect( Range.ranges[ 'test1' ].length ).toBe( 1 );
    expect( Range.ranges[ 'test2' ].length ).toBe( 1 );

    Range.clear( 'test1' );

    expect( Range.ranges[ 'test1' ].length ).toBe( 0 );
    expect( Range.ranges[ 'test2' ].length ).toBe( 1 );
  } );

  test( 'can clear all ranges.', () => {
    Range.register( 'test1', [ range ] );
    Range.register( 'test2', [ range ] );

    expect( Range.ranges[ 'test1' ].length ).toBe( 1 );
    expect( Range.ranges[ 'test2' ].length ).toBe( 1 );

    Range.clear();

    expect( Range.ranges[ 'test1' ].length ).toBe( 0 );
    expect( Range.ranges[ 'test2' ].length ).toBe( 0 );
  } );

  test( 'can clear ranges without removing elements.', () => {
    const { background } = Editor.elements;

    Range.register( 'test1', [ range ] );
    expect( background.getElementsByClassName( CLASS_MARKER ).length ).toBe( 1 );

    Range.clearRanges( 'test1' );
    expect( background.getElementsByClassName( CLASS_MARKER ).length ).toBe( 1 );

    Range.clear( 'test1' );
    expect( background.getElementsByClassName( CLASS_MARKER ).length ).toBe( 0 );
  } );
} );
