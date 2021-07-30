import { SelectionBoundary } from '@ryusei/code';
import { getSelection } from '../getSelection/getSelection';


/**
 * Sets a selection by an anchor and a focus object.
 * Note that the Range constructor does not supported by IE.
 *
 * @param anchor - An anchor boundary object.
 * @param focus  - A focus boundary object.
 */
export function setSelection( anchor: SelectionBoundary, focus: SelectionBoundary ): void {
  if ( anchor && focus ) {
    const selection = getSelection();

    if ( selection.setBaseAndExtent ) {
      selection.setBaseAndExtent( anchor.node, anchor.offset, focus.node, focus.offset );
    } else {
      const range = selection.rangeCount > 0 ? selection.getRangeAt( 0 ) : document.createRange();

      range.setStart( anchor.node, anchor.offset );
      range.setEnd( focus.node, focus.offset );
      selection.removeAllRanges();
      selection.addRange( range );
    }
  }
}
