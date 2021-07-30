import { getSelection } from '../getSelection/getSelection';


/**
 * Returns an active node that the selection start/end belongs to.
 *
 * @param end - Optional. Whether to use selection end or not.
 *
 * @return An object literal with an active node and offset on success, or null on failure.
 */
export function findActiveNode( end = false ): { node: Node, offset: number } {
  const selection = getSelection();
  const { anchorNode, focusNode, anchorOffset, focusOffset } = selection;

  if ( anchorNode && focusNode ) {
    const position = anchorNode.compareDocumentPosition( focusNode );
    const backward = ( ! position && focusOffset < anchorOffset ) || position === Node.DOCUMENT_POSITION_PRECEDING;
    return backward === end ? { node: anchorNode, offset: anchorOffset } : { node: focusNode, offset: focusOffset };
  }

  return null;
}
