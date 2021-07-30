import { AnyFunction, Options } from '@ryusei/code';
import { LINE_BREAK } from '../../constants/characters';
import { EVENT_MOUNT } from '../../constants/events';
import { Editor } from '../../core/Editor/Editor';
import { RyuseiCode } from '../../core/RyuseiCode/RyuseiCode';
import { count, isUndefined } from '../../utils';
import { EDITOR_HEIGHT, EDITOR_WIDTH, LINE_HEIGHT } from '../fixtures';


/**
 * Creates a new editor instance and applies it to the pre element.
 *
 * @param code    - Optional. The initial code.
 * @param options - Optional. Options.
 * @param tag     - Optional. A tag for the source element.
 *
 * @return An Editor instance.
 */
export function init( code = '', options: Options = {}, tag = 'pre' ): Editor {
  const ryuseiCode = new RyuseiCode( options );
  const Editor     = ryuseiCode.Editor;

  document.head.innerHTML = '';
  document.body.innerHTML = `<${ tag }>${ code }</${ tag }>`;

  Editor.event.on( EVENT_MOUNT, () => {
    const { elements } = Editor;

    // Forcibly sets the height of the scroller.
    Object.defineProperty( elements.scroller, 'clientHeight', { value: EDITOR_HEIGHT, writable: true } );
    elements.editor.style.lineHeight = `${ LINE_HEIGHT }px`;

    // Mocks the DOMRect.
    elements.editor.getBoundingClientRect = elements.scroller.getBoundingClientRect = () => {
      return {
        top   : 0,
        right : EDITOR_WIDTH,
        bottom: EDITOR_HEIGHT,
        left  : 0,
        width : EDITOR_WIDTH,
        height: EDITOR_HEIGHT,
        x     : 0,
        y     : EDITOR_HEIGHT,
        toJSON: () => '',
      };
    };
  } );

  Editor.apply( tag );

  return Editor;
}

/**
 * Clears the editor and sets the provided new code.
 *
 * @param Editor - The Editor instance to clear.
 * @param code   - The new code.
 */
export function refresh( Editor: Editor, code = '' ): void {
  const { Code }  = Editor.Components;
  const { lines, Sync } = Code;

  lines.delete( 0, lines.length );
  Code.value = code;
  Sync.sync( 0, count( code, LINE_BREAK ) );
}

/**
 * Generates huge code, starting from 0.
 *
 * @param length - A number of lines to generate.
 * @param text   - Optional. A test for all lines.
 *
 * @return Generated code.
 */
export function generate( length: number, text?: string ): string {
  return Array.from( { length } ).map( ( item, index ) => isUndefined( text ) ? index : text ).join( LINE_BREAK );
}

/**
 * Requests an animation frame and returns a Promise instance.
 *
 * @param callback - A callback function.
 *
 * @return A Promise instance.
 */
export function raf( callback: FrameRequestCallback ): Promise<void> {
  return new Promise( resolve => {
    requestAnimationFrame( () => {
      resolve( callback( 0 ) );
    } );
  } );
}

/**
 * Sets a timer with returning a Promise instance.
 *
 * @param callback - A callback function.
 * @param time     - A timer duration.
 *
 * @return A Promise instance.
 */
export function timer<T extends AnyFunction>( callback: T, time = 0 ): Promise<ReturnType<T>> {
  return new Promise( resolve => {
    setTimeout( () => {
      resolve( callback() );
    }, time );
  } );
}

/**
 * A promise that will be resolved on the next animation frame.
 *
 * @return A promise instance.
 */
export function waitForAnimationFrame(): Promise<void> {
  return raf( () => 0 );
}
