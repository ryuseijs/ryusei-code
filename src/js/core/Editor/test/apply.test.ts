import { CLASS_INITIALIZED } from '../../../constants/classes';
import { CODE_SHORT } from '../../../test';
import { RyuseiCode } from '../../RyuseiCode/RyuseiCode';
import { Editor } from '../Editor';


describe( 'Editor#apply()', () => {
  let ryuseiCode: RyuseiCode;
  let Editor: Editor;

  beforeEach( () => {
    ryuseiCode = new RyuseiCode();
    Editor     = ryuseiCode.Editor;
    document.body.innerHTML = `<pre>${ CODE_SHORT }</pre>`;
  } );

  test( 'can apply the editor to the specified element by a selector.', () => {
    ryuseiCode.apply( 'pre' );

    const { root } = Editor.elements;
    expect( root.classList.contains( CLASS_INITIALIZED ) ).toBe( true );
    expect( Editor.value ).toBe( CODE_SHORT );
  } );

  test( 'can apply the editor to the specified element.', () => {
    const pre = document.querySelector( 'pre' );
    ryuseiCode.apply( pre );

    const { root } = Editor.elements;
    expect( root.classList.contains( CLASS_INITIALIZED ) ).toBe( true );
    expect( Editor.value ).toBe( CODE_SHORT );
  } );

  test( 'should collect editor elements after `apply`.', () => {
    ryuseiCode.apply( 'pre' );

    [
      'root',
      'editor',
      'lines',
      'editable',
      'body',
      'scroller',
      'container',
      'overlay',
      'background',
    ].forEach( key => {
      expect( Editor.elements[ key ] ).not.toBeUndefined();
    } );
  } );

  test( 'should emit `mounted` event after `apply`.', () => {
    const callback = jest.fn();

    ryuseiCode.on( 'mounted', callback );
    expect( callback ).not.toHaveBeenCalled();

    ryuseiCode.apply( 'pre' );
    expect( callback ).toHaveBeenCalled();
  } );
} );
