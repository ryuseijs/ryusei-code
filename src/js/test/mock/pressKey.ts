import { KeyMatcher } from '@ryusei/code';


/**
 * Mocks the keydown event.
 *
 * @param elm   - A target element.
 * @param key   - A key.
 * @param input - Optional. Whether to also trigger the input event or not.
 */
export function pressKey(
  elm: HTMLElement | Window,
  key: string | KeyMatcher,
  input = true
): void {
  const ke = new KeyboardEvent( 'keydown' );
  let keyToPress;
  let ctrlKey;
  let shiftKey;
  let altKey;

  if ( Array.isArray( key ) ) {
    [ keyToPress, ctrlKey, shiftKey, altKey ] = key;
  } else {
    keyToPress = key;
  }

  Object.defineProperties( ke, {
    key           : { value: keyToPress },
    ctrlKey       : { value: ctrlKey },
    shiftKey      : { value: shiftKey },
    altKey        : { value: altKey },
    cancelable    : { value: true },
    preventDefault: {
      value: () => {
        Object.defineProperty( ke, 'defaultPrevented', { value: true, writable: true } );
      },
    },
  } );

  elm.dispatchEvent( ke );

  if ( ! ke.defaultPrevented && ! ( elm instanceof Window ) ) {
    if ( ! Array.isArray( key ) ) {
      if ( elm instanceof HTMLInputElement ) {
        const start = elm.selectionStart;
        elm.value = elm.value + key;
        elm.setSelectionRange( start + key.length, start + key.length );
      }

      if ( elm.contentEditable === 'true' ) {
        const selection = document.getSelection();
        let range;

        if ( selection.rangeCount > 0 ) {
          range = selection.getRangeAt( 0 );
        } else {
          range = document.createRange();
          range.setStart( elm, 0 );
          range.setEnd( elm, 0 );
        }

        selection.removeAllRanges();
        selection.addRange( range );

        const text = document.createTextNode( key );
        range.insertNode( text );
        range.selectNode( text );
        range.collapse( false );
      }
    }

    if ( input ) {
      const ie = new InputEvent( 'input' );
      elm.dispatchEvent( ie );
    }
  }
}
