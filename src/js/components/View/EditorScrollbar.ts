import {
  EVENT_MOUNTED,
  EVENT_RESIZE,
  EVENT_SCROLL_HEIGHT_CHANGED,
  EVENT_SCROLL_WIDTH_CHANGED,
  EVENT_SCROLL,
} from '../../constants/events';
import { rafThrottle } from '../../utils';
import { Scrollbar } from './Scrollbar';


/**
 * The class for creating a scrollbar.
 *
 * @since 0.1.0
 */
export class EditorScrollbar extends Scrollbar {
  /**
   * Listens to some events.
   */
  protected listen(): void {
    this.Editor.event.on(
      [ EVENT_MOUNTED, EVENT_RESIZE, EVENT_SCROLL, EVENT_SCROLL_HEIGHT_CHANGED, EVENT_SCROLL_WIDTH_CHANGED ],
      rafThrottle( this.update )
    );
  }
}
