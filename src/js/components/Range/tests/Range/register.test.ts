import { Range } from '@ryusei/code';
import { CLASS_MARKER, CLASS_MARKERS } from '../../../../constants/classes';
import { CODE_NUMBERS, init } from '../../../../test';
import { Marker } from '../../Marker';


describe( 'Range#register()', () => {
  const Editor = init( CODE_NUMBERS );
  const { Range } = Editor.Components;
  const { background } = Editor.elements;

  beforeEach( () => {
    Range.clear();
  } );

  test( 'can register a group and ranges.', () => {
    const range: Range = { start: [ 0, 1 ], end: [ 0, 2 ] };
    Range.register( 'test', [ range ] );
    expect( Range.ranges[ 'test' ][ 0 ].range ).toStrictEqual( range );
  } );

  test( 'can render registered ranges.', () => {
    const range: Range = { start: [ 0, 1 ], end: [ 0, 2 ] };
    Range.register( 'test', [ range ] );
    const markers = background.getElementsByClassName( CLASS_MARKER );
    expect( markers.length ).toBe( 1 );
    expect( markers[ 0 ].parentElement.classList.contains( `${ CLASS_MARKERS }--test` ) ).toBe( true );
  } );

  test( 'should create a Marker instance for each marker.', () => {
    const range: Range = { start: [ 0, 1 ], end: [ 0, 2 ] };
    Range.register( 'test', [ range ] );
    expect( Range.ranges[ 'test' ][ 0 ].marker instanceof Marker ).toBe( true );
  } );

  test( 'should create a group element.', () => {
    const range: Range = { start: [ 0, 1 ], end: [ 0, 2 ] };
    Range.register( 'test', [ range ] );

    const wrapper = background.querySelector( `.${ CLASS_MARKERS }--test` );
    expect( wrapper ).not.toBeNull();
  } );

  test( 'can concat sequential ranges into a single range.', () => {
    Range.register( 'test', [
      { start: [ 0, 1 ], end: [ 0, 2 ] },
      { start: [ 0, 2 ], end: [ 0, 3 ] },
      { start: [ 1, 0 ], end: [ 1, 1 ] },
      { start: [ 1, 1 ], end: [ 1, 2 ] },
    ] );

    expect( Range.ranges[ 'test' ][ 0 ].range ).toStrictEqual( { start: [ 0, 1 ], end: [ 0, 3 ] } );
    expect( Range.ranges[ 'test' ][ 1 ].range ).toStrictEqual( { start: [ 1, 0 ], end: [ 1, 2 ] } );
  } );

  test( 'should not concat sequential ranges if required.', () => {
    Range.register( 'test', [
      { start: [ 0, 1 ], end: [ 0, 2 ] },
      { start: [ 0, 2 ], end: [ 0, 3 ] },
    ], false );

    expect( Range.ranges[ 'test' ][ 0 ].range ).toStrictEqual( { start: [ 0, 1 ], end: [ 0, 2 ] } );
    expect( Range.ranges[ 'test' ][ 1 ].range ).toStrictEqual( { start: [ 0, 2 ], end: [ 0, 3 ] } );
  } );

  test( 'can accept a custom marker class.', () => {
    class CustomMarker extends Marker {
      isCustom = true;
    }

    Range.register( 'test', [ { start: [ 0, 1 ], end: [ 0, 2 ] } ], false, CustomMarker );
    expect( Range.ranges[ 'test' ][ 0 ].marker[ 'isCustom' ] ).toBe( true );
  } );
} );
