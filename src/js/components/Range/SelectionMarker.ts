import { Elements, EventBusEvent } from '@ryusei/code';
import { CLASS_MARKERS } from '../../constants/classes';
import { EVENT_RESIZE, EVENT_SELECTED, EVENT_SELECTING } from '../../constants/events';
import { CHANGED, CLICKED_RIGHT, COLLAPSED, SELECTED } from '../../constants/selection-states';
import { Editor } from '../../core/Editor/Editor';
import { rafThrottle } from '../../utils';
import { Selection } from '../Selection/Selection';
import { StandaloneMarker } from './StandaloneMarker';


/**
 * The modifier class for the selection marker.
 *
 * @since 0.1.0
 */
export const CLASS_MARKER_SELECTION = `${ CLASS_MARKERS }--selection`;

/**
 * The class for highlighting a selection range.
 *
 * @since 0.1.0
 */
export class SelectionMarker extends StandaloneMarker {
  /**
   * The SelectionMarker constructor.
   *
   * @param editor   - An Editor instance.
   * @param elements - A collection of editor elements.
   */
  constructor( editor: Editor, elements: Elements ) {
    super( editor, elements, CLASS_MARKER_SELECTION );
    this.listen();
  }

  /**
   * Listens to some events.
   */
  protected listen(): void {
    const { event } = this.Editor;

    event.on( EVENT_SELECTED, this.onStateChanged.bind( this ), this, 0 );
    event.on( EVENT_SELECTING, rafThrottle( this.drawSelection.bind( this ) ) );
    event.on( EVENT_RESIZE, () => {
      this.clear();
      this.drawSelection();
    } );
  }

  /**
   * Called when the selection state is changed.
   *
   * @param e         - An EventBusEvent object.
   * @param Selection - A Selection instance.
   * @param state     - A new state.
   * @param prev      - A previous state.
   */
  private onStateChanged( e: EventBusEvent<Editor>, Selection: Selection, state: number, prev: number ): void {
    if ( Selection.is( COLLAPSED, CHANGED ) ) {
      this.clear();
    }

    if ( Selection.is( CHANGED, SELECTED ) && prev !== CLICKED_RIGHT ) {
      this.drawSelection();
    }
  }

  /**
   * Draws the current selection.
   */
  private drawSelection(): void {
    const { Selection } = this.Editor.Components;

    if ( ! Selection.isCollapsed() ) {
      const range = Selection.get( false );
      this.draw( range.start, range.end );
    } else {
      this.clear();
    }
  }
}
