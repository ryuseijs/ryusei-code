import { CLASS_BODY, CLASS_CONTAINER, CLASS_ROOT, CLASS_SCROLLER, CLASS_VIEW } from '../../../constants/classes';
import { CODE_SHORT, EDITOR_HTML_SHORT } from '../../../test';
import { format } from '../../../utils';
import { RyuseiCode } from '../../RyuseiCode/RyuseiCode';


describe( 'Renderer', () => {
  test( 'can build the HTML of the editor.', () => {
    const ryuseiCode = new RyuseiCode( { id: 'ryuseicode01' } );
    const html       = ryuseiCode.html( CODE_SHORT );
    const options    = ryuseiCode.Editor.options;

    expect( html ).toBe( format(
      EDITOR_HTML_SHORT,
      options.minWidth,
      options.minHeight,
      options.maxWidth,
      options.maxHeight,
      options.tabSize
    ) );
  } );

  test( 'should emit events when opening a new tag.', () => {
    const ryuseiCode = new RyuseiCode();

    const onRootOpen      = jest.fn();
    const onViewOpen      = jest.fn();
    const onBodyOpen      = jest.fn();
    const onScrollerOpen  = jest.fn();
    const onContainerOpen = jest.fn();
    const onEditorOpen    = jest.fn();

    ryuseiCode.on( 'root:open', onRootOpen );
    ryuseiCode.on( 'view:open', onViewOpen );
    ryuseiCode.on( 'body:open', onBodyOpen );
    ryuseiCode.on( 'scroller:open', onScrollerOpen );
    ryuseiCode.on( 'container:open', onContainerOpen );
    ryuseiCode.on( 'editor:open', onEditorOpen );

    ryuseiCode.html( CODE_SHORT );

    expect( onRootOpen ).toHaveBeenCalled();
    expect( onViewOpen ).toHaveBeenCalled();
    expect( onBodyOpen ).toHaveBeenCalled();
    expect( onScrollerOpen ).toHaveBeenCalled();
    expect( onContainerOpen ).toHaveBeenCalled();
    expect( onEditorOpen ).toHaveBeenCalled();
  } );

  test( 'can accept additional classes through events.', () => {
    const ryuseiCode = new RyuseiCode();

    ryuseiCode.on( 'root:open', ( e, append, classes ) => {
      classes.push( 'my-class' );
    } );

    document.body.innerHTML = ryuseiCode.html( CODE_SHORT );

    const root = document.querySelector( `.${ CLASS_ROOT }` );
    expect( root.classList.contains( 'my-class' ) ).toBe( true );
  } );

  test( 'can accept additional HTML through events.', () => {
    const ryuseiCode = new RyuseiCode();
    const { event } = ryuseiCode.Editor;

    event.on( 'view:open', ( e, append ) => {
      append( '<span class="root-first-child"></span>' );
    }, null, 0 );

    event.on( 'body:open', ( e, append ) => {
      append( '<span class="view-first-child"></span>' );
    }, null, 0 );

    event.on( 'scroller:open', ( e, append ) => {
      append( '<span class="body-first-child"></span>' );
    }, null, 0 );

    event.on( 'container:open', ( e, append ) => {
      append( '<span class="scroller-first-child"></span>' );
    }, null, 0 );

    event.on( 'editor:open', ( e, append ) => {
      append( '<span class="container-first-child"></span>' );
    }, null, 0 );

    document.body.innerHTML = ryuseiCode.html( CODE_SHORT );

    const root      = document.querySelector( `.${ CLASS_ROOT }` );
    const view      = document.querySelector( `.${ CLASS_VIEW }` );
    const body      = document.querySelector( `.${ CLASS_BODY }` );
    const scroller  = document.querySelector( `.${ CLASS_SCROLLER }` );
    const container = document.querySelector( `.${ CLASS_CONTAINER }` );

    expect( root.firstElementChild.classList.contains( 'root-first-child' ) ).toBe( true );
    expect( view.firstElementChild.classList.contains( 'view-first-child' ) ).toBe( true );
    expect( body.firstElementChild.classList.contains( 'body-first-child' ) ).toBe( true );
    expect( scroller.firstElementChild.classList.contains( 'scroller-first-child' ) ).toBe( true );
    expect( container.firstElementChild.classList.contains( 'container-first-child' ) ).toBe( true );
  } );
} );
