import { CLASS_MARKER, CLASS_MARKERS } from '../../../constants/classes';
import { EVENT_CHANGED } from '../../../constants/events';
import { CODE_BRACKETS, init, LINE_HEIGHT, raf, refresh } from '../../../test';
import { MARKER_ID } from '../Guide';


describe( 'Dialog#message()', () => {
  const Editor = init( CODE_BRACKETS );
  const { Code, Sync } = Editor.Components;
  const selector = `.${ CLASS_MARKERS }--${ MARKER_ID } .${ CLASS_MARKER }`;

  test( 'can render indent guides.', () => {
    return raf( () => {
      const markers = document.querySelectorAll<HTMLElement>( selector );
      expect( markers.length ).toBeGreaterThan( 0 );

      expect( markers[ 0 ].style.top ).toBe( `${ LINE_HEIGHT * 2 }px` );

      expect( markers[ 1 ].style.top ).toBe( `${ LINE_HEIGHT * 3 }px` );
      expect( markers[ 2 ].style.top ).toBe( `${ LINE_HEIGHT * 3 }px` );

      expect( markers[ 3 ].style.top ).toBe( `${ LINE_HEIGHT * 4 }px` );
      expect( markers[ 4 ].style.top ).toBe( `${ LINE_HEIGHT * 4 }px` );
      expect( markers[ 4 ].style.top ).toBe( `${ LINE_HEIGHT * 4 }px` );
    } );
  } );

  test( 'should render guides again when the content is changed.', () => {
    Code.replaceLinesBy( 0, Code.size - 1, ( line: string ) => {
      return line.replace( '  ', '' );
    } );

    Sync.sync( 0, Code.size - 1 );
    Editor.event.emit( EVENT_CHANGED );

    return raf( () => {
      const markers = document.querySelectorAll<HTMLElement>( selector );
      expect( markers.length ).toBeGreaterThan( 0 );

      expect( markers[ 0 ].style.top ).toBe( `${ LINE_HEIGHT * 3 }px` );

      expect( markers[ 1 ].style.top ).toBe( `${ LINE_HEIGHT * 4 }px` );
      expect( markers[ 2 ].style.top ).toBe( `${ LINE_HEIGHT * 4 }px` );
    } );
  } );

  test( 'should keep rendering guides on empty lines.', () => {
    const code = '    a\n'
      + '\n'
      + '  \n'
      + '    a\n';

    refresh( Editor, code );
    Editor.event.emit( EVENT_CHANGED );

    return raf( () => {
      const markers = document.querySelectorAll<HTMLElement>( selector );
      expect( markers.length ).toBeGreaterThan( 0 );

      expect( markers[ 0 ].style.top ).toBe( `0px` );
      expect( markers[ 1 ].style.top ).toBe( `${ LINE_HEIGHT }px` );
      expect( markers[ 2 ].style.top ).toBe( `${ LINE_HEIGHT * 2 }px` );
      expect( markers[ 3 ].style.top ).toBe( `${ LINE_HEIGHT * 3 }px` );
    } );
  } );
} );
