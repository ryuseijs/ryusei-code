import { fire, init, pressKey, refresh, timer } from '../../../test';
import { CLASS_REPLACE, CLASS_REPLACE_CONTROLS, CLASS_SEARCH } from '../classes';
import { SEARCH_THROTTLE_DURATION } from '../constants';


describe( 'Search#replace()', () => {
  const Editor = init();
  const { Code } = Editor.Components;
  const { editable } = Editor.elements;

  pressKey( editable, Editor.options.keymap.replace );

  const searchField = document.querySelector<HTMLInputElement>( `.${ CLASS_SEARCH } input` );
  const replaceField = document.querySelector<HTMLInputElement>( `.${ CLASS_REPLACE } input` );

  beforeEach( () => {
    const code = 'aaa a AAA\n'
      + 'bbb b BBB\n'
      + 'ccc c CCC\n';

    refresh( Editor, code );
    searchField.value = '';
    replaceField.value = '';
  } );

  test( 'can replace a matched string with the specified replacement.', async () => {
    pressKey( searchField, 'aaa' );

    await timer( () => {
      replaceField.value = 'xxx';
      pressKey( replaceField, [ 'Enter' ] );
      expect( Code.getLine( 0 ) ).toBe( 'xxx a AAA\n' );
    }, SEARCH_THROTTLE_DURATION );

    await timer( () => {
      pressKey( replaceField, [ 'Enter' ] );
      expect( Code.getLine( 0 ) ).toBe( 'xxx a xxx\n' );
    }, SEARCH_THROTTLE_DURATION );
  } );

  test( 'can replace all matched strings with the specified replacement.', async () => {
    searchField.value = '';
    pressKey( searchField, '\\w{3}' );
    Editor.invoke( 'Search', 'toggleRegExp', true );

    const replaceAll = document.querySelector( `.${ CLASS_REPLACE_CONTROLS }` ).children[ 1 ];

    await timer( () => {
      replaceField.value = 'yyy';
      fire( replaceAll, 'click' );

      expect( Code.getLine( 0 ) ).toBe( 'yyy a yyy\n' );
      expect( Code.getLine( 1 ) ).toBe( 'yyy b yyy\n' );
      expect( Code.getLine( 2 ) ).toBe( 'yyy c yyy\n' );
    }, SEARCH_THROTTLE_DURATION );

    Editor.invoke( 'Search', 'toggleRegExp', false );
  } );
} );
