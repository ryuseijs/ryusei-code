import {
  EVENT_MOUNTED,
  EVENT_RESIZE,
  EVENT_SCROLL,
  EVENT_SCROLL_HEIGHT_CHANGED,
  EVENT_SCROLL_WIDTH_CHANGED,
} from '../../constants/events';
import { rafThrottle, throttle } from '../../utils';
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
    const { event } = this.Editor;

    event.on(
      [ EVENT_MOUNTED, EVENT_RESIZE, EVENT_SCROLL_HEIGHT_CHANGED, EVENT_SCROLL_WIDTH_CHANGED ],
      throttle( rafThrottle( () => {
        this.toggle();
        this.update();
      } ), 1 )
    );

    event.on( EVENT_SCROLL, rafThrottle( this.update ) );
  }
}
