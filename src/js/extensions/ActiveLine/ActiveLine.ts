import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { CLASS_ACTIVE } from '../../constants/classes';
import {
  EVENT_BLUR,
  EVENT_FOCUS,
  EVENT_FOCUS_LINE_CHANGED,
  EVENT_INIT_STYLE,
  EVENT_READONLY,
  EVENT_RESIZE,
} from '../../constants/events';
import { PROJECT_CODE } from '../../constants/project';
import { Editor } from '../../core/Editor/Editor';
import { addClass, div, hasClass, removeClass, styles, unit } from '../../utils';


/**
 * The class name for the active line element.
 *
 * @since 0.1.0
 */
export const CLASS_ACTIVE_LINE = `${ PROJECT_CODE }__active-line`;

/**
 * The component for activating/deactivating lines according to the current selection.
 *
 * @since 0.1.0
 */
export class ActiveLine extends Component {
  /**
   * Holds the active line element.
   */
  private line: HTMLDivElement;

  /**
   * Keeps the previous top offset.
   */
  private top: number;

  /**
   * The ActiveLine constructor.
   *
   * @param Editor - An Editor instance.
   */
  constructor( Editor: Editor ) {
    super( Editor );

    this.on( EVENT_INIT_STYLE, ( e, add ) => {
      add( `.${ CLASS_ACTIVE_LINE }`, 'height', this.options.lineHeight );
    } );
  }

  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );

    this.line = div( { class: CLASS_ACTIVE_LINE }, elements.background );

    this.on( [ EVENT_FOCUS, EVENT_FOCUS_LINE_CHANGED, EVENT_READONLY ], ( e, readOnly ) => {
      if ( e.type !== EVENT_READONLY || ! readOnly ) {
        this.activate();
        this.offset();
      } else {
        this.deactivate();
      }
    } );

    this.on( EVENT_BLUR, this.deactivate, this );
    this.on( EVENT_RESIZE, this.offset, this );
  }

  /**
   * Activates the element.
   */
  private activate(): void {
    const { Editor } = this;

    if ( Editor.isFocused() && ! Editor.readOnly ) {
      if ( ! this.isActive() ) {
        addClass( this.line, CLASS_ACTIVE );
        this.emit( 'activeLine:activated' );
      }
    }
  }

  /**
   * Offsets the active line element to the current focus node.
   */
  private offset(): void {
    if ( this.isActive() ) {
      const { Measure } = this;
      const top = Measure.getTop( this.Selection.focus[ 0 ] ) + Measure.padding.top;

      if ( this.top !== top ) {
        styles( this.line, { top: unit( ( this.top = top ) ) } );
        this.emit( 'activeLine:updated' );
      }
    }
  }

  /**
   * Deactivates the element.
   */
  private deactivate(): void {
    removeClass( this.line, CLASS_ACTIVE );
    this.top = -1;
    this.emit( 'activeLine:deactivated' );
  }

  /**
   * Checks if the element is active or not.
   *
   * @return `true` if the element is active, or otherwise `false`.
   */
  private isActive(): boolean {
    return hasClass( this.line, CLASS_ACTIVE );
  }
}
