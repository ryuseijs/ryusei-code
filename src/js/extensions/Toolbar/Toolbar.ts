import { ToolbarGroupData } from '@ryusei/code';
import { UIComponent } from '../../classes/UIComponent/UIComponent';
import { EVENT_RESIZE } from '../../constants/events';
import { addClass, append, attr, div, height, isIE, prepend, removeClass, styles, unit } from '../../utils';
import { CLASS_TOOLBAR, CLASS_TOOLBAR_BODY, CLASS_TOOLBAR_GROUP, CLASS_TOOLBAR_UI } from './classes';


/**
 * The class for creating a toolbar.
 *
 * @since 0.1.0
 */
export class Toolbar extends UIComponent<ToolbarGroupData> {
  /**
   * Holds the toolbar element.
   */
  private body: HTMLDivElement;

  /**
   * Listens to some events and receives requests from other components.
   */
  protected listen(): void {
    super.listen();
    this.on( EVENT_RESIZE, this.resize, this );
  }

  /**
   * Creates toolbar elements.
   *
   * @link https://www.w3.org/TR/wai-aria-1.2/#toolbar
   */
  protected create(): void {
    const { elements } = this;
    const id      = `${ elements.root.id }-toolbar`;
    const wrapper = div( { id, role: 'toolbar', class: CLASS_TOOLBAR } );
    const close   = this.createCloseButton( { 'aria-controls': id } );

    this.body = div( CLASS_TOOLBAR_BODY, wrapper );

    append( div( CLASS_TOOLBAR_UI, wrapper ), close );
    prepend( elements.root, wrapper );

    this.wrapper = wrapper;
  }

  /**
   * Appends the group element to the body element instead of the wrapper element.
   *
   * @param group - A group ID.
   */
  protected append( group: string ): void {
    append( this.body, this.groups[ group ].elm );
  }

  /**
   * Resizes the scroller according to the toolbar height.
   */
  private resize(): void {
    if ( isIE() && this.isActive() ) {
      const maxHeight = styles( this.elements.root, 'maxHeight' );
      styles( this.elements.body, { maxHeight: `calc(${ maxHeight } - ${ unit( height( this.wrapper ) ) })` } );
    }
  }

  /**
   * Registers a group to the toolbar.
   *
   * @param group - A group ID.
   * @param elm   - An element to register.
   * @param label - A label of the toolbar.
   */
  register( group: string, elm: HTMLDivElement, label: string ): void {
    addClass( elm, CLASS_TOOLBAR_GROUP );
    this.groups[ group ] = { elm, label };
  }

  /**
   * Displays the toolbar.
   *
   * @param group - A group ID to display.
   */
  show( group: string ): void {
    const { pageXOffset, pageYOffset } = window;
    const { wrapper } = this;

    super.show( group );
    this.resize();

    if ( this.group ) {
      removeClass( wrapper, `${ CLASS_TOOLBAR }--${ this.group }` );
    }

    addClass( wrapper, `${ CLASS_TOOLBAR }--${ group }` );
    attr( wrapper, { 'aria-label': this.groups[ group ].label } );

    this.autoFocus( group );

    window.scrollTo( pageXOffset, pageYOffset );
    this.View.emitResize();

    this.emit( 'toolbar:opened', this, group );
  }

  /**
   * Hides the toolbar.
   */
  hide(): void {
    const { pageXOffset, pageYOffset } = window;
    super.hide();

    removeClass( this.wrapper, `${ CLASS_TOOLBAR }--${ this.group }` );
    styles( this.elements.body, { maxHeight: '' } );

    this.Selection.reselect();
    window.scrollTo( pageXOffset, pageYOffset );

    this.View.emitResize();
    this.emit( 'toolbar:closed', this, this.group );
  }
}
