import { Elements } from '@ryusei/code';
import { EVENT_BLUR, EVENT_FOCUS } from '../../constants/events';
import { ARROW_KEYS } from '../../constants/keys';
import {
  CHANGED,
  CLICKED_RIGHT,
  COLLAPSED,
  END,
  EXTEND,
  IDLE,
  SELECTED,
  SELECTING,
  START,
  UPDATE,
} from '../../constants/selection-states';
import { Editor } from '../../core/Editor/Editor';
import { State as Base } from '../../event/State';
import { activeElement, getSelection, includes, isPrevented, normalizeKey, off, on } from '../../utils';
import { Selection } from './Selection';


/**
 * The class for observing the selection states.
 *
 * @since 0.1.0
 */
export class State extends Base<number> {
  /**
   * Holds collection of elements.
   */
  private readonly elements: Elements;

  /**
   * Holds the Editor instance.
   */
  private readonly Editor: Editor;

  /**
   * Holds the Selection instance.
   */
  private readonly Selection: Selection;

  /**
   * The WeakMap key for identifying event handlers(just uses a new empty object).
   */
  private readonly key = {};

  /**
   * Describes what device makes the selection change.
   */
  device: 'pointer' | 'keyboard';

  /**
   * The State constructor.
   *
   * @param Editor - An Editor instance.
   */
  constructor( Editor: Editor ) {
    super( IDLE );
    this.Editor    = Editor;
    this.elements  = Editor.elements;
    this.Selection = Editor.Components.Selection;
    this.listen();
  }

  /**
   * Listens to some events.
   * Note that the `mouseup` event of `window` needs to be listened to instead of the editable element,
   * because users may release the mouse outside of it.
   */
  private listen(): void {
    const { editable } = this.elements;
    const { event } = this.Editor;
    const { key } = this;

    const onKeydown = this.onKeydown.bind( this );

    on( document, 'selectionchange', this.onSelectionChange.bind( this ), key );
    on( window, 'pointerup', this.onSelectionEnd.bind( this ), key );

    on( editable, 'pointerdown', this.onSelectionStart.bind( this ), key );
    on( editable, 'keydown', onKeydown, key );
    on( editable, 'keyup', this.onKeyup.bind( this ), key );

    event.on( EVENT_FOCUS, this.onFocus.bind( this ) );
    event.on( EVENT_BLUR, this.onBlur.bind( this ) );
  }

  /**
   * Called when the editor is focused.
   */
  private onFocus(): void {
    if ( this.is( IDLE ) ) {
      this.set( COLLAPSED );
    }
  }

  /**
   * Called when the editor is blurred.
   * Needs to check the Components existence because this may be called after destruction.
   */
  private onBlur(): void {
    if ( this.Editor.Components ) {
      if ( ! this.isFocused() ) {
        this.set( IDLE );
      }
    }
  }

  /**
   * Called whenever the selection of the document is changed.
   * - Only handles the change made by the editable element.
   * - Detects the selection change that made by the start action, such as `pointerdown` and
   *   makes the state go into the `CHANGED` state.
   * - If the selection changes after `CHANGED`, which means user selects texts and the range is not collapsed,
   *   makes the state go into the `SELECTING` state.
   * - In FF, the event is sometimes fired after `pointerdown`.
   * - In iOS, the event is fired after `pointerup`.
   */
  private onSelectionChange(): void {
    if ( activeElement() !== this.Editor.elements.editable ) {
      return;
    }

    if ( this.is( START, EXTEND ) ) {
      this.set( CHANGED );
    } else if ( this.is( CHANGED ) ) {
      this.set( SELECTING );
    } else if ( this.is( COLLAPSED, SELECTED ) ) {
      if ( getSelection().isCollapsed ) {
        this.set( CHANGED );
        this.set( COLLAPSED );
      } else {
        this.set( SELECTING );
        this.set( SELECTED );
      }
    }
  }

  /**
   * Called when the pointer becomes active or when arrow keys are pressed.
   * If a shift key is pressed,
   * that means the existing selection is being updated instead that a new one is created.
   *
   * @param e - An event object.
   */
  private onSelectionStart( e: PointerEvent | KeyboardEvent ): void {
    if ( isPrevented( e ) ) {
      return;
    }

    this.device = e instanceof PointerEvent ? 'pointer' : 'keyboard';

    const { Selection } = this;

    if ( e instanceof PointerEvent ) {
      if ( e.button === 2 && Selection.isInside( e.clientX, e.clientY ) ) {
        this.set( CLICKED_RIGHT );
        return;
      }
    }

    this.set( e.shiftKey ? EXTEND : START );
  }

  /**
   * Called when the `pointerup` or `keyup` event is triggered on the window object.
   * Note that the state goes into `SELECTED` when the previous state is `EXTEND`
   * even if the native selection is collapsed,
   * because an anchor node may disappear after scrolling.
   * The selection is correctly handled by the Selection class.
   */
  private onSelectionEnd(): void {
    if ( this.device && ! this.is( IDLE ) ) {
      this.device = null;

      if ( ! this.is( CLICKED_RIGHT ) ) {
        if ( this.is( EXTEND ) ) {
          this.set( SELECTED );
        } else {
          this.set( END );
          this.set( getSelection().isCollapsed ? COLLAPSED : SELECTED );
        }
      }
    }
  }

  /**
   * Called when any key is pressed.
   *
   * @param e - A KeyboardEvent object.
   */
  private onKeydown( e: KeyboardEvent ): void {
    if ( includes( ARROW_KEYS, normalizeKey( e.key ) ) ) {
      this.onSelectionStart( e );
    }
  }

  /**
   * Called when any key is released.
   *
   * @param e - A KeyboardEvent object.
   */
  private onKeyup( e: KeyboardEvent ): void {
    if ( includes( ARROW_KEYS, normalizeKey( e.key ) ) ) {
      this.onSelectionEnd();
    }
  }

  /**
   * Checks if the editor or the context menu has focus or not.
   *
   * @return `true` if they have focus or otherwise `false`.
   */
  private isFocused(): boolean {
    return this.elements.editor.contains( activeElement() ) || this.Editor.Components.ContextMenu.isFocused();
  }

  /**
   * Should be called when the custom selection is manually updated.
   *
   * @param collapsed - Indicates whether the new selection is collapsed or not.
   */
  update( collapsed: boolean ): void {
    if ( ! this.is( START, EXTEND ) ) {
      this.set( UPDATE );
      this.set( collapsed ? COLLAPSED : SELECTED );
    }
  }

  /**
   * Attempts to refresh the selection state.
   *
   * @param collapsed - Indicates whether the new selection is collapsed or not.
   */
  refresh( collapsed: boolean ): void {
    if ( ! this.is( START, EXTEND ) ) {
      this.set( START );
      this.set( CHANGED );
      this.set( collapsed ? COLLAPSED : SELECTED );
    }
  }

  /**
   * Destroys the instance.
   */
  destroy(): void {
    this.event.destroy();
    off( null, '', this.key );
  }
}
