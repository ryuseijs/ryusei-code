import { toArray } from '../../array';


/**
 * Prepends children to the specified parent node.
 *
 * @param parent   - A parent node.
 * @param children - A child or children to prepend to the parent.
 */
export function prepend( parent: Node, children: Node | Node[] ): void {
  toArray( children ).forEach( child => {
    parent.insertBefore( child, parent.firstChild );
  } );
}
