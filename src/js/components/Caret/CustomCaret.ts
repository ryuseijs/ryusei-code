import { Position } from '@ryusei/code';
import { CLASS_ACTIVE, CLASS_CARET } from '../../constants/classes';
import { EVENT_RESIZE } from '../../constants/events';
import { Editor } from '../../core/Editor/Editor';
import { addClass, debounce, div, removeClass, styles, unit } from '../../utils';


/**
 * The offset amount for the horizontal position of the caret.
 *
 * @since 0.1.0
 */
const HORIZONTAL_OFFSET = -1;

/**
 * The debounce duration for the `blink` method.
 *
 * @since 0.1.0
 */
const BLINK_DEBOUNCE_DURATION = 30;

/**
 * The class for creating and controlling the caret element.
 *
 * @since 0.1.0
 */
export class CustomCaret {
  /**
   * The caret element.
   */
  readonly caret: HTMLDivElement;

  /**
   * Holds the Editor instance.
   */
  private readonly Editor: Editor;

  /**
   * Keeps the current position.
   */
  private position: Position;

  /**
   * The Caret constructor.
   *
   * @param Editor - An Editor instance.
   * @param id     - An ID for the caret.
   * @param parent - A parent element where the caret is appended.
   */
  constructor( Editor: Editor, id: string, parent: HTMLElement ) {
    this.Editor = Editor;
    this.caret  = div( [ CLASS_CARET, `${ CLASS_CARET }--${ id }` ], parent );
    this.blink  = debounce( this.blink.bind( this ), BLINK_DEBOUNCE_DURATION );

    Editor.event.on( EVENT_RESIZE, () => {
      if ( this.position ) {
        this.move( this.position );
      }
    } );
  }

  /**
   * Moves the caret to the specified position.
   *
   * @param position - A position to set as [ row, col ].
   */
  move( position: Position ): void {
    const { Measure } = this.Editor.Components;
    const rect = Measure.getOffset( position );

    styles( this.caret, {
      top      : unit( rect.top ),
      left     : unit( rect.left + HORIZONTAL_OFFSET ),
      animation: 'none',
    } );

    this.blink();
    this.position = position;
  }

  /**
   * Displays the caret.
   */
  show(): void {
    addClass( this.caret, CLASS_ACTIVE );
  }

  /**
   * Hides teh caret.
   */
  hide(): void {
    removeClass( this.caret, CLASS_ACTIVE );
  }

  /**
   * Starts the blink animation by removing the `none` value from the `animation`.
   */
  private blink(): void {
    styles( this.caret, { animation: '' } );
  }
}
