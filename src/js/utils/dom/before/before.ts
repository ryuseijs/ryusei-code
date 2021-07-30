import { toArray } from '../../array';


/**
 * Inserts a node or nodes before the specified reference node.
 *
 * @param nodes - A node or nodes to insert.
 * @param ref   - A reference node.
 */
export function before( nodes: Node | Node[], ref: Node ): void {
  toArray( nodes ).forEach( node => {
    if ( node ) {
      const parent = node.parentNode || ( ref && ref.parentNode );

      if ( parent ) {
        parent.insertBefore( node, ref );
      }
    }
  } );
}
