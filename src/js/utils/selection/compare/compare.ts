import { Position } from '@ryusei/code';


/**
 * Compares the provided 2 positions.
 *
 * @return If the `position1` is preceding, returns a negative number,
 *         or if it is following, returns a positive one. If they are same, returns `0`.
 */
export function compare( position1: Position, position2: Position ): number {
  return position1[ 0 ] - position2[ 0 ] || position1[ 1 ] - position2[ 1 ];
}
