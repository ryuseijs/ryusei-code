import { DialogGroupData, Elements, UIButtonSettings } from '@ryusei/code';
import { UIComponent } from '../../classes/UIComponent/UIComponent';
import { CLASS_ACTIVE } from '../../constants/classes';
import { EVENT_INIT_STYLE } from '../../constants/events';
import { PROJECT_CODE } from '../../constants/project';
import { addClass, append, assert, attr, create, div, isString, removeClass, text } from '../../utils';
import { GENERAL_UI_BUTTONS } from './buttons';
import {
  CLASS_DIALOG,
  CLASS_DIALOG_BODY,
  CLASS_DIALOG_FOOTER,
  CLASS_DIALOG_GROUP,
  CLASS_DIALOG_HEADER,
  CLASS_DIALOG_TITLE,
} from './classes';


/**
 * The group ID of the common dialog.
 *
 * @since 0.1.0
 */
const COMMON_DIALOG_GROUP = `${ PROJECT_CODE }-common`;

/**
 * The component for displaying a dialog.
 *
 * @since 0.1.0
 */
export class Dialog extends UIComponent<DialogGroupData> {
  /**
   * Initializes the component.
   *
   * @param elements - A collection of editor elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );
    this.register( COMMON_DIALOG_GROUP, div(), '' );
  }

  /**
   * Listens to some events.
   */
  protected listen(): void {
    this.bind( window, 'click', e => {
      if ( ! this.wrapper.contains( e.target as Node ) ) {
        this.hide();
      }
    } );

    this.on( EVENT_INIT_STYLE, ( e, add ) => {
      add( `.${ CLASS_DIALOG } code`, 'fontFamily', this.options.monospaceFont );
    } );
  }

  /**
   * Creates dialog elements.
   * Note that the dialog element must/should have:
   * - an accessible name by `aria-label` or `aria-labelledby`.
   * - at least one focusable descendant element.
   *
   * @link https://www.w3.org/TR/wai-aria-1.2/#dialog
   */
  protected create(): void {
    const { elements } = this;
    const id = `${ elements.root.id }-dialog`;

    this.wrapper = div( {
      id,
      class             : CLASS_DIALOG,
      role              : 'dialog',
      'aria-labelledby' : `${ id }-title`,
      'aria-describedby': `${ id }-body`,
    }, elements.overlay );
  }

  /**
   * Called when the general confirm button is clicked.
   *
   * @internal
   */
  confirm(): void {
    this.emit( `dialog:${ this.group }:confirmed`, this );
    this.hide();
  }

  /**
   * Registers a new dialog.
   * Use `message()` instead just for showing a message.
   *
   * @example
   * ```ts
   * const ryuseiCode = new RyuseiCode();
   * const Dialog     = ryuseiCode.Editor.require( 'Dialog' );
   *
   * // The Dialog extension may not exist.
   * if ( Dialog ) {
   *   const body = document.createElement( 'p' );
   *   body.textContent = 'Hello!';
   *   Dialog.register( 'sample', body, 'Sample Dialog', [ 'confirm' ] );
   *   Dialog.show( 'sample' );
   * }
   * ```
   *
   * If you want to add custom buttons, pass an array with button settings to the `buttons`.
   *
   * ```ts
   * const settings = [
   *   {
   *     id: 'myButton',
   *     html: 'Click Me',
   *     click() {
   *       console.log( 'Clicked!' );
   *     },
   *   }
   * ];
   *
   * Dialog.register( 'sample', body, 'Sample Dialog', settings );
   * ```
   *
   * @param group   - A group ID.
   * @param elm     - An element to display as a dialog body.
   * @param title   - A title of a dialog.
   * @param buttons - Optional. General button names, `'confirm'`, `'cancel'`, or objects with button settings.
   */
  register(
    group: string,
    elm: HTMLElement,
    title: string,
    buttons?: Array<keyof typeof GENERAL_UI_BUTTONS | UIButtonSettings<Dialog>>
  ): void {
    const settings = ( buttons || [ 'confirm' ] )
      .map( settings => isString( settings ) ? GENERAL_UI_BUTTONS[ settings ] : settings )
      .filter( Boolean );

    assert( settings.length );

    const { id } = this.wrapper;
    const groupElm  = div( CLASS_DIALOG_GROUP );
    const headerElm = create( 'header', CLASS_DIALOG_HEADER );
    const titleElm  = create( 'h3', { id: `${ id }-title`, class: CLASS_DIALOG_TITLE }, headerElm );
    const footerElm = create( 'footer', CLASS_DIALOG_FOOTER );
    const button    = this.createCloseButton( { 'aria-controls': id } );

    attr( elm, { id: `${ id }-body`, class: CLASS_DIALOG_BODY } );
    text( titleElm, title );
    addClass( button, `${ CLASS_DIALOG }__close` );
    append( groupElm, [ headerElm, elm, footerElm, button ] );

    this.groups[ group ] = {
      elm    : groupElm,
      title  : titleElm,
      body   : elm,
      buttons: this.createButtons<Dialog>( settings, footerElm, this ),
    };
  }

  /**
   * Opens the specified dialog. The dialog must be registered by `register()` before opening it.
   *
   * @param group - A dialog ID to open.
   */
  show( group: string ): void {
    this.hide();
    super.show( group );

    this.Editor.readOnly = true;
    addClass( this.elements.overlay, CLASS_ACTIVE );

    this.autoFocus( group );
    this.emit( 'dialog:opened', this, group );
  }

  /**
   * Closes the dialog which is visible now. Nothing will happen when there is no shown dialog.
   */
  hide(): void {
    if ( this.isActive() ) {
      this.Editor.readOnly = false;

      super.hide();
      removeClass( this.elements.overlay, CLASS_ACTIVE );

      this.Selection.reselect();
      this.emit( 'dialog:closed', this, this.group );
    }
  }

  /**
   * Displays a message with a common dialog. No registration required.
   *
   * @param message - A message to display.
   * @param title   - Optional. A title of a dialog. If omitted, uses the `notice` in the `i18n` collection.
   */
  message( message: string, title?: string ): void {
    const data = this.groups[ COMMON_DIALOG_GROUP ];

    text( data.title, title || this.i18n.notice );
    text( data.body, message );

    this.show( COMMON_DIALOG_GROUP );
  }
}
