import { matchesKey } from './matchesKey';


describe( 'matchesKey', () => {
  function generate( key: string, ctrl?: boolean, shift?: boolean, alt?: boolean ): KeyboardEvent {
    const e = new KeyboardEvent( '' );

    // Forcibly defines readonly properties.
    Object.defineProperties( e, {
      key     : { value: key },
      ctrlKey : { value: !! ctrl },
      shiftKey: { value: !! shift },
      altKey  : { value: !! alt },
    } );

    return e;
  }

  test( 'can return true if the keyboard event satisfies the matcher.', () => {
    expect( matchesKey( generate( 'Tab' ), [ 'Tab' ] ) ).toBe( true );

    expect( matchesKey( generate( 'Tab', true ), [ 'Tab', true ] ) ).toBe( true );
    expect( matchesKey( generate( 'Tab', true, true ), [ 'Tab', true, true ] ) ).toBe( true );
    expect( matchesKey( generate( 'Tab', true, true, true ), [ 'Tab', true, true, true ] ) ).toBe( true );

    expect( matchesKey( generate( 'Tab', false ), [ 'Tab', false ] ) ).toBe( true );
    expect( matchesKey( generate( 'Tab', false, true ), [ 'Tab', false, true ] ) ).toBe( true );
    expect( matchesKey( generate( 'Tab', false, false ), [ 'Tab', false, false ] ) ).toBe( true );
    expect( matchesKey( generate( 'Tab', false, true, true ), [ 'Tab', false, true, true ] ) ).toBe( true );
    expect( matchesKey( generate( 'Tab', false, false, true ), [ 'Tab', false, false, true ] ) ).toBe( true );
    expect( matchesKey( generate( 'Tab', false, true, false ), [ 'Tab', false, true, false ] ) ).toBe( true );
    expect( matchesKey( generate( 'Tab', false, false, false ), [ 'Tab', false, false, false ] ) ).toBe( true );
  } );

  test( 'can return false if the keyboard event does not satisfy the matcher.', () => {
    expect( matchesKey( generate( 'Tab' ), [ 'Escape' ] ) ).toBe( false );

    expect( matchesKey( generate( 'Tab', false ), [ 'Tab', true ] ) ).toBe( false );
    expect( matchesKey( generate( 'Tab', true, false ), [ 'Tab', true, true ] ) ).toBe( false );
  } );

  test( 'accepts an array as matchers.', () => {
    expect( matchesKey( generate( 'Tab' ), [ [ 'Escape' ], [ 'Tab' ] ] ) ).toBe( true );
    expect( matchesKey( generate( 'Tab' ), [ [ 'Escape' ], [ 'F4' ] ] ) ).toBe( false );

    expect( matchesKey( generate( 'Tab', true ), [ [ 'Escape' ], [ 'Tab', true ] ] ) ).toBe( true );
    expect( matchesKey( generate( 'Tab', true ), [ [ 'Escape' ], [ 'Tab', false ] ] ) ).toBe( false );
  } );
} );
