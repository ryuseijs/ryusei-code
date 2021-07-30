import * as CoreComponents from '../../../components';
import { CODE_SHORT, EDITOR_HTML_SHORT, init, TestComponent } from '../../../test';
import { format } from '../../../utils';
import { RyuseiCode } from '../../RyuseiCode/RyuseiCode';
import { Editor } from '../Editor';


describe( 'Editor', () => {
  RyuseiCode.compose( { TestComponent } );

  let Editor: Editor;

  beforeEach( () => {
    Editor = init( CODE_SHORT, { id: 'ryuseicode01' } );
  } );

  test( 'should compose core components.', () => {
    Object.keys( CoreComponents ).forEach( key => {
      expect( Editor.Components[ key ] ).not.toBeUndefined();
    } );
  } );

  test( 'should compose additional components.', () => {
    expect( Editor.require( 'TestComponent' ) instanceof TestComponent ).toBe( true );
  } );

  test( 'can return the editor of the HTML.', () => {
    const html    = Editor.html( CODE_SHORT, true );
    const options = Editor.options;

    expect( html ).toBe( format(
      EDITOR_HTML_SHORT,
      options.minWidth,
      options.minHeight,
      options.maxWidth,
      options.maxHeight,
      options.tabSize
    ) );
  } );
} );
