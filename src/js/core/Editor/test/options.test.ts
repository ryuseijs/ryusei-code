import { CLASS_READONLY } from '../../../constants/classes';
import { EVENT_READONLY } from '../../../constants/events';
import { CODE_SHORT } from '../../../test';
import { RyuseiCode } from '../../RyuseiCode/RyuseiCode';


describe( 'Editor#options()', () => {
  beforeEach( () => {
    document.body.innerHTML = `<pre>${ CODE_SHORT }</pre>`;
  } );

  test( 'can make the editor read-only.', () => {
    const ryuseiCode = new RyuseiCode( { readOnly: true } );
    const Editor     = ryuseiCode.Editor;
    const callback   = jest.fn();

    ryuseiCode.on( EVENT_READONLY, ( e, readOnly ) => {
      if ( readOnly ) {
        callback();
      }
    } );

    ryuseiCode.apply( 'pre' );

    expect( Editor.elements.root.classList.contains( CLASS_READONLY ) ).toBe( true );
    expect( callback ).toHaveBeenCalled();
  } );

  test( 'can make the editor focus after initialization.', () => {
    const ryuseiCode = new RyuseiCode( { autofocus: true } );
    ryuseiCode.apply( 'pre' );
    expect( ryuseiCode.Editor.isFocused() ).toBe( true );
  } );
} );
