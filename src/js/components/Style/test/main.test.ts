import { EVENT_INIT_STYLE } from '../../../constants/events';
import { init } from '../../../test';
import { unit } from '../../../utils';


describe( 'Style', () => {
  test( 'can render a style tag.', () => {
    const Editor  = init();
    const html    = Editor.html( '' );
    const matches = html.match( /<style.*?<\/style>/ );
    const options = Editor.options;

    expect( matches ).not.toBeNull();
    expect( matches[ 0 ].includes( `min-width: ${ unit( options.minWidth ) }` ) ).toBe( true );
    expect( matches[ 0 ].includes( `max-width: ${ unit( options.maxWidth ) }` ) ).toBe( true );
    expect( matches[ 0 ].includes( `max-height: ${ unit( options.maxHeight ) }` ) ).toBe( true );
    expect( matches[ 0 ].includes( `tab-size: ${ options.tabSize }` ) ).toBe( true );
  } );

  test( 'can add any styles through the init event.', () => {
    const Editor = init();

    Editor.event.on( EVENT_INIT_STYLE, ( e, add ) => {
      add( '.my-class', 'fontSize', '20px' );
    } );

    const html    = Editor.html( '' );
    const matches = html.match( /<style.*?<\/style>/ );

    expect( matches[ 0 ].includes( `#${ Editor.options.id } .my-class{font-size: 20px;}` ) ).toBe( true );
  } );

  test( 'should remove the style tag after destruction.', () => {
    const Editor = init( '', { id: 'editor' } );
    const { id } = Editor.options;
    expect( document.querySelector( `head #${ id }-style` ) ).not.toBeNull();

    Editor.destroy();
    expect( document.querySelector( `head #${ id }-style` ) ).toBeNull();
  } );
} );
