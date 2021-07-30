import { SelectionBoundary } from '@ryusei/code';
import { isText } from '../../type/type';


/**
 * Finds a node that the offset number belongs to.
 *
 * @param elm    - An element to find in.
 * @param offset - An offset index.
 *
 * @return An object that contains a found node and a offset number.
 */
export function findSelectionBoundary( elm: Element, offset: number ): SelectionBoundary | null {
  const children = elm.childNodes;

  if ( ! children.length && ! offset ) {
    return { node: elm, offset: 0 };
  }

  if ( offset <= elm.textContent.length ) {
    for ( let i = 0; i < children.length; i++ ) {
      const node   = children[ i ];
      const length = node.textContent.length;

      if ( isText( node ) ) {
        if ( offset <= length ) {
          return { node, offset };
        }
      } else if ( node instanceof Element ) {
        const found = findSelectionBoundary( node, offset );

        if ( found ) {
          return found;
        }
      }

      offset -= length;
    }
  }

  return null;
}
