import { OffsetPosition, Position } from '@ryusei/code';
import { Marker } from '../../components/Range/Marker';
/**
 * The class for rendering the indent guide.
 *
 * @since 0.1.0
 */
export declare class IndentMarker extends Marker {
    /**
     * Calculates boundaries for drawing the marker.
     * Because every indent size is same, this method uses the cache of the width for the better performance.
     *
     * @param anchor - An anchor position.
     *
     * @return An object with start and end boundaries.
     */
    protected calcBoundaries(anchor: Position): {
        start: OffsetPosition;
        end: OffsetPosition;
    };
}
//# sourceMappingURL=../../../../src/js/extensions/Guide/IndentMarker.d.ts.map