import { KeyMatcher } from '@ryusei/code';
import { EVENT_KEYMAP } from '../../../constants/events';
import { KEYMAP } from '../../../constants/keymap';
import { init, pressKey } from '../../../test';


describe( 'Keymap', () => {
  const Editor = init();
  const { Keymap } = Editor.Components;
  const { editable } = Editor.elements;

  beforeEach( () => {
    Object.defineProperty( navigator, 'platform', { value: 'Windows', writable: true } );
  } );

  test( 'can emit the event when the shortcut matches one of the keymap records.', () => {
    const events: string[] = [];
    const keys = Object.keys( KEYMAP );

    keys.forEach( key => {
      const matchers = KEYMAP[ key ];

      if ( Array.isArray( matchers ) ) {
        Editor.event.on( `${ EVENT_KEYMAP }:${ key }`, ( e, ke, action ) => {
          events.push( action );
        } );

        const matcher = Array.isArray( matchers[ 0 ] ) ? matchers[ 0 ] : matchers as KeyMatcher;

        Editor.readOnly = false;

        pressKey( editable, matcher );
      }
    } );

    expect( keys ).toEqual( events );
  } );

  test( 'can tell if the KeyboardEvent satisfies the KeyMatcher or not.', () => {
    const ke = new KeyboardEvent( 'keydown' );

    Object.defineProperties( ke, {
      key     : { value: 'Z' },
      ctrlKey : { value: true },
      shiftKey: { value: true },
      altKey  : { value: undefined },
    } );

    expect( Keymap.matches( ke, 'redo' ) ).toBe( true );
    expect( Keymap.matches( ke, 'undo' ) ).toBe( false );
  } );

  test( 'can convert a Keymap ID to a shortcut as a string.', () => {
    expect( Keymap.getShortcut( 'undo' ) ).toBe( 'Ctrl+Z' );
    expect( Keymap.getShortcut( 'redo' ) ).toBe( 'Ctrl+Shift+Z' );

    Object.defineProperty( navigator, 'platform', { value: 'Mac', writable: true } );

    expect( Keymap.getShortcut( 'undo' ) ).toBe( '⌘+Z' );
    expect( Keymap.getShortcut( 'redo' ) ).toBe( '⌘+⇧+Z' );
  } );

  test( 'can convert a KeyMatcher to a shortcut as a string.', () => {
    expect( Keymap.getShortcut( [ '`' ] ) ).toBe( '`' );
    expect( Keymap.getShortcut( [ 'B', true, false, true ] ) ).toBe( 'Ctrl+Alt+B' );
    expect( Keymap.getShortcut( [ 'K', false, false, true ] ) ).toBe( 'Alt+K' );
    expect( Keymap.getShortcut( [ 'D', true, true, true ] ) ).toBe( 'Ctrl+Shift+Alt+D' );

    Object.defineProperty( navigator, 'platform', { value: 'Mac', writable: true } );

    expect( Keymap.getShortcut( [ '`' ] ) ).toBe( '`' );
    expect( Keymap.getShortcut( [ 'B', true, false, true ] ) ).toBe( '⌘+⌥+B' );
    expect( Keymap.getShortcut( [ 'K', false, false, true ] ) ).toBe( '⌥+K' );
    expect( Keymap.getShortcut( [ 'D', true, true, true ] ) ).toBe( '⌘+⇧+⌥+D' );
  } );
} );
