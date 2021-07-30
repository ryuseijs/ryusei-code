import { NORMALIZATION_MAP } from '../../../constants/keys';
import { normalizeKey } from './normalizeKey';


describe( 'normalizeKey', () => {
  test( 'can normalize key values.', () => {
    Object.keys( NORMALIZATION_MAP ).forEach( key => {
      expect( normalizeKey( key ) ).toBe( NORMALIZATION_MAP[ key ] );
    } );
  } );

  test( 'should return the key itself if it is not in the key list.', () => {
    expect( normalizeKey( 'a' ) ).toBe( 'a' );
    expect( normalizeKey( 'Shift' ) ).toBe( 'Shift' );
  } );
} );
