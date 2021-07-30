import { CLASS_MARKER, CLASS_MARKERS } from '../../../../constants/classes';
import { MARKER_ID } from '../../constants';


/**
 * Returns a node list of markers.
 *
 * @return A node list of markers.
 */
export function getMarkers( group = MARKER_ID ): NodeListOf<HTMLElement> {
  return document.querySelectorAll<HTMLElement>( `.${ CLASS_MARKERS }--${ group } .${ CLASS_MARKER }` );
}
