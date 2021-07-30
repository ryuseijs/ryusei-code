import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { EVENT_KEYMAP } from '../../constants/events';
import { Editor } from '../../core/Editor/Editor';
import { endsWith, isPrevented, prevent } from '../../utils';
import { KEYMAP } from './keymap';


/**
 * The class for handling some shortcuts.
 *
 * @since 0.1.0
 */
export class Shortcut extends Component {
  /**
   * The Search constructor.
   *
   * @param Editor - An Editor instance.
   */
  constructor( Editor: Editor ) {
    super( Editor );
    this.addKeyBindings( KEYMAP );
  }

  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );

    const { Selection, Measure, Edit } = this;

    this.on( `${ EVENT_KEYMAP }:copyLine`, ( e, ke ) => {
      if ( Selection.isCollapsed() && ! isPrevented( ke ) ) {
        Selection.selectLine( undefined, true, true );
        Edit.copy();
        prevent( ke );
      }
    } );

    this.on( `${ EVENT_KEYMAP }:cutLine`, ( e, ke ) => {
      if ( Selection.isCollapsed() && ! isPrevented( ke ) ) {
        Edit.cutLine();
        prevent( ke );
      }
    } );

    this.on( `${ EVENT_KEYMAP }:moveUp ${ EVENT_KEYMAP }:moveDown`, ( e, ke ) => {
      const { scroller } = elements;
      scroller.scrollTop += ( endsWith( e.type, 'n' ) ? 1 : -1 ) * Measure.lineHeight;
      prevent( ke );
    } );
  }
}
