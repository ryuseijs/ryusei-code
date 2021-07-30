import { Elements, EventBusEvent } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { CLASS_CARETS } from '../../constants/classes';
import { EVENT_READONLY, EVENT_SELECTED, EVENT_SELECTING } from '../../constants/events';
import { CHANGED, COLLAPSED, SELECTED } from '../../constants/selection-states';
import { assert, div, isIE, isMobile, rafThrottle } from '../../utils';
import { Selection } from '../Selection/Selection';
import { CustomCaret } from './CustomCaret';


/**
 * The ID of the primary caret.
 *
 * @since 0.1.0
 */
export const PRIMARY_CARET_ID = 'primary';

/**
 * The component for generating and handling carets.
 *
 * @since 0.1.0
 */
export class Caret extends Component {
  /**
   * The wrapper element that contains caret elements.
   */
  private wrapper: HTMLDivElement;

  /**
   * Stores the all registered Caret instances.
   */
  private carets: Record<string, CustomCaret> = {};

  /**
   * Holds the primary Caret instance.
   */
  private primary: CustomCaret;

  /**
   * Mounts the component.
   * Uses the native caret on IE and mobile devices.
   *
   * @param elements - A collection of essential editor elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );
    this.create();

    if ( ! isIE() && ! isMobile() ) {
      this.register( PRIMARY_CARET_ID );
      this.primary = this.get( PRIMARY_CARET_ID );
      this.listen();
    }
  }

  /**
   * Creates a wrapper element that contains carets.
   */
  private create(): void {
    this.wrapper = div( {
      class        : CLASS_CARETS,
      role         : 'presentation',
      'aria-hidden': true,
    }, this.elements.editor );
  }

  /**
   * Listens to some events.
   */
  private listen(): void {
    const { editable } = this.elements;
    const { primary, Editor } = this;

    this.bind( editable, 'focus', () => {
      if ( ! Editor.readOnly ) {
        primary.show();
      }
    } );

    this.bind( editable, 'blur', () => {
      primary.hide();
    } );

    this.update = rafThrottle( this.update.bind( this ) );

    this.on( EVENT_READONLY, ( e, readOnly ) => {
      if ( readOnly ) {
        primary.hide();
      } else {
        if ( Editor.isFocused() ) {
          this.update();
          primary.show();
        }
      }
    } );

    this.on( EVENT_SELECTED, this.onSelected, this );
    this.on( EVENT_SELECTING, this.update );
  }

  /**
   * Called when the selection state is changed.
   *
   * @param e         - An EventBusEvent object.
   * @param Selection - A Selection instance.
   */
  private onSelected( e: EventBusEvent, Selection: Selection ): void {
    if ( ! this.Editor.readOnly ) {
      if ( Selection.is( CHANGED, COLLAPSED, SELECTED ) ) {
        this.update();
      }
    }
  }

  /**
   * Updates the primary caret position on the animation frame.
   */
  private update(): void {
    this.primary.move( this.Selection.get( false ).end );
  }

  /**
   * Registers a new caret.
   *
   * @param id - An ID for the caret to register.
   *
   * @return A registered Caret instance.
   */
  register( id: string ): CustomCaret {
    const { carets } = this;
    assert( ! carets[ id ] );

    const caret = new CustomCaret( this.Editor, id, this.wrapper );
    carets[ id ] = caret;

    return caret;
  }

  /**
   * Returns the primary or the particular caret.
   *
   * @param id - Optional. A caret ID.
   *
   * @return A Caret instance if available, or otherwise `undefined`.
   */
  get( id = PRIMARY_CARET_ID ): CustomCaret | undefined {
    return this.carets[ id ];
  }

  /**
   * Returns the DOMRect object of the native caret.
   *
   * @return A DOMRect object.
   */
  get rect(): DOMRect | null {
    return this.Selection.getRect( true );
  }
}
