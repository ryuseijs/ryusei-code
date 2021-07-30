import { Elements, JumpOptions } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { EVENT_KEYMAP } from '../../constants/events';
import { Editor } from '../../core/Editor/Editor';
import { between, create, debounce, div, matchesKey, prevent, text } from '../../utils';
import { Toolbar } from '../Toolbar/Toolbar';
import { I18N } from './i18n';
import { KEYMAP } from './keymap';


/**
 * The ID for the "Jump to the Line" toolbar.
 *
 * @since 0.1.0
 */
export const TOOLBAR_ID = 'jump-to-line';

/**
 * The throttle duration for applying the input result to the range.
 *
 * @since 0.1.0
 */
export const JUMP_DEBOUNCE_DURATION = 10;

/**
 * The class for jumping to the specific line.
 *
 * @since 0.1.0
 */
export class Jump extends Component {
  /**
   * Holds the Toolbar component.
   */
  private Toolbar: Toolbar;

  /**
   * Holds the input element.
   */
  private field: HTMLInputElement;

  /**
   * Holds the location element.
   */
  private location: HTMLSpanElement;

  /**
   * The Indentation constructor.
   *
   * @param Editor - An Editor instance.
   */
  constructor( Editor: Editor ) {
    super( Editor );
    this.addI18n( I18N );
    this.addKeyBindings( KEYMAP );
  }

  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */
  mount( elements: Elements ): void {
    if ( ! ( this.Toolbar = this.require( 'Toolbar' ) ) ) {
      return;
    }

    super.mount( elements );

    this.create();
    this.listen();
  }

  /**
   * Creates elements for the jump interface and registers the wrapper to the toolbar.
   */
  private create(): void {
    const wrapper = div();

    this.field = this.Toolbar.createField( { id: 'jumpToLine', tabindex: 1 }, wrapper );

    if ( ! this.getOptions<JumpOptions>( 'jump' ).hideLocation ) {
      this.location = create( 'span', null, wrapper );
    }

    this.Toolbar.register( TOOLBAR_ID, wrapper, this.i18n.jumpToolbar );
  }

  /**
   * Listens to some events.
   */
  private listen(): void {
    this.on( `${ EVENT_KEYMAP }:jumpToLine`, ( e, ke ) => {
      this.update();
      this.Toolbar.show( TOOLBAR_ID );
      prevent( ke );
    } );

    this.bind( this.field, 'input', debounce( this.jump.bind( this ), JUMP_DEBOUNCE_DURATION ) );

    this.bind( this.field, 'keydown', ( e: KeyboardEvent ) => {
      if ( matchesKey( e, this.options.keymap.jumpToLine ) ) {
        prevent( e );
      }
    } );
  }

  /**
   * Jumps to the line specified by the input.
   */
  private jump(): void {
    const row = parseInt( this.field.value ) - 1;

    if ( ! isNaN( row ) && between( row, 0, this.lines.length - 1 ) ) {
      this.View.jump( row, true );

      this.Selection.set( [ row, 0 ] );
      this.field.focus();
      this.update();

      this.emit( 'jump:jumped' );
    }
  }

  /**
   * Updates the location.
   */
  private update(): void {
    if ( this.location ) {
      text( this.location, this.Selection.getLocation() );
    }
  }
}
